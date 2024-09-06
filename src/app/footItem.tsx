import React from 'react';
import { FoodItem } from './types';

// Define the FoodItemRow component
interface FoodItemRowProps {
  item: FoodItem;
}

const FoodItemRow: React.FC<FoodItemRowProps> = ({ item }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.brand || ''}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>{item.weight}Kg</td>
      <td>{item.calories || ''}</td>
      <td>{item.protein || ''}</td>
      <td>{item.carbs || ''}</td>
      <td>{item.fats || ''}</td>
    </tr>
  );
};

export default FoodItemRow;
