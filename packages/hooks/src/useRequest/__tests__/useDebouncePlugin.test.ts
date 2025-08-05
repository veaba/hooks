import type { RenderHookResult } from '@testing-library/react';
import { vi } from 'vitest';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';
import { act } from 'react';
import { renderHook } from 'vitest-browser-react';
const { waitFor} = vi

describe('useDebouncePlugin', () => {
  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;

  it('useDebouncePlugin should work', async () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          debounceWait: 100,
        },
      );
    });

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.run(3);
      vi.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.run(3);
      vi.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));

    act(() => {
      hook.result.current.run(1);
      vi.advanceTimersByTime(50);
      hook.result.current.run(2);
      vi.advanceTimersByTime(50);
      hook.result.current.cancel();
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
