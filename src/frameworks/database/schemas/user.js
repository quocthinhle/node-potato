import moment from 'moment';
import bcrypt from 'bcryptjs';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	created: Date,
});

UserSchema.index({ name: 1 });

UserSchema.index({ name: 1, created: -1 });

UserSchema.plugin(mongooseUniqueValidator);

UserSchema.pre('save', function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(this.password, salt, (error, hash) => {
			if (error) {
				return next(error);
			}

			this.password = hash;
			this.created = moment().toJSON();
			return next();
		});
	});
});

const UserDao = model('User', UserSchema);

export default UserDao;
