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
  let transactionElement;

  // Initialize screen and render all new transaction
  allTransactionsRef.on('child_added', function(data) {
    key = data.key;
    transaction = data.val();
    transactionElement = $('#transactionsTable');
    addTransactionElement(transactionElement, key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // Updated transaction
  allTransactionsRef.on('child_changed', function(data) {
    key = data.key;
    transaction = data.val();
    transactionElement = $('#' + key);
    setTransactionValues(transactionElement, key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // Delete transaction
  allTransactionsRef.on('child_removed', function(data) {
    key = data.key;
    transactionElement = $('#' + key);
    deleteTransaction(transactionElement);
  });
};

// Create transaction
let addTransactionElement = function(transactionElement, key, description,
  vendor, amount) {
  transactionElement.append('<tr id=' +
      key + '><td>' +
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};

// Update transaction
let setTransactionValues = function(transactionElement, key, description,
  vendor, amount) {
  transactionElement.replaceWith('<tr id=' +
      key + '><td>' +
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};

// Delete transaction
let deleteTransaction = function(transactionElement) {
  transactionElement.remove();
};
