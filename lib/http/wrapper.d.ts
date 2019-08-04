declare const wrapper: {
    /**
     * Wrap async express http request end return promise or call next on catch
     * @param target
     * @param key
     * @param descriptor
     */
    httpAsyncWrap: (target: object, key: string, descriptor: TypedPropertyDescriptor<any>) => any;
};
export { wrapper };
