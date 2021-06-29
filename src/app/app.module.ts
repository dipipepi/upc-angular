import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { JoinComponent } from './components/join/join.component';
import { RecordingsComponent } from './components/recordings/recordings.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { HeaderComponent } from './components/header/header.component';
import {AboutComponent} from './components/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageUtilsComponent } from './shared/message-utils/message-utils.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import {
  GuestSettingsComponent,
  ShowHaveNotLogDialogComponent,
  WarningSaveLogsDialogComponent
} from './components/settings/guest-settings/guest-settings.component';
import { CustomSelectComponent } from './shared/custom-select/custom-select.component';
import {MatSelectModule} from '@angular/material/select';
import { ShowPasswordComponent } from './shared/show-password/show-password.component';
import { TagSelectorComponent } from './shared/tag-selector/tag-selector.component';
import { EndpointsComponent } from './shared/endpoints/endpoints.component';


// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    RecordingsComponent,
    ScheduleComponent,
    NavigatorComponent,
    AuthorizationComponent,
    HeaderComponent,
    AboutComponent,
    MessageUtilsComponent,
    UserSettingsComponent,
    GuestSettingsComponent,
    CustomSelectComponent,
    WarningSaveLogsDialogComponent,
    ShowHaveNotLogDialogComponent,
    ShowPasswordComponent,
    TagSelectorComponent,
    EndpointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
  ],
  exports: [
    TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
