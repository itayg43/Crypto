import React, {useCallback, useEffect, useRef} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

const BottomSheet = ({children, show, onClose}: Props) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const modalSnapPoints = ['55%'];

  const handlePresetModal = useCallback(() => {
    modalRef.current?.present();
  }, [modalRef]);

  useEffect(() => {
    if (show) {
      handlePresetModal();
    }

    return () => onClose();
  }, [show, handlePresetModal]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={modalRef} snapPoints={modalSnapPoints} index={0}>
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheet;
