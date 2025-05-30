import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from '../ImageModal/ImageModal';
import { MoonLoader } from 'react-spinners';
import { ErrorMessage } from '../ErrorMessage/ErrorMesage';
import Modal from 'react-modal';
import { fetchData } from '../../api/fun-api';

Modal.setAppElement('#root');

function App() {
  const [imgData, setImgData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModalImage = (image) => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
    setModalData(image);
  };

  const closeModalImage = () => {
    document.body.style.overflow = 'visible';
    setIsModalOpen(false);
    setModalData({});
  };

  const submitForm = (newQuery) => {
    if (!newQuery.trim()) return;
    setPage(1);
    setTotalPages(1);
    setIsError(false);
    setQuery(newQuery);
    setImgData([]);
  };

  const onChange = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchDataFromAPI() {
      try {
        setIsLoading(true);
        const data = await fetchData(query, page); 
        setImgData((prevImgData) => [...prevImgData, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('error:', error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataFromAPI();
  }, [page, query]);

  return (
    <>
      <SearchBar onSubmit={submitForm} />

      {!isError ? (
        imgData.length > 0 ? (
          <ImageGallery photos={imgData} openModal={openModalImage} /> 
        ) : (
          query && !isLoading && <p style={{ textAlign: 'center' }}>No results found for "{query}"</p>
        )
      ) : (
        <ErrorMessage message={'Something went wrong...'} />
      )}

      {totalPages > page && !isLoading && <LoadMoreBtn onClick={onChange} />}

      {isLoading && (
        <MoonLoader
          cssOverride={{
            display: 'block',
            margin: '0 auto',
            borderColor: 'red',
          }}
        />
      )}

      {isModalOpen && (
        <ImageModal
          image={modalData}
          isClose={closeModalImage}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
}

export default App;



