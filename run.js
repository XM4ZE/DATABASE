const { spawn } = require('child_process');
process.env.TZ = 'Asia/Jakarta';

/**
 * Replace "I have no name!" with XMPANEL@user
 */
function start(cmd) {
    try {
        const childProcess = spawn(cmd, ['-c', `
            export USER="XMPANEL";
            export HOME="/home/container";
            export PS1="XMPANEL@user:\\w\\$ ";
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