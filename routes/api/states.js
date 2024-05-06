const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

// Define routes for state-specific endpoints
router.get('/states/contig=true', statesController.getContiguousStates);
router.get('/states/contig=false', statesController.getNonContiguousStates);
router.get('/:states', statesController.getStateByCode);
router.get('/', statesController.getAllStates);
router.get('/:states/funfact', statesController.getRandomFunFact);
router.get('/:states/capital', statesController.getStateCapital);
router.get('/:states/nickname', statesController.getStateNickname);
router.get('/:states/population', statesController.getStatePopulation);
router.get('/:states/admission', statesController.getStateAdmissionDate);
router.post('/:states/funfact', statesController.addFunFact);
router.patch('/:states/funfact', statesController.updateFunFact);
router.delete('/:states/funfact', statesController.deleteFunFact);

module.exports = router;