import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const PurchaseOrderSchema = new Schema({
  externalID: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  supplierStatus: {
    type: [String]
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  items: {
    type: [String]
  }
});

export default mongoose.model("PurchaseOrder", PurchaseOrderSchema);
