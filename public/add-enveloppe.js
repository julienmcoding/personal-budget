const submitButton = document.getElementById('submit-enveloppe');
const newEnveloppeContainer = document.getElementById('new-enveloppe');

submitButton.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const budget = document.getElementById('budget').value;

  fetch(`/api/enveloppes?title=${title}&budget=${budget}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({enveloppe}) => {
    const newEnveloppe = document.createElement('div');
    newEnveloppe.innerHTML = `
    <h3>Congrats, your enveloppe was created!</h3>
    <div class="enveloppe-id">~ ${enveloppe.id} ~</div>
    <div class="enveloppe-title">${enveloppe.title}</div>
    <div class="enveloppe-budget"> ${enveloppe.budget}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all enveloppes.</p>
    `
    newEnveloppeContainer.appendChild(newEnveloppe);
  });
});