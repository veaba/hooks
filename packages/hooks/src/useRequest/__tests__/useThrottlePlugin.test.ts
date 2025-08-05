import type { RenderHookResult } from '@testing-library/react';
import { renderHook } from 'vitest-browser-react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';
import { act } from 'react';

describe('useThrottlePlugin', () => {
  vi.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;
  it('useThrottlePlugin should work', async () => {
    const callback = vi.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          throttleWait: 100,
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
      vi.advanceTimersByTime(40);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
