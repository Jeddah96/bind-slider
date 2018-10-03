import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import * as fromComponents from './components';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ConnServiceService } from './conn-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.components,
  ],
  imports: [
    BrowserModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [
    ConnServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
