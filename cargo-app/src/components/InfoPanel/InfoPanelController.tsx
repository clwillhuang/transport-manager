import styles from './InfoPanelController.module.css'
import CustomCloseButton from "../CloseButton";
import { IWindowOpenable } from "../Menu/MenuController";
import CircleInfoPanel from "./CircleInfoPanel";
import IndustryInfoPanel from "./IndustryInfoPanel";
import StationInfoPanel from "./StationInfoPanel";
import SignInfoPanel from "./SignInfoPanel";
import TownInfoPanel from "./TownInfoPanel";
import type { Station } from "@dbtypes/db/schema/station";
import { Card } from "react-bootstrap";
import { InfoPanelMode, selectInfoPanelMode, setInfoPanelMode } from "../../features/infoPanel/infoPanelSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export interface InformationPaneControllerData {
}

interface InformationPaneControllerProps extends InformationPaneControllerData,
  IWindowOpenable // allows info panels to open windows
{
  onStartConnectingStation(station: Station | null): void;
}


const InfoPanelController = ({ setWindowIndex, onStartConnectingStation }: InformationPaneControllerProps) => {

  const dispatch = useAppDispatch();
  const infoPanelMode = useAppSelector(selectInfoPanelMode);

  const onClose = () => {
    dispatch(setInfoPanelMode({
      infoPanelMode: InfoPanelMode.Default,
      infoPanelProps: null
    }))
  }

  const innerContent = () => {
    const baseProps: { onClose: () => void } = { onClose: onClose }
    if (infoPanelMode === InfoPanelMode.Industry) {
      return <IndustryInfoPanel {...baseProps} {...{setWindowIndex}} />
    } 
    // else if (infoPanelMode === InformationPaneMode.DistanceMeasure) {
    //   return <DistanceMeasureInfoPanel {...{ cargoId: data.id ?? 0, saveId, cargoPaymentModel, start, end }} />;
    // } 
    else if (infoPanelMode === InfoPanelMode.Circle) {
      return <CircleInfoPanel {...baseProps } />;
    } else if (infoPanelMode === InfoPanelMode.Station) {
      return <StationInfoPanel {...baseProps } {...{ onStartConnectingStation }} />;
    } else if (infoPanelMode === InfoPanelMode.Sign) {
      return <SignInfoPanel {...baseProps }/>;
    } else if (infoPanelMode === InfoPanelMode.Town) {
      return <TownInfoPanel {...baseProps }/>;
    } else if (infoPanelMode === InfoPanelMode.TrackSegment) {
      // return <TrackSegmentInfoPanel {...{ data, setTrack, saveId }} />;
    }
    else {
      return (
        <div>
          <span>Select a map object to inspect it.</span>
        </div>
      );
    }
  };

  return (
    <div className={styles.anchor}>
      <Card className={styles.content}>
        { infoPanelMode !== InfoPanelMode.Default && <CustomCloseButton onClickHandler={onClose} /> }
        { innerContent() }
      </Card>
    </div>
  )
}

export default InfoPanelController