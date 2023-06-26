import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  template: ''
})
export class UnsubscribeComponent implements OnDestroy {

  protected subs = new Subscription();

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
