import { renderHook } from 'vitest-browser-react';
import type { Options } from '../index';
import useDrag from '../index';
import type { BasicTarget } from '../../utils/domTarget';
import { vi, describe, it } from 'vitest';

const setup = <T>(data: T, target: BasicTarget, options?: Options) =>
  renderHook((newData: T) => useDrag(newData ? newData : data, target, options));

const events: Record<string, (event: any) => void> = {};
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
  setAttribute: vi.fn(),
};

describe('useDrag', () => {
  it('should add/remove listener on mount/unmount', () => {
    const { unmount } = setup(1, mockTarget as any);
    expect(mockTarget.addEventListener).toBeCalled();
    expect(mockTarget.addEventListener.mock.calls[0][0]).toBe('dragstart');
    expect(mockTarget.addEventListener.mock.calls[1][0]).toBe('dragend');
    expect(mockTarget.setAttribute).toBeCalledWith('draggable', 'true');
    unmount();
    expect(mockTarget.removeEventListener).toBeCalled();
  });

  it('should triggle drag callback', () => {
    const onDragStart = vi.fn();
    const onDragEnd = vi.fn();
    const mockEvent = {
      dataTransfer: {
        setData: vi.fn(),
      },
    };
    const hook = setup(1, mockTarget as any, {
      onDragStart,
      onDragEnd,
    });
    events.dragstart(mockEvent);
    expect(onDragStart).toBeCalled();
    expect(mockEvent.dataTransfer.setData).toBeCalledWith('custom', '1');
    events.dragend(mockEvent);
    expect(onDragEnd).toBeCalled();

    hook.rerender(2);

    events.dragstart(mockEvent);
    expect(onDragStart).toBeCalled();
    expect(mockEvent.dataTransfer.setData).toHaveBeenLastCalledWith('custom', '2');
    events.dragend(mockEvent);
    expect(onDragEnd).toBeCalled();
  });

  /**
   * @vitest-environment jsdom
   */
  it(`should not work when target don't support addEventListener method`, () => {
    Object.defineProperty(mockTarget, 'addEventListener', {
      get() {
        return false;
      },
    });
    setup(1, mockTarget as any);
    expect(mockTarget.setAttribute).not.toBeCalled();
  });
});
