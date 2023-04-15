import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins} from '../redux/coins/coinsSelectors';
import {updateSearchQuery} from '../redux/coins/coinsSlice';
import {Coin} from '../entities/Coin';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';
import LineChart from '../components/LineChart';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CoinsScreenNavigationProp>();

  const filteredCoins = useAppSelector(selectFilteredCoins);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalSnapPoints = useMemo(() => ['50%'], []);

  const handlePresetBottomSheetModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const handleDismissBottomSheetModal = useCallback(() => {
    setSelectedCoin(null);
  }, []);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin?.id !== coin.id ? coin : currentCoin,
      );
      handlePresetBottomSheetModal();
    },
    [setSelectedCoin, handlePresetBottomSheetModal],
  );

  const handleUpdateSearchQuery = useCallback(
    (query: string) => {
      dispatch(updateSearchQuery(query));
    },
    [dispatch],
  );

  useEffect(() => {
    handleUpdateSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setSearchQuery(e.nativeEvent.text),
        textColor: 'gray',
      },
    });
  }, [navigation, setSearchQuery]);

  return (
    <>
      <SafeView>
        {filteredCoins.length > 0 && (
          <CoinList
            containerStyle={styles.coinList}
            data={filteredCoins}
            onSelectItem={handleCoinSelection}
          />
        )}
      </SafeView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={bottomSheetModalSnapPoints}
          index={0}
          onDismiss={handleDismissBottomSheetModal}
          style={styles.bottomSheetModal}
          backgroundStyle={styles.bottomSheetModalBackground}
          handleIndicatorStyle={styles.bottomSheetModalHandleIndicator}>
          {selectedCoin && (
            <LineChart
              containerStyle={styles.lineChart}
              data={selectedCoin.priceSparklineIn7Days}
              dataRange={selectedCoin.priceRangeIn7Days}
              dataChangePercentage={selectedCoin.priceChangePercentageIn7Days}
            />
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  coinList: {
    marginHorizontal: 10,
  },

  bottomSheetModal: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bottomSheetModalBackground: {
    backgroundColor: 'black',
  },
  bottomSheetModalHandleIndicator: {
    backgroundColor: 'gray',
  },

  lineChart: {
    marginTop: 20,
  },
});
