# redux-photo-gallery

This is a Google Photos style app for showcasing React and Redux implementation and integration. The app is connected to a mock server that allows user to
interactively select and share multiple photos at a time. It makes API calls to retrieve and share photos and listens for the response using a WebSocket.

### [Live Demo](https://torabiho.github.io/redux-photo-gallery/)


## Practices
In this app I took advantage of several tools, techniques and libraries:
- **Redux**: actions, reducers, selectors, containers, middleware
- **redux-thunk:** A middleware for fetching data with Redux
- **React Hooks:** For using state and other React features without writing a class
- **express-ws:** For defining WebSocket endpoints like any other type of route, and applies regular Express middleware
