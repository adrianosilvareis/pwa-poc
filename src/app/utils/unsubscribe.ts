import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class Unsubscribe implements OnDestroy {

  protected subs = new Subscription();

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
