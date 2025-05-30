export default function ImageCard({ photo, openModal }) {
  return (
    <div onClick={() => openModal(photo)} style={{ cursor: 'pointer' }}>
      <img src={photo.urls.small} alt={photo.alt_description} />
    </div>
  );
}