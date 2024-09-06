import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a search term to find images.');
      return;
    }

    onSubmit(query);
    setQuery('');
  }

  const styles = {
    input: {
      width: "400px",
      height: "40px",
      borderRadius: "5px",
      backgroundColor: "black",
      marginRight: "10px",
      border: "none",
      paddingLeft: "16px"
    },
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }

  return (
    <header>
      <Toaster />
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          className="input"
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;