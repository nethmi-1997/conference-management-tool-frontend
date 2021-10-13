/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import RP from "../rp.component"
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RP></RP>, div)
})