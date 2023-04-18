import React, {useCallback, useEffect, useRef} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const BottomSheet = ({children, isVisible, onClose}: Props) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const modalSnapPoints = ['50%'];

  const handlePresetModal = useCallback(() => {
    modalRef.current?.present();
  }, [modalRef]);

  useEffect(() => {
    if (isVisible) {
      handlePresetModal();
    }

    return () => onClose();
  }, [isVisible, handlePresetModal]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={modalRef} snapPoints={modalSnapPoints} index={0}>
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheet;
