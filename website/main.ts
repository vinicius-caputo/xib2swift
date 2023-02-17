import { xib2viewcode } from "../src/index";

const button = document.getElementById("generate-button") as HTMLButtonElement;

button.addEventListener("click", generate);

function generate() {
    console.log("Generate");
    const input = document.getElementById("input-Text") as HTMLInputElement;
    let xib = input.value;
    const output = document.getElementById("output-Text") as HTMLInputElement;
    let viewcode = xib2viewcode(xib);
    output.value = viewcode;
    
}