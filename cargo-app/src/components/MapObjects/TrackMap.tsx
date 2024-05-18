// // Draw shape icons on the map
// import { TrackSegment } from "@dbtypes/db/schema/Track";
// import { InformationPaneMode } from "../InfoPanel/InformationPaneMode";
// import TrackSegmentToolTip from "../tooltips/TrackSegmentToolTip";
// import { ToolTipType } from "./HoverableMapObjects/HoverableMapObject";
// import TrackMapObject, { AdditionalTrackSegmentProps } from "./TrackMapObject";
// import { GenericMapProps, OpensInfoPanel } from "./GenericMapProps";

// interface TrackMapProps extends GenericMapProps, OpensInfoPanel, AdditionalTrackSegmentProps { }

// function TrackMap({ setTrackBuildOrigin, trackBuildOrigin, ...props}: TrackMapProps) {
//     return (
//         <g>
//             {
//                 tracks.map((data: TrackSegment, index: number) => <TrackMapObject
//                     tooltipType={ToolTipType.STATION}
//                     trackBuildOrigin={trackBuildOrigin}
//                     setTrackBuildOrigin={setTrackBuildOrigin}
//                     // buildTrack={buildTrack}
//                     key={`tracksegment${index}`}
//                     data={data}
//                     TTComponent={TrackSegmentToolTip}
//                     infoPanelMode={InformationPaneMode.TrackSegment}
//                     {...props}
//                 />)
//             }
//         </g>
//     )
// }

// export default TrackMap;