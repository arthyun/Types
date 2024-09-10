import { modalStore } from '@/contexts/modalStore';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import classes from './styles/modal.module.scss';

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
  // console.log('전달 받은 모달 데이터', modalData);

  // 모달 닫기
  const closeModal = () => setIsModal(false);

  if (isModal) {
    return createPortal(
      <section className={classes.modal_section} onClick={closeModal}>
        <article
          className={classes.modal_article}
          onClick={(e) => e.stopPropagation()}
        >
          {component}
        </article>
      </section>,
      modalElement
    );
  } else {
    return null;
  }
};

export default ModalComponent;
