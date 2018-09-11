import { Component,
  ViewChild,
  ElementRef,
  HostListener,
  forwardRef,
  OnInit,
  OnChanges,
  Renderer2,
  AfterViewInit,
  IterableDiffers,
  Input,
  Output,
  EventEmitter,
  SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
const noop = () => { };
@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeSliderComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RangeSliderComponent), multi: true }
  ]
})
export class RangeSliderComponent implements ControlValueAccessor {

  private iterableDiffer: any;
  private valToPixelFactor: number;
  private minSliderClicked = false;
  maxSliderClicked = false;
  minSliderLeft: number;
  maxSliderLeft: number;
  minSliderIntialLeft: number;
  intialMinMouseX: number;
  minChange: number;
  maxSliderIntialLeft: number;
  intialMaxMouseX: number;
  maxChange: number;
  minSelected = false;
  maxSelected = false;
  sliderWidth: number;
  barWidth: number;
  rangeDiff: number;
  toolTip = true;
  combineToolTip = false;
  rangeInPixels: number;
  highlightLeft: number;
  highlightWidth: number;
  minSliderTouched = false;
  sliderHeight: number;
  toolTipTop: number;
  combineToolTipLeft: number;
  minToolTipWidth: number;
  combineToolTipWidth: number;
  toolTipLeft: number;
  private onTouchedCallback: (_: any) => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  @Input() min: number;
  @Input() max: number;
  @Input() toolTips = [true, true];
  range: number[];
  rangeCache: number[];
  @Input() step: number;
  @Output() rangeChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @ViewChild('bar') bar: ElementRef;
  @ViewChild('minSlider') minSlider: ElementRef;
  @ViewChild('maxSlider') maxSlider: ElementRef;
  @ViewChild('sliderHilight') sliderHilight: ElementRef;
  numWidth: number;
  constructor(private elementRef: ElementRef, private renderer: Renderer2,
    private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.range);
    if (changes) {
      this.onChangeCallback(this.range);
      this.onTouchedCallback(this.range);
      this.rangeChange.emit(this.range);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.range) {
      this.getWidth();
    }
  }

  // tslint:disable-next-line:member-ordering
  @Input() highlightClass: string;
  sethighlightClass(clas: string) {
    if (clas && this.sliderHilight) {
      this.renderer.removeClass(this.sliderHilight.nativeElement, 'dhighlightClass');
      this.renderer.addClass(this.sliderHilight.nativeElement, clas);
    }
  }
  // tslint:disable-next-line:member-ordering
  @Input() barClass: string;
  setBarClass(clas: string) {
    if (clas && this.bar) {
      this.renderer.removeClass(this.bar.nativeElement, 'dbarClass');
      this.renderer.addClass(this.bar.nativeElement, clas);
    }

  }
  // tslint:disable-next-line:member-ordering
  @Input() sliderClass: string;
  setSliderClass(clas: string) {
    if (clas && this.minSlider && this.maxSlider) {
      this.renderer.removeClass(this.minSlider.nativeElement, 'dsliderClass');
      this.renderer.removeClass(this.maxSlider.nativeElement, 'dsliderClass');
      this.renderer.addClass(this.minSlider.nativeElement, clas);
      this.renderer.addClass(this.maxSlider.nativeElement, clas);
    }
  }
  writeValue(value: number[]): void {
    if (value) {
      if (value[0] === null) {
        value[0] = this.min;
      } else if (value[1] === null) {
        value[1] = this.max;
      } else {
        if (this.range) {
          const prevRange = this.rangeCache.slice(0);
          if (value[0] > prevRange[1]) {
            value[0] = prevRange[1];
          } else if (value[0] < this.min) {
            value[0] = this.min;
          } else if (value[1] < prevRange[0]) {
            value[1] = prevRange[0];
          } else if (value[1] > this.max) {
            value[1] = this.max;
          }
        }
      }
      this.update(value);
    }

  }


  update(range: number[]) {

    this.range = [...range];
    this.rangeCache = (JSON.parse(JSON.stringify(range)));
    this.setBarClass(this.barClass);
    this.setSliderClass(this.sliderClass);
    this.sethighlightClass(this.highlightClass);
    this.getWidth();
  }
  minTouched(event: any) {
    const evt = event.changedTouches[0];
    this.minMouseDown(evt);

  }
  maxTouched(event: any) {
    const evt = event.changedTouches[0];
    this.maxMouseDown(evt);
  }
  minMouseDown(event: any) {

    this.minSliderClicked = true;
    this.minSelected = true;
    this.maxSliderClicked = false;
    this.maxSelected = false;
    this.minSliderIntialLeft = event.target.offsetLeft;
    this.intialMinMouseX = event.clientX;
  }

  maxMouseDown(event: any) {
    this.maxSliderClicked = true;
    this.maxSelected = true;
    this.minSliderClicked = false;
    this.minSelected = false;
    this.maxSliderIntialLeft = event.target.offsetLeft;
    this.intialMaxMouseX = event.clientX;
  }

  touchMove(event: any) {
    const evt = event.changedTouches[0];
    this.mouseMove(evt);
  }
  registerOnChange(onChange: any) {
    this.onChangeCallback = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.registerOnTouched = onTouched;
  }

  validate(): any {
    return null;
  }
  getlength(num) {
    return String(num).match(/\d/g).length;
  }
  getWidth() {
    if (this.bar && this.minSlider && this.range && this.range[0] !== undefined) {
      this.sliderWidth = this.minSlider.nativeElement.offsetWidth;
      this.sliderHeight = this.minSlider.nativeElement.offsetHeight;
      this.toolTipTop = (this.sliderHeight + 10) * -1;
      this.barWidth = this.bar.nativeElement.offsetWidth;
      if (this.sliderWidth && this.barWidth) {
        this.rangeDiff = this.max - this.min;
        this.rangeInPixels = this.barWidth - this.sliderWidth;
        if (this.barWidth && this.sliderWidth) {
          this.valToPixelFactor = ((this.rangeInPixels) / this.rangeDiff);
        }
        this.minSliderLeft = (this.range[0] - this.min) * this.valToPixelFactor;
        this.maxSliderLeft = (this.range[1] - this.min) * this.valToPixelFactor;
      }
      this.highlightDimensions();
    }
  }
  highlightDimensions() {
    this.highlightLeft = this.minSliderLeft + (this.sliderWidth / 2);
    this.highlightWidth = this.maxSliderLeft - this.minSliderLeft;
    if (this.range[0] !== undefined) {
      this.minToolTipWidth = this.getlength(this.range[0].toString());
      const cond = this.minToolTipWidth * 8 + this.minSliderLeft + 8;
      if (cond > this.maxSliderLeft && this.toolTips[0] && this.toolTips[1]) {
        this.toolTip = false;
        this.combineToolTip = true;
        this.combineToolTipWidth = this.getlength(`${this.range[0]}-${this.range[1]}`) * 8;
        const maxLeft = this.rangeInPixels - this.combineToolTipWidth;
        this.combineToolTipLeft = this.minSliderLeft < maxLeft ? this.minSliderLeft : maxLeft;
      } else {
        this.toolTip = true;
        this.combineToolTip = false;
      }
    }
  }

  clickedOnBar(event: any) {
    this.minSelected = false;
    this.maxSelected = false;
    const targetId = event.target.id;
    const left = event.offsetX;
    if (targetId === 'bar') {
      if (left < this.minSliderLeft) {
        const value = this.pixToVal(this.min, left);
        const finalVal = this.stepr(value);
        this.range[0] = finalVal <= this.min ? this.min : finalVal;
        this.minSliderLeft = this.valToPixel(this.range[0]);
      } else if (left > this.maxSliderLeft) {
        if (left >= (this.rangeInPixels)) {
          this.maxSliderLeft = this.rangeInPixels;
          this.range[1] = this.max;
        } else {
          const value = this.pixToVal(this.min, left);
          this.range[1] = this.stepr(value);
          this.maxSliderLeft = this.valToPixel(this.range[1]);
        }
      }
    }
    this.highlightDimensions();
  }

  clickedOnhighlight(event: any) {
    this.minSelected = false;
    this.maxSelected = false;
    const left = event.offsetX;
    const cond = (this.highlightWidth / 2);
    if (left <= cond) {
      const orgLeft = this.minSliderLeft + (this.sliderWidth / 2) + left;
      const value = this.pixToVal(this.min, orgLeft);
      this.range[0] = this.stepr(value);
      this.minSliderLeft = this.valToPixel(this.range[0]);
    } else if (left > cond) {
      const orgLeft = this.minSliderLeft + (this.sliderWidth / 2) + left;
      const value = this.pixToVal(this.min, orgLeft);
      this.range[1] = this.stepr(value);
      this.maxSliderLeft = this.valToPixel(this.range[1]);
    }
    this.highlightDimensions();
  }
  pixToVal(min: number, left: number): number {
    const value = Number((min + left * (1 / this.valToPixelFactor)).toFixed(2));
    return value;
  }
  stepr(value: number): number {
    if (this.step) {
      const fin = value - Math.floor(value);
      if (fin >= 0.5) {
        value = Math.ceil(value);
      } else {
        value = Math.floor(value);
      }
      const remainder = value % this.step;
      if (remainder === 0) {
        return value;
      } else {
        if (remainder >= (this.step / 2)) {
          value = value + (this.step - remainder);
        } else {
          value = value - remainder;
        }
      }
    }
    return value;
  }

  valToPixel(value: number): number {
    const pixel = this.valToPixelFactor * (value - this.min);
    return pixel;
  }
  @HostListener('window:mousemove', ['$event'])
  mouseMove(event: any) {
    if (this.minSelected || this.maxSelected) {
      if (this.minSelected) {
        this.minChange = event.clientX - this.intialMinMouseX;
        const left = this.minSliderIntialLeft + this.minChange;
        const value = this.pixToVal(this.min, left);
        if (value <= this.range[1]) {
          if (value <= this.min) {
            this.minSliderLeft = 0;
            this.range[0] = this.min;
          } else {
            const finalVal = this.stepr(value);
            this.range[0] = finalVal <= this.range[1] ? finalVal : this.range[1];
            this.minSliderLeft = this.valToPixel(this.range[0]);
          }
        }
      } else if (this.maxSelected) {
        this.maxChange = event.clientX - this.intialMaxMouseX;
        const left = this.maxSliderIntialLeft + this.maxChange;
        const value = this.pixToVal(this.min, left);
        if (value >= this.range[0]) {
          if (value >= this.max) {
            this.maxSliderLeft = this.rangeInPixels;
            this.range[1] = this.max;
          } else {
            const final = this.stepr(value);
            this.range[1] = final > this.range[0] ? final <= this.max ? final : this.max : this.range[0];
            this.maxSliderLeft = this.valToPixel(this.range[1]);
          }
        }
      }
      this.highlightDimensions();
    }
    return false;
  }
  @HostListener('window:mouseup', ['$event'])
  mouseUp(event: any) {
    this.minSelected = false;
    this.maxSelected = false;
  }
  clickedOutside(event: boolean) {
    if (event) {
      this.minSliderClicked = false;
      this.maxSliderClicked = false;
    }
  }


  @HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const step = this.step ? this.step : 1;
    if (this.minSliderClicked || this.maxSliderClicked) {
      if (this.minSliderClicked) {

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
          const left = this.minSliderLeft - (step * this.valToPixelFactor);
          const value = this.pixToVal(this.min, left);
          if (value >= this.min) {
            this.range[0] = this.stepr(value);
            this.minSliderLeft = this.valToPixel(this.range[0]);
            this.minSliderIntialLeft = this.minSliderLeft;

          }
        } else if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
          const left = this.minSliderLeft + (step * this.valToPixelFactor);
          const value = this.pixToVal(this.min, left);
          if (value <= this.range[1]) {
            this.range[0] = this.stepr(value);
            this.minSliderLeft = this.valToPixel(this.range[0]);

            this.minSliderIntialLeft = this.minSliderLeft;
          }
        }
      } else if (this.maxSliderClicked) {

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
          const left = this.maxSliderLeft - (step * this.valToPixelFactor);
          const value = this.pixToVal(this.min, left);
          if (value >= this.range[0]) {
            this.range[1] = this.stepr(value);
            this.maxSliderLeft = this.valToPixel(this.range[1]);
            this.maxSliderIntialLeft = this.maxSliderLeft;
          }
        } else if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
          const left = this.maxSliderLeft + (step * this.valToPixelFactor);
          const value = this.pixToVal(this.min, left);
          if (value <= this.max) {
            this.range[1] = this.stepr(value);
            this.maxSliderLeft = this.valToPixel(this.range[1]);
            this.maxSliderIntialLeft = this.maxSliderLeft;
          }
        }
      }
      this.highlightDimensions();
    }
  }
}
