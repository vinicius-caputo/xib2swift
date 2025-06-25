import { xib2swift } from "../src/xib2swift";

const input = document.getElementById("input-Text") as HTMLTextAreaElement;
const output = document.getElementById("output-Text") as HTMLTextAreaElement;

input.addEventListener("input", () => {
    console.log("Input changed, converting XIB to Swift code...");
    const xib = input.value;
    const viewcode = xib2swift(xib);
    output.value = viewcode;
});