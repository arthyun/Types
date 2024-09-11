import classes from './styles/modal.module.scss';
import { ReactNode } from 'react';
import { modalStore } from '@/contexts/modalStore';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const modalElement = document.getElementById('modal-root') as HTMLElement;

const ModalComponent = () => {
  const isModal = modalStore((state: { isModal: boolean }) => state.isModal);
  const setIsModal = modalStore(
    (state: { setIsModal: (by: boolean) => void }) => state.setIsModal
  );
  const component = modalStore(
    (state: { component: ReactNode }) => state.component
  );
  // const modalData = modalStore((state) => state.modalData);
  const setModalData = modalStore((state) => state.setModalData);
  // console.log('전달 받은 모달 데이터', modalData);

  // 모달 닫기
  const closeModal = () => {
    setIsModal(false);
    setModalData(null);
  };

  if (isModal) {
    return createPortal(
      <section className={classes.modal_section} onClick={closeModal}>
        <article
          className={classes.modal_article}
          onClick={(e) => e.stopPropagation()}
        >
          {component}
          <span className={classes.modal_close} onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </article>
      </section>,
      modalElement
    );
  } else {
    return null;
  }
};

export default ModalComponent;
