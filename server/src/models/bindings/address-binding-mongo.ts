import { IDBModel } from "../../commons/types";
import { Address } from "../mongo-models";

const addressModel: IDBModel<any> = {
  insert: async add => {},
  getById: async id => {
    const add: any = await Address.findOne({ _id: id }).exec();
    if (!add._id) {
      throw new Error("No address found");
    }
    return add;
  },
  getAll: async () => {
    const address: any = await Address.find({}).exec();

    return address.map(u => ({
      id: u._id.toString(),
      building_name: u.building_name,
      street: u.street,
      city: u.city,
      state: u.state,
      zip_code: u.zip_code
    }));
  },

  getAllByPO: async id => {},

  deleteById: async id => {},
  updateById: async id => {}
};

export { addressModel };
