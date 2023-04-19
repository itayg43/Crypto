import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import {MarketAction} from '../enums/MarketAction';
import BottomSheet from './BottomSheet';
import LineChart from './LineChart';

enum QuantityChangeAction {
  increment,
  decrement,
}

interface Props {
  show: boolean;
  onDismiss: () => void;
  item: Coin | Holding;
  onAction: (action: MarketAction, id: string, quantity: number) => void;
}

const CoinBottomSheet = ({show, onDismiss, item, onAction}: Props) => {
  const isHoldingInstance = item instanceof Holding;

  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantityChange = useCallback(
    (action: QuantityChangeAction) => {
      setQuantity(currentValue =>
        action === QuantityChangeAction.increment
          ? currentValue + 1
          : currentValue - 1,
      );
    },
    [setQuantity],
  );

  const handleMarketAction = useCallback(
    (action: MarketAction) => {
      onAction(action, item.id, quantity);
    },
    [onAction, quantity],
  );

  return (
    <BottomSheet show={show} onDismiss={onDismiss}>
      <LineChart item={item} />

      <View style={styles.actionContainer}>
        {/** quantity */}
        <View style={styles.actionQuantityContainer}>
          <MaterialCommunityIcons
            name="minus"
            size={18}
            onPress={() => handleQuantityChange(QuantityChangeAction.decrement)}
            disabled={quantity === 0}
          />

          <Text style={styles.quantityLabel}>{quantity}</Text>

          <MaterialCommunityIcons
            name="plus"
            size={18}
            onPress={() => handleQuantityChange(QuantityChangeAction.increment)}
          />
        </View>

        {/** action buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            title="Buy"
            disabled={quantity === 0}
            onPress={() => handleMarketAction(MarketAction.buy)}
          />

          {isHoldingInstance && (
            <Button
              title="Sell"
              disabled={quantity === 0 || quantity > item.quantity}
              onPress={() => handleMarketAction(MarketAction.sell)}
            />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default CoinBottomSheet;

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },

  actionQuantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 16,
    marginHorizontal: 30,
    width: 20,
    textAlign: 'center',
  },

  actionButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
