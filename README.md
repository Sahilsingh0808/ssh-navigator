Below is an example of a detailed `README.md` file for your project. You can copy it into your project’s root directory and adjust any details as needed.

# SSH Navigator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Sahilsingh0808/ssh-navigator/blob/master/LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Sahilsingh0808/ssh-navigator)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/ssh-navigator.svg)](https://github.com/Sahilsingh0808/ssh-navigator/issues)

SSH Navigator is an open-source, cross-platform SSH management tool built with [Electron](https://www.electronjs.org/). Designed for developers and system administrators, SSH Navigator helps you easily manage multiple SSH connections from one user-friendly interface on Linux and macOS.

> **Note:** When connecting to a machine, SSH Navigator launches your system’s default terminal to initiate the SSH session.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [GUI Usage](#gui-usage)
  - [CLI Usage](#cli-usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Machine Management:**  
  - **Add Machines:** Store SSH connection details including machine name, tags, IP address, hostname, username, and path to the PEM/Key file.
  - **List & Search:** Easily view and search your machines using any detail (name, tags, IP, hostname, username, or key path).
  - **Favorites:** Mark frequently used machines as favorites and filter the list accordingly.
  - **Delete Machines:** Remove unwanted machines from your list.

- **SSH Connection:**  
  - Click the **Connect** button for any machine to launch your system’s default terminal and automatically execute the SSH command with the proper key.  
  - The application takes care of setting the PEM file’s permissions to secure mode (`600`) before connecting.

- **Command-Line Interface (CLI):**  
  - Manage and connect to your machines directly from the terminal with simple commands.

## Installation

### Prerequisites

- **Operating System:** Linux or macOS
- **Node.js:** v14 or higher is recommended
- **npm:** Comes with Node.js

### Clone the Repository

```bash
git clone https://github.com/yourusername/ssh-navigator.git
cd ssh-navigator
```

### Install Dependencies

```bash
npm install
```

### Running the Application

#### GUI Version

To start the Electron GUI:

```bash
npm start
```

#### CLI Version

You can run the CLI directly with:

```bash
node cli.js list
node cli.js connect <machine-id>
```

If you wish to install the CLI globally:

```bash
npm install -g .
```

Then use the CLI as:

```bash
ssh-navigator list
ssh-navigator connect <machine-id>
```

## Usage

### GUI Usage

1. **Add a Machine:**
   - Click the **Add Machine** button.
   - Fill in the details:
     - **Name:** A friendly name for the machine.
     - **Tags:** (Comma separated) Tags help you categorize and search machines.
     - **IP Address:** The machine’s IP.
     - **Hostname:** (Optional) The machine’s network name for added context.
     - **Username:** The SSH username.
     - **Path to PEM/Key File:** The full path to your PEM or key file.  
       *Note:* SSH Navigator automatically sets the file permissions to `600` for security.
   - Submit the form to add the machine.

2. **List and Search Machines:**
   - All added machines are listed on the home screen.
   - Use the search bar to filter machines by any detail (name, tags, IP, hostname, username, or key path).

3. **Favorites:**
   - Click the **Favorites** button (top right) to filter and view your favorite machines.
   - Mark or unmark a machine as favorite using the star icon.

4. **Connect to a Machine:**
   - Click the **Connect** button next to a machine.
   - Your system’s terminal will open and execute the SSH command (e.g., `ssh username@ip -i path/to/key`).

5. **Delete a Machine:**
   - Click the **Delete** button next to a machine to remove it from your list.

### CLI Usage

SSH Navigator also offers a command-line interface for quick access:

- **List Machines:**

  ```bash
  ssh-navigator list
  ```

  To filter by a search query:

  ```bash
  ssh-navigator list -q "search-term"
  ```

- **Connect to a Machine:**

  ```bash
  ssh-navigator connect <machine-id>
  ```

  Replace `<machine-id>` with the machine ID displayed in the machine list.

## Configuration

SSH Navigator stores machine data (name, tags, IP, hostname, username, and key) in a JSON file located in your user’s data directory. The application ensures that your PEM/Key file is secured by automatically setting its permissions to `600` upon adding a machine.

## Troubleshooting

- **PEM File Permissions Warning:**  
  If you see the error:
  ```
  WARNING: UNPROTECTED PRIVATE KEY FILE!
  ```
  SSH Navigator attempts to fix this by setting the file permissions to `600`. You can manually adjust permissions by running:
  ```bash
  chmod 600 /path/to/your.pem
  ```

- **Terminal Closes Immediately:**  
  Ensure that your SSH connection details (username, IP, and key file) are correct. Verify that your SSH configuration works by testing it directly in a terminal.

- **CLI Issues:**  
  If you have trouble with the CLI version, ensure you have installed it globally if desired and that you’re using the correct command syntax.

## Contributing

Contributions are welcome! If you’d like to help improve SSH Navigator, please follow these steps:

1. Fork the repository.
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Electron](https://www.electronjs.org/) – The framework used to build this desktop application.
- [Commander.js](https://github.com/tj/commander.js/) – For CLI parsing and management.
- Other open-source libraries and contributors who have made this project possible.

---

Enjoy using SSH Navigator and happy coding!

This README provides comprehensive details about the project—including features, installation, usage, configuration, troubleshooting, and contributing guidelines—while omitting any mention of an embedded terminal feature.