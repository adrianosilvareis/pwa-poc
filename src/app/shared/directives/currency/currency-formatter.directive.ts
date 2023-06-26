import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { CurrencyPipe } from '@angular/common';

@Directive({ selector: "[appCurrencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

  @Input() currency = 'USD';

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.transform(this.el.value);
    console.log('CurrencyFormatterDirective')
  }

  @HostListener("input", ["$event.target.value"])
  onChange(value: string) {
    this.el.value = this.transform(value);
    console.log('CurrencyFormatterDirective')
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.el.value = this.transform(value);
    console.log('CurrencyFormatterDirective')
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

}
