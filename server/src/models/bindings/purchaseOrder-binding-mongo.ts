import { IDBModel } from "../../commons/types";
import { PurchaseOrder, SupplierStatus, Supplier, Item } from "../mongo-models";

const purchaseOrderModel: IDBModel<any> = {
  insert: async purchaseOrder => {
    const newPO = await new PurchaseOrder({
      externalID: purchaseOrder.externalID,
      status: purchaseOrder.status,
      supplierStatus: purchaseOrder.supplierStatus,
      supplier: purchaseOrder.supplier,
      items: purchaseOrder.items
    });

    return new Promise((resolve, reject) => {
      newPO.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  getAll: async () => {
    const po: any = await PurchaseOrder.find({}).exec();

    return po.map(u => ({
      id: u._id.toString(),
      externalID: u.externalID,
      status: u.status,
      supplierStatus: u.supplierStatus.toString(),
      supplier: u.supplier.toString(),
      items: u.toString()
    }));
  },

  getById: async id => {
    const u: any = await PurchaseOrder.findOne({ _id: id }).exec();

    return {
      id: u._id.toString(),
      externalID: u.externalID,
      status: u.status,
      supplierStatus: u.supplierStatus.toString(),
      supplier: u.supplier.toString(),
      items: u.items.toString()
    };
  },

  getAllByPO: async id => {},

  deleteById: async id => {
    return new Promise((resolve, reject) => {
      PurchaseOrder.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },
  updateById: async purchaseOrder => {
    return new Promise((resolve, reject) => {
      PurchaseOrder.findByIdAndUpdate(
        { _id: purchaseOrder.id },
        { $set: { ...purchaseOrder } },
        { new: true }
      ).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};

export { purchaseOrderModel };
