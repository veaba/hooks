import type {RenderHookResult} from '@testing-library/react';
import { renderHook} from 'vitest-browser-react';
import useRequest from '../index';
import {request} from '../../utils/testingHelpers';
import {vi} from 'vitest';
import type { Mock } from 'vitest'
import { act } from 'react'

const waitFor = vi.waitFor

describe('useRetryPlugin', () => {
  vi.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => {
    return useRequest(service, o || options)
  });

  let hook: RenderHookResult<any, any>;
  let hook2: RenderHookResult<any, any>;

  it('useRetryPlugin should work', async () => {
    let errorCallback: Mock | undefined = undefined;
    act(() => {
      errorCallback = vi.fn();
      hook = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    act(() => {
      vi.setConfig({testTimeout: 10000});
      vi.advanceTimersByTime(500);
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

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
    hook.unmount();

    // cancel should work
    act(() => {
      errorCallback = vi.fn();
      hook2 = setUp(() => request(0), {
        retryCount: 3,
        onError: errorCallback,
      });
    });
    expect(errorCallback).toHaveBeenCalledTimes(0);

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(1));

    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => expect(errorCallback).toHaveBeenCalledTimes(2));
    act(() => {
      hook2.result.current.cancel();
    });
    act(() => {
      vi.runAllTimers();
    });
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook2.unmount();
  });
});
