import { IDBModel } from "../../commons/types";
import { SupplierStatus } from "../mongo-models";

const supplierStatusModel: IDBModel<any> = {
  insert: async supplierStatus => {
    const newSupplierStatus = await new SupplierStatus({
      status: supplierStatus.status,
      dateCreated: supplierStatus.dateCreated,
      poid: supplierStatus.poid
    });

    return new Promise((resolve, reject) => {
      newSupplierStatus.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  getById: async id => {
    const supplierStatus: any = await SupplierStatus.findOne({
      _id: id
    }).exec();
    if (!supplierStatus._id) {
      throw new Error("No supplierStatus found");
    }
    return {
      id: supplierStatus._id.toString(),
      status: supplierStatus.status,
      dateCreated: supplierStatus.dateCreated,
      poid: supplierStatus.poid
    };
  },

  getAll: async () => {
    const supplierStatus: any = await SupplierStatus.find({}).exec();

    return supplierStatus.map(ss => ({
      id: ss._id.toString(),
      status: ss.status,
      dateCreated: ss.dateCreated,
      poid: ss.poid
    }));
  },

  getAllByPO: async id => {
    const supplierStatus: any = await SupplierStatus.find({ poid: id }).exec();

    return supplierStatus.map(ss => ({
      id: ss._id.toString(),
      status: ss.status,
      dateCreated: ss.dateCreated,
      poid: ss.poid
    }));
  },

  deleteById: async id => {
    return new Promise((resolve, reject) => {
      SupplierStatus.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  updateById: async data => {
    const supplierStatus: any = await SupplierStatus.findByIdAndUpdate(
      {
        _id: data.id
      },
      {
        status: data.status,
        dateCreated: data.dateCreated
      },
      {
        new: true
      }
    ).exec();
    return {
      id: supplierStatus._id,
      status: supplierStatus.status,
      dateCreated: supplierStatus.dateCreated,
      poid: supplierStatus.poid
    };
  }
};

export { supplierStatusModel };
