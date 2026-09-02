\# Contributing to InfraSense



Thank you for your interest in contributing to InfraSense!



InfraSense is an open-source cloud infrastructure recommendation platform built with React, Vite, and Tailwind CSS. Contributions that improve the codebase, documentation, usability, or developer experience are welcome.



\## Getting Started



\### Prerequisites



Before contributing, make sure you have the following installed:



\- Git

\- Node.js

\- npm

\- A code editor such as Visual Studio Code



\### Fork and Clone the Repository



1\. Fork the InfraSense repository to your GitHub account.



2\. Clone your fork:



```bash

git clone https://github.com/YOUR-USERNAME/InfraSense.git

````



3\. Move into the project directory:



```bash

cd InfraSense

```



4\. Install the project dependencies:



```bash

npm install

```



5\. Start the development server:



```bash

npm run dev

```



Vite will display the local development URL in your terminal.



\### Building the Project



Before submitting a pull request, make sure the project builds successfully:



```bash

npm run build

```



You can also preview the production build locally with:



```bash

npm run preview

```



\## Creating a Branch



Create a separate branch for each contribution instead of working directly on the main branch.



Use descriptive branch names such as:



```text

feature/mobile-responsiveness

fix/input-validation

docs/update-readme

```



For example:



```bash

git checkout -b docs/update-contributing-guide

```



Recommended prefixes include:



\* `feature/` for new features

\* `fix/` for bug fixes

\* `docs/` for documentation changes

\* `refactor/` for code restructuring

\* `chore/` for maintenance work



\## Making Changes



When contributing:



\* Keep each change focused on one issue or purpose.

\* Follow the existing project structure and coding style.

\* Avoid unrelated changes in the same pull request.

\* Keep components and logic readable and maintainable.

\* Update documentation when your change affects setup, features, or usage.

\* Do not commit generated files, credentials, secrets, or environment-specific files.



When fixing an issue, try to make the smallest change that solves the problem clearly.



\## Commit Guidelines



Use short and descriptive commit messages that explain what changed.



Recommended format:



```text

type: short description

```



Examples:



```text

feat: add mobile navigation

fix: resolve recommendation form validation

docs: update installation guide

refactor: simplify cloud scoring logic

chore: update dependencies

```



Common commit types include:



\* `feat` — new functionality

\* `fix` — bug fix

\* `docs` — documentation changes

\* `refactor` — code restructuring without changing behavior

\* `chore` — maintenance or tooling changes



\## Pull Request Process



Before opening a pull request:



1\. Make sure you are working on a dedicated branch.

2\. Complete and review your changes.

3\. Test the application locally.

4\. Run the production build:



```bash

npm run build

```



5\. Commit your changes with a descriptive commit message.

6\. Push your branch to your fork:



```bash

git push -u origin your-branch-name

```



7\. Open a pull request from your fork to the InfraSense repository.

8\. Reference the related issue in the pull request description when applicable.



For example:



```text

Closes #6

```



\### Pull Request Guidelines



Please keep pull requests:



\* Focused on one issue or feature.

\* Clearly titled.

\* Small enough to review easily when possible.

\* Free from unrelated formatting or code changes.

\* Accompanied by screenshots when visual changes are involved.



If a maintainer requests changes, update the same branch and push your new commits. The pull request will update automatically.



\## Issue Guidelines



Issues help track bugs, improvements, documentation changes, and feature ideas.



Before creating a new issue, check whether a similar issue already exists.



\### Bug Reports



Create a bug report when something does not behave as expected.



Include:



\* A clear description of the problem.

\* Steps to reproduce it.

\* Expected behavior.

\* Actual behavior.

\* Relevant screenshots or error messages.

\* Browser or environment information when useful.



\### Feature Requests



Create a feature request when proposing new functionality.



Explain:



\* What problem the feature solves.

\* How you expect it to work.

\* Why it would be useful to InfraSense users.



\### Documentation Issues



Create a documentation issue when documentation is:



\* Missing.

\* Outdated.

\* Incorrect.

\* Difficult to understand.



Mention the specific page, section, or file whenever possible.



\### Improvement Requests



Use an improvement issue for changes that improve existing functionality without introducing a completely new feature.



Describe:



\* The current behavior.

\* What could be improved.

\* The expected benefit of the change.



\## Before Submitting



Before submitting your contribution, check that:



\* The project runs locally.

\* `npm run build` completes successfully.

\* Your changes are limited to the intended task.

\* Documentation is updated if necessary.

\* No secrets, credentials, or local-only files are included.

\* Your commit messages clearly describe your changes.

\* The related issue is referenced in your pull request.



\## Thank You



Thank you for helping improve InfraSense.



Every contribution, whether it is code, documentation, testing, or feedback, helps make the project better for its users and future contributors.



````





