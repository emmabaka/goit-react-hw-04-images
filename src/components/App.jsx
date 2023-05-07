import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchImages } from 'api/fetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState({});
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoad, setLoad] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const firstRender = useRef(true);

  const getImages = useCallback(async () => {
    try {
      const response = await fetchImages(query, page);
      return response.data.hits;
    } catch (error) {
      console.log(error);
    }
  }, [page, query]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setLoad(true);

    try {
      getImages().then(images => {
        if (images.length === 0) {
          alert('No results');
        } else {
          const normalizedImages = normalizedData(images);
          setImages(prev => [...prev, ...normalizedImages]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }, [getImages, query]);

  const onSubmit = e => {
    e.preventDefault();

    const query = e.currentTarget.elements.search.value.toLowerCase();

    if (query.trim() === '') {
      alert('Enter smth, please');
      return;
    }

    setQuery(query);
    setImages([]);
    setPage(1);

    e.currentTarget.elements.search.value = '';
  };

  const normalizedData = data => {
    return data.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const getLargeImage = e => {
    const filtered = images.filter(item => item.webformatURL === e.target.src);
    setModalImage(filtered[0]);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery
        images={images}
        onOpenModal={onOpenModal}
        getLargeImage={getLargeImage}
      />

      {isLoad && <Loader />}

      {images.length !== 0 && <Button onLoadMore={onLoadMore} />}

      {isOpen && <Modal modalImage={modalImage} onClose={onCloseModal} />}
    </div>
  );
};
