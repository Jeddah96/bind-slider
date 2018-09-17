import {
  Component, Input, Output, EventEmitter,
  ElementRef, OnInit, HostListener, SimpleChanges, OnChanges
} from '@angular/core';
import { InitRange } from './../models/slider-data.model';
import { NameService } from './Service';
import { Type } from '../models/type.enum';

@Component({
  selector: 'app-multi-slider',
  templateUrl: './multi-slider.component.html',
  styleUrls: ['./multi-slider.component.scss']
})
export class MultiSliderComponent implements OnInit, OnChanges {

  private _initOptions: InitRange;
  private _sliderModel = [0, 0, 0];
  private _sliderWidth = 0;
  private _totalLength = 0;
  private _startClientX = 0;
  private _startPleft = 0;
  private _startPRight = 0;
  private _sliderInitiated = false;

  public initValues: number[] = [];
  public currentValues: number[] = [0, 0];
  public handlerX: number[] = [0, 0];
  public isHandlerActive = false;
  public isTouchEventStart = false;
  public isMouseEventStart = false;
  public currentHandlerIndex = 0;
  public hideTooltip = false;
  public hideValues = false;
  public handlerIndex = {
    left: 0,
    right: 1
  };
  private currentType: Type;

  constructor(private el: ElementRef, private nameService: NameService) {
  }

  @Input('initConfig')
  set initConfig(value: InitRange) {
    this._initOptions = { ...value };
  }
  @Input() multiRange = true;
  @Input('hide-tooltip')
  set setHideTooltip(value: boolean) {
    this.hideTooltip = this.toBoolean(value);
  }
  @Input('hide-values')
  set setHideValues(value: boolean) {
    this.hideValues = this.toBoolean(value);
  }
  @Output() change = new EventEmitter<number[]>();

