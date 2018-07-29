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

let transactionId = 4;
let db = firebase.database();
db.ref('transactions/' + transactionId).set({
    descripiton: 'Dinner for 5',
    vendor: 'Can Bey Doner Kebab',
    amount: '$9.08',
});
