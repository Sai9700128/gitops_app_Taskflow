🚀 GitOps Demo Application

A sample cloud-native application demonstrating modern CI/CD practices.

Tech Stack:
- Node.js / Express
- Docker
- GitHub Actions (CI)

Pipeline Flow:
1. Push code → GitHub Actions triggers
2. Runs tests & security scans
3. Builds Docker image
4. Pushes to Amazon ECR
5. Updates gitops-config repo with new image tag

Part of a GitOps demo project showcasing:
- Automated CI/CD pipelines
- Container-based deployments
- GitOps workflow with ArgoCD
