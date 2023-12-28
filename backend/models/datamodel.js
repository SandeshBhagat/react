const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pluginSchema = new Schema(
	{
		rule_id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		page_name: {
			type: String,
			required: true,
		},
		page_url: {
			type: String,
			required: true,
		},
		rules: {
			type: String,
			required: true,
		},
		blurb_content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('plugindata', pluginSchema);