  ngOnInit() {
    this.initializeSlider();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this._sliderInitiated) {
      if (!this.isNullOrEmpty(changes['this._initOptions.minSelected'])
        && changes['this._initOptions.minSelected'].previousValue === changes['this._initOptions.minSelected'].currentValue) {
        return;
      }
      if (!this.isNullOrEmpty(changes['this._initOptions.minSelected'])
        && changes['this._initOptions.minSelected'].previousValue === changes['this._initOptions.minSelected'].currentValue) {
        return;
      }
      this.resetModel();
    }
  }
  public isNullOrEmpty(obj: any): boolean {
    return obj === undefined || obj === null || obj === '';
  }
  public toBoolean(obj: any, ...allowedValues): boolean {
    return (obj === '' || obj === 'true' || allowedValues.indexOf(obj) !== -1) ? true : false;
  }
  public initializeSlider() {
    this._sliderWidth = this.el.nativeElement.children[0].children[0].offsetWidth;
    this.resetModel();
    this._sliderInitiated = true;
    this.nameService.getType().subscribe( t =>
      this.currentType = t
    );
    if (this.currentType == Type.DOLLAR) {
      const n = 0;
      const returnS = `\$${n}`;
      console.log(returnS);
    }
  }
  private resetModel() {
    this.validateSliderValues();
    this._sliderModel = [
      this.currentValues[0] - this.initValues[0],
      this.currentValues[1] - this.currentValues[0],
      this.initValues[1] - this.currentValues[1]
    ];
    this._totalLength = this._sliderModel.reduce((prevValue, curValue) => prevValue + curValue, 0);
    this.setHandlerPosition();
  }
  private validateSliderValues() {
    if (this.isNullOrEmpty(this._initOptions.minValue) || this.isNullOrEmpty(this._initOptions.maxValue)) {
      this.updateInitValues([0, 0]);
      this.updateCurrentValue([0, 0], true);
    } else if (this._initOptions.minValue > this._initOptions.maxValue) {
      this.updateInitValues([0, 0]);
      this.updateCurrentValue([0, 0], true);
    } else {
      this.initValues = [this._initOptions.minValue, this._initOptions.maxValue];
      this._initOptions.minSelected = this.isNullOrEmpty(this._initOptions.minSelected)
        ? this._initOptions.minValue - 1 : this._initOptions.minSelected;
      this._initOptions.maxSelected = this.isNullOrEmpty(this._initOptions.maxSelected)
        ? this._initOptions.maxValue - 1 : this._initOptions.maxSelected;

      if (this._initOptions.minSelected < this._initOptions.minValue || this._initOptions.minSelected > this._initOptions.maxValue) {
        this._initOptions.minSelected = this._initOptions.minValue;
      }
      if (this._initOptions.maxSelected < this._initOptions.minValue || this._initOptions.maxSelected > this._initOptions.maxValue) {
        this._initOptions.maxSelected = this._initOptions.maxValue;
      }
      if (this._initOptions.minSelected > this._initOptions.maxSelected) {
        this._initOptions.minSelected = this._initOptions.minValue;
        this._initOptions.maxSelected = this._initOptions.maxValue;
      }
      this.updateCurrentValue([this._initOptions.minSelected, this._initOptions.maxSelected], true);
    }
  }
  private updateCurrentValue(arrayValue: number[], privateChange: boolean = false) {
    this._initOptions.minSelected = this.currentValues[0] = arrayValue[0];
    this._initOptions.maxSelected = this.currentValues[1] = arrayValue[1];
    if (!privateChange) {
      this.change.emit((this.multiRange) ? this.currentValues : [this.currentValues[0]]);
    }
  }
  private updateInitValues(arrayValue: number[]) {
    this._initOptions.minValue = this.initValues[0] = arrayValue[0];
    this._initOptions.maxValue = this.initValues[1] = arrayValue[1];
  }
  private setHandlerPosition() {
    let runningTotal = 0;
    this.updateCurrentValue([
      this.initValues[0] + this._sliderModel[0],
      this.initValues[1] - this._sliderModel[2]
    ]);
    for (let i = 0, len = this._sliderModel.length - 1; i < len; i++) {
      runningTotal += this._sliderModel[i];
      this.handlerX[i] = (runningTotal / this._totalLength) * 100;
    }
  }
  private setModelValue(index: number, value: number) {
    if (this._initOptions.step > 0) {
      value = Math.round(value / this._initOptions.step) * this._initOptions.step;
    }
    this._sliderModel[index] = value;
  }
  @HostListener('document:mouseup')
  setHandlerActiveOff() {
    this.isMouseEventStart = false;
    this.isTouchEventStart = false;
    this.isHandlerActive = false;
  }
  public setHandlerActive(event: any, handlerIndex: number) {
    event.preventDefault();
    if (!this.isNullOrEmpty(event.clientX)) {
      this._startClientX = event.clientX;
      this.isMouseEventStart = true;
      this.isTouchEventStart = false;
    } else if (!this.isNullOrEmpty(event.deltaX)) {
      this._startClientX = event.deltaX;
      this.isTouchEventStart = true;
      this.isMouseEventStart = false;
    }
    if (this.isMouseEventStart || this.isTouchEventStart) {
      this.currentHandlerIndex = handlerIndex;
      this._startPleft = this._sliderModel[handlerIndex];
      this._startPRight = this._sliderModel[handlerIndex + 1];
      this.isHandlerActive = true;
    }
  }
  public handlerSliding(event: any) {
    if ((this.isMouseEventStart && event.clientX) || (this.isTouchEventStart && event.deltaX)) {
      const movedX = ((event.clientX || event.deltaX) - this._startClientX) / this._sliderWidth * this._totalLength;
      const nextPLeft = this._startPleft + movedX;
      const nextPRight = this._startPRight - movedX;
      if (nextPLeft >= 0 && nextPRight >= 0) {
        this.setModelValue(this.currentHandlerIndex, nextPLeft);
        this.setModelValue(this.currentHandlerIndex + 1, nextPRight);
        this.setHandlerPosition();
      }
    }
  }
}
