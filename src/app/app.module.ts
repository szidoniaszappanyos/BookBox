import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {FinderService} from './finder/finder.service';
import {SearchInputComponent} from './finder/components/search-input/search-input.component';
import {BookItemComponent} from './finder/components/book-item/book-item.component';
import {BookListComponent} from './finder/containers/book-list/book-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SafeUrlPipe} from './finder/containers/book-list/safe-url.pipe';
import {SafeHtmlPipe} from './finder/containers/book-list/safe-html.pipe';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {TopSearchService} from './finder/top-search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    BookItemComponent,
    BookListComponent,
    SafeUrlPipe,
    SafeHtmlPipe
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  providers: [FinderService, AppRoutingModule, TopSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
