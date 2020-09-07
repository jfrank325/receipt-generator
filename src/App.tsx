import React, { useState } from 'react';
import './App.scss';
import PurchaseItems from './components/PurchaseItems';
import AddNewItem from './components/AddNewItem';
import Receipt from './components/Receipt';

const initialItems: Array<Item> = [
  { name: 'Book', price: '12.49' },
  { name: 'Book', price: '12.49' },
  { name: 'Music CD', price: '16.49', salesTax: true, imported: false },
  { name: 'Chocolate bar', price: '0.85' },
  { name: 'Imported box of chocolates', price: '10.00', imported: true },
  { name: 'Imported bottle of perfume', price: '47.50', imported: true, salesTax: true },
  { name: 'Imported bottle of perfume', price: '27.99', imported: true, salesTax: true },
  { name: 'Packet of headache pills', price: '9.75' },
  { name: 'Imported box of chocolates', price: '11.25', imported: true },
  { name: 'Imported bottle of perfume', price: '47.50', imported: true, salesTax: true },
  { name: 'Book', price: '11.25' },
];

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const [receiptItems, setReceiptItems] = useState<Items>([]);
  const [multiples, setMultiples] = useState<Items>([]);

  const addItem: AddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const addToReceipt: AddToReceipt = (newItem) => {
    if (receiptItems.includes(newItem)) {
      setMultiples([...multiples, newItem]);
    } else {
      setReceiptItems([...receiptItems, newItem]);
    }
  };

  const removeFromReceipt: RemoveFromReceipt = (item) => {
    setReceiptItems(receiptItems.splice(item, 1));
  };

  return (
    <div className="register-wrapper">
      <div>
        <PurchaseItems items={items} addToReceipt={addToReceipt} />
        <AddNewItem addItem={addItem} />
      </div>

      <Receipt receiptItems={receiptItems} multiples={multiples} removeFromReceipt={removeFromReceipt} />
    </div>
  );
};

export default App;
