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

  describe('deposit() and withdraw()', () => {
    test('should add one item to the transactions array when a deposit is made', () => {
      account.deposit(100);
      expect(account.transactions.length).toBe(1);
      expect(Transaction).toHaveBeenCalledWith(100, undefined);
      expect(Transaction).toHaveBeenCalledTimes(1);
    });
    
    test('should add 3 items to the transactions array when 3 deposits are made', () => {
      account.deposit(1000);
      account.deposit(10);
      account.deposit(50);
      expect(account.transactions.length).toBe(3);
      expect(Transaction).toHaveBeenCalledWith(1000, undefined);
      expect(Transaction).toHaveBeenCalledWith(10, undefined);
      expect(Transaction).toHaveBeenCalledWith(50, undefined);
      expect(Transaction).toHaveBeenCalledTimes(3);
    });

    test('should add one item to the transactions array when a withdrawal is made', () => {
      account.withdraw(100);
      expect(account.transactions.length).toBe(1);
      expect(Transaction).toHaveBeenCalledWith(undefined, 100);
      expect(Transaction).toHaveBeenCalledTimes(1);
    });
    
    test('should add 3 items to the transactions array when 3 withdrawals are made', () => {
      account.withdraw(1000);
      account.withdraw(10);
      account.withdraw(50);
      expect(account.transactions.length).toBe(3);
      expect(Transaction).toHaveBeenCalledWith(undefined, 1000);
      expect(Transaction).toHaveBeenCalledWith(undefined, 10);
      expect(Transaction).toHaveBeenCalledWith(undefined, 50);
      expect(Transaction).toHaveBeenCalledTimes(3);
    });

    test('should add 3 items to the transactions array when 2 withdrawals & a deposit are made', () => {
      account.withdraw(99);
      account.deposit(13);
      account.withdraw(57);
      expect(account.transactions.length).toBe(3);
      expect(Transaction).toHaveBeenCalledWith(undefined, 99);
      expect(Transaction).toHaveBeenCalledWith(13, undefined);
      expect(Transaction).toHaveBeenCalledWith(undefined, 57);
      expect(Transaction).toHaveBeenCalledTimes(3);
    });
  })

  describe('statement()', () => {
    test('should print a statement with headers only when there are no transactions', () => {
      expect(account.statement()).toEqual('date || credit || debit || balance')
    });
    
    test('should print a statement with headers and transaction when a £100 deposit has been made', () => {
      account.deposit(100);
      const expectedStatement = 'date || credit || debit || balance\n01/04/2000 || 100.00 || || 100.00'
      expect(account.statement()).toMatch(new RegExp(`^${expectedStatement}$`, 'm'));
    });
    
    test('should print a statement with headers and transaction when a £100 deposit has been made', () => {
      account.deposit(100);
      account.withdraw(10);
      const expectedStatement = 'date || credit || debit || balance\n01/04/2000 || || 10.00 || 90.00\n01/04/2000 || 100.00 || || 100.00'
      expect(account.statement()).toMatch(new RegExp(`^${expectedStatement}$`, 'm'));
    });
    
    test('should print a statement with headers and correct transaction list in reverse chronological order', () => {
      account.deposit(1000);
      account.deposit(2000);
      account.withdraw(500);
      const expectedStatement = 'date || credit || debit || balance\n01/04/2000 || || 500.00 || 2500.00\n01/04/2000 || 2000.00 || || 3000.00\n01/04/2000 || 1000.00 || || 1000.00'
      expect(account.statement()).toMatch(new RegExp(`^${expectedStatement}$`, 'm'));
    });
  });
});