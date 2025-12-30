const { spawn } = require('child_process');

process.env.TZ = 'Asia/Jakarta';

/**
 * Start bash with colored prompt
 */
function start(cmd) {
    if (!cmd) cmd = 'bash';

    try {
        const colorPrompt = '\\[\\033[1;36m\\]XMPanels@users\\[\\033[0m\\]:\\w\\$ ';

        const childProcess = spawn(cmd, ['-c', `
            export USER="WWW.XMPANELS.DE";
            export HOME="/home/container";
            export PS1="${colorPrompt}";
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

module.exports = start;
module.exports.start = start; 

if (require.main === module) {
    start('bash');
}