const Transaction = require('./transaction.js');

describe('Transaction class', () => {
  let transaction;
  describe('with mocked date', () => {
    beforeAll(() => {
      const mockDate = new Date('2000-04-01');
      const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    });
    afterAll(() => {
      jest.restoreAllMocks();
    });
    describe('initialisation for a deposit of £100', () => {
      beforeAll(() => {
        transaction = new Transaction(100, 0);
      });

      test('Date is mocked date', () => {
        expect(transaction.date).toBe('01/04/2000');
      });

      test('Date is a string', () => {
        expect(typeof transaction.date).toBe('string');
      });

      test('Date is not longer than 10 chars', () => {
        expect(transaction.date.length).toBeLessThan(11);
      });

      test('Credit is 100', () => {
        expect(transaction.credit).toBe(100);
      });

      test('Debit is 0', () => {
        expect(transaction.debit).toBe(0);
      });
    })
    
    describe('initialisation for a withdrawal of £100', () => {
      beforeAll(() => {
        transaction = new Transaction(0, 100);
      });

      test('Date is mocked date', () => {
        expect(transaction.date).toBe('01/04/2000');
      });

      test('Credit is 0', () => {
        expect(transaction.credit).toBe(0);
      });

      test('Debit is 100', () => {
        expect(transaction.debit).toBe(100);
      });
    });
    
    describe('initialisation for a deposit of £501.99', () => {
      beforeAll(() => {
        transaction = new Transaction(501.99, 0);
      });

      test('Credit is 501.99', () => {
        expect(transaction.credit).toBe(501.99);
      });

      test('Debit is 0', () => {
        expect(transaction.debit).toBe(0);
      });
    });
    
    describe('initialisation for a withdrawal of £50.65', () => {
      beforeAll(() => {
        transaction = new Transaction(0, 50.65);
      });

      test('Credit is 0', () => {
        expect(transaction.credit).toBe(0);
      });

      test('Debit is 50.65', () => {
        expect(transaction.debit).toBe(50.65);
      });
    });
  });

  describe('unmocked time and deposit of £1', () => {
    beforeAll(() => {
      transaction = new Transaction(1, 0);
    });

    test('Date is a string', () => {
      // console.log('date:' ,transaction.date)
      expect(typeof transaction.date).toBe('string');
    });

    test('Date is not longer than 10 chars', () => {
      expect(transaction.date.length).toBeLessThan(11);
    });

    test('Credit is 1', () => {
      expect(transaction.credit).toBe(1);
    });

    test('Debit is 0', () => {
      expect(transaction.debit).toBe(0);
    });
  });
});