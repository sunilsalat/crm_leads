import mongoose from 'mongoose'

const InquirySchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    inquiredBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const LeadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: { type: String, required: true },
    email: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    project: {
      type: String
    },
    requirements: {
      type: String
    },
    budget: {
      type: String
    },
    source: {
      type: String
    },
    status: {
      type: String //HOT, MILD, COLD
    },
    inquiries: [InquirySchema]
  },
  { timestamps: true }
)

export const Lead = mongoose.model('Lead', LeadsSchema)
