const purchaseOrderResolvers = {
  PurchaseOrder: {
    supplierStatus: async (parent, args, context, info) => {
      const { getAllSupplierStatusByPurchaseOrder } = context;
      return await getAllSupplierStatusByPurchaseOrder(parent.id);
    },
    supplier: async (parent, args, context, info) => {
      const { getSupplierById } = context;
      return await getSupplierById(parent.supplier);
    },
    items: async (parent, args, context, info) => {
      const { getAllItemsByPurchaseOrder } = context;

      return await getAllItemsByPurchaseOrder(parent.id);
    }
  },
  Query: {
    allPurchaseOrders: async (parent, args, context, info) => {
      const { getAllPurchaseOrders } = context;
      return getAllPurchaseOrders();
    },
    purchaseOrder: async (parent, { id }, context, info) => {
      const { getPurchaseOrderById } = context;
      return getPurchaseOrderById(id);
    }
  },
  Mutation: {
    createPurchaseOrder: async (parent, { purchaseOrder }, context, info) => {
      const {
        createPurchaseOrder,
        createSupplier,
        createSupplierStatus,
        createItem
      } = context;

      const supplier = await createSupplier(purchaseOrder.supplier);

      const po = {
        externalID: purchaseOrder.externalID,
        status: purchaseOrder.status,
        //supplierStatus: supplierStatus,
        supplier: supplier.id
        //items: items
      };

      const createdPo = await createPurchaseOrder(po);

      const supplierStatus: Array<any> = await Promise.all(
        purchaseOrder.supplierStatus.map(async ss => {
          const poss = await createSupplierStatus({
            ...ss,
            poid: createdPo.id
          });
          return poss.id.toString();
        })
      );

      const items: Array<any> = await Promise.all(
        purchaseOrder.items.map(async item => {
          const poitem = await createItem({ ...item, poid: createdPo.id });
          return poitem.id.toString();
        })
      );

      return createdPo;
    },
    deletePurchaseOrder: async (parent, { id }, context, info) => {
      const { deletePurchaseOrderbyId } = context;
      return await deletePurchaseOrderbyId(id);
    },
    updatePurchaseOrder: async (parent, { purchaseOrder }, context, info) => {
      const {
        updatePurchaseOrderById,
        updateItemById,
        updateSupplierStatusById,
        updateSupplierById
      } = context;

      const supplier = await updateSupplierById(purchaseOrder.supplier);
      const supplierStatus = await updateSupplierStatusById(
        purchaseOrder.supplierStatus
      );
      const items = await updateItemById(purchaseOrder.items);

      // const supplierStatus: Array<any> = await Promise.all(
      // 	purchaseOrder.supplierStatus.map(async ss => {
      // 		const poss = await updateSupplierStatusById(ss);
      // 		return poss.id.toString();
      // 	})
      // );

      // const items: Array<any> = await Promise.all(
      // 	purchaseOrder.items.map(async item => {
      // 		const poitem = await updateItemById(item);
      // 		return poitem.id.toString();
      // 	})
      // );

      const po = {
        id: purchaseOrder.id,
        externalID: purchaseOrder.externalID,
        status: purchaseOrder.status,
        supplierStatus: supplierStatus.toString(),
        supplier: supplier.id.toString(),
        items: items.toString()
      };
      return await updatePurchaseOrderById(po);
    }
  }
};

export default purchaseOrderResolvers;
