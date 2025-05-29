import ImageCard from "../imagecard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal, bottomRef }) => {
  return (
    <div className={css.gallery}>
      <ul className={css.list}>
        {photos.map((photo, index) => {
          const isLast = index === photos.length - 1;

          return (
            <li className={css.item} key={photo.id}>
              <ImageCard
                photo={photo}
                openModal={openModal}
                bottomRef={bottomRef}
                isLast={isLast}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;