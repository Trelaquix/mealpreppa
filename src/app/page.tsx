"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import myStorage from '../../localforage.config.js';
import FoodItem from './components/foodItem';

const Page = () => {
  const [data, setData] = useState<FoodItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await myStorage.getItem('myData');
      setData(storedData);

      // Generate mock data if no data is stored
      if (!storedData) {
        const mockData: FoodItem[] = [
          {
            name: 'Chicken Breast',
            price: 10,
            weight: 200,
            calories: 250,
            protein: 40,
            carbs: 0,
            fats: 10,
          },
          // ... add more food items
        ];
        await myStorage.setItem('myData', mockData);
        setData(mockData);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fats</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <FoodItem item={item} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;