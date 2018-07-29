$(document).ready(function() {
  addTransactionsToScreen();

  $('#addExpense').click(function() {
    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(description, vendor, amount);
    // addTransactionToScreen(description, vendor, amount);
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

let addTransactionsToScreen = function() {
  let transactionsRef = db.ref('transactions/').orderByKey();
  transactionsRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      addTransactionToScreen(childData.description, childData.vendor,
        childData.amount);
    });
  });
};

let addTransactionToScreen = function(description, vendor, amount) {
  $('#transactionsTable').append(
    '<tr><td>'+
      description + '</td><td>' +
      vendor + '</td><td>$' +
      amount +
    '</td></tr>'
  );
};
