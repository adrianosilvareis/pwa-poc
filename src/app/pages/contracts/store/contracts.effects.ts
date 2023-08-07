import { HTTPContractsService } from '@pages/contracts/services/http-contracts/http-contracts.service';
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { withLatestFrom, exhaustMap, of, map, catchError } from "rxjs";
import { ContractsModel } from "@pages/contracts/model/contracts.models";
import { contractsPageActions } from "./contracts.actions";
import { selectedContract, selectedContractId, newContract, selectContracts } from "./contracts.selectors";
import { servicesPageActions } from '@pages/company-services/store/company-services.actions';

@Injectable()
export class ContractsEffects {

  loadContracts$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.loadContracts),
    withLatestFrom(this.store.select(selectContracts)),
    exhaustMap(([, contracts]) => this.loadContracts(contracts)))
  );

  loadOptionsServices$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.loadContracts),
    exhaustMap(() => of(servicesPageActions.loadServices())))
  );

  getContractById$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.getContractById),
    withLatestFrom(this.store.select(selectedContract), this.store.select(selectedContractId)),
    exhaustMap(([, contract, contractId]) => this.getContract(contract, contractId)))
  );

  addContracts$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.addContract),
    withLatestFrom(this.store.select(newContract)),
    exhaustMap(([, contract]) => this.addContracts(contract as ContractsModel)))
  );

  editContracts$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.editContract),
    withLatestFrom(this.store.select(selectedContract)),
    exhaustMap(([, contract]) => this.editContracts(contract as ContractsModel)))
  );

  deleteContracts$ = createEffect(() => this.actions$.pipe(
    ofType(contractsPageActions.deleteContract),
    withLatestFrom(this.store.select(selectedContract)),
    exhaustMap(([, contract]) => this.deleteContracts(contract as ContractsModel)))
  );

  constructor(
    private actions$: Actions,
    private contractsService: HTTPContractsService,
    private store: Store<AppState>
  ) {}

  private loadContracts(contracts: ContractsModel[]) {
    return contracts.length > 0 ?
      of(contractsPageActions.successOnLoadContracts({ contracts })):
      this.contractsService.loadContracts()
        .pipe(
          map(contracts => contractsPageActions.successOnLoadContracts({ contracts })),
          catchError(() => of(contractsPageActions.errorOnLoadContracts()))
        )
  }

  private getContract(contract: ContractsModel | null, contractId?: string) {
    return contract ?
      of(contractsPageActions.selectContract({ contract })):
      this.contractsService.getContractById(contractId as string)
        .pipe(
          map(contract => contractsPageActions.selectContract({ contract })),
          catchError(() => of(contractsPageActions.selectContract({ contract: null })))
        )
  }

  private addContracts(newContract: ContractsModel) {
    return this.contractsService.addContracts(newContract)
      .pipe(
        map(contract => contractsPageActions.successOnAddContract({ contract })),
        catchError(() => of(contractsPageActions.errorOnAddContract()))
      )
  }

  private editContracts(contract: ContractsModel) {
    return this.contractsService.editContracts(contract)
      .pipe(
        map(contract => contractsPageActions.successOnEditContract({ contract })),
        catchError(() => of(contractsPageActions.errorOnEditContract()))
      )
  }

  private deleteContracts(contract: ContractsModel) {
    return this.contractsService.deleteContracts(contract)
      .pipe(
        map(() => contractsPageActions.successOnDeleteContract()),
        catchError(() => of(contractsPageActions.errorOnDeleteContract()))
      )
  }
}
