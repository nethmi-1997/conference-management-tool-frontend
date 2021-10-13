/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import WPFileStats from "../admin-wp-files-count.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WPFileStats></WPFileStats>, div)
})