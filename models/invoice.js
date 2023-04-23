const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema(
  {
    billFrom: { type: String },
    userAddress: {
      userStreet: { type: String, required: true },
      userCity: { type: String, required: true },
      userState: { type: String, required: true },
      userPostalCode: { type: String, required: true }
    },
    invoiceId: { type: String, unique: true },
    status: { type: String },
    invoiceDate: { type: String, required: true },
    dueDate: { type: String },
    invoiceTotal: { type: Number },
    items: [
      {
        id: { type: Number, required: true },
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number }
      }
    ],
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: {
      clientStreet: { type: String, required: true },
      clientCity: { type: String, required: true },
      clientState: { type: String, required: true },
      clientPostalCode: { type: String, required: true }
    },
    description: { type: String, required: true },
    paymentTerm: { type: Number, required: true },
    notes: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;
