import { useState } from 'react';
import { Item, ItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import ModalC from 'components/Modal';

function ImageGalleryItem({ src, alt, largeSrc }) {
  const [ShowModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!ShowModal);
  };

  return (
    <>
      <Item>
        <ItemImage src={src} alt={alt} onClick={toggleModal} loading="lazy" />
        {ShowModal && (
          <ModalC onClick={toggleModal} original={largeSrc} desc={alt} />
        )}
      </Item>
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  largeSrc: PropTypes.string,
  alt: PropTypes.string,
  toggleModal: PropTypes.func,
};
export default ImageGalleryItem;
