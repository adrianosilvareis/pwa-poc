import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { ClientModel } from '@pages/clients/model/Clients.model';

export const addClientAction = createAction('[Clients Page] Add Clients');
export const addClientSuccessAction = createAction('[Clients Page] [success] Add Clients', props<{client: ClientModel}>());
export const addClientErrorAction = createAction('[Clients Page] [error] Add Clients');

export const clientsPageActions = createActionGroup({
  source: 'Clients Page',
  events: {
    // select
    'Select Client': props<{client: ClientModel | null}>(),
    //load
    'Load Clients': emptyProps(),
    'Success on Load Clients': props<{clients: ClientModel[]}>(),
    'Error on Load Clients': emptyProps(),
    // add
    'Add Client': props<{client: ClientModel}>(),
    'Success on Add Client': props<{client: ClientModel}>(),
    'Error on Add Client': emptyProps(),
    // edit
    'Edit Client': emptyProps(),
    'Success on Edit Client': props<{client: ClientModel}>(),
    'Error on Edit Client': emptyProps(),
    // remove
    'Delete Client': emptyProps(),
    'Success on Delete Client': emptyProps(),
    'Error on Delete Client': emptyProps(),
  }
});
