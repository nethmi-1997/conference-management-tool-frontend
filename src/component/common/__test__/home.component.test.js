/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import Home from "../home.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Home></Home>, div)
})