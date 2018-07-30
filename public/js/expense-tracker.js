$(document).ready(function() {
  renderScreen();

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

let drawTransaction = function(transactionId, description, vendor, amount) {
  $('#transactionsTable').append('<tr id=' +
      transactionId + '><td>' +
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};

let renderScreen = function() {
  let allTransactionsRef = db.ref('transactions/').orderByKey();

  // New transaction
  allTransactionsRef.on('child_added', function(data) {
    let transactionId = data.key;
    let transaction = data.val();
    drawTransaction(transactionId, transaction.description, transaction.vendor,
      transaction.amount);
  });
};

// var commentsRef = firebase.database().ref('post-comments/' + postId);
// commentsRef.on('child_added', function(data) {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });
//
// commentsRef.on('child_changed', function(data) {
//   setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });
//
// commentsRef.on('child_removed', function(data) {
//   deleteComment(postElement, data.key);
// });
