import React, { useState, FormEvent } from 'react';

const AddNewItem: React.FC<AddItemProps> = ({ addItem }) => {
  const [newItemProp, setNewItemProp] = useState<Partial<Item>>({});

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newItemProp.name && newItemProp.price) {
      const newlyCreatedItem: Item = {
        name: newItemProp.name,
        price: newItemProp.price,
        salesTax: newItemProp.salesTax,
        imported: newItemProp.imported,
      };
      addItem(newlyCreatedItem);
      setNewItemProp({ ...newItemProp, name: '', price: '', salesTax: false, imported: false });
    }
  };

  return (
    <form className="item-input-form">
      <h4>Add Custom Product</h4>
      <div className="inputs">
        <input
          type="text"
          value={newItemProp.name}
          onChange={(e) => setNewItemProp({ ...newItemProp, name: (e.target as HTMLInputElement).value || '' })}
          placeholder="Bottle of Wine"
        />
        <label htmlFor="newItemPrice">
          <input
            type="text"
            name="newItemPrice"
            onChange={(e) => setNewItemProp({ ...newItemProp, price: (e.target as HTMLInputElement).value })}
            placeholder="15.99"
            value={newItemProp.price}
          />
        </label>
      </div>
      <div className="checkboxes">
        <label htmlFor="newItemSalesTax">
          Sales Tax{' '}
          <input
            type="checkbox"
            checked={newItemProp.salesTax}
            name="newItemSalesTax"
            onChange={(e) => setNewItemProp({ ...newItemProp, salesTax: e.target.checked })}
          />
        </label>
        <label htmlFor="newItemImported">
          Import Tax{' '}
          <input
            type="checkbox"
            name="newItemImported"
            checked={newItemProp.imported}
            onChange={(e) => setNewItemProp({ ...newItemProp, imported: e.target.checked })}
          />
        </label>
      </div>
      <button className="add-item-button" type="submit" onClick={handleSubmit}>
        <h4>Add Product</h4>
      </button>
    </form>
  );
};

export default AddNewItem;
