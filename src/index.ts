export function once(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  let called = false;
  let result: any;
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]): any {
    if (!called) {
      called = true;
      result = originalMethod.apply(this, args);
    }
    return result;
  };

  return descriptor;
}

export function identifier(uid: string) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      identify() {
        return `${constructor.name}-${uid}`;
      }
    };
  };
}