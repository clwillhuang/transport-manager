// import React from "react";
// import Point from "@dbtypes/db/schema/Point";
// import { areTrackSegmentsEqual, TrackSegment } from "@dbtypes/db/schema/Track";
// import { ITrackConnectable } from "@dbtypes/db/schema/ITrackConnectable";
// import HoverableMapObject, { HoverableMapObjectProps } from "./HoverableMapObjects/HoverableMapObject";
// import styles from './TrackMapObject.module.css'
// import { TrackConnectableObjectProps } from "./TrackConnectableObjectProps";

// export interface AdditionalTrackSegmentProps extends TrackConnectableObjectProps {
//     // additional props to allow track construction
//     trackBuildOrigin: ITrackConnectable | null,
//     setTrackBuildOrigin: React.Dispatch<React.SetStateAction<ITrackConnectable | null>>,
// }

// export const compareTrackObjects = (segment1: TrackSegment, segment2: TrackSegment): boolean => {
//     return areTrackSegmentsEqual(segment1, segment2)
// };

// const TRACK_END_RADIUS = 2;
// const TRACK_END_RADIUS_HOVER = 3;
// const TRACK_END_FILL = '#747475';
// const TRACK_END_STROKE = '#29292e'
// const TRACK_END_STROKE_WIDTH = 1;

// type TrackMapObjectProps = HoverableMapObjectProps<TrackSegment, AdditionalTrackSegmentProps>

// // A map object meant to represent a train station
// class TrackMapObject extends HoverableMapObject<TrackSegment, AdditionalTrackSegmentProps> {

//     override state = {
//         hover: [false, false]
//     }

//     constructor(props: TrackMapObjectProps) {
//         super(props);
//         this.onMouseDownEnd = this.onMouseDownEnd.bind(this);
//     }

//     onMouseDownEnd(end: ITrackConnectable): ((event: React.MouseEvent<Element, MouseEvent>) => void) {
//         return (
//             (event: React.MouseEvent<Element, MouseEvent>) => {
//                 this.props.buildTrack(end);
//             }
//         )
//     }

//     onMouseEnterEnd(index: number): void {
//         this.setState({ hover: this.state.hover.map(
//             (x, i) => i === index ? true : x
//         )})
//     }

//     onMouseLeaveEnd(index: number): void {
//         this.setState({ hover: this.state.hover.map(
//             (x, i) => i === index ? false : x
//         )})
//     }

//     // Implement the render method to create the station icon
//     render() {
//         const { end1, end2 } = this.props.data;
//         const loc1 = end1.getLocation();
//         const loc2 = end2.getLocation();
//         return (
//             <g>
//                 {/* Track piece */}
//                 <line x1={loc1.x} y1={loc1.y} x2={loc2.x} y2={loc2.y} stroke='red' strokeWidth='2px' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.onMouseDown} />
//                 {/* Track ends */}
//                 {
//                     [end1, end2].map((end, index) => {
//                         if (end.renderTrackEnd()) {
//                             const locs = end.getLocation();
//                             return (
//                                 <circle
//                                     cx={locs.x}
//                                     cy={locs.y}
//                                     r={this.state.hover[index] ? TRACK_END_RADIUS_HOVER : TRACK_END_RADIUS}
//                                     fill={TRACK_END_FILL}
//                                     strokeWidth={TRACK_END_STROKE_WIDTH}
//                                     stroke={TRACK_END_STROKE}
//                                     onMouseDown={this.onMouseDownEnd(end)}
//                                     onMouseEnter={() => this.onMouseEnterEnd(index)}
//                                     onMouseLeave={() => this.onMouseLeaveEnd(index)}
//                                     className={styles.ends}
//                                 />
//                             )
//                         } else {
//                             return null;
//                         }
//                     })
//                 }
//             </g>
//         );
//     }
// }

// export default TrackMapObject;
