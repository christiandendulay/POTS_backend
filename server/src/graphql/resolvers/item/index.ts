const itemResolvers = {
  Item: {
    deliveryAddress: async (parent, args, context, info) => {
      const { getAddressById } = context;
      return await getAddressById(parent.deliveryAddress);
    },
    supplierStatus: async (parent, args, context, info) => {
      const { getAllSupplierStatusByItem } = context;
      return (await getAllSupplierStatusByItem(parent.supplierStatus)) || null;
    }
  },
  Query: {
    item: async (parent, { id }, { getItemById }, info) => {
      return getItemById(id);
    },

    allItems: async (parent, args, { getAllItems }, info) => {
      return getAllItems();
    }
  },
  Mutation: {
    createItem: async (parent, { item }, context, info) => {
      const { createItem } = context;
      return await createItem(item);
    },

    updateItem: async (parent, { item }, context, info) => {
      const { updateItemById, createSupplierStatus } = context;
      console.log({ ...item.supplierStatus });
      let supplierStatus;
      if (item.supplierStatus) {
        supplierStatus = await createSupplierStatus(item.supplierStatus);
      }

      // const supplierStatus: Array<any> = await Promise.all(
      // 	item.supplierStatus.map(async ss => {
      // 		const poss = await createSupplierStatus(ss);
      // 		return poss.id.toString();
      // 	})
      // );
      console.log("SupplierStatus", supplierStatus);
      const i = {
        id: item.id,
        itemNo: item.itemNo,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity,
        uom: item.uom,
        unitPrice: item.unitPrice,
        totalAmount: item.totalAmount,
        deliveryAddress: item.deliveryAddress,
        deliveryDate: item.deliveryDate,
        supplierStatus: supplierStatus ? supplierStatus.id.toString() : null,
        currency: item.currency,
        dateUpdated: item.dateUpdated,
        timeUpdated: item.timeUpdated
      };
      console.log("Item", i);
      return await updateItemById(i);
    },

    deleteItem: async (parent, { id }, context, info) => {
      const { deleteItemById } = context;
      return await deleteItemById(id);
    }
  }
};

export default itemResolvers;
