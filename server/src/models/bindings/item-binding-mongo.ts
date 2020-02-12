import { IDBModel } from "../../commons/types";
import { Item } from "../mongo-models";

const itemModel: IDBModel<any> = {
  insert: async item => {
    const newItem = await new Item({
      itemNo: item.itemNo,
      description: item.description,
      quantity: item.quantity,
      uom: item.uom,
      price: item.price,
      currency: item.currency
    });

    return new Promise((resolve, reject) => {
      newItem.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  getById: async id => {
    const item: any = await Item.findOne({ _id: id }).exec();
    if (!item._id) {
      throw new Error("No item found");
    }
    return {
      id: item._id.toString(),
      itemNo: item.itemNo,
      description: item.description,
      quantity: item.quantity,
      uom: item.uom,
      price: item.price,
      currency: item.currency
    };
  },

  getAll: async () => {
    const item: any = await Item.find({}).exec();

    return item.map(i => ({
      id: i._id.toString(),
      itemNo: i.itemNo,
      description: i.description,
      quantity: i.quantity,
      uom: i.uom,
      price: i.price,
      currency: i.currency
    }));
  },

  getAllByItem: async id => {
    const item: any = await Item.find({ _id: { $in: id } }).exec();

    return item.map(i => ({
      id: i._id.toString(),
      itemNo: i.itemNo,
      description: i.description,
      quantity: i.quantity,
      uom: i.uom,
      price: i.price,
      currency: i.currency
    }));
  },

  getAllBySupplierStatus: async id => {},

  deleteById: async id => {
    return new Promise((resolve, reject) => {
      Item.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  updateById: async data => {
    const item: any = await Item.findByIdAndUpdate(
      {
        _id: data.id
      },
      {
        itemNo: data.itemNo,
        description: data.description,
        quantity: data.quantity,
        uom: data.uom,
        price: data.price,
        currency: data.currency
      },
      {
        new: true
      }
    ).exec();
    return {
      id: item._id,
      itemNo: item.itemNo,
      description: item.description,
      quantity: item.quantity,
      uom: item.uom,
      price: item.price,
      currency: item.currency
    };
  }
};

export { itemModel };
