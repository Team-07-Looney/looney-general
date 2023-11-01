const multiplication = require('./example');

test('7 times 8 should be 56', () => {
    expect(multiplication(7, 8)).toBe(56);
});