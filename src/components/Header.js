import React from "react";
import "./Header.scss";

export const Header = () => {
    return <header className="header">
        <h1 className="header__title">Redux-Powered Photo Gallery</h1>
        <p>This is a Google Photos style app for showcasing React and Redux implementation and integration. The app is connected to a mock server and allows user to interactively select and share photos. It makes API calls to retrieve and share photos and listens for the response using a WebSocket.</p>
        <p>To test it select as many photos as you like and click on the share icon at the bottom. There must be at least one non-shared photo selected</p>
        <p>Source Code: <a className="header__link" href="https://github.com/torabiho/redux-photo-gallery" target="_blank">github.com/torabiho/redux-photo-gallery</a></p>
    </header>
}