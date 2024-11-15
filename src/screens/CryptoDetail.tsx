import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { CryptoData } from '../services/api';

type CryptoDetailProp = RouteProp<{ params: { crypto: CryptoData } }, 'params'>;

interface Props {
  route: CryptoDetailProp;
}

const CryptoDetail: React.FC<Props> = ({ route }) => {
  const {
    name,
    symbol,
    image,
    current_price,
    market_cap,
    price_change_percentage_24h,
    ath,
    ath_date,
    high_24h,
    low_24h,
    last_updated,
  } = route.params.crypto;

  const formatNumber = (num: number): string =>
    num < 1 ? num.toFixed(8) : num.toLocaleString();

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>
        {name} ({symbol?.toUpperCase()})
      </Text>
      <Text style={styles.detail}>
        Current Price: ${current_price && formatNumber(current_price)}
      </Text>
      <Text style={styles.detail}>Market Cap: ${market_cap?.toLocaleString()}</Text>
      <Text style={styles.detail}>
        24h Price Change: {price_change_percentage_24h?.toFixed(2)}%
      </Text>
      <Text style={styles.detail}>All-Time High: ${ath && formatNumber(ath)}</Text>
      <Text style={styles.detail}>
        ATH Date: {ath_date && new Date(ath_date).toLocaleDateString()}
      </Text>
      <Text style={styles.detail}>24h High: ${high_24h && formatNumber(high_24h)}</Text>
      <Text style={styles.detail}>24h Low: ${low_24h && formatNumber(low_24h)}</Text>
      <Text style={styles.detail}>
        Last Updated: {last_updated && new Date(last_updated).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
});

export default CryptoDetail;
