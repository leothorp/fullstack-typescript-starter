declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            API_ORIGIN: string;
            API_PORT: string;
            CLIENT_ORIGIN: string;
            CLIENT_PORT?: string;
        }
    }
}
export declare const NODE_ENV: string;
export declare const isDevelopment: boolean;
export declare const isProduction: boolean;
export declare const API_ORIGIN: string;
export declare const API_PORT: number;
export declare const CLIENT_ORIGIN: string;
export declare const CLIENT_PORT: number | "" | undefined;
//# sourceMappingURL=constants.d.ts.map