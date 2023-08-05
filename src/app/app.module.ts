import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { ResultsComponent } from './results/results.component';
import { FilterComponent } from './filter/filter.component';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ResultItemComponent } from './results/result-item/result-item.component';
import { StrLengthPipe } from './pipes/str-length.pipe';
import { OpenedItemComponent } from './opened-item/opened-item.component';
import { ArticlesState } from './state/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectWordsPipe } from './pipes/select-words.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ResultsComponent,
    FilterComponent,
    ResultItemComponent,
    StrLengthPipe,
    OpenedItemComponent,
    HomePageComponent,
    SelectWordsPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxsModule.forRoot([ArticlesState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
