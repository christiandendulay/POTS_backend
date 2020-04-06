import { IDBModel } from '../../commons/types';
import { gsModels } from '../gs-models/models-gs';

const addressGs: IDBModel<any> = {
  insert: async add => {},
  getById: async id => {
    const models = await gsModels();
    let a = models.vendorAddress.getById(id);

    if (a) {
      console.log('vendorAddress', a);
      return {
        building_name: a.vendorAddress,
        street: a.vendorAddress,
        city: a.vendorAddress,
        state: a.vendorAddress,
        zip_code: a.vendorAddress,
        id: a.__metadata.uid,
      };
    }

    if (!a) {
      a = models.deliveryAddress.getById(id);
      console.log('deliveryaddress', a);
      return {
        building_name: a.deliveryAddress,
        street: a.deliveryAddress,
        city: a.deliveryAddress,
        state: a.vendorAddress,
        zip_code: a.deliveryAddress,
        id: a.__metadata.uid,
      };
    }

    if (!a) {
      a = models.address.getById(id);
      console.log('address', a);
      return {
        building_name: a.address,
        street: a.address,
        city: a.address,
        state: a.address,
        zip_code: a.address,
        id: a.__metadata.uid,
      };
    }
  },
  getAll: async () => {
    const models = await gsModels();
    console.log('address', models.vendorAddress.getAll());
    const add: Array<any> = models.vendorAddress.getAll().map((a, idx) => {
      return {
        building_name: a.address,
        street: a.address,
        city: a.address,
        state: a.address,
        zip_code: a.address,
        id: a.__metadata.uid,
      };
    });
    return add;
  },

  getAllByItem: async id => {},
  getAllBySupplierStatus: async id => {},
  getAllByScheduleLine: async data => {},
  updateSupplierStatusItemById: async id => {},
  updateAdminStatusPurchaseOrderById: async id => {},
  deleteById: async id => {},
  updateById: async id => {},
};

export { addressGs };
