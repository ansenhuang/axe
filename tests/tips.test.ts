import tips from '@axe/tips';

describe('initial instance of tips', () => {
  const tipsEl = document.body.querySelector('.tips') as HTMLElement;

  test('tips should inject to body', () => {
    expect(tipsEl).toBeInstanceOf(HTMLDivElement);
  });

  test('tips should be hidden', () => {
    expect(tipsEl.style.display).toBe('none');
  });

  test('show tips', () => {
    const callback = jest.fn();
    const content = 'Hello Tips!';
    const duration = 2000;
    tips.show({ content, duration }, callback);

    expect(tipsEl.style.display).not.toBe('none');
    expect((tipsEl.querySelector('.body') as HTMLElement).textContent).toBe(content);
    setTimeout(() => {
      expect(callback).toBeCalled();
      expect(tipsEl.style.display).toBe('none');
    }, duration + 1);
  });
});
