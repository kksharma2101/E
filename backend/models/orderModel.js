import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.ObjectId,
      ref: "Product",
    },
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "No Process",
      enumValues: [
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
      ],
    },
  },
  { timestamps: true }
);

// const categoryModel = model("Category", categorySchema);

export default mongoose.model("Orders", orderSchema);
