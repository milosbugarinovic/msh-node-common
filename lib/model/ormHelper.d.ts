declare const ormHelper: {
    unixNow: string;
    jsonGetter: (self: any, propertyName: any) => any;
    baseModelOptions: (dbSchema: string) => any;
};
export { ormHelper };
