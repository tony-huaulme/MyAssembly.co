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

export function groupAndSort (arr) {
    const result = {};
  
    arr.forEach(item => {
      const match = item.match(/^([A-Za-z0-9-]+?)(\d+)\*?$/);  // Match prefix up to the first number
      if (match) {
        const prefix = match[1]; // Extract everything before the number as the group key
        if (!result[prefix]) {
          result[prefix] = [];
        }
        result[prefix].push(item);
      }
    });
  
    // Sort each group based on the numeric part at the end of each item
    Object.keys(result).forEach(prefix => {
      result[prefix].sort((a, b) => {
        const numA = parseInt(a.match(/\d+$/)[0]);  // Match and extract the number at the end of the string
        const numB = parseInt(b.match(/\d+$/)[0]);
        return numA - numB;
      });
    });
  
    return result;
  };