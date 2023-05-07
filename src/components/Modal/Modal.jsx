import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ modalImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', escapeClose);
    return () => {
      window.removeEventListener('keydown', escapeClose);
    };
  }, []);

  const escapeClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const overlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={overlayClose}>
      <div className={css.modal}>
        <img src={modalImage.largeImageURL} alt={modalImage.tags} />
      </div>
    </div>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  modalImage: PropTypes.exact({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
