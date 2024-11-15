import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CryptoList from '../screens/CryptoList';
import CryptoDetail from '../screens/CryptoDetail';

const Stack = createNativeStackNavigator();

export const AppNavigator=()=>{
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CryptoList" component={CryptoList} options={{ title: 'Cryptocurrencies' }} />
          <Stack.Screen name="CryptoDetail" component={CryptoDetail} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}