// import { TrackSegment } from "@dbtypes/db/schema/Track";
// import { UpdateOneAction } from "../../tools/ObjectManager";

// export interface TrackSegmentInfoPanelProps {
//     data: TrackSegment,
//     setTrack: UpdateOneAction<TrackSegment>
// };


// const TrackSegmentInfoPanel = ({ data, setTrack }: TrackSegmentInfoPanelProps) => {

//     const { end1, end2 } = data; 
//     const loc1 = end1.getLocation();
//     const loc2 = end2.getLocation();
//     const { x: x1, y: y1 } = loc1;
//     const { x: x2, y: y2 } = loc2;

//     const deleteSegment = () => {
//         setTrack(data, true)
//     }

//     return (
//         <>
//             <span id='card-type'>TRACK SEGMENT</span>
//             <h3>Location</h3>
//             <div>
//             <p>{`(${x1}, ${y1}) to (${x2}, ${y1})`}</p>
//             </div>
//             <div>
//                 <button onClick={deleteSegment}>
//                     Delete
//                 </button>
//             </div>
//         </>
//     )
// }

// export default TrackSegmentInfoPanel;

