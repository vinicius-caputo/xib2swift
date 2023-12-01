export class Declarations {
  public uiDeclarations: string;
  public viewHierachy: string;
  public constraintsDeclarations: string;
  public baseViewDeclaration: string;

  public constructor(
    uiDeclarations: string,
    viewHierachy: string,
    constraintsDeclarations: string,
    baseViewDeclaration: string
  ) {
    this.uiDeclarations = uiDeclarations;
    this.viewHierachy = viewHierachy;
    this.constraintsDeclarations = constraintsDeclarations;
    this.baseViewDeclaration = baseViewDeclaration;
  }

  public getFormattedText(): string {
    return (
      "\n<------------- UI Elements --------------->\n" +
      this.uiDeclarations +
      "\n<------------- View Hierachy --------------->\n\n" +
      this.viewHierachy +
      "\n<------------- Constrains --------------->\n\n" +
      this.constraintsDeclarations +
      "\n<------------- Base View Properties --------------->\n\n" +
      this.baseViewDeclaration
    );
  }
}
