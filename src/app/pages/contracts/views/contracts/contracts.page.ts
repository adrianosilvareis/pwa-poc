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
import { isContractLoading, selectContractsList } from "@pages/contracts/store/contracts.selectors";
import { FieldType } from "@root/app/shared/components/form/protocols/field-type";
import { TableColumnsService } from "@root/app/services/table-columns/table-columns.service";
import { clientsPageActions } from "@root/app/pages/clients/store/clients.actions";

@Component({
  styleUrls: ['./contracts.page.scss'],
  template: `
  <app-table
    *ngIf="(isLoading | async) === false else loading"
    [columns]="columns"
    title="Contracts"
    [items]="data"
    (add)="addContract()"
    (edit)="editContract()"
    (selectItem)="selectContract($event)"
    (remove)="removeContract()"
    role="company-table"
  ></app-table>

  <ng-template #loading>
    <app-loading></app-loading>
  </ng-template>
  `
})
export class ContractsPage extends Unsubscribe implements OnInit {
  columns!: ColumnItem[];

  data: Observable<ContractsModel[]> = this.store.select(selectContractsList);
  isLoading: Observable<boolean> = this.store.select(isContractLoading);

  private selected!: ContractsModel | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService,
    private columnBuild: TableColumnsService,
  ) { super(); }

  ngOnInit(): void {
    this._configColumns();
    this.store.dispatch(contractsPageActions.selectContract({ contract: null }));
    this.store.dispatch(clientsPageActions.loadClients());
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

  private _configColumns() {
    this.columns = this.columnBuild
      .addItem({ name: 'Cliente', value: 'clientName', type: FieldType.input })
      .addItem({ name: 'Data Inicio', value: 'startDate', type: FieldType.date })
      .addItem({ name: 'Data Fim', value: 'endDate', type: FieldType.date })
      .addItem({ name: 'Renovável', value: 'Renewable', type: FieldType.YesNo })
      .addItem({ name: 'Preço', value: 'price', type: FieldType.currency })
      .build()
  }
}
