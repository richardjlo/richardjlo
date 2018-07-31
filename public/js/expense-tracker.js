$(document).ready(function() {

  // On first connect, retrieve all transactions and add to screen
  let allTransactionsRef = db.ref('transactions/').orderByKey();
  let key;
  let transaction;
  let transactionElement;

  allTransactionsRef.on('child_added', function(data) {
    key = data.key;
    transaction = data.val();
    transactionElement = $('#transactionsTable');
    addTransactionElement(transactionElement, key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // When the new transaction form is submitted, create new transaction and add to screen
  let form = $('#newExpenseForm');
  $(form).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(description, vendor, amount);
    $(form).trigger('reset');
    $('#newExpenseModal').modal('toggle');
  });

  // When edit button is clicked, update transaction and add to screen
  $('#transactionsTable').on('click', '.edit-btn', function() {
    alert('transaction edited!');
  });

  // When delete button is clicked, delete transaction and remove from screen
  $('#transactionsTable').on('click', '.delete-btn', function() {
    alert('Deleted!');
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

  // // Initialize screen and render all new transaction
  // allTransactionsRef.on('child_added', function(data) {
  //   key = data.key;
  //   transaction = data.val();
  //   transactionElement = $('#transactionsTable');
  //   addTransactionElement(transactionElement, key, transaction.description,
  //     transaction.vendor, transaction.amount);
  // });

  // Render updated transaction
  allTransactionsRef.on('child_changed', function(data) {
    key = data.key;
    transaction = data.val();
    transactionElement = $('#' + key);
    setTransactionValues(transactionElement, key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // Render deleted transaction
  allTransactionsRef.on('child_removed', function(data) {
    key = data.key;
    transactionElement = $('#' + key);
    deleteTransaction(transactionElement);
  });
};

// Create transaction
let addTransactionElement = function(transactionElement, key, description,
  vendor, amount) {
  transactionElement.append(
    '<tr id=' + key + '>' +
      '<td>' + description + '</td>' +
      '<td>' + vendor + '</td>' +
      '<td>$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn">Edit</button></td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-danger delete-btn">Delete</button></td>' +
    '</tr>'
  );
};

// Set transaction
let setTransactionValues = function(transactionElement, key, description,
  vendor, amount) {
  transactionElement.replaceWith(
    '<tr id=' + key + '>' +
      '<td>' + description + '</td>' +
      '<td>' + vendor + '</td>' +
      '<td>$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn">Edit</button></td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-danger delete-btn">Delete</button></td>' +
    '</tr>'
  );
};

// Delete transaction
let deleteTransaction = function(transactionElement) {
  transactionElement.remove();
};
