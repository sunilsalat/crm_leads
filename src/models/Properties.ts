import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    address: {
      type: String,
      required: [true, "Property address is required"],
    },
    developerName: {
      type: String,
      required: [true, "Property developer name is required"],
    },
    amenities: [String],
    images: [String],
    status: {
      type: String,
      enum: ["AVAILABLE", "PENDIG", "SOLD"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", PropertySchema);
