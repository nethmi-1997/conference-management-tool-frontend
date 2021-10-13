/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import Profile from "../profile.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Profile></Profile>, div)
})