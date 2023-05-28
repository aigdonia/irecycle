import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
	points: {
		type: Number,
		required: true,
		default: 0,
		min: 0
	},
  addresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }]
}, {
	methods: {
		getPublicAttributes() {
			return {
				uid: this._id.toString(),
				firstName: this.firstName,
				lastName: this.lastName,
				points: this.points,
				email: this.email,
			}
		}
	}
});

const User = models.User || model('User', userSchema);

export default User;