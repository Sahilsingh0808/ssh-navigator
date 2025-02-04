// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const machineList = document.getElementById('machine-list');
    const addMachineBtn = document.getElementById('add-machine-btn');
    const favoritesBtn = document.getElementById('favorites-btn');
  
    let favoritesOnly = false;
    let searchQuery = '';
    let debounceTimeout;
  
    function debounce(func, delay) {
      return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
      };
    }
  
    async function refreshMachines() {
      const result = await window.api.getMachines(searchQuery, favoritesOnly);
      if (result.success) {
        renderMachines(result.machines);
      } else {
        alert("Error fetching machines: " + result.error);
      }
    }
  
    function renderMachines(machines) {
      machineList.innerHTML = '';
      if (machines.length === 0) {
        machineList.innerHTML = '<p style="text-align: center;">No machines found.</p>';
        return;
      }
      machines.forEach(machine => {
        const div = document.createElement('div');
        div.className = 'machine-item';
  
        const details = document.createElement('div');
        details.className = 'machine-details';
        details.innerHTML = `
          <strong>${machine.name}</strong><br>
          ${machine.username}@${machine.ip} <br>
          Tags: ${machine.tags.length ? machine.tags.join(', ') : 'None'}
        `;
  
        const actions = document.createElement('div');
        actions.className = 'machine-actions';
  
        // Connect Button
        const connectBtn = document.createElement('button');
        connectBtn.textContent = 'Connect';
        connectBtn.addEventListener('click', async () => {
          const res = await window.api.connectMachine(machine);
          if (!res.success) {
            alert("Error connecting: " + res.error);
          }
        });
  
        // Favorite Toggle Button
        const favBtn = document.createElement('button');
        favBtn.textContent = machine.favorite ? '★' : '☆';
        favBtn.addEventListener('click', async () => {
          const res = await window.api.toggleFavorite(machine.id);
          if (res.success) {
            refreshMachines();
          } else {
            alert("Error toggling favorite: " + res.error);
          }
        });
  
        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
          createDeleteModal(machine.name, async () => {
            const res = await window.api.deleteMachine(machine.id);
            if (res.success) {
              refreshMachines();
            } else {
              alert("Error deleting machine: " + res.error);
            }
          });
        });
  
        actions.appendChild(connectBtn);
        actions.appendChild(favBtn);
        actions.appendChild(deleteBtn);
  
        div.appendChild(details);
        div.appendChild(actions);
        machineList.appendChild(div);
      });
    }
  
    function createDeleteModal(machineName, onConfirm) {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
  
      const modal = document.createElement('div');
      modal.className = 'modal';
  
      const content = document.createElement('div');
      content.className = 'modal-content';
      content.innerHTML = `
        <p>SYSTEM WARNING:</p>
        <p>You are about to delete machine "${machineName}"</p>
        <p>This action cannot be undone.</p>
        <p>Do you wish to proceed?</p>
      `;
  
      const buttons = document.createElement('div');
      buttons.className = 'modal-buttons';
  
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'CANCEL';
      cancelBtn.onclick = () => overlay.remove();
  
      const confirmBtn = document.createElement('button');
      confirmBtn.textContent = 'DELETE';
      confirmBtn.className = 'delete-confirm';
      confirmBtn.onclick = () => {
        onConfirm();
        overlay.remove();
      };
  
      buttons.appendChild(cancelBtn);
      buttons.appendChild(confirmBtn);
      modal.appendChild(content);
      modal.appendChild(buttons);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  
    // Debounced search input event
    searchInput.addEventListener('input', debounce(() => {
      searchQuery = searchInput.value;
      refreshMachines();
    }, 300));
  
    // Add Machine button
    addMachineBtn.addEventListener('click', () => {
      window.location.href = 'add.html';
    });
  
    // Favorites toggle button
    favoritesBtn.addEventListener('click', () => {
      favoritesOnly = !favoritesOnly;
      favoritesBtn.textContent = favoritesOnly ? 'All Machines' : 'Favorites';
      refreshMachines();
    });
  
    // Initial load
    refreshMachines();
  });
  
  document.getElementById('embedded-terminal-btn').addEventListener('click', () => {
    window.api.openEmbeddedTerminal();
  });