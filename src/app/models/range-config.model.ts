export interface RangeConfig {
    initMin: number;
    initMax: number;
    currMin: number;
    currMax: number;
    baseVal?: number;
    step: number;
    sign?: string;
    isMultiRange: boolean;
    rangeTitle?: string;
    isValuesHidden?: boolean;
}
