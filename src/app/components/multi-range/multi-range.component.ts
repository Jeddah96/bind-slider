import {
    Component, Input, Output, EventEmitter, ViewContainerRef,
    OnInit, HostListener, OnChanges, ViewChild, AfterViewInit
} from '@angular/core';
import { RangeConfig } from './../../models/range-config.model';
import { RangeEventData } from './../../models/range-event.model';

@Component({
    selector: 'app-range',
    templateUrl: './multi-range.component.html',
    styleUrls: ['./multi-range.component.scss']
})
export class MultiRangeComponent implements AfterViewInit, OnInit, OnChanges {

    private _data: RangeConfig; // interface which contain all input data
    private _events: RangeEventData; // interface which contain events data
    private _handlerIndex: number; // define index for both handlers
    private _handlerX = []; // init data for handler position
    private _baseHandlerX = []; // init data for handler position
    private _selectedAreaWidth: number;
    private _totalLength: number;
    private _totalBaseLength: number;
    private _sliderModel: number[]; // conditionally defines 3 parts and passes them into calculation
    private _sliderBaseModel: number[];

    @ViewChild('sliderMainBar', { read: ViewContainerRef }) sliderMainBar: ViewContainerRef;

    // set init config from interface and implement set of initial data
    @Input('initConfig')
    set initConfig(value: RangeConfig) {
        this._data = { ...value };
    }

    @Output() change = new EventEmitter<number[]>();

    ngAfterViewInit() {
        this._initializeSlider();
    }

    ngOnInit() {
        this._setHandlerActiveOff();
    }

    ngOnChanges() {
        this._updateModel();
    }

    // Method to initailize entire Slide
    private _initializeSlider() {
        if (this.sliderMainBar) {
            this._selectedAreaWidth = this.sliderMainBar.element.nativeElement.offsetWidth;
        }
    }
    // Method to init slider, provide validation, calculate slider length and set position for any handler
    private _updateModel() {
        this._initializeSlider();
        this._validateSliderValues();
        this._calculateSliderModelAndTotalLenght();
        this._calculateBaseModelAndTotalLenght();
        this._setHandlerPosition();
        this._setBaseHandlerPosition();
    }

    // Method to init slider model according to indicate range areas
    private _calculateSliderModelAndTotalLenght() {
        const firstRangeArea = this._data.currMin - this._data.initMin;
        const secondRangeArea = this._data.currMax - this._data.currMin;
        const thirdRangeArea = this._data.initMax - this._data.currMax;
        // Calculate total length of slider using slider model
        this._sliderModel = [firstRangeArea, secondRangeArea, thirdRangeArea];
        this._totalLength = this._sliderModel.reduce((prev, curr) => prev + curr, 0);
    }

    private _calculateBaseModelAndTotalLenght() {
        const firstRangeArea = this._data.baseVal - this._data.initMin;
        const secondRangeArea = this._data.initMax - this._data.baseVal;
        this._sliderBaseModel = [firstRangeArea, secondRangeArea];
        this._totalBaseLength = this._sliderBaseModel.reduce((prev, curr) => prev + curr, 0);
    }

    // Method to do validation of non-intersect of current min and current max values
    private _validateSliderValues() {
        this._data.currMin = !(this._data.currMin) ? this._data.initMin : this._data.currMin;
        this._data.currMax = !(this._data.currMax) ? this._data.initMax : this._data.currMax;
        this._updateCurrentValue(this._data.currMin, this._data.currMax);
    }

    // Method to set current selected values
    private _updateCurrentValue(min: number, max: number) {
        this._data.currMin = min;
        this._data.currMax = max;
        // Emmiting value changes with specific range condition
        this.change.emit((this._data.isMultiRange) ? [this._data.currMin, this._data.currMax] : [this._data.currMin]);
    }

    private _updateBaseValue(base: number) {
        this._data.baseVal = base;
        this.change.emit([this._data.baseVal]);
    }

    // Method to set handler position (handler-left, handler-right)
    private _setHandlerPosition() {
        let runningTotal = 0;
        this._updateCurrentValue(this._data.initMin + this._sliderModel[0], this._data.initMax - this._sliderModel[2]);
        // Setting handler position based on re-calculation some handler according to handler index using some formula
        for (let i = 0, len = this._sliderModel.length - 1; i < len; i++) {
            runningTotal += this._sliderModel[i];
            this._handlerX[i] = (runningTotal / this._totalLength) * 100;
        }
    }

    private _setBaseHandlerPosition() {
        let runningTotal = 0;
        this._updateBaseValue(this._data.initMin + this._sliderBaseModel[0]);
        for (let i = 0, len = this._sliderBaseModel.length - 1; i < len; i++) {
            runningTotal += this._sliderBaseModel[i];
            this._baseHandlerX[i] = (runningTotal / this._totalBaseLength) * 100;
        }
    }

    // Method to set model array values - will try to refine the values using step
    private _setModelValue(index: number, value: number) {
        if (this._data.step > 0) {
            value = Math.round(value / this._data.step) * this._data.step;
        }
        this._sliderModel[index] = value;
    }

    // Method to disable handler movement according to set base events data
    // Execute on events: on-mouseup
    @HostListener('document:mouseup')
    private _setHandlerActiveOff() {
        this._events = {
            isMouse: false,
            isTouch: false,
            isActive: false
        };
    }

    // Method to detect start dragging handler which provide case of handler activity
    // Execute on events: on-mousedown
    public setHandlerActive(event: any, index: number) {
        event.preventDefault();
        if (event.clientX) {
            this._events.startClientX = event.clientX;
            this._events.isMouse = true;
            this._events.isTouch = false;
        }
        if (event.deltaX) {
            this._events.startClientX = event.deltaX;
            this._events.isTouch = true;
            this._events.isMouse = false;
        }
        if (this._events.isMouse || this._events.isTouch) {
            this._handlerIndex = index;
            this._events.startPLeft = this._sliderModel[index];
            this._events.startPRight = this._sliderModel[index + 1];
            this._events.isActive = true;
        }
    }

    // Method to calculate silder handler movement which provide some changes if event executing
    // Execute on events: on-mousemove
    public handlerSliding(event: any) {
        if ((this._events.isMouse && event.clientX) || (this._events.isTouch && event.deltaX)) {
            const movedX = ((event.clientX || event.deltaX) - this._events.startClientX) /
                this._selectedAreaWidth * this._totalLength;
            const nextPLeft = this._events.startPLeft + movedX;
            const nextPRight = this._events.startPRight - movedX;
            if (nextPLeft >= 0 && nextPRight >= 0) {
                this._setModelValue(this._handlerIndex, nextPLeft);
                this._setModelValue(this._handlerIndex + 1, nextPRight);
                this._setHandlerPosition();
            }
        }
    }
}
