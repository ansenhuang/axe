import { Input } from './Input';

describe('Input', () => {
  const input = new Input();

  test('should return Input', () => {
    expect(input.get()).toBe('Input');
  });
});
