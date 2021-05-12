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

const isValidEnveloppe = item => {
    if (!item.title || typeof item.title !== 'string') {
        throw new Error ('Please enter a string for the enveloppe\'s title.');
    };
    if (!isNaN(parseFloat(item.budget)) && isFinite(item.budget)) {
        item.budget = Number(item.budget);
    } else {
        throw new Error ('Please enter a number for the budget.');
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

const updateBudget = (current, query) => {
    if(!isNaN(query.budget)) {
        req.budget = Number(query.budget);
    } else {
        throw new Error ('Please enter a number for the amount');
    };
    const enveloppeIndex = enveloppes.findIndex((el) => {
        el.id === Number(id);
    });
    if (enveloppeIndex !== - 1) {
        current.budget += req.budget;
        return current;
    } else {
        return null;
    };
};

const deleteEnveloppe = id => {
    const enveloppeIndex = enveloppes.findIndex((el) => {
        el.id === Number(id);
    });
    if (enveloppeIndex !== - 1) {
        enveloppes.splice(enveloppeIndex, 1);
        return true;
    } else {
        return false;
    };
};

const getIndexById = (id) => {
    return enveloppes.findIndex((element) => {
      return element.id === Number(id);
    });
  };

const transferEnveloppe = (from, amount, to) => {
    let fromEnveloppe = getEnveloppeById(from);
    let toEnveloppe = getEnveloppeById(to);
    if(Number(amount) <= fromEnveloppe.budget) {
        fromEnveloppe.budget -= Number(amount);
        toEnveloppe += Number(amount);
    } else {
        throw new Error (`You cannot transfer more than ${fromEnveloppe.budget}`);
    };
};  

module.exports = { 
    enveloppes,
    isValidEnveloppe,
    addEnveloppe,
    getEnveloppeById, 
    updateBudget,
    deleteEnveloppe,
    getIndexById,
    transferEnveloppe
 };