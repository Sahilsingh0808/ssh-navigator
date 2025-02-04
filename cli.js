#!/usr/bin/env node
// cli.js
const { program } = require('commander');
const dataStore = require('./dataStore');
const { spawn } = require('child_process');
const os = require('os');

async function listMachines(query) {
  try {
    const machines = await dataStore.getMachines(query);
    if (machines.length === 0) {
      console.log("No machines found.");
      return;
    }
    machines.forEach(machine => {
      console.log(`[${machine.id}] ${machine.favorite ? '★' : ' '} ${machine.name} - ${machine.username}@${machine.ip} (Hostname: ${machine.hostname}) Tags: ${machine.tags.join(', ')}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function connectMachine(machineId) {
  try {
    const machines = await dataStore.getMachines('');
    const machine = machines.find(m => m.id === machineId);
    if (!machine) {
      console.error("Machine not found!");
      return;
    }
    const { username, ip, key } = machine;
    const sshCmd = `ssh ${username}@${ip} -i ${key}`;

    if (os.platform() === 'darwin') {
      spawn('osascript', ['-e', `tell application "Terminal" to do script "${sshCmd}"`], { stdio: 'ignore', detached: true });
    } else if (os.platform() === 'linux') {
      const terminals = ['gnome-terminal', 'x-terminal-emulator', 'konsole', 'xterm'];
      let spawned = false;
      for (const term of terminals) {
        try {
          spawn(term, ['-e', sshCmd], { detached: true });
          spawned = true;
          break;
        } catch (err) {}
      }
      if (!spawned) {
        console.error('No supported terminal emulator found.');
      }
    } else {
      console.error('Platform not supported for auto-launching SSH.');
    }
  } catch (error) {
    console.error("Error connecting:", error.message);
  }
}

program
  .name('ssh-navigator')
  .description('A CLI tool to manage SSH machines.')
  .version('1.0.0');

program
  .command('list')
  .description('List all machines or search by query.')
  .option('-q, --query <query>', 'Search query')
  .action((options) => {
    listMachines(options.query || '');
  });

program
  .command('connect')
  .description('Connect to a machine by its ID.')
  .argument('<id>', 'Machine ID')
  .action((id) => {
    connectMachine(id);
  });

program.parse(process.argv);
