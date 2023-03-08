import React from 'react';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  Descripton,
  ImageGallery,
} from './ImageGallery.styled';

import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGalery = ({
  status,
  onModal,
  searchQuery,
  onClick,
  pictures,
  isLoading,
}) => {
  return (
    <>
      {status === 'rejectedSearch' && (
        <Descripton>
          {searchQuery} is wrong search...
        </Descripton>
      )}
      {status === 'rejected' && (
        <Descripton>Something wrong...</Descripton>
      )}
      {status === 'idle' && (
        <Descripton>Please Input Search Query</Descripton>
      )}
      {pictures.length !== 0 && (
        <>
          <ImageGallery>
            <ImageGaleryItem
              onModal={onModal}
              pictures={pictures}
            />
          </ImageGallery>
          {!isLoading && <Button onClick={onClick} />}
        </>
      )}
      {status === 'panding' && <Loader />}
    </>
  );
};

ImageGalery.propTypes = {
  onModal: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
