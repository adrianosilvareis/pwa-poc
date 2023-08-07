import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Injectable()
export class Unsubscribe implements OnDestroy {

  protected subs = new Subscription();
  protected destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
    this.subs.unsubscribe()
  }
}
