import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ClientModel } from '@pages/clients/model/client.model';

export const clientsPageActions = createActionGroup({
  source: 'Clients Page',
  events: {
    // select
    'Select Client': props<{client: ClientModel | null}>(),
    'Get Client By Id': props<{id: string}>(),
    //load
    'Load Clients': emptyProps(),
    'Success on Load Clients': props<{clients: ClientModel[]}>(),
    'Error on Load Clients': emptyProps(),
    // add
    'Add Client': props<{client: ClientModel}>(),
    'Success on Add Client': props<{client: ClientModel}>(),
    'Error on Add Client': emptyProps(),
    // edit
    'Edit Client': props<{client: ClientModel}>(),
    'Success on Edit Client': props<{client: ClientModel}>(),
    'Error on Edit Client': emptyProps(),
    // remove
    'Delete Client': emptyProps(),
    'Success on Delete Client': emptyProps(),
    'Error on Delete Client': emptyProps(),
  }
});
