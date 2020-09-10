import { salesTaxRate, importTaxRate } from '../constants';

export const round: Round = (str) => {
  let cents = Math.round(+str.split('.')[1] / 5) * 5;
  let dollars = +str.split('.')[0];
  if (cents === 100) {
    dollars += 1;
    cents = 0;
  }
  return (+`${dollars}.${cents}`).toFixed(2);
};

export const getTaxForItem = (item: Item) => {
  if (item) {
    return {
      ...item,
      totalTax: item.totalTax =
        item.salesTax && item.imported
          ? (+round(String(+round(String(+item.price * salesTaxRate)) + +round(String(+item.price * importTaxRate)))))
              .toFixed(2)
              .toString()
          : item.salesTax && !item.imported
          ? (+round(String(+item.price * salesTaxRate))).toFixed(2).toString()
          : !item.salesTax && item.imported
          ? (+round(String(+item.price * importTaxRate))).toFixed(2).toString()
          : '0',
    };
  }
};

export const getTotalWithTax = (item: Item) => {
  if (item && item.totalTax)
    return {
      ...item,
      totalWithTax: item.totalWithTax = (+item.price + +item.totalTax).toFixed(2).toString(),
    };
};

export const getMultipleTotal = (item: Item) => {
  if (item.count! > 1) {
    item.multipleTotal = String((+item.totalWithTax! * item.count!).toFixed(2));
  }
};

export const addValues = (item: Item) => {
  getTaxForItem(item);
  getTotalWithTax(item);
  getMultipleTotal(item);
};

export const addAllTaxes = (items: Items) => {
  const taxes = items.map((item) => item.totalTax);
  return taxes.reduce((a, b) => a && b && String(+a + +b), '0');
};

export const getTotal = (items: Items) => {
  const totals = items.map((item) => item.totalWithTax);
  return totals.reduce((a, b) => a && b && String(+a + +b), '0');
};
