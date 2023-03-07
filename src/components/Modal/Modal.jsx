import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Img, Overlay, PictureModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, url }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <PictureModal>
        <Img src={url} alt="" />
      </PictureModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener(
//       'keydown',
//       this.handleKeyDown
//     );
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { url } = this.props;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <PictureModal>
//           <Img src={url} alt="" />
//         </PictureModal>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   url: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };
