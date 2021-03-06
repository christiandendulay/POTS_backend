import { createCreateSupplierDB } from './create-supplier-db';

describe('Create Supplier', () => {
	it('Should be able to save a supplier to a database', async () => {
		const mockDB: any = {
			insert: jest.fn(async input => {
				return { _id: '1', ...input };
			}),
		};
		const createSupplier = createCreateSupplierDB(mockDB);

		const supplierInput = {
			name: 'Supplier Name',
			address: {
				building_name: 'building',
				street: 'street',
				city: 'city',
				state: 'state',
				zip_code: '124365',
			},
		};

		const newSupplier = await createSupplier(supplierInput);

		expect(mockDB.insert.mock.calls.length).toBe(1);
		expect(newSupplier).toMatchObject({ _id: '1', ...supplierInput });
	});
});
