import React from 'react';
import PurchaseItem from './PurchaseItem';

interface ItemsProps {
  items: Array<Item>;
  addToReceipt: AddToReceipt;
}

const PurchaseItems: React.FC<ItemsProps> = ({ items, addToReceipt }) => {
  return (
    <div>
      <ul>
        {items.map((item, i) => (
          <PurchaseItem key={i} item={item} addToReceipt={addToReceipt} />
        ))}
      </ul>
    </div>
  );
};

export default PurchaseItems;
