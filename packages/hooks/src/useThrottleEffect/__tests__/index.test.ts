import type { RenderHookResult } from '@testing-library/react';
import { renderHook } from 'vitest-browser-react';
import useThrottleEffect from '../index';
import { sleep } from '../../utils/testingHelpers';
import { act } from 'react';

let hook: RenderHookResult<any, any>;

describe('useThrottleEffect', () => {
  it('useThrottleEffect should work', async () => {
    const mockEffect = vi.fn(() => {});
    const mockCleanUp = vi.fn(() => {});
    act(() => {
      hook = renderHook(
        ({ value, wait }) =>
          useThrottleEffect(
            () => {
              mockEffect();
              return () => {
                mockCleanUp();
              };
            },
            [value],
            { wait },
          ),
        { initialProps: { value: 1, wait: 200 } },
      );
    });

    hook.rerender({ value: 2, wait: 200 });
    await sleep(100);
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    await act(async () => {
      await sleep(150);
    });
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(1);

    hook.rerender({ value: 3, wait: 100 });
    await sleep(50);
    expect(mockEffect.mock.calls.length).toBe(3);
    expect(mockCleanUp.mock.calls.length).toBe(2);
    await act(async () => {
      await sleep(100);
    });
    expect(mockEffect.mock.calls.length).toBe(3);
    expect(mockCleanUp.mock.calls.length).toBe(2);
  });

  it('should cancel timeout on unmount', async () => {
    const mockEffect = vi.fn(() => {});
    const mockCleanUp = vi.fn(() => {});

    const hook2 = renderHook(
      (props) =>
        useThrottleEffect(
          () => {
            mockEffect();
            return () => {
              mockCleanUp();
            };
          },
          [props],
          { wait: 200 },
        ),
      { initialProps: 0 },
    );

    await act(async () => {
      expect(mockEffect.mock.calls.length).toBe(1);
      expect(mockCleanUp.mock.calls.length).toBe(0);

      hook2.rerender(1);
      await sleep(50);
      hook2.unmount();

      expect(mockEffect.mock.calls.length).toBe(1);
      expect(mockCleanUp.mock.calls.length).toBe(1);
    });
  });
});
