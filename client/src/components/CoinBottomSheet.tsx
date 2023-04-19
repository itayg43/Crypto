import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import {MarketAction} from '../enums/MarketAction';
import BottomSheet from './BottomSheet';
import LineChart from './LineChart';

interface Props {
  show: boolean;
  onDismiss: () => void;
  item: Coin | Holding;
}

const CoinBottomSheet = ({show, onDismiss, item}: Props) => {
  const isHoldingInstance = item instanceof Holding;

  return (
    <BottomSheet show={show} onDismiss={onDismiss}>
      <LineChart item={item} />

      <ActionSection
        enableSellAction={isHoldingInstance}
        qunatityAllowedToSell={isHoldingInstance ? item.quantity : 0}
        onAction={() => null}
      />
    </BottomSheet>
  );
};

export default CoinBottomSheet;

enum QuantityChangeAction {
  increment,
  decrement,
}

interface ActionSectionProps {
  enableSellAction: boolean;
  qunatityAllowedToSell: number;
  onAction: (action: MarketAction, quantity: number) => void;
}

const ActionSection = ({
  enableSellAction,
  qunatityAllowedToSell,
  onAction,
}: ActionSectionProps) => {
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

  return (
    <View style={styles.actionSectionContainer}>
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

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Buy"
          disabled={quantity === 0}
          onPress={() => onAction(MarketAction.buy, quantity)}
        />

        {enableSellAction && (
          <Button
            title="Sell"
            disabled={quantity === 0 || quantity > qunatityAllowedToSell}
            onPress={() => onAction(MarketAction.sell, quantity)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
