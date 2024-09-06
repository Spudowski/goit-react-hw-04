import ImageCard from "./ImageCard";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap", listStyleType: "none" }}>
      {images.map((image) => (
        <li key={image.id} style={{ margin: "10px", cursor: "pointer" }}>
          <div onClick={() => onImageClick(image)}>
            <ImageCard src={image.src} alt={image.alt} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;