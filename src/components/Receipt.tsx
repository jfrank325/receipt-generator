import React from 'react';
import ReceiptItem from './ReceiptItem';
import { addValues, addAllTaxes, getTotal } from '../utils/calculations';

const Receipt: React.FC<ReceiptProps> = ({ receiptItems, removeFromReceipt }) => {
  let receipt: Receipt = {
    receiptItems: receiptItems,
  };

  //Adds tax, total with tax, and if applicable the total of the same item selected multiple times to each item.
  receipt.receiptItems!.map((item) => addValues(item));

  //Calculates the total and tax total for receipt once items are selected.
  if (receiptItems.length > 0) {
    receipt.salesTaxes = addAllTaxes(receipt.receiptItems!);
    receipt.total = getTotal(receipt.receiptItems!);
  }

  //Makes sure that only unique items are added to receipt. If a item is selected multiple times it will be displayed as a multiple item.
  const uniqueItems = [...new Set([...receiptItems])];

  return (
    <div>
      <ul>
        {uniqueItems!.map(
          (item, i) => item?.totalWithTax && <ReceiptItem key={i} item={item} removeFromReceipt={removeFromReceipt} />
        )}
      </ul>
      {receipt.salesTaxes && <h4>Sales Taxes: {(+receipt.salesTaxes).toFixed(2)}</h4>}
      {receipt.total && <h4>Total: {(+receipt.total).toFixed(2)}</h4>}
    </div>
  );
};

export default Receipt;
