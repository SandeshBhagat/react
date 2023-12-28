const express = require('express');
const {
	getAllData,
	getSingleData,
	createPopup,
	deletePopup,
	updatePopup,
} = require('../controllers/datacontroller');

const router = express.Router();
// get all data
router.get('/', getAllData);
//get single
router.get('/:id', getSingleData);
//post a workout
router.post('/', createPopup);
//delete a workout
router.delete('/:id',deletePopup);
//update a workout
router.patch('/:id', updatePopup);

module.exports = router;