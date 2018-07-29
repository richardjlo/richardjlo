$(document).ready(function() {
  // let transactionsRef = db.ref('transactions/' + transactionId);
  // transactionsRef.on('value', function(snapshot) {
  //   let transactions = snapshot.val();
  //   console.log(transactions[1]);
  //   console.log(transactions[1].amount);
  //   console.log(transactions[1].description);
  //   console.log(transactions[1].vendor);
  // });

  $('#addExpense').click(function() {
    let description = $('#description').val();
    let vendor = $('#vendor').val();
    let amount = $('#amount').val();
    createTransaction(description, vendor, amount);
    // alert('button clicked!');
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
