import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormItems } from '@root/app/components/form/items.model';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormItemsBuilderService } from '@root/app/services/form-items/form-items-builder.service';
import { Store } from '@ngrx/store';
import { isClientLoading, selectedClient } from '@pages/clients/store/clients.selectors';
import { clientsPageActions } from '@pages/clients/store/clients.actions';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { AppState } from '@root/app/app-state';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent extends Unsubscribe implements OnInit {
  id!: string;

  client!: ClientModel | null;

  data!: FormItems[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormItemsBuilderService,
    private store: Store<AppState>,
  ) { super(); }

  ngOnInit() {
    this.subs.add(this.fillId());
    this.subs.add(this.generateForm());
  }

  saveClient(client: ClientModel) {
    if (this.id) {
      this.store.dispatch(clientsPageActions.editClient({ client: this.sanitize(client) }));
    } else {
      this.store.dispatch(clientsPageActions.addClient({ client: this.sanitize(client) }));
    }
    this.subs.add(this.backToList());
  }

  cancel() {
    this.router.navigate(['/clients']);
  }

  private backToList() {
    return this.store
      .select(isClientLoading)
      .subscribe(isLoading => { if(!isLoading) { this.router.navigate(['/clients']); } });
  }

  private fillId() {
    return this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  private generateForm() {
    if (this.id) {
      this.store.dispatch(clientsPageActions.getClientById({ id: this.id }));
    } else {
      this.store.dispatch(clientsPageActions.selectClient({ client: null }));
    }

    return this.store.select(selectedClient).subscribe(item => {
      this.client = item;
      if (item) {
        this.data = this.buildData(item);
      } else {
        this.data = this.buildData()
      }
    });
  }

  private buildData(item?: ClientModel) {
    return this.builder
      .addItem({ name: 'name', colspan: 2, value: item?.name, clearable: true }).addValidations([Validators.required])
      .addItem({ name: 'description', colspan: 2, value: item?.description, clearable: true })
      .addItem({ name: 'owner', value: item?.owner, clearable: true })
      .addItem({ name: 'responsible', value: item?.responsible, clearable: true })
      .addItem({ name: 'area', value: item?.area, clearable: true })
      .build();
  }

  private sanitize(formClient: ClientModel):ClientModel {
    return {
      id: this.client?.id,
      name: formClient.name,
      description: formClient.description,
      area: formClient.area,
      owner:formClient.owner,
      responsible: formClient.responsible,
      contacts: this.client?.contacts ?? [],
      payments: this.client?.payments ?? [],
      contracts: this.client?.contracts ?? [],
      isActive: this.client?.isActive ?? false
    }
  }
}
