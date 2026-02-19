interface ValidateOptions {
    envPath: string;
    examplePath: string;
}
declare function validateEnv(options: ValidateOptions): void;

interface SyncOptions {
    envPath: string;
    examplePath: string;
}
declare function syncEnv(options: SyncOptions): void;

declare function loadEnv(path: string, required?: boolean): Record<string, string>;

export { loadEnv, syncEnv, validateEnv };
