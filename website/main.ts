import { xib2swift } from "../src/xib2swift";

const button = document.getElementById("generate-button") as HTMLButtonElement;

button.addEventListener("click", generate);

function generate() {
    console.log("Generate");
    const input = document.getElementById("input-Text") as HTMLTextAreaElement;
    let xib = input.value;
    const output = document.getElementById("output-Text") as HTMLTextAreaElement;
    let viewcode = xib2swift(xib);
    output.value = viewcode;
     
}