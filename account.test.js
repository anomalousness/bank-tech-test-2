const Account = require('./account.js');
const Transaction = require('./transaction.js');
jest.mock('./transaction.js');

describe('Account class', () => {
  let account;

  beforeEach(() => {
    Transaction.mockClear();
    account = new Account;
    Transaction.mockImplementation((credit, debit) => {
      return {
        credit,
        debit,
        date: '01/04/2000',
      };
    });
  })

  test('should initialise with an empty transactions array', () => {
    expect(account.transactions.length).toBe(0);
  });

  test('should add one item to the transactions array when a deposit is made', () => {
    account.deposit(100);
    expect(account.transactions.length).toBe(1);
    expect(Transaction).toHaveBeenCalledWith(100, 0);
    expect(Transaction).toHaveBeenCalledTimes(1);
  });
  
  test('should add 3 items to the transactions array when 3 deposits are made', () => {
    account.deposit(1000);
    account.deposit(10);
    account.deposit(50);
    expect(account.transactions.length).toBe(3);
    expect(Transaction).toHaveBeenCalledWith(1000, 0);
    expect(Transaction).toHaveBeenCalledWith(10, 0);
    expect(Transaction).toHaveBeenCalledWith(50, 0);
    expect(Transaction).toHaveBeenCalledTimes(3);
  });

  test('should add one item to the transactions array when a withdrawal is made', () => {
    account.withdraw(100);
    expect(account.transactions.length).toBe(1);
    expect(Transaction).toHaveBeenCalledWith(0, 100);
    expect(Transaction).toHaveBeenCalledTimes(1);
  });

  test('should add 3 items to the transactions array when 3 withdrawals are made', () => {
    account.withdraw(1000);
    account.withdraw(10);
    account.withdraw(50);
    expect(account.transactions.length).toBe(3);
    expect(Transaction).toHaveBeenCalledWith(0, 1000);
    expect(Transaction).toHaveBeenCalledWith(0, 10);
    expect(Transaction).toHaveBeenCalledWith(0, 50);
    expect(Transaction).toHaveBeenCalledTimes(3);
  });

  test('should add 3 items to the transactions array when 2 withdrawals & a deposit are made', () => {
    account.withdraw(99);
    account.deposit(13);
    account.withdraw(57);
    expect(account.transactions.length).toBe(3);
    expect(Transaction).toHaveBeenCalledWith(0, 99);
    expect(Transaction).toHaveBeenCalledWith(13, 0);
    expect(Transaction).toHaveBeenCalledWith(0, 57);
    expect(Transaction).toHaveBeenCalledTimes(3);
  });
});