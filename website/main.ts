import { xib2swift } from "../src/xib2swift";

const button = document.getElementById("generate-button") as HTMLButtonElement;

button.addEventListener("click", generate);

function generate() {
  console.log("Generate");
  const input = document.getElementById("input-text") as HTMLTextAreaElement;
  const xib = input.value;

  const declarations = xib2swift(xib);

  const uiDeclarationsTextArea = document.getElementById(
    "ui-declarations-text"
  ) as HTMLTextAreaElement;
  uiDeclarationsTextArea.value = declarations.uiDeclarations;

  const viewHierachyTextArea = document.getElementById(
    "view-hierachy-text"
  ) as HTMLTextAreaElement;
  viewHierachyTextArea.value = declarations.viewHierachy;

  const constraintsDeclarationTextArea = document.getElementById(
    "constraints-declarations-text"
  ) as HTMLTextAreaElement;
  constraintsDeclarationTextArea.value = declarations.constraintsDeclarations;

  const baseViewDeclarationTextArea = document.getElementById(
    "base-view-declaration-text"
  ) as HTMLTextAreaElement;
  baseViewDeclarationTextArea.value = declarations.baseViewDeclaration;
}
