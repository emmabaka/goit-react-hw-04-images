import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, getLargeImage, onOpenModal }) => {
  const handleOpen = e => {
    getLargeImage(e);
    onOpenModal();
  };

  return (
    <ul className={css.imageGallery}>
      {images.map(({ webformatURL, tags, id }) => {
        return (
          <ImageGalleryItem
            url={webformatURL}
            alt={tags}
            key={id}
            onOpenModal={handleOpen}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  getLargeImage: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
