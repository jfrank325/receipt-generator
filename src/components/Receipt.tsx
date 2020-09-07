import React from 'react';
import ReceiptItem from './ReceiptItem';
import { addValues, addAllTaxes, getTotal } from '../utils/calculations';

interface ReceiptProps {
  receiptItems: Array<Item>;
  multiples: Array<Item>;
  removeFromReceipt: RemoveFromReceipt;
}

const Receipt: React.FC<ReceiptProps> = ({ receiptItems, multiples, removeFromReceipt }) => {
  let receipt: Receipt = {
    receiptItems: receiptItems,
    multipleItems: multiples,
  };

  receipt.receiptItems!.map((item) => addValues(item));
  receipt.multipleItems!.map((item) => addValues(item));

  if (receiptItems.length > 0) {
    receipt.salesTaxes = addAllTaxes(receipt.receiptItems!);
    receipt.total = getTotal(receipt.receiptItems!);
  }

  return (
    <div>
      <ul>
        {receipt.receiptItems!.map(
          (item, i) => item?.totalWithTax && <ReceiptItem key={i} item={item} removeFromReceipt={removeFromReceipt} />
        )}
      </ul>
      {receipt.multipleItems &&
        receipt.multipleItems.map((item) => (
          <h3>
            {item.name}:{item.totalWithTax}
          </h3>
        ))}
      {receipt.salesTaxes && <h4>Sales Taxes: {(+receipt.salesTaxes).toFixed(2)}</h4>}
      {receipt.total && <h4>Total: {(+receipt.total).toFixed(2)}</h4>}
    </div>
  );
};

export default Receipt;
