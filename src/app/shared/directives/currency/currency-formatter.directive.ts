import { Directive, HostListener, ElementRef, OnInit, Input, OnDestroy } from "@angular/core";
import { CurrencyPipe } from '@angular/common';
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Directive({ selector: "[appCurrencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit, OnDestroy {

  @Input() currency = 'USD';
  @Input() currencyControl!: FormControl;

  private el: HTMLInputElement;
  private destroyed$ = new Subject();
  private skipNext = false;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  ngOnInit() {
    if (this.currencyControl !== undefined) {
      this.el.value = this.transform(this.numberToDouble(this.currencyControl.value));
      this.updateWhenControlChanges();
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
    this.currencyControl.markAsTouched();
    this.currencyControl.markAsDirty();
    this.el.dispatchEvent(new Event('input'));
  }

  private updateWhenControlChanges() {
    this.currencyControl.valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((value: number) => {
          if (!this.skipNext) {
            this.el.value = this.transform(this.numberToDouble(value));
          }
          this.skipNext = false;
        });
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

  private numberToDouble(value: number) {
    const input = String(value)
    if (input.match(/\D/g) === null) {
      return `${input}.00`;
    }
    return input
  }

  private parseControl() {
    const value = this.el.value.replace(/\D/g, "");
    const original = Number(value)/100;
    if (this.currencyControl !== undefined) {
      this.skipNext = true;
      this.currencyControl.setValue(original);
      this.checkIsValid();
    }
  }

  private checkIsValid() {
    if (this.currencyControl.touched && this.currencyControl.invalid) {
      this.el.classList.add('!text-red-500');
    } else {
      this.el.classList.remove('!text-red-500');
    }
  }
}
