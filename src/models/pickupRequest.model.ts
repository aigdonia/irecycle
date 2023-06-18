import { Schema, model, models, Types} from 'mongoose';

const pickupRequestSchema = new Schema({
  scheduledDate: Date,
  customer: {type: Types.ObjectId, ref: "User"},
	Address: {type: Types.ObjectId, ref: "Address"},
	driver: {type: Types.ObjectId, ref: "User"},
  rewardPoints: {
    type: Number,
    required: true,
		min:0,
		default: 0
  },
	status: {
		type: String,
		default: "scheduled",
    enum: ['scheduled', 'completed', 'missed']
	}

});

const PickupRequest = models.PickupRequest || model('PickupRequest', pickupRequestSchema);

export default PickupRequest;