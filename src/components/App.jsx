import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './Global.styled';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const params = {
          key: '32602095-27dbade4d0732e174c3b141f5',
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: page,
        };

        const response = await axios.get(
          'https://pixabay.com/api/',
          { params }
        );

        setPictures([...response.data.hits]);
        setStatus('resolve');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, searchQuery]);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     try {
  //       const picturesData = await GetPictures(
  //         searchQuery,
  //         page
  //       );
  //       console.log('hi');
  //       setPictures([...picturesData.hits]);
  //       setStatus('resolve');
  //       setIsLoading(false);
  //     } catch (error) {
  //       setStatus('rejected');
  //     }
  //   })();
  // }, []);

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
