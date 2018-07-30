$(document).ready(function() {
  renderScreen();

  // Create new transaction
  let form = $('#newExpenseForm');
  $(form).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(description, vendor, amount);
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

let renderScreen = function() {
  let allTransactionsRef = db.ref('transactions/').orderByKey();
  let key;
  let transaction;

  // Initialize screen and render all new transaction
  allTransactionsRef.on('child_added', function(data) {
    key = data.key;
    transaction = data.val();
    addTransactionElement(key, transaction.description, transaction.vendor,
      transaction.amount);
  });

  // Updated transaction
  allTransactionsRef.on('child_changed', function(data) {
    key = data.key;
    transaction = data.val();
    setTransactionValues(key, transaction.description, transaction.vendor,
      transaction.amount);
  });

  // Delete transaction
  /* insert code here */
};

// Create transaction
let addTransactionElement = function(key, description, vendor, amount) {
  $('#transactionsTable').append('<tr id=' +
      key + '><td>' +
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};

// Update transaction
let setTransactionValues = function(key, description, vendor, amount) {
  let transactionElement = $('#' + key);
  transactionElement.replaceWith('<tr id=' +
      key + '><td>' +
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};

/* TO-DO */
// Delete transaction
//
// commentsRef.on('child_removed', function(data) {
//   deleteComment(postElement, data.key);
// });
