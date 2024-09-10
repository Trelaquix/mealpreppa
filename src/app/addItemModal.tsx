"use client";
import React, { useEffect, useState, useRef } from 'react';
import { FoodItem } from './types';

interface AddItemModalProps {
  onClose: () => void;
  onSubmit: (newItem: FoodItem) => void;
}

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
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

  // const modalRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   // Attach the event listener for clicks
  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     // Remove the event listener when the component is unmounted
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const newItem: FoodItem = {
        name,
        brand,
        price: price !== '' ? Number(price) : 0,
        weight: weight !== '' ? Number(weight) : 0,
        calories: calories !== '' ? Number(calories) : undefined,
        protein: protein !== '' ? Number(protein) : undefined,
        carbs: carbs !== '' ? Number(carbs) : undefined,
        fats: fats !== '' ? Number(fats) : undefined,
      };

      onSubmit(newItem);

      console.log('Item added successfully!');

      onClose();
  
    } catch (error) {
      console.error('Error adding item:', error);
      alert('There was an error saving the item. Please try again later.');
    }
  };

  function InputField({ label, type, id, placeholder, value, onChange, required, min }: InputFieldProps) {
    return (
      <div className="add-item-form-row">
        <label htmlFor={id}>{label}:</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          min={min}
        />
      </div>
    );
  }

  return (
    <div className="add-item-modal">
      <div className="add-item-modal-content">
        <span className="close-icon" onClick={onClose} aria-label="Close">&times;</span>
        <div className="add-item-modal-title">
          <h2>Add Item</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <InputField label="Name" type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <InputField label="Brand" type="text" id="brand" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <InputField label="Price ($)" type="number" id="price" placeholder="Price ($)" value={price} onChange={(e) => setPrice(isNaN(parseFloat(e.target.value)) ? '' : parseFloat(e.target.value))} required min={0} />
          <InputField label="Weight (Kg)" type="number" id="weight" placeholder="Weight (Kg)" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || '')} required min={0} />
          <InputField label="Calories (Kcal)" type="number" id="calories" placeholder="Calories (Kcal)" value={calories} onChange={(e) => setCalories(parseInt(e.target.value) || '')} required min={0} />
          <InputField label="Protein (g)" type="number" id="protein" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(parseInt(e.target.value) || '')} min={0} />
          <InputField label="Carbs (g)" type="number" id="carbs" placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(parseInt(e.target.value) || '')} min={0} />
          <InputField label="Fats (g)" type="number" id="fats" placeholder="Fats (g)" value={fats} onChange={(e) => setFats(parseInt(e.target.value) || '')} min={0} />
  
          <button type="submit" className="submit-button">Add Item</button>
        </form>
        <button type="button" onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default AddItemModal;
