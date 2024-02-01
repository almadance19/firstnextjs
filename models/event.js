import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({ 
    eventURL: {
        type: String,
        required: [true, 'URL is ID is required!'],
    },
    eventName: {
        type: String,
        required: [true, 'Name is required!'],
      },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    eventKey: {
        type: String,
        required: [true, 'Description is required!'],
    },
    eventEmail: {
        type: String,
        required: [true, 'Email is required!'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    eventDescription: {
        type: String,
        required: [true, 'Description is required!'],
    },
    eventDate: {
        type: String,
        required: [true, 'Date is required!'],
    },
    eventAdress: {
        type: String,
        required: [true, 'Time is required!'],
    },
    eventFotoURL: {
        type: String,
        required: [false, 'Foto is not required!'],
    },
    eventWebsite: {
        type: String,
        required: [false, 'Foto is not required!'],
    },
    });

const Event = models.Event || model("Event", EventSchema);

export default Event;