import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins, selectCoin} from '../redux/coins/coinsSelectors';
import {updateEntityId, updateSearchQuery} from '../redux/coins/coinsSlice';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import DataList from '../components/DataList';
import CoinBottomSheetModal from '../components/CoinBottomSheetModal';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CoinsScreenNavigationProp>();

  const filteredCoins = useAppSelector(selectFilteredCoins);
  const selectedCoin = useAppSelector(selectCoin);
  const [showCoinModal, setShowCoinModal] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleToggleShowCoinModal = useCallback(() => {
    setShowCoinModal(currentState => !currentState);
  }, [setShowCoinModal]);

  const handleCoinSelection = useCallback(
    (id: string) => {
      dispatch(updateEntityId(id));
      handleToggleShowCoinModal();
    },
    [dispatch, handleToggleShowCoinModal],
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
      },
    });
  }, [navigation, setSearchQuery]);

  return (
    <>
      <SafeView>
        {filteredCoins.length > 0 && (
          <DataList
            listStyle={styles.coinList}
            data={filteredCoins}
            onSelectItem={handleCoinSelection}
          />
        )}
      </SafeView>

      {selectedCoin && showCoinModal && (
        <CoinBottomSheetModal
          isVisible={showCoinModal}
          onDismiss={handleToggleShowCoinModal}
          coin={selectedCoin}
        />
      )}
    </>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  coinList: {
    paddingHorizontal: 10,
  },
});
