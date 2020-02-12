import { makeItem } from "../item";

const createUCCreateItem = () => itemInput => {
  const item = makeItem({
    itemNo: itemInput.itemNo,
    description: itemInput.description,
    quantity: itemInput.quantity,
    uom: itemInput.uom,
    price: itemInput.price,
    currency: itemInput.currency,
    poid: itemInput.poid
  });

  return item;
};

export { createUCCreateItem };
