import React, { useState } from 'react';
import './App.scss';
import PurchaseItems from './components/PurchaseItems';
import AddNewItem from './components/AddNewItem';
import Receipt from './components/Receipt';

//Original list of items
const initialItems: Array<Item> = [
  { name: 'Book', price: '12.49' },
  { name: 'Music CD', price: '14.99', salesTax: true },
  { name: 'Chocolate bar', price: '0.85' },
  { name: 'Imported box of chocolates', price: '10.00', imported: true },
  { name: 'Imported bottle of perfume', price: '47.50', imported: true, salesTax: true },
  { name: 'Imported bottle of perfume', price: '27.99', imported: true, salesTax: true },
  { name: 'Packet of headache pills', price: '9.75' },
  { name: 'Imported box of chocolates', price: '11.25', imported: true },
  { name: 'Imported bottle of perfume', price: '47.50', imported: true, salesTax: true },
  { name: 'Book', price: '11.25' },
  { name: 'Bottle of perfume', price: '18.99', salesTax: true },
];

const App: React.FC = () => {
  //State of original list of items with any added items.
  const [items, setItems] = useState(initialItems);
  //State of items on the receipt.
  const [receiptItems, setReceiptItems] = useState<Items>([]);

  //Adds new items to orginal items list.
  const addItem: AddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  //Adds items to the receipt & and add to the current count of each item.
  const addToReceipt: AddToReceipt = (newItem) => {
    setReceiptItems([...receiptItems, newItem]);
    newItem.count =
      [...receiptItems].filter((item) => item.name === newItem.name && item.price === newItem.price).length + 1;
  };

  //Removes items from receipt.
  const removeFromReceipt: RemoveFromReceipt = (item) => {
    setReceiptItems([...receiptItems].filter((el) => item !== el));
  };

  return (
    <div className="register-wrapper">
      <div className="products-wrapper">
        {/* List of original items. */}
        <h1>Products</h1>
        <PurchaseItems items={items} addToReceipt={addToReceipt} />
        {/* Input for new items. */}
        <AddNewItem addItem={addItem} />
      </div>
      <div className="receipt-wrapper">
        <h1>Receipt</h1>
        <Receipt receiptItems={receiptItems} removeFromReceipt={removeFromReceipt} />
      </div>
    </div>
  );
};

export default App;
