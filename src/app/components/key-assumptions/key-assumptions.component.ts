import { Component } from '@angular/core';

@Component({
    selector: 'app-key-assumptions',
    templateUrl: './key-assumptions.component.html',
    styleUrls: ['./key-assumptions.component.scss']
})
export class KeyAssumptionsComponent {

    initSingleConfig_1 = {
        'initMin': -40, 'initMax': 100, 'currMin': -40,
        'step': 0.1, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Company-Specific Risk Premium', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_2 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'step': 0.5, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Debt-Free Cash-Free NWC', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_3 = {
        'initMin': -40, 'initMax': 100, 'currMin': 40,
        'step': 1, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Long-Term Growth Rate', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_4 = {
        'initMin': -40, 'initMax': 100, 'currMin': 74,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Number of Weeks of Operating Cash', 'baseVal': 20, 'sign': ''
    };
    initSingleConfig_5 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Tax Rate', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_6 = {
        'initMin': -40, 'initMax': 100, 'currMin': 60,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Debt of Capital', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_7 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Capital Expenditures', 'baseVal': 20, 'sign': '%'
    };
    initSingleConfig_8 = {
        'initMin': -40, 'initMax': 100, 'currMin': 5,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Unlevered Equity Beta', 'baseVal': 20, 'sign': ''
    };
    initSingleConfig_9 = {
        'initMin': -40, 'initMax': 100, 'currMin': 5,
        'step': 2, 'isValuesHidden': false, 'isMultiRange': false,
        'rangeTitle': 'Unlevered Equity Beta', 'baseVal': 20, 'sign': ''
    };

}
