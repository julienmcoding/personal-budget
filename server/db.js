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

const getIndexById = (id) => {
    return enveloppes.findIndex((element) => {
      return element.id === Number(id);
    });
  };

const addEnveloppe = (title, budget) => {
    if(typeof title !== 'string' || typeof budget !== 'number') {
        throw new Error ('Please enter a valid title and a valid budget');
    };
    let newId = enveloppes.length + 1;
    const newEnveloppe = {
        id: newId,
        title: title,
        budget: budget
        }
        enveloppes.push(newEnveloppe);
        return enveloppes[enveloppes.length - 1];
};

const getEnveloppeById = id => {
    const enveloppe = enveloppes.find(el => {
        return el.id === Number(id);
    });
    return enveloppe;
};

const updateBudget = (current, updatedBudget) => {
    if(typeof updatedBudget !== 'number') {
        throw new Error ('Please enter a number for the amount');
    };
    if(updatedBudget + current.budget <= 0) {
        throw new Error (`You cannot remove more than ${current.budget}` );
    };
    const enveloppeIndex = getIndexById(current.id);
    if (enveloppeIndex !== - 1) {
        current.budget += Number(updatedBudget);
        return current;
    } else {
        return null;
    };
};

const deleteEnveloppe = id => {
    const enveloppeIndex = getIndexById(id);
    if (enveloppeIndex !== - 1) {
        enveloppes.splice(enveloppeIndex, 1);
        return true;
    } else {
        return false;
    };
};

const transferEnveloppe = (from, amount, to) => {
    let fromEnveloppe = getIndexById(from);
    let toEnveloppe = getIndexById(to);
    if(fromEnveloppe === -1 || toEnveloppe === -1) {
        throw new Error ('Please enter a valid id');
    }
    if(Number(amount) <= fromEnveloppe.budget) {
        enveloppes[fromEnveloppe].budget -= Number(amount);
        enveloppes[toEnveloppe].budget += Number(amount);
        return [enveloppes[fromEnveloppe], enveloppes[toEnveloppe]];
    } else if (Number(amount) > fromEnveloppe.budget) {
        throw new Error (`You cannot transfer more than ${fromEnveloppe.budget}`);
    };
};  

module.exports = { 
    enveloppes,
    addEnveloppe,
    getEnveloppeById, 
    updateBudget,
    deleteEnveloppe,
    getIndexById,
    transferEnveloppe
 };