const enveloppes = [
    {
        id: 1,
        name: 'rent',
        budget: 400
    },
    {
        id: 2,
        name: 'groceries',
        budget: 120 
    },
    {
        id: 3,
        name: 'electricity',
        budget: 45 
    }
];

const isValidEnveloppe = req => {
    if (!req.name || typeof req.name !== 'string') {
        throw new Error ('Please enter a string for the enveloppe\'s name.');
    };
    if (!isNaN(parseFloat(req.budget)) && isFinite(req.budget)) {
        req.budget = Number(req.budget);
    } else {
        throw new Error ('Please enter a number for budget.');
    };
    return true;
};


module.exports = { 
    enveloppes,
    isValidEnveloppe,
 };