import React from 'react';

const ReceiptItem: React.FC<ReceiptItemProps> = ({ item, removeFromReceipt }) => {
  const { name, totalWithTax, multipleTotal, count } = item;

  //Removes item from receipt
  const handleClick = (item: Item) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault();
    if (EventTarget !== null) {
      removeFromReceipt(item);
    }
  };

  return (
    <div>
      <li onClick={handleClick(item)}>
        {count! > 1 ? (
          //Format for a item that's been selected multiple times.
          <h3>
            {name}: {multipleTotal} ({count} @ {totalWithTax})
          </h3>
        ) : (
          //Format for an item that's been selected once.
          <h3>
            {name}: {totalWithTax}
          </h3>
        )}
      </li>
    </div>
  );
};

export default ReceiptItem;
