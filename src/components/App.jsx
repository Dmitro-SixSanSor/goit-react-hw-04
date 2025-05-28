import "modern-normalize";
import "./App.css";
import { useEffect, useRef, useState } from "react";

import { GridLoader } from "react-spinners";

import { fetchData } from "../api/api";
import ImageGallery from "./gallery/ImageGallery";
import SearchBar from "./searchbar/SearchBar";
import ImageModal from "./modalimage/ImageModal";
import ErrorMessage from "./errormessage/ErrorMessage";
import LoadMoBtn from "./loadmobtn/LoadMoBtn";

export default function App() {
  const [collection, setCollction] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const bottomRef = useRef(null);

  const handleSearch = (newImage) => {
    setSearchValue(newImage);
    setCurrentPage(1);
    setCollction([]);
  };
  const incPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const openModal = (photo) => {
    setModalSrc(photo.urls);
    setModalAlt(photo.alt_description);

    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
    setModalSrc("");
    setModalAlt("");
  }
  useEffect(() => {
    if (bottomRef.current && currentPage > 1) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [collection]);

  useEffect(() => {
    if (searchValue === "") return;
    async function fetchDataCollection() {
      try {
        setLoading(true);
        const collection = await fetchData(searchValue, currentPage);
        console.log(" collection", collection);
        setCollction((prevImages) => [
          ...prevImages,
          ...collection.data.results,
        ]);
        setTotalPages(collection.data.total_pages);
      } catch (err) {
        setIsError(true);
        setErrorMessage(err.status);
      } finally {
        setLoading(false);
      }
    }
    fetchDataCollection();
  }, [currentPage, searchValue]);

  const hasCollection = collection.length > 0;
  const isLastPage = currentPage === totalPages;
  const valueSearch = searchValue.trim() !== "";

  return (
    <div className="main">
      <SearchBar onSubmit={handleSearch} />
      {loading && <GridLoader />}
      {hasCollection ? (
        <>
          <ImageGallery
            photos={collection}
            openModal={openModal}
            bottomRef={bottomRef}
          />
        </>
      ) : !loading && valueSearch && !isError ? (
        <ErrorMessage message="No results" />
      ) : null}
      {isError && <ErrorMessage message={errorMessage} />}
      {!loading && !isLastPage && hasCollection && (
        <LoadMoBtn incPage={incPage} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </div>
  );
}