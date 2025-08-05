import { renderHook } from 'vitest-browser-react';
import useIsomorphicLayoutEffect from '../index';

describe('useIsomorphicLayoutEffect', () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  it('cheak return value', () => {
    expect(result.current).toBeUndefined();
  });
});
