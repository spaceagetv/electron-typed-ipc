import { ipcMain, ipcRenderer, webContents } from 'electron';
import { TypedIpcMain, TypedIpcRenderer, TypedWebContents } from './index';

type Config = {
  a: number;
  b: string;
};

type Events = {
  configUpdated: (newConfig?: Config, oldConfig?: Config) => void;
};

type Commands = {
  fetchConfig: () => Config;
  updateConfig: (newConfig: Partial<Config>) => void;
};

export const typedIpcMain = ipcMain as TypedIpcMain<Events, Commands>;
export const typedIpcRenderer = ipcRenderer as TypedIpcRenderer<
  Events,
  Commands
>;

typedIpcMain.handle('fetchConfig', () => {
  return { a: 1, b: 'text1' };
});

export function fetchConfig() {
  const config: Promise<Config> = typedIpcRenderer.invoke('fetchConfig');
  return config;
}

typedIpcRenderer.on('configUpdated', (_, newConfig, oldConfig) => {
  console.log(newConfig, oldConfig);
});

webContents
  .getAllWebContents()
  .forEach((typedWebContents: TypedWebContents<Events, Commands>) => {
    const newConfig = {
      a: 2,
      b: 'text2',
    };
    const oldConfig = {
      a: 1,
      b: 'text1',
    };
    typedWebContents.send('configUpdated', newConfig, oldConfig);

    typedWebContents.ipc.on('configUpdated', (_, newConfig, oldConfig) => {
      console.log(newConfig, oldConfig);
    });

    typedWebContents.ipc.handle('fetchConfig', () => {
      return { a: 2, b: 'text2' };
    });

    typedWebContents.ipc.handle('updateConfig', (_, newConfig) => {
      console.log(newConfig);
    });
  });
