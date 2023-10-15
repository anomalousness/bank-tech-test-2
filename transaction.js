class Transaction {
  constructor(credit, debit) {
    this.credit = credit;
    this.debit = debit;
    this.date = new Date().toLocaleDateString('en-GB');
  }
};

module.exports = Transaction;

// const test = new Transaction(100, 0);
// console.log(test)