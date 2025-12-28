GitHub Actions Hashpin Enforcer 🔒
Prevent accidental supply-chain risks by enforcing commit SHA pins for all actions in your workflows.

This Action scans your workflow YAML files and fails pull requests if any uses: line references a tag or branch instead of a full commit SHA. This ensures your CI/CD pipelines are secure, reproducible, and deterministic.

⚠️ Why This Matters
GitHub Actions workflows often reference external code. Relying on mutable references like tags (@v1) or branches (@main) introduces significant risks:

Security Vulnerabilities: A tag can be moved to point to malicious code if a contributor's account is compromised.

Breaking Changes: An upstream developer might push a breaking update to a version tag without warning.

Non-Deterministic Builds: Your pipeline might work today but fail tomorrow without any changes to your own code.

✅ Key Features
Automated Scanning: Checks all workflows in .github/workflows/*.yml.

SHA Validation: Detects any uses: lines not pinned to a full 40-character commit SHA.

Clear Reporting: Fails the PR with a detailed report of the offending file and reference.

Zero Config: Works out of the box with sensible defaults.

❌ Example Failure Output
Plaintext

❌ Floating GitHub Actions detected (only commit SHAs allowed):
  - .github/workflows/main.yml: "actions/setup-node" is not pinned (ref: "v3")
  - .github/workflows/deploy.yml: "some-org/deploy-action" is not pinned (ref: "main")
🚀 Quick Start
Add this job to your existing CI workflow (e.g., .github/workflows/security.yml):

YAML

name: Security Scan

on:
  pull_request:
    branches: [ main ]

jobs:
  hashpin-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # 👈 Note: You should pin this too!

      - name: Run Hashpin Enforcer
        uses: gustavtjac/hashpin-enforcer@v1 # 👈 Note: You should pin this too!
🛠 Recommended Practices
To get the most out of this tool, we recommend:

Strict Pinning: Always use the full SHA: uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11

Branch Protection: Enable "Require status checks to pass before merging" in your repository settings to ensure this action cannot be bypassed.

Automated Updates: Use Dependabot to manage SHA updates automatically.

💡 Roadmap
[ ] Soft Mode: Comment on PRs instead of failing the build.

[ ] Allowlist: Optionally allow trusted tags (e.g., internal company actions).

[ ] Annotations: Highlight specific line numbers directly in the GitHub File Diff view.

[ ] Auto-Fix: A flag to automatically convert tags to their current SHAs.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

Secure your workflows. Keep your CI/CD reproducible. Stop floating actions in their tracks! 🔐
