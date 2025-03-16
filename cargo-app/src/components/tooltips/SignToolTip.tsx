import { SignMapObjectProps } from '../MapObjects/SignMapObject';
import { useAppSelector } from '../../app/hooks';
import { selectToolTipData } from '../../features/tooltips/tooltipSlice';

export const SignToolTip = () => {
    const props = useAppSelector(selectToolTipData) as SignMapObjectProps;
    const { data: { x, y, text } }= props;
    return (
        <>
            <h4>Sign: "{text}"</h4>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
        </>
    );
};

export default SignToolTip;
