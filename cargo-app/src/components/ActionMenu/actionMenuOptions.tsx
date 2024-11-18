
import { IconDefinition, faCircle, faCity, faDiamond, faHammer, faIndustry, faMousePointer, faRulerCombined, faSignsPost, faTrain } from "@fortawesome/free-solid-svg-icons";

// This is the second top bar of the pp, where the user can activate mouse tools and draw elements
export enum Action {
    Default,
    DistanceMeasure,
    DrawLine,
    AddCircle,
    AddDiamond,
    AddStation,
    AddIndustry,
    AddCity,
    AddSign,
    ConnectStation,
    DrawRoute,
    BuildTrack
}

export type ActionMenuOption = { title: string, description: string, icon: IconDefinition };

export const ACTION_MENU_OPTIONS: Map<Action, ActionMenuOption> = new Map<Action, ActionMenuOption>(
    [
        [Action.Default, { title: 'Pan / Zoom Map', description: 'Move the map around using the mouse.', icon: faMousePointer }],
        [Action.DistanceMeasure, { title: 'Measure Distance', description: 'Measure the distance between two points using in-game squares', icon: faRulerCombined }],
        [Action.AddCircle, { title: 'Add Euclidean Distance Circle', description: 'Click on a point to add a circle', icon: faCircle }],
        [Action.AddDiamond, { title: 'Add Manhattan Distance Diamond', description: 'Click on two points to add a diamond', icon: faDiamond }],
        [Action.AddStation, { title: 'Add Train Station', description: 'Click on a point to add a station', icon: faTrain }],
        [Action.AddSign, { title: 'Add Sign / Text Label', description: 'Click on a location to place a new sign/label on the map.', icon: faSignsPost }],
        [Action.AddIndustry, { title: 'Add Industry', description: 'Click on a point to add an industry', icon: faIndustry }],
        [Action.AddCity, { title: 'Add City', description: 'Click on a location to place a new city on the map.', icon: faCity }],
        // [Action.BuildTrack, { title: 'Build Train Track', description: 'Click to create train tracks between two points on the map.', icon: faHammer }],
    ]
)
