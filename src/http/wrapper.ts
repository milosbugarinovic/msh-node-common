const wrapper = {
  /**
   * Wrap async express http request end return promise or call next on catch
   * @param target
   * @param key
   * @param descriptor
   */
  httpAsyncWrap: (target: object, key: string, descriptor: TypedPropertyDescriptor<any>): any => {
    const originalMethod = descriptor.value
    descriptor.value = function(): any {
      // tslint:disable-line
      const next = arguments[2]
      return Promise.resolve(originalMethod.apply(this, arguments)).catch(next)
    }
    return descriptor
  },
}

export { wrapper }
