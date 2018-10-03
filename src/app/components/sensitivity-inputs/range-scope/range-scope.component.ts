import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-range-scope',
    templateUrl: './range-scope.component.html',
    styleUrls: ['./range-scope.component.scss']
})
export class RangeScopeComponent implements OnInit {

    initConfig_1 = {
        'initMin': -40, 'initMax': 100, 'currMin': -10,
        'currMax': 20, 'step': 0.1, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Company-Specific Risk Premium', 'baseVal': 10, 'sign': '%'
    };
    initConfig_2 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.1, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Debt-Free Cash-Free NWC', 'baseVal': 20, 'sign': '%'
    };
    initConfig_3 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Long-Term Growth Rate', 'baseVal': 45, 'sign': '%'
    };
    initConfig_4 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 30, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Number of Weeks of Operating Cash', 'baseVal': 20, 'sign': ''
    };
    initConfig_5 = {
        'initMin': -40, 'initMax': 100, 'currMin': -5,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Tax Rate', 'baseVal': 20, 'sign': '%'
    };
    initConfig_6 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 70, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Debt of Capital', 'baseVal': 20, 'sign': '%'
    };
    initConfig_7 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Capital Expenditures', 'baseVal': 20, 'sign': '%'
    };
    initConfig_8 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Unlevered Equity Beta', 'baseVal': 20, 'sign': ''
    };
    initConfig_9 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Capital Expenditures', 'baseVal': 20, 'sign': '%'
    };
    initConfig_10 = {
        'initMin': -40, 'initMax': 100, 'currMin': -20,
        'currMax': 60, 'step': 0.5, 'isValuesHidden': true, 'isMultiRange': true,
        'rangeTitle': 'Unlevered Equity Beta', 'baseVal': 20, 'sign': ''
    };

    ngOnInit() {
    }

}
