// addRenderer.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('machine-form');
    const backBtn = document.getElementById('back-btn');
    const browseKeyBtn = document.getElementById('browse-key');
    const keyInput = document.getElementById('key');
  
    // When the Browse button is clicked, open the file dialog.
    browseKeyBtn.addEventListener('click', async () => {
      const filePath = await window.api.openFileDialog();
      if (filePath) {
        keyInput.value = filePath;
      }
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const machine = {
        name: document.getElementById('name').value.trim(),
        tags: document.getElementById('tags').value.split(',').map(s => s.trim()).filter(s => s),
        ip: document.getElementById('ip').value.trim(),
        hostname: document.getElementById('hostname').value.trim(),
        username: document.getElementById('username').value.trim(),
        key: keyInput.value.trim()
      };
  
      const result = await window.api.addMachine(machine);
      if (result.success) {
        alert('Machine added successfully!');
        window.location.href = 'index.html';
      } else {
        alert("Error adding machine: " + result.error);
      }
    });
  
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });
  