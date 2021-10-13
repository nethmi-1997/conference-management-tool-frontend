/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import RPFileStats from "../admin-rp-files-count.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RPFileStats></RPFileStats>, div)
})