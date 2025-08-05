import { renderHook } from 'vitest-browser-react';
import useScroll from '../index';

describe('useScroll', () => {
  it('document body', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current).toBeUndefined();
  });
});
