import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import {MarketAction} from '../enums/MarketAction';
import BottomSheet from './BottomSheet';
import LineChart from './LineChart';
import AppButton from './AppButton';
import AppIconButton from './AppIconButton';

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
          <AppIconButton
            icon="minus"
            disabled={quantity === 0}
            onPress={() => handleQuantityChange(QuantityChangeAction.decrement)}
          />
          <Text style={styles.quantityLabel}>{quantity}</Text>
          <AppIconButton
            icon="plus"
            onPress={() => handleQuantityChange(QuantityChangeAction.increment)}
          />
        </View>

        {/** action buttons */}
        <View style={styles.actionButtonsContainer}>
          <AppButton
            containerStyle={styles.actionButton}
            label="Buy"
            disabled={quantity === 0}
            onPress={() => handleMarketAction(MarketAction.buy)}
          />

          {isHoldingInstance && (
            <AppButton
              containerStyle={styles.actionButton}
              label="Sell"
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
    marginHorizontal: 20,
    width: 20,
    textAlign: 'center',
  },

  actionButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 3,
  },
});
