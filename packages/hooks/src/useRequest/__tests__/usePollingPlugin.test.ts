import type { RenderHookResult } from '@testing-library/react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';
import { act } from 'react';
import { renderHook } from 'vitest-browser-react';
const { waitFor } = vi;

describe('usePollingPlugin', () => {
  vi.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;

  it('usePollingPlugin pollingInterval=100 pollingWhenHidden=true  should work', async () => {
    const callback = vi.fn();
    act(() => {
      hook = setUp(
        () => {
          callback();
          return request(1);
        },
        {
          pollingInterval: 100,
          pollingWhenHidden: true,
        },
      );
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.data).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(3));

    act(() => {
      hook.result.current.cancel();
    });

    act(() => {
      vi.runAllTimers();
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.run();
    });
    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(4));

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(5));
  });

  let hook2: RenderHookResult<any, any>;
  it('usePollingPlugin pollingErrorRetryCount=3 should work', async () => {
    // if request error and set pollingErrorRetryCount
    // and the number of consecutive failures exceeds pollingErrorRetryCount, polling stops
    let errorCallback: Mock | undefined = undefined;
    act(() => {
      errorCallback = vi.fn();
      hook2 = setUp(() => request(0), {
        pollingErrorRetryCount: 3,
        pollingInterval: 100,
        pollingWhenHidden: true,
        onError: errorCallback,
      });
    });

    expect(hook2.result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(hook2.result.current.loading).toBe(false));
    expect(errorCallback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(3));

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(4));

    act(() => {
      vi.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(4);

    act(() => {
      hook2.result.current.run();
    });
    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(5));
  });
});
