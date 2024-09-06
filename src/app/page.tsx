"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import localforage from './../../localforage.config';
import AddItemModal from './addItemModal';
import FoodItemRow from './footItem';

const Page = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [isAddItem, setIsAddItem] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await localforage.getItem<FoodItem[]>('myData');
      if (storedData) {
        setData(storedData);
      } else {
        const mockData: FoodItem[] = [
          {
            name: 'Chicken Breast',
            price: 10,
            weight: 200,
            calories: 250,
            protein: 40,
            carbs: 10,
            fats: 10,
          },
          {
            name: 'Chicken Thigh',
            price: 9.2,
            weight: 180,
            calories: 250,
            protein: 40,
            carbs: 10,
            fats: 10,
          },
        ];
        await localforage.setItem('myData', mockData);
        setData(mockData);
      }
    };
  
    fetchData();
  }, []);

  const addItem = () => {
    setIsAddItem(true);
  };

  const handleCloseModal = () => {
    setIsAddItem(false);
  };

  const handleSubmit = async (newItem: FoodItem) => {
    const updatedData = [...data, newItem];
    
    try {
      // Update state
      setData(updatedData);
  
      // Persist to localForage
      await localforage.setItem('myData', updatedData);
  
      // Optional: Log success or display a success message
      console.log('Item added successfully!');
  
    } catch (error) {
      console.error('Error saving item to localForage:', error);
      alert('There was an error saving the item. Please try again later.');
    }

  };

  return (
    <div>
      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price($)</th>
              <th>Weight(Kg)</th>
              <th>Calories(Kcal)</th>
              <th>Protein(g)</th>
              <th>Carbs(g)</th>
              <th>Fats(g)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <FoodItemRow key={item.name} item={item} />
            ))}
          </tbody>
        </table>
      )}
      <button onClick={addItem}>Add New Item</button>
      {isAddItem && (
        <AddItemModal 
          onClose={handleCloseModal} 
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Page;

interface FoodItem {
  name: string;
  brand?: string;
  price: number;
  weight: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}