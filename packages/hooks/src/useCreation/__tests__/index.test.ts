import { renderHook } from 'vitest-browser-react';
import { useState } from 'react';
import useCreation from '../index';
import { act } from 'react';

describe('useCreation', () => {
  class Foo {
    constructor() {
      this.data = Math.random();
    }

    data: number;
  }

  const setUp = () =>
    renderHook(() => {
      const [count, setCount] = useState(0);
      const [, setFlag] = useState({});
      const foo = useCreation(() => new Foo(), [count]);
      return {
        foo,
        setCount,
        count,
        setFlag,
      };
    });

  it('should work', () => {
    const hook = setUp();
    const { foo } = hook.result.current;
    act(() => {
      hook.result.current.setFlag({});
    });
    expect(hook.result.current.foo).toBe(foo);
    act(() => {
      hook.result.current.setCount(1);
    });
    expect(hook.result.current.foo).not.toBe(foo);
  });
});
