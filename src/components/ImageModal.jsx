import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, src, alt }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                },
            }}
        >
            <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
        </Modal>
    )
}

export default ImageModal;