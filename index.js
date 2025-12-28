const core = require('@actions/core');
const fs = require('fs');
const glob = require('glob');

function isPinned(ref) {
  return /^[0-9a-f]{40}$/.test(ref);
}

function checkWorkflows() {
  const workflowFiles = glob.sync('.github/workflows/*.yml');
  const offenders = [];
   const goodList = [];

  workflowFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const regex = /^\s*uses:\s*(.+?)@(.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const [, action, ref] = match;
      if (!isPinned(ref)) {
    
        offenders.push(`${file}: action "${action}" is not pinned (ref: "${ref}")`);
      }else{
        goodList.push(`${file}: action "${action}" is pinned (ref: "${ref}")`)
      }
    }
  });

  if (offenders.length) {
    core.setFailed(
      `❌ Floating GitHub Actions detected (only commit SHAs allowed):\n` +
      offenders.join('\n')
    );
  } else {
    core.info(
        `✅ All GitHub Actions are pinned to commit SHAs.\n` + 
        goodList.join('\n')
    );
  }
}

checkWorkflows();
