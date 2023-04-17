import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins, selectCoin} from '../redux/coins/coinsSelectors';
import {updateEntityId, updateSearchQuery} from '../redux/coins/coinsSlice';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import GenericList from '../components/GenericList';
import DataListItem from '../components/DataListItem';
import CoinBottomSheet from '../components/CoinBottomSheet';

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
          <GenericList
            items={filteredCoins}
            keyExtractor={item => item.id}
            renderItem={item => (
              <DataListItem item={item} onSelect={handleCoinSelection} />
            )}
          />
        )}
      </SafeView>

      {selectedCoin && showCoinModal && (
        <CoinBottomSheet
          isVisible={showCoinModal}
          onDismiss={handleToggleShowCoinModal}
          coin={selectedCoin}
        />
      )}
    </>
  );
};

export default CoinsScreen;
