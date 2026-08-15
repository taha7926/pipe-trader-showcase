const fs = require('fs');
const { execFileSync } = require('child_process');

let input;
try {
  input = JSON.parse(fs.readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const file = (input.tool_input && input.tool_input.file_path) || (input.tool_response && input.tool_response.filePath) || '';
if (!/\.(ts|tsx)$/.test(file)) process.exit(0);

try {
  execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['eslint', file], { stdio: 'inherit' });
} catch {
  // eslint already printed the errors; don't block the tool result on a lint error
}
