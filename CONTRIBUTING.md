# Contributing to Your AI

Thank you for your interest in contributing to AI Spectrum! This document outlines the standards and guidelines for contributing to this project.

## 1. Branching Strategy

We follow a simplified **Feature Branch Workflow**.

- **`main`**: The production-ready branch. Do not commit directly to main.
- **`feat/*`**: For new features (e.g., `feat/sidebar-component`).
- **`fix/*`**: For bug fixes (e.g., `fix/login-error`).
- **`docs/*`**: For documentation updates.
- **`refactor/*`**: For code refactoring.

## 2. Commit Convention

We follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification.

### Format
```
<type>(<scope>): <subject>

<body>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

### Example
```
feat(ui): add PersonaCard component

- Implemented PersonaCard with responsive design
- Added hover effects and shadow transitions
```

## 3. Pull Request Process

1.  **Create a Branch**: Create a new branch from `main` following the naming convention.
2.  **Commit Changes**: Make your changes and commit them using the commit convention.
3.  **Push**: Push your branch to the repository.
4.  **Open PR**: Open a Pull Request against `main`.
    - **Title**: Use the same format as the commit message (e.g., `feat(ui): add PersonaCard component`).
    - **Description**: Explain *what* was changed and *why*. Attach screenshots if UI changes are involved.
5.  **Review**: Wait for code review and address any feedback.
