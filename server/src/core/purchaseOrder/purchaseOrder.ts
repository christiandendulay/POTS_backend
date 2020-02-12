import { TItem } from "./../item";
import { TSupplierStatus } from "./../supplierStatus";

export type TPurchaseOrder = {
  id?: string;
  externalID: string;
  status: string;
  supplierStatus?: [TSupplierStatus] | undefined;
  supplier: string;
  items?: [TItem] | undefined;
};

const createMakePurchaseOrder = () => ({
  externalID,
  status,
  supplierStatus,
  supplier,
  items
}): TPurchaseOrder => {
  if (!externalID) {
    throw new Error("External ID is required");
  }
  if (!status) {
    throw new Error("Status is required");
  }
  if (!supplier) {
    throw new Error("Supplier is required");
  }

  // const _items = items.map(item => makeItem(item));

  return {
    externalID: externalID,
    status: status,
    supplierStatus: supplierStatus,
    supplier: supplier,
    items: items
  };
};

export { createMakePurchaseOrder };
