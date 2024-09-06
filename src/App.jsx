import './App.css'
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from './components/SearchBar'
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from './components/LoadMoreBtn';
import ImageModal from './components/ImageModal';
import api from './components/api.js';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: { query, page, per_page: 12 },
            headers: {
              Authorization: `Client-ID ${api.key}`,
            },
          }
        );

        const fetchedImages = response.data.results.map((image) => ({
          id: image.id,
          src: image.urls.small,
          fullSrc: image.urls.regular,
          alt: image.alt_description || "Unsplash Image",
        }));

        setImages((prevImages) =>
          page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
        );
      } catch {
        setError("Failed to fetch images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    if (!newQuery || newQuery === query) return; 

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster />
      <h1>Unsplash Image Search</h1>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length >= 12 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          src={selectedImage.fullSrc}
          alt={selectedImage.alt}
        />
      )}
    </div>
  );
};

export default App;