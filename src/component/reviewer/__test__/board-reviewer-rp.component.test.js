/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import BoardReviewerRP from "../board-reviewer-rp.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoardReviewerRP></BoardReviewerRP>, div)
})