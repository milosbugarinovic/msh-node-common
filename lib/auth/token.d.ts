import { CheckTokenOptions, UserData } from '../util/customTypings';
declare const token: {
    check: (options: CheckTokenOptions) => void;
    cleanToken: (authToken: string) => string;
    generateUserData: (decoded: any) => UserData;
};
export { token };
