import { IsLoadingSearch } from './../state/app.actions';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../results/results.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedItemService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getArticleById(url: string) {
    this.store.dispatch(new IsLoadingSearch);
    return this.http.get<Article>(url);
  }
}
