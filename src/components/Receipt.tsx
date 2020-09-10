import React from 'react';
import ReceiptItem from './ReceiptItem';
import { addValues, addAllTaxes, getTotal } from '../utils/calculations';

interface ReceiptProps {
  receiptItems: Array<Item>;
  removeFromReceipt: RemoveFromReceipt;
}

interface ObjArray {
  [index: number]: Object;
}

const Receipt: React.FC<ReceiptProps> = ({ receiptItems, removeFromReceipt }) => {
  let receipt: Receipt = {
    receiptItems: receiptItems,
  };

  receipt.receiptItems!.map((item) => addValues(item));

  if (receiptItems.length > 0) {
    receipt.salesTaxes = addAllTaxes(receipt.receiptItems!);
    receipt.total = getTotal(receipt.receiptItems!);
  }

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
