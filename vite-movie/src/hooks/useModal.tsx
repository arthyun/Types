import { ReactNode } from 'react';
import { modalStore } from '@/contexts/modalStore';

const useModal = () => {
  const setIsModal = modalStore(
    (state: { setIsModal: boolean }) => state.setIsModal
  );
  const setComponent = modalStore(
    (state: { setComponent: (by: ReactNode) => void }) => state.setComponent
  );
  const setModalData = modalStore(
    (state: { setModalData: (by: any) => void }) => state.setModalData
  );

  const ModalHandler = (component: ReactNode, type: string, data?: any) => {
    if (type === 'open') {
      setIsModal(true);
      setComponent(component);
      setModalData(data);
    } else {
      setIsModal(false);
      setComponent(null);
      setModalData([]);
    }
  };

  return { ModalHandler };
};

export default useModal;
