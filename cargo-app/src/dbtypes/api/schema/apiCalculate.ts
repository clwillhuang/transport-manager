export type CalculateGraphResponse = {
    xValues: number[],
    data: {
        // cargo id
        id: number,
        // x, y
        data: number[]
    }[]
}