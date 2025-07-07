const { spawn } = require('child_process');
process.env.TZ = 'Asia/Jakarta';

/**
 * Start bash with custom username replacing "I have no name"
 * @param {string} cmd
 */
function start(cmd) {
    try {
        const childProcess = spawn(cmd, [], {
            stdio: 'inherit',
            env: {
                ...process.env,
                USER: 'XMPANELS' // Override username
            }
        });

        childProcess.on('error', (error) => {
            console.error('Error starting process:', error.message);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

start('bash');