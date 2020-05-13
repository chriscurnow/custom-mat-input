import {Directive, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import { numberWithCommas, stringToDinero } from './helpers';
import Dinero from 'dinero.js'

@Directive({
  selector: 'input[matInputCommified]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatInputCommifiedDirective},
     {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInputCommifiedDirective),
      multi: true,
    } 
    ],
    
})
export class MatInputCommifiedDirective {

  private _value: Dinero | null;

  constructor(private elementRef: ElementRef<HTMLInputElement>,
  ) {}


  get value(): Dinero | null {
    return this._value;
  }

  @Input('value')
  set value(value: Dinero | null) {
    this._value = value;
    this.formatValue(value);
  }

  private formatValue(value: Dinero | null) {
    console.log('formatting value', value);
    switch (value) {
      case null:
        this.elementRef.nativeElement.value = '';
        break;

      case '':
       this.elementRef.nativeElement.value = '';
        break;

      default :
        this.elementRef.nativeElement.value = numberWithCommas(value);
    }
    
  }
  private unFormatValue() {
    const value = this.elementRef.nativeElement.value;
    this._value = stringToDinero(value);
    const displayValue = value.replace(/[^\d.-]/g, '');
    // this._value = value.replace(/[^\d.-]/g, '');
    if (value) {
      this.elementRef.nativeElement.value = this._value;
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    // here we cut any non numerical symbols    
    this._value = value.replace(/[^\d.-]/g, '');
    this._onChange(this._value);
  }

  @HostListener('blur')
  _onBlur() {
    this.formatValue(this._value); // add commas
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue(); // remove commas for editing purpose
  }

  _onChange(value: any): void {
  }

  writeValue(value: any) {
    this._value = value;
    this.formatValue(this._value); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched() {
  }


}