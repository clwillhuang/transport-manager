import React, { useState } from 'react';
import { InformationPaneControllerData } from '../components/InfoPanel/InformationPaneController';
import { InformationPaneMode } from '../components/InfoPanel/InformationPaneMode';

type InfoPanelSetter = (data: InformationPaneControllerData) => void;

// When the ID is set to this, delete it
export type UpdateOneAction<T> = (data: T, deleteObj?: boolean) => T;

export type ObjectManager<T> = { 
    objects: T[], 
    update: React.Dispatch<React.SetStateAction<T[]>>,
    updateOne: UpdateOneAction<T>,
    addOne: (data: T) => void,
}

// Factory that creates a hook that manages the object model given using an array.
// The underlying functionality is a react hook, with additional features
// added for updating, deleting and adding an element 
// The object model must have the `id` field so that it can differentiate between objects when modifying them.
export const useObjectManager = <T extends { id: string }>(initialState: T[], infoPanel: InformationPaneControllerData, setInfoPanel: InfoPanelSetter, infoPanelMode: InformationPaneMode): ObjectManager<T> => {
    const [shapes, setShapes] = useState<T[]>(initialState);

    const updateOne = (data: T, deleteObj: boolean = false): T => {
        if (deleteObj) { // Check if the action is to delete the shape
            setShapes(shapes.filter(c => c.id !== data.id));
            // Hide the info panel because the object was visible here
        setInfoPanel({
                infoPanelMode: InformationPaneMode.Default,
                data: {}
            });
        } else { // Default is modifying the object with the matching id
            setShapes(shapes.map(c => (c.id === data.id ? { ...data } : { ...c })));
            // Force the info panel to update with the new info
            if (infoPanel.infoPanelMode === infoPanelMode && 'id' in infoPanel.data && infoPanel.data.id === data.id) {
                setInfoPanel({
                    infoPanelMode: infoPanel.infoPanelMode,
                    data: data
                });
            }
        }
        return data
    };

    const addOne = (data: T) => {
        setShapes([...shapes, data])
        return 
    }

    return { objects: shapes, update: setShapes, updateOne: updateOne, addOne };
};
