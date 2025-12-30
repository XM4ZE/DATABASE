import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
process.env.TZ = 'Asia/Jakarta';

/**
 * Start bash with colored prompt
 */
function start(cmd) {
    try {
        // ANSI codes untuk warna
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { start };
}

export default start;

start('bash');