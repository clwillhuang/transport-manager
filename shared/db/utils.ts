/**
 * Converts a town effect number to a string representation.
 * 
 * @param town_effect The town effect number to convert.
 * @returns The string representation of the town effect.
 */
export function ConvertTEToString(town_effect: number): string {
    switch (town_effect) {
        // Represents no town effect.
        case 0: 
            return "None";
        // Represents the passenger town effect.
        case 1: 
            return "Passengers";
        // Represents the mail town effect.
        case 2: 
            return "Mail";
        // Represents the goods town effect.
        case 3: 
            return "Goods";
        // Represents the water town effect.
        case 4: 
            return "Water";
        // Represents the food town effect.
        case 5: 
            return "Food";
        // Represents an unknown town effect.
        case 6: 
            return "Unknown";
    }
}
