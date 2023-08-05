import { IsLoadingSearch } from './../state/app.actions';
import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Article {
  "id": number,
  "title": string,
  "url": string,
  "image_url": string,
  "news_site": string,
  "summary": string,
  "published_at": string,
  "updated_at"?: string,
  "featured"?: boolean,
  "launches"?: [
    {
    "launch_id"?: string,
    "provider"?: string
    }
    ],
  "events"?: []
  }

export interface GetArticles {
  "count": number,
  "next": string | null,
  "previous": string | null,
  "results": Article[]
  }

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getArticles(url: string) {
    this.store.dispatch(new IsLoadingSearch());
    return this.http.get<GetArticles>(url);
  }

}
