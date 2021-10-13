/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from 'react-dom';
import UploadRPFiles from "../files-rp.component";
import {it} from "@jest/globals";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadRPFiles></UploadRPFiles>, div)
})