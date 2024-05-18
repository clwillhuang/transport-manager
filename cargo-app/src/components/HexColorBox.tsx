import { CSSProperties } from "react";

const HexColorBox = ({ hex, textcolor }: {hex: string, textcolor?: string}) => {
    const hexColor = hex.startsWith('#') ? hex : ('#' + hex)
    const spanStyles: CSSProperties = {
        width: '16px',
        height: '16px',
        backgroundColor: hexColor,
        display: 'inline-block',
        margin: '0 5px 0 0',
        verticalAlign: 'middle',
        color: hex,
        border: `1px solid ${textcolor ?? 'black'}`
    }

    const pStyles: CSSProperties = {
        display: 'inline-block',
        margin: 0,
        verticalAlign: 'middle',
        color: textcolor ?? 'black' // makes text readable regardless of color
        // color: 'hexColor',
    }
    return (<span>
        <span style={spanStyles} />
        <span style={pStyles}>{hexColor}</span>
        <br/>
    </span>)
}

export default HexColorBox;