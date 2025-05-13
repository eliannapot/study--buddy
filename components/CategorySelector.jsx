import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import colors from '../app/config/colors';

const CategorySelector = ({ categories, selectedCategory, onCategorySelect }) => {
  
  const splitIntoRows = (items, rows) => {
    const rowItems = [[], []];
    items.forEach((item, index) => {
      rowItems[index % rows].push(item);
    });
    return rowItems;
  };

  const [row1, row2] = splitIntoRows(categories, 2);
  
  return (
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
                selectedCategory === item.name && styles.selectedButton
              ]}
              onPress={() => onCategorySelect(item.name)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.selectedText
                ]}>
                  #{item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
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