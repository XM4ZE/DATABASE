const { spawn, execSync } = require('child_process');
process.env.TZ = 'Asia/Jakarta';

/**
 * Fix "I have no name!" issue in container
 */
function fixNoName() {
    try {
        const uid = process.getuid();
        const gid = process.getgid();
        const passwdEntry = `containeruser:x:${uid}:${gid}:Container User:/home/container:/bin/bash\n`;

        // Append user entry if UID not found
        execSync(`grep "^x:${uid}:" /etc/passwd || echo "${passwdEntry}" >> /etc/passwd`);
    } catch (err) {
        console.error('Failed to fix user name:', err.message);
    }
}

/**
 * Function to start a command process.
 * @param {string} cmd - The command to execute.
 */
function start(cmd) {
    try {
        fixNoName(); // Fix before starting bash

        const childProcess = spawn(cmd, [], {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });

        childProcess.on('error', (error) => {
            console.error('Error starting process:', error.message);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

start('bash');