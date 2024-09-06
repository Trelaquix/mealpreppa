"use client";
import React, { useState } from 'react';
import { FoodItem } from './types';

// interface ModalProps {
//   onClose: () => void;
//   onSubmit: (newItem: FoodItem) => void;
// }

interface AddItemModalProps {
    onClose: () => void;
    onSubmit: (newItem: FoodItem) => void;
  }


const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [calories, setCalories] = useState<number | ''>('');
  const [protein, setProtein] = useState<number | ''>('');
  const [carbs, setCarbs] = useState<number | ''>('');
  const [fats, setFats] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // ... (form validation removed for now)
  
      const newItem: FoodItem = {
        name,
        brand,
        price: Number(price),
        weight: Number(weight),
        calories: Number(calories),
        protein: protein ? Number(protein) : undefined,
        carbs: carbs ? Number(carbs) : undefined,
        fats: fats ? Number(fats) : undefined,
      };

    onSubmit(newItem);

    console.log('Item added successfully!');
  
      // Close the modal
      onClose();
  
    } catch (error) {
      console.error('Error adding item:', error);
  
      // Display an error message to the user (e.g., using a toast notification)
      alert('There was an error saving the item. Please try again later.');
    }
  };

  return (
    <div className="add-item-modal">
      <div className="add-item-modal-content">
        <h2>Add Item</h2> {/* Modal Title */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name"
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="brand">Brand:</label>
            <input 
              type="text" 
              id="brand"
              placeholder="Brand" 
              value={brand} 
              onChange={(e) => setBrand(e.target.value)} 
            />
          </div>
          <div className="form-row">
            <label htmlFor="price">Price ($):</label>
            <input 
              type="number" 
              id="price"
              placeholder="Price ($)" 
              value={price} 
              onChange={(e) => setPrice(parseFloat(e.target.value) || '')} 
              required
              min="0" /* Ensures the price can't be negative */
            />
          </div>
          <div className="form-row">
            <label htmlFor="weight">Weight (Kg):</label>
            <input 
              type="number" 
              id="weight"
              placeholder="Weight (Kg)" 
              value={weight} 
              onChange={(e) => setWeight(parseFloat(e.target.value) || '')} 
              required
              min="0" /* Ensures the weight can't be negative */
            />
          </div>
          <div className="form-row">
            <label htmlFor="calories">Calories (Kcal):</label>
            <input 
              type="number" 
              id="calories"
              placeholder="Calories (Kcal)" 
              value={calories} 
              onChange={(e) => setCalories(parseInt(e.target.value) || '')} 
              required
              min="0" /* Ensures the calories can't be negative */
            />
          </div>
          <div className="form-row">
            <label htmlFor="protein">Protein (g):</label>
            <input 
              type="number" 
              id="protein"
              placeholder="Protein (g)" 
              value={protein} 
              onChange={(e) => setProtein(parseInt(e.target.value) || '')} 
              min="0" /* Ensures the protein can't be negative */
            />
          </div>
          <div className="form-row">
            <label htmlFor="carbs">Carbs (g):</label>
            <input 
              type="number" 
              id="carbs"
              placeholder="Carbs (g)" 
              value={carbs} 
              onChange={(e) => setCarbs(parseInt(e.target.value) || '')} 
              min="0" /* Ensures the carbs can't be negative */
            />
          </div>
          <div className="form-row">
            <label htmlFor="fats">Fats (g):</label>
            <input 
              type="number" 
              id="fats"
              placeholder="Fats (g)" 
              value={fats} 
              onChange={(e) => setFats(parseInt(e.target.value) || '')} 
              min="0" /* Ensures the fats can't be negative */
            />
          </div>
          <button type="submit">Add Item</button>
        </form>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddItemModal;
