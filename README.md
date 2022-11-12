# GitHub Codespaces - CORS issue

Minimal example to debug CORS issues with GitHub Codespaces
https://github.com/orgs/community/discussions/15351 .


## GitHub Codespaces

A simple dev environment, directly in the browser.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=564811971&machine=basicLinux32gb)


## Code

Check `api/server.go` for the server code written in Go that allows CORS.

Check `gui/UserCreator.js` for the React frontend component that tries to 
create a new user via a POST request.

## Reproducing the issue

1. Start this environment in Codespaces.
2. Execute `cd api; go run .`
3. Open a different terminal and execute `cd gui; REACT_APP_API_URL="https://${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" npm start`
4. Open the browser for the GUI (port 3000)
3. Press the 'Create User' button and you will get an error. **This is the issue.** This request should succeed.
4. In Codespaces make the API port **public** instead of private.
6. Press the 'Create User' button in the GUI again and you will get a success
   message.

You can see more details about the requests in the browser development tools.

Also check the API console window in Codespaces and you will see that no log
messages are shown in the error case because the requests never reach the API
but are blocked by Codespaces. Note in particular that the "Preflight request" 
is not being logged by the API! This is what leads me to suspect that Codespaces 
is blocking the request because it lacks authentication information, but the 
CORS spec is clear on the subject. Preflight OPTIONS requests must not 
include authentication information and web browsers will not do this!

> Preflight requests and credentials
> 
> CORS-preflight requests must never include credentials. The response to a 
> preflight request must specify Access-Control-Allow-Credentials: true to 
> indicate that the actual request can be made with credentials.

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials
