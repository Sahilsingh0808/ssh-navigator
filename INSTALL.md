Below is a detailed installation guide for your app, **SSH Navigator**, that you can include in your `README.md` file to help users install it on Linux, macOS, and Windows.

---

# Installation Guide

## Table of Contents

1. [Linux Installation](#linux-installation)
   - [Using AppImage](#using-appimage)
   - [Using DEB Package](#using-deb-package)
   - [Using ZIP File](#using-zip-file)
2. [macOS Installation](#macos-installation)
3. [Windows Installation](#windows-installation)

---

## Linux Installation

SSH Navigator is available as an **AppImage**, **DEB package**, and a **ZIP archive** for Linux. Follow the steps below to install it on your Linux system.

### Using AppImage

1. **Download the AppImage**  
   From the [releases page](https://github.com/SahilSingh0808/ssh-navigator/releases), download the file:
   ```
   SSH-Navigator-<version>.AppImage
   ```

2. **Make the AppImage Executable**  
   Open a terminal and navigate to the folder containing the AppImage. Run the following command:
   ```bash
   chmod +x SSH-Navigator-<version>.AppImage
   ```

3. **Run the AppImage**  
   Execute the AppImage by running:
   ```bash
   ./SSH-Navigator-<version>.AppImage
   ```

   This will launch the application. No further installation is required.

---

### Using DEB Package (For Debian/Ubuntu-based Systems)

1. **Download the DEB File**  
   Download the file:
   ```
   ssh-navigator_<version>_amd64.deb
   ```

2. **Install the DEB Package**  
   Open a terminal, navigate to the folder containing the `.deb` file, and run:
   ```bash
   sudo dpkg -i ssh-navigator_<version>_amd64.deb
   ```

3. **Fix Missing Dependencies (if needed)**  
   If you encounter dependency issues, run:
   ```bash
   sudo apt-get install -f
   ```

4. **Run the Application**  
   Launch SSH Navigator from the applications menu or by typing:
   ```bash
   ssh-navigator
   ```

---

### Using ZIP File

1. **Download the ZIP File**  
   Download the file:
   ```
   ssh-navigator-<version>.zip
   ```

2. **Extract the ZIP File**  
   Extract the contents of the ZIP archive using a file manager or the terminal:
   ```bash
   unzip ssh-navigator-<version>.zip
   ```

3. **Run the Application**  
   Navigate to the extracted folder and run the app:
   ```bash
   ./SSH-Navigator
   ```

---

## macOS Installation

SSH Navigator is distributed as a **DMG** file for macOS. Follow the steps below to install it:

1. **Download the DMG File**  
   From the [releases page](https://github.com/SahilSingh0808/ssh-navigator/releases), download the DMG file:
   ```
   SSH-Navigator-<version>.dmg
   ```

2. **Open the DMG File**  
   Double-click the `.dmg` file to open it.

3. **Drag and Drop to Install**  
   Drag the SSH Navigator icon into the `Applications` folder.

4. **Run the Application**  
   Open **Launchpad** or the `Applications` folder and click on **SSH Navigator** to start the app.

5. **Security Prompt (if applicable)**  
   If macOS prevents the app from running, do the following:
   - Go to **System Preferences > Security & Privacy > General**.
   - Click "Open Anyway" for SSH Navigator.

---

## Windows Installation

SSH Navigator is distributed as an **NSIS Installer** and a **ZIP archive** for Windows.

### Using NSIS Installer

1. **Download the EXE Installer**  
   From the [releases page](https://github.com/SahilSingh0808/ssh-navigator/releases), download the installer:
   ```
   SSH-Navigator-<version>-setup.exe
   ```

2. **Run the Installer**  
   Double-click the `.exe` file to start the installation process.

3. **Follow the Installation Wizard**  
   - Accept the license agreement.
   - Choose the installation folder (default is recommended).
   - Click "Install."

4. **Launch the Application**  
   After installation, SSH Navigator can be launched from the Start menu or by searching "SSH Navigator" in Windows Search.

---

### Using ZIP File

1. **Download the ZIP File**  
   Download the file:
   ```
   ssh-navigator-<version>.zip
   ```

2. **Extract the ZIP File**  
   Extract the contents of the ZIP archive using File Explorer or another extraction tool (e.g., WinRAR, 7-Zip).

3. **Run the Application**  
   Navigate to the extracted folder and double-click the executable:
   ```
   SSH-Navigator.exe
   ```

---

## Additional Notes

1. **Latest Version:**  
   Always download the latest version of SSH Navigator from the [releases page](https://github.com/SahilSingh0808/ssh-navigator/releases).

2. **System Requirements:**  
   - **Linux:** A 64-bit distribution with AppImage, DEB, or ZIP support.
   - **macOS:** macOS 10.13 or later.
   - **Windows:** Windows 7 or later.

3. **Support:**  
   If you encounter any issues during installation, check the [issues page](https://github.com/SahilSingh0808/ssh-navigator/issues) or open a new issue.

---

This guide ensures that users on Linux, macOS, and Windows can easily download and install SSH Navigator.