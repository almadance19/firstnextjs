import { Schema, model, models } from 'mongoose';

const TicketSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      eventURL: {
        type: String,
        required: true,
      },
      eventName: {
        type: String,
        required: true,
      },
      eventOrganiserId: {
        type: String,
        required: true,
      },
    created_at: {
      type: Date,
      default: Date.now,
    },
    ticket_id: {
      type: String,
      required: true,
    },
    ticket_nr: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name_payment: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    pre_total: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pre_mwst: {
      type: Number,
      required: true,
    },
    mwst: {
      type: Number,
      required: true,
    },
    amount_discount: {
      type: Number,
      required: true,
    },
    name_ticket: {
      type: String,
      required: true,
    },
    paystatus: {
      type: String,
      required: true,
    },
    ticket_type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  });
  
  

const Ticket = models.Ticket || model("Ticket", TicketSchema);

export default Ticket;