import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import type { Sign } from '~shared/db/schema/sign';

export const SignToolTip: ToolTipRenderer<ToolTipProps<Sign>> = ({ data }) => {
    const { x, y, text } = data;
    return (
        <>
            <h4>Sign: "{text}"</h4>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
        </>
    );
};

export default SignToolTip;
