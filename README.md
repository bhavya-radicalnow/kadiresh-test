# Incident Report: Log Staging Crash

Our `App` component is failing in the staging environment. QA reported two distinct issues that you need to resolve.

## The Issues:
1. **Severe UI Lag:** After about 3,000 logs render, the browser begins to freeze and scrolling becomes impossible. 
2. **Hard Crash:** Exactly 5 seconds after the component mounts, the entire React application crashes to a white screen and throws a stack error in the console.

## Your Tasks:
* Create a branch called `hotfix/log-viewer-crash`.
* Fix the hard crash so the app survives past the 5-second mark.
* Optimize the rendering pipeline so the app doesn't lag, even if 100,000 logs are pushed to state. (Hint: Look into batching, debouncing, or DOM virtualization).
* Submit a PR with an explanation of *why* the crash happened and *how* you fixed the performance bottleneck.
