import React, {useCallback, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {Coin} from '../entities/Coin';
import {Holding} from '../entities/Holding';
import BottomSheet from './BottomSheet';
import LineChart from './LineChart';

export enum MarketAction {
  buy,
  sell,
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  item: Coin | Holding;
}

const CoinBottomSheet = ({isVisible, onClose, item}: Props) => {
  const dispatch = useAppDispatch();

  const isHoldingInstance = item instanceof Holding;

  const handleMarketAction = useCallback(
    (action: MarketAction, quantity: number) => {},
    [dispatch],
  );

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <HeaderSection
        logoURL={item.logoURL}
        name={item.name}
        symbol={item.symbol}
        priceChangePercentage={item.priceChangePercentageIn7Days}
      />

      <LineChart
        data={
          isHoldingInstance
            ? item.valueSparklineIn7Days
            : item.priceSparklineIn7Days
        }
      />

      <ActionSection
        enableSellAction={isHoldingInstance}
        qunatityAllowedToSell={isHoldingInstance ? item.quantity : 0}
        onAction={handleMarketAction}
      />
    </BottomSheet>
  );
};

export default CoinBottomSheet;

interface HeaderSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
  priceChangePercentage: number;
}

const HeaderSection = ({
  logoURL,
  name,
  symbol,
  priceChangePercentage,
}: HeaderSectionProps) => {
  return (
    <View style={styles.headerSectionContainer}>
      <HeaderLeftSection logoURL={logoURL} name={name} symbol={symbol} />
      <HeaderRightSection priceChangePercentage={priceChangePercentage} />
    </View>
  );
};

interface HeaderLeftSectionProps {
  logoURL: string;
  name: string;
  symbol: string;
}

const HeaderLeftSection = ({logoURL, name, symbol}: HeaderLeftSectionProps) => {
  return (
    <View style={styles.headerLeftSectionContainer}>
      {/** logo */}
      <View style={styles.logoContaienr}>
        <Image style={styles.logo} source={{uri: logoURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.titlesContainer}>
        <Text>{name}</Text>
        <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
      </View>
    </View>
  );
};

interface HeaderRightSectionProps {
  priceChangePercentage: number;
}

const HeaderRightSection = ({
  priceChangePercentage,
}: HeaderRightSectionProps) => {
  const isChangePositive = priceChangePercentage >= 0;
  const changeColor = isChangePositive ? 'green' : 'red';
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';

  return (
    <View style={styles.headerRightSectionContainer}>
      <MaterialCommunityIcons name={changeIcon} color={changeColor} />

      {/** percentage */}
      <Text style={{color: changeColor}}>
        {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
      </Text>

      {/** period */}
      <Text style={styles.priceChangePercentagePeriod}>(7 Days)</Text>
    </View>
  );
};

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
    (changeAction: QuantityChangeAction) => {
      setQuantity(currentQuantity =>
        changeAction === QuantityChangeAction.increment
          ? currentQuantity + 1
          : currentQuantity - 1,
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
  headerSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },

  headerLeftSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContaienr: {
    width: 40,
    height: 40,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titlesContainer: {
    marginLeft: 10,
  },
  symbol: {
    color: 'gray',
  },

  headerRightSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChangePercentagePeriod: {
    color: 'gray',
    marginLeft: 5,
  },

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
