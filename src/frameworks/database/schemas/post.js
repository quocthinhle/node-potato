import moment from 'moment';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const PostSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: String,
	publisher: {
		type: String,
		required: true,
	},
	created: Date,
}, {
	timeseries: true,
	collection: 'posts',
});

PostSchema.index({ userId: 1 });
PostSchema.index({ created: -1 });

PostSchema.plugin(mongoosePaginate);

PostSchema.pre('save', function (next) {
	this.created = moment().toJSON();
	return next();
});

const PostDao = mongoose.model('Post', PostSchema);

export default PostDao;
