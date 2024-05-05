const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

// Define routes for state-specific endpoints
router.get('/:state', statesController.getStateByCode);
router.get('/:state/funfact', statesController.getRandomFunFact);
router.get('/:state/capital', statesController.getStateCapital);
router.get('/:state/nickname', statesController.getStateNickname);
router.get('/:state/population', statesController.getStatePopulation);
router.get('/:state/admission', statesController.getStateAdmissionDate);
router.post('/:state/funfact', statesController.addFunFact);
router.patch('/:state/funfact', statesController.updateFunFact);
router.delete('/:state/funfact', statesController.deleteFunFact);

module.exports = router;
