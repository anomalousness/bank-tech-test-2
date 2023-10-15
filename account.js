const Transaction = require('./transaction.js')

class Account {
  constructor() {
    this.transactions = [];
  }

  deposit(amount) {
    const transaction = new Transaction(amount, 0);
    this.transactions.push(transaction);
  }

  withdraw(amount) {
    const transaction = new Transaction(0, amount);
    this.transactions.push(transaction);
  }
}

module.exports = Account;