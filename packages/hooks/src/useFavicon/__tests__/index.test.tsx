import { renderHook } from 'vitest-browser-react'
import useFavicon from '../index';

describe('useFavicon', () => {
  it('should set the favicon', () => {
    expect(document.querySelector("link[href*='hook-favicon.ico']")).toBeNull();
    renderHook(() => useFavicon('hook-favicon.ico'));
    expect(document.querySelector("link[rel*='icon']")).not.toBeNull();
  });

  it('should support svg/png/ico/gif', () => {
    const { rerender } = renderHook((url?: string) => useFavicon(url || ''));
    const suffixs = ['svg', 'png', 'ico', 'gif'] as const;
    const imgTypeMap = {
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
      gif: 'image/gif',
      png: 'image/png',
    } as const;
    suffixs.forEach((suffix) => {
      const url = `favicon.${suffix}`;
      rerender(url);
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

      expect(link).toHaveAttribute('type', imgTypeMap[suffix]);
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('rel', 'shortcut icon');
    });
  });
});
