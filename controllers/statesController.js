const State = require('../model/States');

const getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getContiguousStates = async (req, res) => {
    try {
        const states = await State.find({ stateCode: { $nin: ['AK', 'HI'] } });
        res.json(states);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getNonContiguousStates = async (req, res) => {
    try {
        const states = await State.find({ stateCode: { $in: ['AK', 'HI'] } });
        res.json(states);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getStateByCode = async (req, res) => {
    const stateCode = req.params.stateCode;
    try {
        const state = await State.findOne({ stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        res.json(state);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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
