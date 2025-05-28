import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
  console.log(" src", src.full);
  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
    >
      <img
        src={`${src.raw}&w=800&h=600&fm=webp`}
        srcSet={`${src.raw}&w=800&h=600&fm=webp 1x, ${src.raw}&w=800&h=600&dpr=2&fm=webp 2x`}
        alt={alt}
      />
    </Modal>
  );
};
export default ImageModal;