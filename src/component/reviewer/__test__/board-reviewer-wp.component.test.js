/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import BoardReviewerWP from "../board-reviewer-wp.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoardReviewerWP></BoardReviewerWP>, div)
})