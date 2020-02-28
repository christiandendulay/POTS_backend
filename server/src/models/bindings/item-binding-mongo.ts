import { IDBModel } from "../../commons/types";
import moment from "moment";
import { Item, Address, SupplierStatus } from "../mongo-models";
import { networkInterfaces } from "os";

const itemModel: IDBModel<any> = {
  insert: async item => {
    const newAddress = await new Address({
      building_name: item.deliveryAddress.building_name,
      street: item.deliveryAddress.street,
      city: item.deliveryAddress.city,
      state: item.deliveryAddress.state,
      zip_code: item.deliveryAddress.zip_code
    });

    const newAdd: any = await new Promise((resolve, reject) => {
      newAddress.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });

    const newItem = await new Item({
      itemNo: item.itemNo,
      productId: item.productId,
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      uom: item.uom,
      unitPrice: item.unitPrice,
      deliveryAddress: newAdd._id.toString(),
      deliveryDate: item.deliveryDate,
      supplierStatus: item.supplierStatus,
      currency: item.currency,
      dateUpdated: item.dateUpdated,
      timeUpdated: item.timeUpdated
    });

    const newI: any = await new Promise((resolve, reject) => {
      newItem.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });

    return {
      id: newI._id,
      itemNo: newI.itemNo,
      productId: newI.productId,
      description: newI.description,
      quantity: newI.quantity,
      totalAmount: newI.totalAmount,
      uom: newI.uom,
      unitPrice: newI.unitPrice,
      deliveryAddress: newI.deliveryAddress,
      deliveryDate: newI.deliveryDate,
      supplierStatus: newI.supplierStatus,
      currency: newI.currency,
      dateUpdated: newI.dateUpdated,
      timeUpdated: newI.timeUpdated
    };
  },

  getById: async id => {
    const item: any = await Item.findOne({ _id: id }).exec();
    if (!item._id) {
      throw new Error("No item found");
    }
    return {
      id: item._id.toString(),
      productId: item.productId,
      itemNo: item.itemNo,
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      uom: item.uom,
      unitPrice: item.unitPrice,
      deliveryAddress: item.deliveryAddress,
      deliveryDate: item.deliveryDate,
      supplierStatus: item.supplierStatus,
      currency: item.currency,
      dateUpdated: item.dateUpdated,
      timeUpdated: item.timeUpdated
    };
  },

  getAll: async () => {
    const item: any = await Item.find({}).exec();
    return item.map(item => ({
      id: item._id.toString(),
      itemNo: item.itemNo,
      productId: item.productId,
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      uom: item.uom,
      unitPrice: item.unitPrice,
      deliveryAddress: item.deliveryAddress,
      deliveryDate: item.deliveryDate,
      supplierStatus: item.supplierStatus,
      currency: item.currency,
      dateUpdated: item.dateUpdated,
      timeUpdated: item.timeUpdated
    }));
  },

  getAllByItem: async data => {},

  getAllBySupplierStatus: async data => {
    const supplierStatus: any = await SupplierStatus.find({
      _id: { $in: data }
    }).exec();

    return supplierStatus.map(ss => ({
      id: ss._id.toString(),
      status: ss.status,
      dateCreated: ss.dateCreated,
      timeCreated: ss.timeCreated
    }));
  },

  deleteById: async id => {
    return new Promise((resolve, reject) => {
      Item.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  updateById: async data => {
    let setFields = {
      ...data,
      dateUpdated: moment().format("YYYY-MM-DD"),
      timeUpdated: moment().format("LTS")
    };
    for (let prop in setFields) {
      if (setFields[prop] == undefined) {
        delete setFields[prop];
      }
    }
    delete setFields.supplierStatus;
    const supplierStatus = data.supplierStatus;

    let item;
    if (supplierStatus) {
      item = await Item.findByIdAndUpdate(
        {
          _id: data.id
        },
        { $set: { ...setFields }, $push: { supplierStatus: supplierStatus } },
        {
          new: true
        }
      ).exec();
    } else {
      item = await Item.findByIdAndUpdate(
        {
          _id: data.id
        },
        setFields,
        {
          new: true
        }
      ).exec();
    }
    console.log(item);
    return {
      id: item._id.toString(),
      productId: item.productId,
      itemNo: item.itemNo,
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      uom: item.uom,
      unitPrice: item.unitPrice,
      deliveryAddress: item.deliveryAddress,
      deliveryDate: item.deliveryDate,
      supplierStatus: item.supplierStatus,
      currency: item.currency,
      dateUpdated: item.dateUpdated,
      timeUpdated: item.timeUpdated
    };
  }
};

export { itemModel };
