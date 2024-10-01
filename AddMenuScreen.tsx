//AddMenuScreen.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { MenuContext } from './MenuContext';

const AddMenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { addMenuItem } = useContext(MenuContext)!;
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const courses = ['Starters', 'Mains', 'Dessert'];

  const handleSubmit = () => {
    if (dishName && description && price) {
      addMenuItem({ dishName, description, course, price });
      navigation.goBack();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <ImageBackground source={require('./assets/addMenuBackground.jpg')} style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity 
        style={styles.dropdown} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{course}</Text>
        <Icon name="chevron-down" size={20} color="#333" style={styles.dropdownIcon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {courses.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setCourse(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Button title="Add Item" onPress={handleSubmit} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 15,
    width: '100%',
    alignItems: 'flex-start',
  },
  modalItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default AddMenuScreen;
