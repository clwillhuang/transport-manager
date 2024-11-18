import { InformationPaneMode } from "./InformationPaneMode";
import styles from './InformationPaneController.module.css'
import CustomCloseButton from "../CloseButton";
import { IWindowOpenable } from "../Menu/MenuController";
import CircleInfoPanel from "./CircleInfoPanel";
import IndustryInfoPanel from "./IndustryInfoPanel";
import StationInfoPanel from "./StationInfoPanel";
import SignInfoPanel from "./SignInfoPanel";
import TownInfoPanel from "./TownInfoPanel";
import { SaveContext } from "../../App";
import type { Station } from "@dbtypes/db/schema/station";
import { BaseInfoPanelProps } from "./BaseInfoPanelProps";
import { Card } from "react-bootstrap";

export interface InformationPaneControllerData {
  infoPanelMode: InformationPaneMode,
  data: any | null,
}

interface InformationPaneControllerProps extends InformationPaneControllerData,
  IWindowOpenable // allows info panels to open windows
{
  setInfoPanelMode(data: InformationPaneControllerData): void,
  onStartConnectingStation(station: Station | null): void;
}


const InformationPaneController = ({ infoPanelMode, data, setInfoPanelMode, setWindowIndex, onStartConnectingStation }: InformationPaneControllerProps) => {

  const onClose = () => {
    setInfoPanelMode({
      data: null,
      infoPanelMode: InformationPaneMode.Default
    });
  };

  const innerContent = (saveId: number) => {
    const baseProps: BaseInfoPanelProps = { saveId: saveId, onClose: onClose, id: data?.id ?? 0 }
    if (infoPanelMode === InformationPaneMode.Industry) {
      return <IndustryInfoPanel {...baseProps} {...{setWindowIndex}} />
    } 
    // else if (infoPanelMode === InformationPaneMode.DistanceMeasure) {
    //   return <DistanceMeasureInfoPanel {...{ cargoId: data.id ?? 0, saveId, cargoPaymentModel, start, end }} />;
    // } 
    else if (infoPanelMode === InformationPaneMode.Circle) {
      return <CircleInfoPanel {...baseProps } />;
    } else if (infoPanelMode === InformationPaneMode.Station) {
      return <StationInfoPanel {...baseProps } {...{ onStartConnectingStation }} />;
    } else if (infoPanelMode === InformationPaneMode.Sign) {
      return <SignInfoPanel {...baseProps }/>;
    } else if (infoPanelMode === InformationPaneMode.Town) {
      return <TownInfoPanel {...baseProps }/>;
    } else if (infoPanelMode === InformationPaneMode.TrackSegment) {
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
        {/* <Card> */}
          {infoPanelMode !== InformationPaneMode.Default &&
            <CustomCloseButton onClickHandler={onClose} />}
            <SaveContext.Consumer>
              { value => value?.saveId && innerContent(value.saveId) }
            </SaveContext.Consumer>
          {/* </Card> */}
      </Card>
    </div>
  )
}

export default InformationPaneController