import { describe, expect, it } from 'vitest';
import { getErrorMessage } from './errors';

describe('getErrorMessage', () => {
  it('returns message for Error with message', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('returns name for Error without message', () => {
    const e = new Error();
    // simulate empty message
    (e as any).message = '';
    expect(getErrorMessage(e)).toBe(e.name);
  });

  it('returns string value for string errors', () => {
    expect(getErrorMessage('oops')).toBe('oops');
  });

  it('returns json for objects with enumerable props', () => {
    const obj = { a: 1 };
    expect(getErrorMessage(obj)).toBe(JSON.stringify(obj));
  });

  it('returns constructor name for non-enumerable-only objects', () => {
    function Foo(this: any) {}
    Object.defineProperty(Foo.prototype, 'secret', { value: 1, enumerable: false });
    const instance = new (Foo as any)();
    // ensure JSON.stringify(instance) === '{}'
    expect(JSON.stringify(instance)).toBe('{}');
    expect(getErrorMessage(instance)).toBe('Foo');
  });

  it('handles undefined and null', () => {
    expect(getErrorMessage(undefined)).toBe('undefined');
    expect(getErrorMessage(null)).toBe('null');
  });

  it('handles circular objects without throwing', () => {
    const a: any = {};
    a.self = a;
    const res = getErrorMessage(a);
    expect(typeof res).toBe('string');
    expect(res.length).toBeGreaterThan(0);
  });
});
