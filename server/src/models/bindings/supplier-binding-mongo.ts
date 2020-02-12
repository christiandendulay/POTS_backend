import { IDBModel } from "../../commons/types";
import { Supplier, Address } from "../mongo-models";

const supplierModel: IDBModel<any> = {
  insert: async supplier => {
    const newAddress = await new Address({
      building_name: supplier.address.building_name,
      street: supplier.address.street,
      city: supplier.address.city,
      state: supplier.address.state,
      zip_code: supplier.address.zip_code
    });

    const newAdd: any = await new Promise((resolve, reject) => {
      newAddress.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
    const newSupp = await new Supplier({
      name: supplier.name,
      address: newAdd._id.toString()
    });

    const newSupplier: any = await new Promise((resolve, reject) => {
      newSupp.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });

    return {
      id: newSupplier._id,
      name: newSupplier.name,
      address: newSupplier.address
    };
  },

  getById: async id => {
    const supp: any = await Supplier.findOne({ _id: id }).exec();
    if (!supp._id) {
      throw new Error("No supplier found");
    }
    return {
      id: supp._id.toString(),
      name: supp.name,
      address: supp.address
    };
  },

  getAll: async () => {
    const supp: any = await Supplier.find({}).exec();
    return supp.map(u => ({
      id: u._id.toString(),
      name: u.name,
      address: u.address
    }));
  },

  getAllByPO: async id => {},

  deleteById: async id => {
    return new Promise((resolve, reject) => {
      Supplier.findByIdAndDelete(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  },

  updateById: async data => {
    const supplier: any = await Supplier.findByIdAndUpdate(
      {
        _id: data.id
      },
      {
        name: data.name
        // address: data.address,
      },
      {
        new: true
      }
    ).exec();
    return {
      id: supplier._id,
      name: supplier.name
      // address: supplier.address,
    };
  }
};

export { supplierModel };
