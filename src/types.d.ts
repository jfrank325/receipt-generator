type Item = {
  name: string;
  price: string;
  salesTax?: boolean = false;
  imported?: boolean = false;
  totalTax?: string;
  totalWithTax?: string;
  [index: number]: boolean;
  count?: number = 1;
  multipleTotal?: string;
};

type Items = Array<Item>;

type Receipt = {
  receiptItems?: Items;
  multipleItems?: Items;
  allItems?: Items;
  salesTaxes?: string;
  total?: string;
};

type AddItem = (newItem: Item) => void;

type AddToReceipt = (newItem: Item) => void;

type RemoveFromReceipt = (Item) => void;

type AddTax = (item: Item) => Item;

type Round = (string: string) => string;
