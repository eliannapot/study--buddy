import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../app/config/colors';

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    await onAddCategory({ name: newCategoryName.trim() });
    setNewCategoryName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New Category</Text>
          <TextInput
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            style={styles.input}
            placeholder="Enter category name"
            placeholderTextColor="#888"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    //backgroundColor: colors.hexToRGBA(colors.black, 0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: colors.lightbackground,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  cancelButton: {
    marginRight: 15,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'green',
    fontSize: 16,
  },
});
