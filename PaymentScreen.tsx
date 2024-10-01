//PaymentScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, ImageBackground } from 'react-native';

interface MenuItem {
  dishName: string;
  price: string;
}

const CustomButton: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const PaymentScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { selectedItems }: { selectedItems: MenuItem[] } = route.params;

  const totalAmount = selectedItems.reduce((total: number, item: MenuItem) => total + parseFloat(item.price), 0);

  const handlePayment = () => {
    if (totalAmount > 0) {
      Alert.alert('Payment Confirmed!', `Your total is R${totalAmount.toFixed(2)}`);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Total amount cannot be zero.');
    }
  };

  return (
    <ImageBackground source={require('./assets/paymentBackground.jpg')} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Payment Summary</Text>
      </View>

      <FlatList
        data={selectedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - R{item.price}</Text>
          </View>
        )}
      />
      
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: R{totalAmount.toFixed(2)}</Text>
      </View>

      <CustomButton title="Confirm Payment" onPress={handlePayment} />
      <CustomButton title="Go Back" onPress={() => navigation.goBack()} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'center',
  },
  menuItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', // Text color for better visibility
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
