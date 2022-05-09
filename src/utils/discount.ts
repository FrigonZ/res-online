import { Discount } from '../entity/discount';
import { logError } from './logger';

let discounts: Discount[] = [];

export const setDiscounts = (targets: Discount[]) => {
  discounts = targets.sort((a, b) => b.standard - a.standard);
};

export const getDiscounts = () => discounts;

export const calcDiscount = (price: number): number => {
  const index = discounts.findIndex((discount) => discount.standard <= price);
  if (index === -1) return 0;

  return discounts[index].discount;
};

export const initDiscounts = async () => {
  try {
    const targets = await Discount.find();
    if (targets.length) {
      setDiscounts(targets);
    }
  } catch (error) {
    logError('utils.discount.init', error);
  }
};
