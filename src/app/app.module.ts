import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { clientsReducer } from '@pages/clients/store/clients.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ClientsEffects } from '@pages/clients/store/clients.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@root/app/shared/shared.module';
import { servicesReducer } from './pages/company-services/store/company-services.reducer';
import { ServicesEffects } from './pages/company-services/store/company-services.effects';
import { ContractsEffects } from './pages/contracts/store/contracts.effects';
import { contractsReducer } from './pages/contracts/store/contracts.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({ client: clientsReducer, service: servicesReducer, contract: contractsReducer }, {}),
    EffectsModule.forRoot([ClientsEffects, ServicesEffects, ContractsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
