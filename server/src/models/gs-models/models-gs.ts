import {
  createSchema,
  createModel,
  createModelsFromBaseModel,
  sheep,
} from 'gsheeez';

import { MD5 } from 'crypto-js';

import { google } from 'googleapis';

export const gsModels = async () => {
  sheep.configure({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    tokenPath: 'token.json',
    credsPath: 'credentials.json',
    google,
    hashFn: obj => {
      return MD5(obj).toString();
    },
  });

  const gsheet = sheep.create({
    spreadsheetId: '1wwl1dVcgZsAl7WmZJdQtlkU563G2GrlvQr8KNCsIvQ0',
    range: 'PurchaseOrder!A:AL',
  });

  const baseSchema = new createSchema({
    range: 'A:AL',
    header: [
      'purchaseOrderNo',
      'shipmentNo',
      'adminStatus',
      'supplierStatusHeader',
      'documentDate',
      'postingDate',
      'vendorAddress',
      'supplier',
      'supplierNo',
      'supplierName',
      'address',
      'tin',
      'contactNumber',
      'contactPerson',
      'items',
      'itemNo',
      'productId',
      'description',
      'quantity',
      'uom',
      'unitPrice',
      'totalAmount',
      'discount',
      'deliveryAddress',
      'supplierStatusItem',
      'scheduleLine',
      'currency',
      'dateUpdated',
      'timeUpdated',
      'quantity',
      'uom',
      'unitPrice',
      'totalAmount',
      'deliveryDateAndTime',
      'deliveryStatus',
      'status',
      'dateCreated',
      'timeCreated',
    ],
  });

  const baseModel = createModel(baseSchema);
  const grid = await gsheet.grid({ headerLength: 1 });
  baseModel.setGrid(grid);

  const schemas = [
    //Purchase Order
    new createSchema({
      range: 'A:AL',
      // range: 'A:O',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
        'items',
        'itemNo',
        'productId',
        'description',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'discount',
        'deliveryAddress',
        'supplierStatusItem',
        'scheduleLine',
        'currency',
        'dateUpdated',
        'timeUpdated',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'deliveryDateAndTime',
        'deliveryStatus',
        'status',
        'dateCreated',
        'timeCreated',
      ],
      keys: ['purchaseOrderNo'],
    }),

    //vendorAddress
    new createSchema({
      range: 'A:G',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
      ],
      keys: ['purchaseOrderNo', 'vendorAddress'],
    }),

    //Item
    new createSchema({
      range: 'A:AC',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
        'items',
        'itemNo',
        'productId',
        'description',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'discount',
        'deliveryAddress',
        'supplierStatusItem',
        'scheduleLine',
        'currency',
        'dateUpdated',
        'timeUpdated',
      ],
      keys: ['purchaseOrderNo', 'itemNo', 'productId'],
    }),

    //Item Address
    new createSchema({
      range: 'A:X',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
        'items',
        'itemNo',
        'productId',
        'description',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'discount',
        'deliveryAddress',
      ],
      keys: ['purchaseOrderNo', 'itemNo', 'productId', 'deliveryAddress'],
    }),

    //Schedule Line Item
    new createSchema({
      range: 'A:Z',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
        'items',
        'itemNo',
        'productId',
        'description',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'discount',
        'deliveryAddress',
        'supplierStatusItem',
        'scheduleLine',
      ],
      keys: ['purchaseOrderNo', 'itemNo', 'productId', 'scheduleLine'],
    }),

    //Schedule Line Status
    new createSchema({
      range: 'A:AI',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
        'items',
        'itemNo',
        'productId',
        'description',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'discount',
        'deliveryAddress',
        'supplierStatusItem',
        'scheduleLine',
        'currency',
        'dateUpdated',
        'timeUpdated',
        'quantity',
        'uom',
        'unitPrice',
        'totalAmount',
        'deliveryDateAndTime',
        'deliveryStatus',
      ],
      keys: [
        'purchaseOrderNo',
        'itemNo',
        'productId',
        'scheduleLine',
        'deliveryStatus',
      ],
    }),

    //Supplier
    new createSchema({
      range: 'A:N',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
      ],
      keys: ['supplierNo', 'supplierName'],
    }),

    //Address
    new createSchema({
      range: 'A:N',
      header: [
        'purchaseOrderNo',
        'shipmentNo',
        'adminStatus',
        'supplierStatusHeader',
        'documentDate',
        'postingDate',
        'vendorAddress',
        'supplier',
        'supplierNo',
        'supplierName',
        'address',
        'tin',
        'contactNumber',
        'contactPerson',
      ],
      keys: ['supplierNo', 'supplierName', 'address'],
    }),
  ];

  const models = createModelsFromBaseModel(schemas, baseModel);

  const [
    purchaseOrder,
    vendorAddress,
    item,
    deliveryAddress,
    scheduleLine,
    deliveryStatus,
    supplier,
    address,
  ] = models;

  return {
    purchaseOrder,
    vendorAddress,
    item,
    deliveryAddress,
    scheduleLine,
    deliveryStatus,
    supplier,
    address,
  };
};
