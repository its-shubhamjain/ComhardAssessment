import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadCryptoData } from '../store/slice';
import { RootState, AppDispatch } from '../store';
import { CryptoData } from '../services/api';
import { Picker } from '@react-native-picker/picker';

interface Props {
  navigation: any;
}

const CryptoList: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoList, loading, error } = useSelector(
    (state: RootState) => state.crypto,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'price' | 'marketCap'>('name');
  const [filteredData, setFilteredData] = useState<CryptoData[]>(cryptoList);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(loadCryptoData());
  }, [dispatch]);

  useEffect(() => {
    let filteredList = cryptoList.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOption === 'name') {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price') {
      filteredList.sort((a, b) => b.current_price - a.current_price);
    } else if (sortOption === 'marketCap') {
      filteredList.sort((a, b) => b.market_cap - a.market_cap);
    }

    setFilteredData(filteredList);
  }, [searchQuery, sortOption, cryptoList]);

  const handleRetry = () => {
    dispatch(loadCryptoData());
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(loadCryptoData()).finally(() => setRefreshing(false));
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: CryptoData }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CryptoDetail', { crypto: item })}
    >
      <Text style={styles.name}>
        {item.name} ({item.symbol.toUpperCase()})
      </Text>
      <Text style={styles.text}>Current Price: ${item.current_price}</Text>
      <Text style={styles.text}>Market Cap: ${item.market_cap.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Cryptocurrency"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={(value) => setSortOption(value)}
          style={styles.picker}
        >
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Current Price" value="price" />
          <Picker.Item label="Market Cap" value="marketCap" />
        </Picker>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red', marginBottom: 20, textAlign: 'center' },
  searchInput: { 
    padding: 10, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  sortContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-between'

  },
  sortLabel: { 
    fontSize: 16, 
    alignSelf:'center'

  },
  picker: { 
    flex: 0.5,     
  },
  item: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  text: { 
    fontSize: 14, 
    color: '#333' 
  },
});

export default CryptoList;
