const enveloppes = [
    {
        id: 1,
        title: 'rent',
        budget: 400
    },
    {
        id: 2,
        title: 'groceries',
        budget: 120 
    },
    {
        id: 3,
        title: 'electricity',
        budget: 45 
    }
];

const isValidEnveloppe = req => {
    if (!req.title || typeof req.title !== 'string') {
        throw new Error ('Please enter a string for the enveloppe\'s title.');
    };
    if (!isNaN(parseFloat(req.budget)) && isFinite(req.budget)) {
        req.budget = Number(req.budget);
    } else {
        throw new Error ('Please enter a number for budget.');
    };
    return true;
};

const addEnveloppe = enveloppe => {
    if(isValidEnveloppe(enveloppe)) {
        let newId = enveloppes.length + 1;
        const newEnveloppe = {
            id: newId,
            title: enveloppe.title,
            budget: enveloppe.budget
        }
        enveloppes.push(newEnveloppe);
        return enveloppes[enveloppes.length - 1];
    };
};

const getEnveloppeById = id => {
    const enveloppe = enveloppes.find(el => {
        return el.id === Number(id);
    });
    return enveloppe;
};

module.exports = { 
    enveloppes,
    isValidEnveloppe,
    addEnveloppe,
    getEnveloppeById
 };