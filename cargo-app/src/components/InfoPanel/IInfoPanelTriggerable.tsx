import { InformationPaneMode } from "./InformationPaneMode";

// Any map object that produces a tooltip when mouse hovering
export interface IInfoPanelTriggerable {
    desiredMouseMode: InformationPaneMode;
    renderPanel: () => JSX.Element;
}
