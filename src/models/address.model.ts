import { Schema, model, models } from 'mongoose';

const addressSchema = new Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const Address = models.Address || model('Address', addressSchema);

export default Address;