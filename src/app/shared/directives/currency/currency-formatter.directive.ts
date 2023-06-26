import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { CurrencyPipe } from '@angular/common';
import { FormControl } from "@angular/forms";

@Directive({ selector: "[appCurrencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

  @Input() currency = 'USD';
  @Input() currencyControl!: FormControl;

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.currencyControl !== undefined) {
      this.el.value = this.transform(this.initialValue(String(this.currencyControl.value)));
    }
    setTimeout(()=> {
      this.parseControl();
    })
  }

  @HostListener("input", ["$event.target.value"])
  onChange(value: string) {
    this.el.value = this.transform(value);
    this.parseControl();
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.el.value = this.transform(value);
    this.el.dispatchEvent(new Event('input'));
  }

  private transform(input: string) {
    return this.currencyPipe.transform(this.clearValue(input), this.currency)  ?? '';
  }

  private clearValue(input: string) {
    const value = input.replace(/\D/g, "");
    if (value.length === 0) {
      return '0.00';
    } else if (value.length === 1) {
      return `0.0${value}`;
    } else if (value.length === 2) {
      return `0.${value}`;
    }
    const cents = value.substring(value.length - 2, value.length);
    const dollars = value.substring(0, value.length - 2);
    return `${dollars}.${cents}`;
  }

  private initialValue(input: string) {
    if (input.match(/\D/g) === null) {
      return `${input}.00`;
    }
    return input
  }

  private parseControl() {
    const value = this.el.value.replace(/\D/g, "");
    const original = Number(value)/100;
    if (this.currencyControl !== undefined) {
      this.currencyControl.setValue(original);
    }
  }
}
