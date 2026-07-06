/**
 * Run All Conversion Scripts
 * Regenerates all data/*.js files from md/ folders.
 * Usage: node scripts/run-all.cjs
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SCRIPTS_DIR = __dirname;

console.log('══════════════════════════════════════════════════');
console.log('  Regenerating all data files from md/ folder...');
console.log('══════════════════════════════════════════════════\n');

const scripts = fs.readdirSync(SCRIPTS_DIR)
  .filter(f => f.startsWith('convert-') && f.endsWith('.cjs'))
  .sort();

let success = 0;
let failed = 0;

for (const script of scripts) {
  const scriptPath = path.join(SCRIPTS_DIR, script);
  try {
    const start = Date.now();
    execSync(`node "${scriptPath}"`, { cwd: path.join(SCRIPTS_DIR, '..'), stdio: 'pipe' });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  ✓ ${script.padEnd(35)} (${elapsed}s)`);
    success++;
  } catch (err) {
    console.error(`  ✗ ${script.padEnd(35)} FAILED`);
    console.error(`    ${err.stderr?.toString().split('\n')[0] || err.message}`);
    failed++;
  }
}

console.log('\n══════════════════════════════════════════════════');
console.log(`  Complete: ${success} succeeded, ${failed} failed`);
if (failed > 0) {
  console.log('  Some scripts failed — check the output above.');
  process.exit(1);
} else {
  console.log('  All data files regenerated successfully.');
}
console.log('══════════════════════════════════════════════════');
