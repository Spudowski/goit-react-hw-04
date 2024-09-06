const ImageCard = ({ src, alt }) => {
    const styles = {
      image: {
        width: "100%",
        height: "120%",
        transition: "transform 0.3s ease", // Animacja transformacji
      },
        container: {
            width: "350px",
            height: "250px",
        overflow: "hidden",
        display: "inline-block",
      },
    };

    return (
      <div style={styles.container}>
        <img
          src={src}
          alt={alt}
          style={styles.image}
          className="image-card"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
    );
};

export default ImageCard;