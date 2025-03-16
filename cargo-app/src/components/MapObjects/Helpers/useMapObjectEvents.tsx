import { useDispatch } from "react-redux";
import { setInfoPanelMode, InfoPanelMode, InfoPanelProps } from "../../../features/infoPanel/infoPanelSlice";
import { ToolTipMode, ToolTipStateData, hideToolTip, showToolTip } from "../../../features/tooltips/tooltipSlice";
import { MouseEventHandler } from "react";

type ToolTipHelper = (mode: ToolTipMode, data: ToolTipStateData) => { onMouseEnter?: MouseEventHandler<Element>, onMouseLeave?: MouseEventHandler<Element> };

// Custom hook to handle opening of the info panel
const useMapObjectEvents = () => {
  const dispatch = useDispatch();

  const openInfoPanel = (infoPanelMode: InfoPanelMode, infoPanelProps: InfoPanelProps) => {
    return () => {
      dispatch(setInfoPanelMode({ infoPanelMode, infoPanelProps }))
    };
  };

  // const showToolTipOverObject:  = (mode: ToolTipMode, data: ToolTipStateData): { onMouseEvent?: MouseEventHandler<any>, onMouseExit?: MouseEventHandler<any> } => {
  const showToolTipOverObject: ToolTipHelper = (mode: ToolTipMode, data: ToolTipStateData) => {
    // console.log("MAKING TOOLTIP FOR ", data);
    const onMouseEnter = (event: React.MouseEvent<Element, MouseEvent>) => {
      dispatch(showToolTip({ mode, data, event: { clientX: event.clientX, clientY: event.clientY } }));
    };
    const onMouseLeave = (event: React.MouseEvent<Element, MouseEvent>) => {
      dispatch(hideToolTip());
    }
    return { onMouseEnter, onMouseLeave };
  }

  return { openInfoPanel, showToolTipOverObject };
};

export default useMapObjectEvents;
