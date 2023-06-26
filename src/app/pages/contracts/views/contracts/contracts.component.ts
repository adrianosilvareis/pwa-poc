import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { ColumnItem } from "@root/app/shared/components/table/table.component";
import { DeleteDialogService } from "@root/app/services/dialog/delete-dialog.service";
import { Unsubscribe } from "@root/app/utils/unsubscribe";
import { Observable } from "rxjs";
import { ContractsModel } from "../../model/contracts.models";
import { contractsPageActions } from "../../store/contracts.actions";
import { selectActiveContracts, isContractLoading } from "../../store/contracts.selectors";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent extends Unsubscribe implements OnInit {
  columns: ColumnItem[] = [
    { name: 'Start Date', value: 'startDate' },
    { name: 'End Date', value: 'endDate' },
    { name: 'Renewable', value: 'renewable' },
    { name: 'Services', value: 'services' },
    { name: 'Price', value: 'price' },
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
