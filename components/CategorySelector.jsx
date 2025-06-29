import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../app/config/colors';
import { useCategories } from '../contexts/CategoryContext';

import AddCategoryModal from './AddCategoryModal';

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
  
  const { categories, addCategory} = useCategories();
  const [modalVisible, setModalVisible] = useState(false);


  const splitIntoRows = (items, rows) => {
    const rowItems = [[], []];
    items.forEach((item, index) => {
      rowItems[index % rows].push(item);
    });
    return rowItems;
  };

  const [row1, row2] = splitIntoRows(categories || [], 2);

  const handleAddCategory = async (category) => {
      try {
        await addCategory(category);
      } catch (error) {
        Alert.alert('Error', 'Failed to add category');
      }
  };
  
  return (
    <>
    <ScrollView 
      contentContainerStyle={styles.scrollContainer} 
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.rowsWrapper}>
        {[row1, row2].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
              key={item.name}
              style={[
                styles.categoryButton,
                selectedCategory?.$id === item.$id && styles.selectedButton
              ]}
              onPress={() => onCategorySelect(item)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory?.$id === item.$id && styles.selectedText
                ]}>
                  #{item.name}
                </Text>
              </TouchableOpacity>
            ))}
            {rowIndex === 1 && (
              <View style={{ alignContent: 'center', justifyContent: 'center'}}> 
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <FontAwesome5 name='plus-circle' size={25} color={colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>

    <AddCategoryModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onAddCategory={handleAddCategory}
    />

    </>
  );
};
  
  const styles = StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 10,
    },
    rowsWrapper: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
    },
    categoryButton: {
      borderWidth: 0.5,
      paddingVertical: 3,
      paddingHorizontal: 6,
      marginHorizontal: 5,
      marginVertical: 3,
    },
    selectedButton: {
      backgroundColor: colors.hexToRGBA(colors.secondary, 0.7),
    },
    categoryText: {
      fontSize: 16,
      fontFamily: 'InterLight',
    },
    selectedText: {
      fontWeight: 'InterRegular',
    },
    
  });

  export default CategorySelector;