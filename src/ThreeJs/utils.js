// return PanelName
export function isPanelName(string){

    let res = string.includes("IfcElementAssembly") && !string.includes("PDM0") && !string.includes("Type")

    return res ? string.split("IfcElementAssembly")[1] : false

}
//return true || false
export function isPanelPart(string){

    const panelPieces = ["150S-51-16", "89S-51-16", "200S-51-16"];

    return panelPieces.some(piece => string.includes(piece));

}