declare const concurrentDataAccessHelper: {
    errorMessage: Readonly<{
        concurrentDataAccess: (dbData?: any) => any;
        notFound: () => {
            status: number;
            message: {
                msg: string;
            };
        };
    }>;
    checkForConcurrentDataAccessError: (userData: any, dbData: any) => Error;
};
export { concurrentDataAccessHelper };
