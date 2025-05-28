import css from "./ImageCard.module.css";

const ImageCard = ({ photo, openModal, isLast, bottomRef }) => {
  return (
    <div className={css.blokimg} onClick={() => openModal(photo)}>
      <img
        ref={isLast ? bottomRef : null}
        src={`${photo.urls.raw}&w=400&h=300&fit=clamp&fm=webp`}
        srcSet={`${photo.urls.raw}&w=400&h=300&fit=clamp&fm=webp 1x, ${photo.urls.raw}&w=400&h=300&dpr=2&fit=clamp&fm=webp 2x`}
        alt={photo.alt_description}
        className={css.img}
        onLoad={() => {
          if (isLast && bottomRef?.current) {
            bottomRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      />
    </div>
  );
};
export default ImageCard;