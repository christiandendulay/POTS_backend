import { IDBModel } from '../../commons/types';
import { gsModels } from '../gs-models/models-gs';

const purchaseOrderGs: IDBModel<any> = {
  insert: async suppstat => {},
  getById: async id => {
    const models = await gsModels();
    const po = models.purchaseOrder.getById(id);
    // const su = models.supplier.getById(id);
    // const it = models.item.getById(id);
    // const vendorAddress = models.address.get({ address: po.address }).__metadata
    //   .uid;
    // const Supplier = models.supplier.get({ supplier: su.supplier }).__metadata;
    // const item = models.item.get({ item: it.item }).__metadata;
    return {
      purchaseOrderNo: po.purchaseOrderNo,
      shipmentNo: po.shipmentNo,
      adminStatus: po.adminStatus,
      supplierStatusHeader: po.supplierStatusHeader,
      documentDate: po.documentDate,
      postingDate: po.postingDate,
      // vendorAddress: vendorAddress,
      // supplier: Supplier,
      // items: item,
      id: po.__metadata.uid,
    };
  },
  getAll: async () => {
    const models = await gsModels();

    console.log('PO', models.purchaseOrder.getAll());
    const po: Array<any> = models.purchaseOrder.getAll().map(po => {
      const vendorAddress = models.vendorAddress.get({
        vendorAddress: po.vendorAddress,
        purchaseOrderNo: po.purchaseOrderNo,
      }).__metadata.uid;

      console.log('Supplier', po.supplierNo, po.supplierName);
      const supplier = models.supplier.get({
        supplierNo: po.supplierNo,
        supplierName: po.supplierName,
      }).__metadata.uid;

      console.log('Items', models.item.getAll());
      const item: Array<any> = models.item
        .getAll()
        .filter(x => po.purchaseOrderNo == x.purchaseOrderNo)
        .map(po => po.__metadata.uid);

      console.log('items', item);
      return {
        purchaseOrderNo: po.purchaseOrderNo,
        shipmentNo: po.shipmentNo,
        adminStatus: po.adminStatus,
        supplierStatusHeader: po.supplierStatusHeader,
        documentDate: po.documentDate,
        postingDate: po.postingDate,
        vendorAddress: vendorAddress,
        supplier: supplier,
        items: item,
        id: po.__metadata.uid,
      };
    });
    return po;
  },

  getAllByItem: async id => {
    const models = await gsModels();

    const getScheduleLine = item => {
      return models.scheduleLine
        .getAll()
        .filter(
          x =>
            x.purchaseOrderNo === item.purchaseOrderNo &&
            x.itemNo === item.itemNo &&
            x.productId == item.productId,
        )
        .map(sl => {
          return sl.__metadata.uid;
        });
    };

    // return models.item
    //   .getAll()
    //   .filter(x => id.map(i => i === x.__metadata.uid))
    //   .map(itemz => {
    //     const deliveryAddress = models.item.get({
    //       itemNo: itemz.itemNo,
    //       productId: itemz.productId,
    //     }).deliveryAddress;
    //     return {
    //       itemNo: itemz.itemNo,
    //       productId: itemz.productId,
    //       description: itemz.description,
    //       quantity: itemz.quantity,
    //       uom: itemz.uom,
    //       unitPrice: itemz.unitPrice,
    //       totalAmount: itemz.totalAmount,
    //       discount: itemz.discount,
    //       deliveryAddress: deliveryAddress,
    //       supplierStatusItem: itemz.supplierStatusItem,
    //       scheduleLine: getScheduleLine(itemz),
    //       currency: itemz.currency,
    //       dateUpdated: itemz.dateUpdated,
    //       timeUpdated: itemz.timeUpdated,
    //       id: itemz.__metadata.uid,
    //     };
    //   });

    const items: Array<any> = id.map(i => models.item.getById(i));

    return items.map(itemz => {
      const deliveryAddress = models.deliveryAddress.get({
        itemNo: itemz.itemNo,
        productId: itemz.productId,
      }).__metadata.uid;
      return {
        itemNo: itemz.itemNo,
        productId: itemz.productId,
        description: itemz.description,
        quantity: itemz.quantity,
        uom: itemz.uom,
        unitPrice: itemz.unitPrice,
        totalAmount: itemz.totalAmount,
        discount: itemz.discount,
        deliveryAddress: deliveryAddress,
        supplierStatusItem: itemz.supplierStatusItem,
        scheduleLine: getScheduleLine(itemz),
        currency: itemz.currency,
        dateUpdated: itemz.dateUpdated,
        timeUpdated: itemz.timeUpdated,
        id: itemz.__metadata.uid,
      };
    });
  },
  getAllBySupplierStatus: async id => {},
  getAllByScheduleLine: async data => {},
  updateSupplierStatusItemById: async id => {},
  updateAdminStatusPurchaseOrderById: async id => {},
  deleteById: async id => {},
  updateById: async id => {},
};

export { purchaseOrderGs };
