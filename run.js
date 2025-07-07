const { spawn } = require('child_process');
process.env.TZ = 'Asia/Jakarta';

/**
 * Replace "I have no name!" with custom username (XMPANELS)
 */
function start(cmd) {
    try {
        const childProcess = spawn(cmd, ['-c', `
            export USER="XMPANELS";
            export HOME="/home/container";
            export PS1="XMPANELS@\\h:\\w\\$ ";
            bash --noprofile --norc
        `], {
            stdio: 'inherit'
        });

        childProcess.on('error', (error) => {
            console.error('Error starting process:', error.message);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

start('bash');