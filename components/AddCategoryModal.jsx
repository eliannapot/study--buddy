import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
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
      isVisible={visible}
      onBackdropPress={onClose}       
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={styles.modalContainer}
    >
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>New Category</Text>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              style={styles.input}
              placeholder="Enter category name"
              placeholderTextColor={colors.blueText}
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: colors.lightbackground,
    borderRadius: 10,
    elevation: 10,
  },
  titleContainer: {
    backgroundColor: colors.primary,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    marginBottom: 5,
    color: colors.white,
  },
  contentContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
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
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.red,
    borderWidth: 1,
  },
  cancelButtonText: {
    color: colors.red,
    fontFamily: 'InterRegular',
    fontSize: 16,
  },
  confirmButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  confirmButtonText: {
    color: colors.primary,
    fontFamily: 'InterRegular',
    fontSize: 16,
  },
});
