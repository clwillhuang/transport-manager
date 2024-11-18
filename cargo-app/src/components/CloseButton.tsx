import { CSSProperties } from "react";
import { CloseButton } from "react-bootstrap";

export interface CustomCloseButtonProps {
    onClickHandler(): void;
}

const CustomCloseButton = ({onClickHandler}: CustomCloseButtonProps) => {

    const containerStyles: CSSProperties = {
        position: 'absolute',
        top: '15px',
        right: '15px'
    }

    // const styles: CSSProperties = {
    //     borderRadius: '10px', 
    //     color: 'white',
    //     border: '3px solid white',
    //     height: '40px',
    //     width: '40px',
    //     margin: '0px',
    //     padding: '0px'
    // }

    return(
        <span style={containerStyles}>
            <CloseButton onClick={() => onClickHandler()}/>
        </span>
        // <span style={containerStyles}>
        //     <button style={styles} onClick={() => onClickHandler()}>
        //         X
        //     </button>
        // </span>
    )
}

export default CustomCloseButton;