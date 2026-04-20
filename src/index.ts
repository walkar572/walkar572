export function once(_target: object, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  let called = false;
  let result: unknown;
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    if (!called) {
      called = true;
      result = originalMethod.apply(this, args);
    }
    return result;
  };

  return descriptor;
}

export function identifier(uid: string) {
  return function <T extends { new(...args: any[]): object }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
      }

      identify(): string {
        return `${constructor.name}-${uid}`;
      }
    } as T;
  };
}