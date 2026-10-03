# Experiment 6 Jira and DevOps

Sheify Customer Support is a classroom prototype for Atharva, Utsav and Mohit.
It validates, saves, filters and closes support requests in browser local storage.
It does not send requests to a server or support team.

## Run

Use Node.js 22 or later. No package installation is needed.

```sh
npm test
npm run build
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. An HTTP server is needed for ES modules.

## Delivery

The GitHub Actions workflow tests and builds pull requests to main.
Passing pushes to main deploy dist/ to GitHub Pages. Real Jira issue keys
in branch names, commit messages and pull request titles support traceability.
The Jira project is Sheify Website Development with key SWD.
