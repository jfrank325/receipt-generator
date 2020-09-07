import React from 'react';

interface ItemProps {
  item: Item;
  addToReceipt: AddToReceipt;
}

const PurchaseItem: React.FC<ItemProps> = ({ item, addToReceipt }) => {
  const { name, price } = item;

  const handleClick = (item: Item) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault();
    if (EventTarget !== null) {
      addToReceipt(item);
    }
  };

  return (
    <li onClick={handleClick(item)}>
      <h3>
        1 {name} at {price}
      </h3>
    </li>
  );
};

export default PurchaseItem;
