
# **GitHub Actions Hashpin Enforcer 🔒**  
Prevent accidental supply-chain risks by enforcing **commit SHA pins** for all actions in your workflows.

---

## **What It Does**
This GitHub Action scans your workflow YAML files and **fails pull requests** if any `uses:` line references a **tag** or **branch** instead of a full commit SHA.  
✅ Ensures your CI/CD pipelines are **secure**, **reproducible**, and **deterministic**.

---

## ⚠️ **Why This Matters**
GitHub Actions workflows often reference external code. Using mutable references like `@v1` or `@main` introduces serious risks:

- **Security Vulnerabilities**: Tags can be moved to malicious code if an account is compromised.  
- **Breaking Changes**: Upstream developers might push breaking updates to a version tag without warning.  
- **Non-Deterministic Builds**: Your pipeline might work today but fail tomorrow without changes to your code.  

---

## ✅ **Key Features**
- **Automated Scanning**: Checks all workflows in `.github/workflows/*.yml`.  
- **SHA Validation**: Detects any `uses:` lines not pinned to a full 40-character commit SHA.  
- **Clear Reporting**: Fails the PR with a detailed report of offending files and references.  
- **Zero Config**: Works out of the box with sensible defaults.  

---

## ❌ **Example Failure Output**
❌ Floating GitHub Actions detected (only commit SHAs allowed):

- .github/workflows/main.yml: "actions/setup-node" is not pinned (ref: "v3")
- .github/workflows/deploy.yml: "some-org/deploy-action" is not pinned (ref: "main")

  ## 🚀 **Quick Start**
Add this job to your existing CI workflow (e.g., `.github/workflows/security.yml`):

```yaml
name: Security Scan

on:
  pull_request:
    branches: [ main ]

jobs:
  hashpin-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # 👈 Pin this too!

      - name: Run Hashpin Enforcer
        uses: gustavtjac/hashpin-enforcer@v1 # 👈 Pin this too!

```
---

## 🛠 Recommended Practices

- **Strict Pinning**: Always use the full SHA:
  ```yaml
  uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11

## 🛠 Recommended Practices

- **Branch Protection**: Enable *Require status checks to pass before merging* in your repository settings.
- **Automated Updates**: Use Dependabot to manage SHA updates automatically.

---

## 💡 Roadmap

- [ ] **Soft Mode**: Comment on PRs instead of failing the build.
- [ ] **Allowlist**: Optionally allow trusted tags (e.g., internal actions).
- [ ] **Annotations**: Highlight specific line numbers in GitHub File Diff view.
- [ ] **Auto-Fix**: Convert tags to their current SHAs automatically.

---

## 📄 License

Licensed under the **MIT License**. See the LICENSE file for details.

---

**Secure your workflows. Keep your CI/CD reproducible. Stop floating actions in their tracks! 🔐**
