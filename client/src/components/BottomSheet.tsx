import React, {useCallback, useEffect, useRef} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onDismiss: () => void;
}

const BottomSheet = ({children, show, onDismiss}: Props) => {
  const ref = useRef<BottomSheetModal>(null);

  const handlePresetBottomSheet = useCallback(() => {
    ref.current?.present();
  }, [ref]);

  useEffect(() => {
    if (!show) return;
    handlePresetBottomSheet();
  }, [show, handlePresetBottomSheet]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={['50%']}
        index={0}
        onDismiss={onDismiss}>
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheet;
