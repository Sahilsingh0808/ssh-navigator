// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addMachine: (machine) => ipcRenderer.invoke('add-machine', machine),
  getMachines: (query, favoritesOnly) => ipcRenderer.invoke('get-machines', query, favoritesOnly),
  toggleFavorite: (id) => ipcRenderer.invoke('toggle-favorite', id),
  deleteMachine: (id) => ipcRenderer.invoke('delete-machine', id),
  connectMachine: (machine) => ipcRenderer.invoke('connect-machine', machine),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
});
