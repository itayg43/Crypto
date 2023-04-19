import React, {useEffect, useRef} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onDismiss: () => void;
}

const BottomSheet = ({children, show, onDismiss}: Props) => {
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (show) ref.current?.present();
  }, [show]);

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
