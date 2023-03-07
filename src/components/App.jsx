import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './Global.styled';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetPictures } from 'Services/Api';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        const response = await GetPictures(
          searchQuery,
          page
        );
        setPictures([...pictures, response.hits]);
        setStatus('resolve');
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, pictures, searchQuery]);

  const toogleModal = url => {
    setShowModal(!showModal);
    setUrl(url);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPictures([]);
    setPage(1);
  };

  const handeleLoaderClick = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Searchbar onSearch={handleFormSubmit} />
      <ImageGalery
        onModal={toogleModal}
        searchQuery={searchQuery}
        status={status}
        isLoading={isLoading}
        onClick={handeleLoaderClick}
        pictures={pictures}
      />

      {showModal && (
        <Modal onClose={toogleModal} url={url} />
      )}
      <ToastContainer autoClose={3000} theme={'colored'} />
    </Layout>
  );
};
