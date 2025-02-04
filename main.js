// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const dataStore = require('./dataStore');

function createWindow() {
    const win = new BrowserWindow({
      width: 1000,
      height: 700,
      icon: path.join(__dirname, 'assets', 'icon.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true
      }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    app.setName("SSH Navigator");
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

/** IPC Handlers **/
// IPC handler to add a new machine
ipcMain.handle('add-machine', async (event, machine) => {
    try {
      // Attempt to fix PEM file permissions if the file exists
      if (fs.existsSync(machine.key)) {
        try {
          fs.chmodSync(machine.key, 0o600);
          console.log(`Permissions updated for ${machine.key}`);
        } catch (chmodErr) {
          console.error('Error setting PEM file permissions:', chmodErr);
          // Optionally, you can return an error or a warning to the user.
        }
      } else {
        console.warn(`PEM file not found: ${machine.key}`);
      }
      
      // Add machine to your data store after fixing permissions
      const newMachine = await dataStore.addMachine(machine);
      return { success: true, machine: newMachine };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

// Get machines with optional query and favorites filtering
ipcMain.handle('get-machines', async (event, query, favoritesOnly) => {
  try {
    let machines = await dataStore.getMachines(query);
    if (favoritesOnly) {
      machines = machines.filter(m => m.favorite);
    }
    return { success: true, machines };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Toggle favorite status
ipcMain.handle('toggle-favorite', async (event, id) => {
  try {
    const updated = await dataStore.toggleFavorite(id);
    return { success: true, machine: updated };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Delete machine
ipcMain.handle('delete-machine', async (event, id) => {
  try {
    await dataStore.deleteMachine(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC handler to open the file selection dialog for PEM/Key files
ipcMain.handle('open-file-dialog', async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'PEM Files', extensions: ['pem'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  });

// Connect to machine (opens terminal with SSH)
ipcMain.handle('connect-machine', async (event, machine) => {
    try {
      // Ensure that the PEM file has secure permissions (600)
      if (fs.existsSync(machine.key)) {
        try {
          fs.chmodSync(machine.key, 0o600);
          console.log(`Permissions updated to 600 for ${machine.key}`);
        } catch (chmodErr) {
          console.error(`Error setting PEM file permissions for ${machine.key}:`, chmodErr);
          // Optionally, you can inform the user about this error.
        }
      } else {
        console.warn(`PEM file not found: ${machine.key}`);
      }
      
      // Now attempt to connect
      connectToMachine(machine);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });



// In main.js, add a function to open an embedded terminal window:
function openEmbeddedTerminal() {
    const termWin = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true
      }
    });
    termWin.loadFile('terminal.html');
  }
  
  // And add an IPC handler if you want to trigger it from the renderer:
  ipcMain.handle('open-embedded-terminal', () => {
    openEmbeddedTerminal();
  });

// Helper function to spawn an SSH command in a new terminal window.
function connectToMachine(machine) {
    const { username, ip, key } = machine;
    const sshCmd = `ssh ${username}@${ip} -i ${key}`;
    
    if (process.platform === 'darwin') {
      // For macOS, using AppleScript and appending "; exec bash" to keep the terminal open
      const appleScriptCmd = `tell application "Terminal" to do script "${sshCmd}; exec bash"`;
      spawn('osascript', ['-e', appleScriptCmd]);
    } else if (process.platform === 'linux') {
      const terminals = ['gnome-terminal', 'konsole', 'x-terminal-emulator', 'xterm'];
      let spawned = false;
      for (const term of terminals) {
        try {
          if (term === 'xterm') {
            // Use the -hold flag for xterm so it remains open
            spawn(term, ['-hold', '-e', sshCmd], { detached: true });
          } else if (term === 'gnome-terminal' || term === 'konsole') {
            spawn(term, ['--', 'bash', '-c', `${sshCmd}; exec bash`], { detached: true });
          } else {
            spawn(term, ['-e', `bash -c '${sshCmd}; exec bash'`], { detached: true });
          }
          spawned = true;
          break;
        } catch (err) {
          // Try the next terminal
        }
      }
      if (!spawned) {
        throw new Error('No supported terminal emulator found.');
      }
    } else {
      throw new Error('Platform not supported for auto-launching SSH.');
    }
  }