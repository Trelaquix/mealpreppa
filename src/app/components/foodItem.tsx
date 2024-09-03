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
  
  const FoodItem = ({ item }: { item: FoodItem }) => {
    return (
      <div>
        <h3>{item.name}</h3>
        <p>Brand: {item.brand || 'N/A'}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Weight: {item.weight}g</p>
        {item.calories && <p>Calories: {item.calories}</p>}
        {item.protein && <p>Protein: {item.protein}g</p>}
        {item.carbs && <p>Carbs: {item.carbs}g</p>}
        {item.fats && <p>Fats: {item.fats}g</p>}
      </div>
    );
  };
  
  export default FoodItem;