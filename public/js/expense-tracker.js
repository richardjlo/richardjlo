$(document).ready(function() {
  const db = firebase.database();
  let transactionsRef = db.ref('transactions/');

  // Updates screen with latest transactions (new, update, delete)
  renderTransactions(transactionsRef);

  // When the new transaction form is submitted, create new transaction in db
  let newExpenseform = $('#newExpenseForm');
  $(newExpenseform).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(transactionsRef, description, vendor, amount);
    $(newExpenseform).trigger('reset');
    $('#newExpenseModal').modal('toggle');
  });

  // When edit button is clicked, update transaction in db
  $('#transactionsTable').on('click', '.edit-btn', function() {
    $('#updateExpenseModal').modal('toggle');
    /*
    // TO DO - prepoulate form with current transaction values.
    let amount = $(this).parent().siblings('.amount').text();
    let description = $(this).parent().siblings('.description').text();
    let vendor = $(this).parent().siblings('.vendor').text();
    */

    let key = $(this).parent().parent().attr('id');
    let transaction = db.ref('transactions/' + key);

    // When the transaction form is submitted, update transaction in db
    let updateExpenseForm = $('#updateExpenseForm');
    $(updateExpenseForm).submit(function(et) {
      // Stop browser from submitting form
      et.preventDefault();

      let newDescription = $('#update-description').val();
      let newVendor = $('#update-vendor').val();
      let newAmount = $('#update-amount').val();

      console.log(newDescription + ' ' + newVendor + ' ' + newAmount);
      transaction.update({
        amount: newAmount,
        description: newDescription,
        vendor: newVendor,
      });
      // $(updateExpenseForm).reset();
      // $('#updateExpenseModal').modal('toggle');
    });
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

// Add transaction element to screen
let addTransactionElement = function(transactionsTable, key, description,
  vendor, amount) {
  transactionsTable.append(
    '<tr id=' + key + '>' +
      '<td class="description">' + description + '</td>' +
      '<td class="vendor">' + vendor + '</td>' +
      '<td class="amount">$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn">Edit</button></td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-danger delete-btn">Delete</button></td>' +
    '</tr>'
  );
};

// Update transaction element on screen
let setTransactionValues = function(transactionElement, key, description,
  vendor, amount) {
  transactionElement.replaceWith(
    '<tr id=' + key + '>' +
      '<td class="description">' + description + '</td>' +
      '<td class="vendor">' + vendor + '</td>' +
      '<td class="amount">$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn">Edit</button></td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-danger delete-btn">Delete</button></td>' +
    '</tr>'
  );
};

// Remove transaction element from screen
let removeTransaction = function(transactionElement) {
  transactionElement.remove();
};

let renderTransactions = function(transactionsRef) {
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
};
