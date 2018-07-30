$(document).ready(function() {
  renderAllTransactions();

  let form = $('#newExpenseForm');
  $(form).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(description, vendor, amount);
    alert('added new transaction!');
  });
});

let createTransaction = function(description, vendor, amount) {
  let newTransaction = db.ref('transactions/').push();
  newTransaction.set({
      description: description,
      vendor: vendor,
      amount: amount,
  });
};

let renderAllTransactions = function() {
  let transactionsRef = db.ref('transactions/').orderByKey();
  transactionsRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      renderSingleTransaction(childData.description, childData.vendor,
        childData.amount);
    });
  });
};

let renderSingleTransaction = function(description, vendor, amount) {
  $('#transactionsTable').append(
    '<tr><td>'+
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};
