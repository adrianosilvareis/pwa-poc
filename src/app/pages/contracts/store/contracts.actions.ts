import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { ContractsModel } from "../model/contracts.models";

export const contractsPageActions = createActionGroup({
  source: 'Contracts Page',
  events: {
    // select
    'Select Contract': props<{contract: ContractsModel | null}>(),
    'Get Contract By Id': props<{id: string}>(),
    //load
    'Load Contracts': emptyProps(),
    'Success on Load Contracts': props<{contracts: ContractsModel[]}>(),
    'Error on Load Contracts': emptyProps(),
    // add
    'Add Contract': props<{contract: ContractsModel}>(),
    'Success on Add Contract': props<{contract: ContractsModel}>(),
    'Error on Add Contract': emptyProps(),
    // edit
    'Edit Contract': props<{contract: ContractsModel}>(),
    'Success on Edit Contract': props<{contract: ContractsModel}>(),
    'Error on Edit Contract': emptyProps(),
    // remove
    'Delete Contract': emptyProps(),
    'Success on Delete Contract': emptyProps(),
    'Error on Delete Contract': emptyProps(),
  }
});
