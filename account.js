const Transaction = require('./transaction.js');

class Account {
  constructor() {
    this.transactions = [];
  }

  deposit(amount) {
    const transaction = new Transaction(amount, undefined);
    this.transactions.push(transaction);
  }

  withdraw(amount) {
    const transaction = new Transaction(undefined, amount);
    this.transactions.push(transaction);
  }

  statement() {
    const details = { balance: 0, transactionList: [] };
    this.transactions.map((transaction) => {
      this.formatTransactions(details, transaction);
    });
    const finalList = details.transactionList.reverse()
    finalList.unshift('date || credit || debit || balance');
    return finalList.join('\n');
  }

  // Helper functions for statement function

  formatTransactions(details, transaction) {
    details.balance += transaction.credit ? transaction.credit : -transaction.debit;
    const credit = transaction.credit ? transaction.credit.toFixed(2) : '\b';
    const debit = transaction.debit ? transaction.debit.toFixed(2) : '\b';
    details.transactionList.push(
      `${transaction.date} || ${credit} || ${debit} || ${details.balance.toFixed(2)}`
    );
  }
}

module.exports = Account;
