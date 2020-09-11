import { salesTaxRate, importTaxRate } from '../constants';

//Function to round the tax of each product.
export const round: Round = (str) => {
  let cents = str.split('.')[1];
  let rounder = cents.length === 3 ? 50 : cents.length === 4 ? 500 : 5;
  let roundedCents = +(Math.ceil(+cents / rounder) * rounder).toFixed(2);
  let dollars = +str.split('.')[0];
  if (+roundedCents === 100) {
    dollars += 1;
    roundedCents = 0;
  }
  return (+`${dollars}.${+roundedCents}`).toFixed(2);
};

//Calculates the total tax for each product based on applicable taxes.
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
          : item.imported && !item.salesTax
          ? (+round(String(+item.price * importTaxRate))).toFixed(2).toString()
          : '0',
    };
  }
};

//Adds the calculated tax with the price.
export const getTotalWithTax = (item: Item) => {
  if (item && item.totalTax)
    return {
      ...item,
      totalWithTax: item.totalWithTax = (+item.price + +item.totalTax).toFixed(2).toString(),
    };
};

//Adds the total of items that have been selected multiple times.
export const getMultipleTotal = (item: Item) => {
  if (item.count! > 1) {
    item.multipleTotal = String((+item.totalWithTax! * item.count!).toFixed(2));
  }
};

//Performs all previous actions in one call.
export const addValues = (item: Item) => {
  getTaxForItem(item);
  getTotalWithTax(item);
  getMultipleTotal(item);
};

//Calculates total taxes for all items on receipt.
export const addAllTaxes = (items: Items) => {
  const taxes = items.map((item) => item.totalTax);
  return taxes.reduce((a, b) => a && b && String(+a + +b), '0');
};

//Calculates total for all items including tax on receipt.
export const getTotal = (items: Items) => {
  const totals = items.map((item) => item.totalWithTax);
  return totals.reduce((a, b) => a && b && String(+a + +b), '0');
};
