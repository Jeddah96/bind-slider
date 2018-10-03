import { RangeScopeComponent } from './sensitivity-inputs/range-scope/range-scope.component';
import { KeyAssumptionsComponent } from './key-assumptions/key-assumptions.component';
import { SensitivityInputsComponent } from './sensitivity-inputs/sensitivity-inputs.component';
import { MultiRangeComponent } from './multi-range/multi-range.component';

export const components: any[] = [
    SensitivityInputsComponent,
    MultiRangeComponent,
    KeyAssumptionsComponent,
    RangeScopeComponent,
];

export * from './key-assumptions/key-assumptions.component';
export * from './sensitivity-inputs/sensitivity-inputs.component';
export * from './multi-range/multi-range.component';
export * from './sensitivity-inputs/range-scope/range-scope.component';
