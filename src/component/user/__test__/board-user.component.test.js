/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import BoardUser from "../board-user.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoardUser></BoardUser>, div)
})