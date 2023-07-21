import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { ColumnItem } from "@root/app/shared/components/table/table.component";
import { DeleteDialogService } from "@root/app/services/dialog/delete-dialog.service";
import { Unsubscribe } from "@root/app/utils/unsubscribe";
import { Observable } from "rxjs";
import { ContractsModel } from "@pages/contracts/model/contracts.models";
import { contractsPageActions } from "@pages/contracts/store/contracts.actions";
import { selectActiveContracts, isContractLoading } from "@pages/contracts/store/contracts.selectors";
import { FieldType } from "@root/app/shared/components/form/items.model";

@Component({
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss']
})
export class ContractsPage extends Unsubscribe implements OnInit {
  columns: ColumnItem[] = [
    { name: 'Start Date', value: 'startDate', type: FieldType.date },
    { name: 'End Date', value: 'endDate', type: FieldType.date },
    { name: 'Renewable', value: 'renewable', type: FieldType.YesNo },
    { name: 'Services', value: 'services', type: FieldType.autocomplete, labelName: 'title' },
    { name: 'Price', value: 'price', type: FieldType.currency },
  ];

  data: Observable<ContractsModel[]> = this.store.select(selectActiveContracts);
  isLoading: Observable<boolean> = this.store.select(isContractLoading);

  private selected!: ContractsModel | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService
  ) { super(); }

  ngOnInit(): void {
    this.store.dispatch(contractsPageActions.selectContract({ contract: null }));
    this.store.dispatch(contractsPageActions.loadContracts());
  }

  selectContract(contract: ContractsModel | null) {
    this.selected = contract;
    this.store.dispatch(contractsPageActions.selectContract({ contract }));
  }

  addContract() {
    this.router.navigate(['/contracts/new']);
  }

  editContract() {
    this.router.navigate([`/contracts/${this.selected?.id}`]);
  }

  removeContract() {
    this.dialog.openDialog({ pageName: 'Serviço', register: this.selected?.id as string });
    this.subs.add(this.dialog.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(contractsPageActions.deleteContract());
      }
    }));
  }
}
