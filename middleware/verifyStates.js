const verifyStates = (...allowedStates) => {
    return (req, res, next) => {
        if (!req?.state) return res.sendStatus(401); // Assuming the state information is stored in req.state
        const statesArray = [...allowedStates];
        const result = statesArray.includes(req.state); // Assuming req.state contains the state code
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyStates;
