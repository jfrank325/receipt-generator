import React from 'react';

interface ReceiptProps {
  item: Item;
  removeFromReceipt: RemoveFromReceipt;
}

const ReceiptItem: React.FC<ReceiptProps> = ({ item, removeFromReceipt }) => {
  const { name, totalWithTax } = item;
  const handleClick = (item: Item) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault();
    if (EventTarget !== null) {
      removeFromReceipt(item);
    }
  };
  return (
    <div>
      <li onClick={handleClick(item)}>
        <h3>
          {name}: {totalWithTax}
        </h3>
      </li>
    </div>
  );
};

export default ReceiptItem;
