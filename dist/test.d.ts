import { TypedIpcMain, TypedIpcRenderer } from './index';
declare type Config = {
    a: number;
    b: string;
};
declare type Events = {
    configUpdated: (newConfig?: Config, oldConfig?: Config) => void;
};
declare type Commands = {
    fetchConfig: () => Config;
    updateConfig: (newConfig: Partial<Config>) => void;
};
export declare const typedIpcMain: TypedIpcMain<Events, Commands>;
export declare const typedIpcRenderer: TypedIpcRenderer<Events, Commands>;
export declare function fetchConfig(): Promise<Config>;
export {};
