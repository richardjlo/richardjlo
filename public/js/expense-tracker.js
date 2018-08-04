
$(document).ready(function() {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCDt4GDmJ7PBUh7AIhRdnD-kD5tleAzciQ',
    authDomain: 'expense-tracker-a3686.firebaseapp.com',
    databaseURL: 'https://expense-tracker-a3686.firebaseio.com',
    projectId: 'expense-tracker-a3686',
    storageBucket: 'expense-tracker-a3686.appspot.com',
    messagingSenderId: '487206506379',
  };

  firebase.initializeApp(config);
  const db = firebase.database();
  let transactionsRef = db.ref('transactions/');

  // Updates screen with latest transactions (new, update, delete)
  renderTransactions(transactionsRef);

  // When the new transaction form is submitted, create new transaction in db
  let newExpenseform = $('#newExpenseForm');
  createNewExpense(newExpenseform, transactionsRef);

  // When delete button is clicked, delete transaction from db
  $('#transactionsTable').on('click', '.delete-btn', function() {
    let key = $(this).parent().parent().attr('id');
    let transaction = db.ref('transactions/' + key);
    transaction.remove();
  });

  // Attach transaction key to updateExpenseForm modal.
  $('#transactionsTable').on('click', '.edit-btn', function() {
    let transactionElement = $(this).parent().parent();
    let key = transactionElement.attr('id');

    // Add key to form
    $('#updateExpenseForm').val(key);

    // Pre-populate form fields
    let origDescription = transactionElement.children('.description').text();
    let origVendor = transactionElement.children('.vendor').text();
    let origAmount = transactionElement.children('.amount').attr('value');
    $('#update-description').val(origDescription);
    $('#update-vendor').val(origVendor);
    $('#update-amount').val(origAmount);
  });

  // When the transaction form is submitted, update transaction in db
  let updateExpenseForm = $('#updateExpenseForm');
  $(updateExpenseForm).submit(function(event) {
    // Stop browser from submitting form
    event.preventDefault();

    // Get key from form's value
    let key = $(updateExpenseForm).val();
    let transaction = db.ref('transactions/' + key);

    // Get new values
    let newDescription = $('#update-description').val();
    let newVendor = $('#update-vendor').val();
    let newAmount = $('#update-amount').val();

    // Update transaction
    transaction.update({
      amount: newAmount,
      description: newDescription,
      vendor: newVendor,
    });

    $(updateExpenseForm).trigger('reset');
    $('#updateExpenseModal').modal('toggle');
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
      '<td class="amount" value="' + amount + '">$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn"  data-toggle="modal" data-target="#updateExpenseModal">Edit</button></td>' +
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
      '<td class="amount" value="' + amount + '">$' + amount + '</td>' +
      '<td><button type="button" class="btn btn-sm btn-outline-secondary edit-btn"  data-toggle="modal" data-target="#updateExpenseModal">Edit</button></td>' +
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

let createNewExpense = function(newExpenseform, transactionsRef) {
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
};
