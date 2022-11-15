import { useEffect } from 'react';
import { Overlay, Modal } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function ModalC({ original, desc, onClick }) {
  useEffect(() => {  
    const handleKey = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClick]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <Modal>
        <img src={original} alt={desc} width="1000" />
      </Modal>
    </Overlay>,
    modalRoot
  );
}

ModalC.propTypes = {
  original: PropTypes.string,
  desc: PropTypes.string,
  onClick: PropTypes.func,
};

export default ModalC;
