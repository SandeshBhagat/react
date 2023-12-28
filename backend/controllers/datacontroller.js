const dataModel = require('../models/datamodel');
const mongoose = require('mongoose');

// get all
const getAllData = async (req, res) => {
	const workouts = await dataModel.find({}).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

// get single

const getSingleData = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}
	const workout = await dataModel.findById(id);
	if (!workout) {
		return res.status(404).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// create new

const createPopup = async (req, res) => {
	const { rule_id,title, page_name, page_url, rules, blurb_content } = req.body;

	// let emptyFields = [];

	// if(!title){
	// 	emptyFields.push('title')
	// }
	// if(!load){
	// 	emptyFields.push('load')
	// }
	// if(!reps){
	// 	emptyFields.push('reps')
	// }

	// if(emptyFields.length > 0){
	//    return res.status(400).json({error:'Please fill in all the fields', emptyFields})
	// }

	try {
		const workoutMdl = await dataModel.create({
			rule_id,
			title,
			page_name,
			page_url,
			rules,
			blurb_content,
		});
		res.status(200).json(workoutMdl);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete

const deletePopup = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}
	const workout = await dataModel.findOneAndDelete({ _id: id });

	if (!workout) {
		return res.status(400).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// update

const updatePopup = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'invalid ID for workout' });
	}

	const workout = await dataModel.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		},
	);

	if (!workout) {
		return res.status(400).json({ error: 'no such workout!' });
	}

	res.status(200).json(workout);
};

// export functions
module.exports = {
	getAllData,
	getSingleData,
	createPopup,
	deletePopup,
	updatePopup,
};
