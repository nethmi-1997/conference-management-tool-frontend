/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import BoardEditor from "../board-editor.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoardEditor></BoardEditor>, div)
})