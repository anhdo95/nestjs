import { Schema, model } from 'mongoose';

export const EventSchema = new Schema({
  name: String,
  description: String,
  status: Number
})

export default model('Event', EventSchema)