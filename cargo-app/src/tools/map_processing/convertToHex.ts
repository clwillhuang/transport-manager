const convertToHex = (r: number | undefined, g: number | undefined, b: number | undefined, a: number | undefined): string => {
    const hexR = ('0' + r?.toString(16)).slice(-2);
    const hexG = ('0' + g?.toString(16)).slice(-2);
    const hexB = ('0' + b?.toString(16)).slice(-2);
    const hexA = ('0' + a?.toString(16)).slice(-2);
    // Concatenate and return the hexadecimal color
    return hexR + hexG + hexB + hexA;
}

export default convertToHex;