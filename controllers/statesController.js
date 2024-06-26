const fs = require('fs');
const path = require('path');

// Path to states data file
const statesDataPath = path.join(__dirname, '../model/statesData.json');
// Read and parse the statesData.json file
const statesData = JSON.parse(fs.readFileSync(statesDataPath, 'utf8'));

const getAllStates = async (req, res) => {
    try {
        // Return all states data
        res.json(statesData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getContiguousStates = async (req, res) => {
    try {
        // Filter contiguous states (not AK or HI)
        const contiguousStates = statesData.filter(state => !['AK', 'HI'].includes(state.code));
        // Return contiguous states as the response
        res.json(contiguousStates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getNonContiguousStates = async (req, res) => {
    try {
        // Filter non-contiguous states (AK or HI)
        const nonContiguousStates = statesData.filter(state => ['AK', 'HI'].includes(state.code));
        // Return non-contiguous states as the response
        res.json(nonContiguousStates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStateByCode = (req, res) => {
    // Extract state code from request parameters
    const stateCode = req.params.stateCode;

    // Find the state object with matching code in the states array
    const state = states.find(state => state.code === stateCode);

    // If state is not found, return 404 status with an error message
    if (!state) {
        return res.status(404).json({ message: `State with code ${stateCode} not found` });
    }

    // If state is found, return it as JSON response
    res.json(state);
}


const getRandomFunFact = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({ message: 'No fun facts found for this state.' });
        }
        const randomIndex = Math.floor(Math.random() * state.funfacts.length);
        const randomFunFact = state.funfacts[randomIndex];
        res.json({ funfact: randomFunFact });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStateCapital = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json({ state: state.stateName, capital: state.capital });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStateNickname = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json({ state: state.stateName, nickname: state.nickname });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStatePopulation = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json({ state: state.stateName, population: state.population });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStateAdmissionDate = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json({ state: state.stateName, admitted: state.admissionDate });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addFunFact = async (req, res) => {
    const stateCode = req.params.state;
    console.log('State Code:', stateCode); // Log the state code extracted from the request parameters
    const { funfacts } = req.body;
    console.log('Fun Facts:', funfacts); // Log the fun facts received in the request body
    try {
        const state = await State.findOneAndUpdate(
            { stateCode },
            { $push: { funfacts: { $each: funfacts } } },
            { new: true }
        );
        console.log('State:', state); // Log the state retrieved from the database
        if (!state) {
            console.log('State not found'); // Log if the state is not found
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json(state);
    } catch (err) {
        console.error('Error:', err); // Log any errors that occur during execution
        res.status(500).json({ message: err.message });
    }
}



const updateFunFact = async (req, res) => {
    const stateCode = req.params.stateCode;
    const { index, funfact } = req.body;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        state.funfacts[index - 1] = funfact;
        await state.save();
        res.json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteFunFact = async (req, res) => {
    const stateCode = req.params.stateCode;
    const { index } = req.body;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        state.funfacts.splice(index - 1, 1);
        await state.save();
        res.json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllStates,
    getContiguousStates,
    getNonContiguousStates,
    getStateByCode,
    getRandomFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmissionDate,
    addFunFact,
    updateFunFact,
    deleteFunFact
}
