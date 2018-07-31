$(document).ready(function() {
  const db = firebase.database();
  let transactionsRef = db.ref('transactions/');
  let key;
  let transaction;
  let transactionElement;

  // Read: Add all current and future transaction elements to screen.
  transactionsRef.orderByKey().on('child_added', function(data) {
    key = data.key;
    transaction = data.val();
    addTransactionElement($('#transactionsTable'), key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // Update: Update transaction element when transaction is updated in db.
  transactionsRef.on('child_changed', function(data) {
    key = data.key;
    transaction = data.val();
    transactionElement = $('#' + key);
    setTransactionValues(transactionElement, key, transaction.description,
      transaction.vendor, transaction.amount);
  });

  // Delete: Remove transaction element from screen when transaction is
  //  deleted from db.
  transactionsRef.on('child_removed', function(data) {
    key = data.key;
    transactionElement = $('#' + key);
    removeTransaction(transactionElement);
  });

  // When the new transaction form is submitted, create new transaction in db
  let form = $('#newExpenseForm');
  $(form).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(transactionsRef, description, vendor, amount);
    $(form).trigger('reset');
    $('#newExpenseModal').modal('toggle');
  });

  // When edit button is clicked, update transaction in db
  $('#transactionsTable').on('click', '.edit-btn', function() {
    alert('transaction edited!');
  });

  // When delete button is clicked, delete transaction from db
  $('#transactionsTable').on('click', '.delete-btn', function() {
    let key = $(this).parent().parent().attr('id');
    let transaction = db.ref('transactions/' + key);
    transaction.remove();
  });
});

// Create new transaction in db
let createTransaction = function(transactionsRef, description, vendor, amount) {
  let newTransaction = transactionsRef.push();
  newTransaction.set({
      description: description,
      vendor: vendor,
      amount: amount,
  });
};

// Create transaction
let addTransactionElement = function(transactionsTable, key, description,
  vendor, amount) {
  transactionsTable.append(
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
let removeTransaction = function(transactionElement) {
  transactionElement.remove();
};
