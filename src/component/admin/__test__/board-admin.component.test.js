/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import BoardAdmin from "../board-admin.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoardAdmin></BoardAdmin>, div)
})