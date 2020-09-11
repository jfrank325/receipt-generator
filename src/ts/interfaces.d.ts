interface ReceiptProps {
  receiptItems: Items;
  removeFromReceipt: RemoveFromReceipt;
}

interface ReceiptItemProps {
  item: Item;
  removeFromReceipt: RemoveFromReceipt;
}

interface ItemsProps {
  items: Array<Item>;
  addToReceipt: AddToReceipt;
}

interface ItemProps {
  item: Item;
  addToReceipt: AddToReceipt;
}

interface AddItemProps {
  addItem: AddItem;
}
