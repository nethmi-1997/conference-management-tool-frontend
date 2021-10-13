/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import WP from "../wp.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WP></WP>, div)
})