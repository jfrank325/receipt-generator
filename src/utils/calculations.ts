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
          ? round((+item.price * salesTaxRate + +item.price * importTaxRate).toString())
          : item.salesTax && !item.imported
          ? round((+item.price * salesTaxRate).toString())
          : !item.salesTax && item.imported
          ? round((+item.price * importTaxRate).toString())
          : '0',
    };
  }
};

export const getTotalWithTax = (item: Item) => {
  if (item && item.totalTax)
    return {
      ...item,
      totalWithTax: item.totalWithTax = round((+item.price + +item.totalTax).toString()),
    };
};

export const addValues = (item: Item) => {
  getTaxForItem(item);
  getTotalWithTax(item);
};

export const addAllTaxes = (items: Items) => {
  const taxes = items.map((item) => item.totalTax);
  return taxes.reduce((a, b) => a && b && String(+a + +b));
};

export const getTotal = (items: Items) => {
  const totals = items.map((item) => item.totalWithTax);
  return totals.reduce((a, b) => a && b && String(+a + +b));
};
