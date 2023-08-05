import { IsLoadingSearch } from './../state/app.actions';
import { Store } from '@ngxs/store';
import { Article, GetArticles } from './../results/results.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  url: string = 'https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=120&search=';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getInputSearchResults(inputValue: string) {
    this.store.dispatch(new IsLoadingSearch());
    return this.http.get<GetArticles>(this.url+inputValue);
  }

  sortResults(arr: Article[], inputValue: string):Article[] {
    let result1:Article[]  = [];
    let result:Article[]  = [];
    let searcWordsArray: string[] = inputValue.split(' ');

    for (let i = searcWordsArray.length - 1; i >= 0 ; i--) {
      const element = searcWordsArray[i];
      result1 = arr.sort((a, b) => {
        if(a.summary.toLowerCase().includes(element) && !b.summary.toLowerCase().includes(element)) {
          return -1;
        }
        if(!a.summary.toLowerCase().includes(element) && b.summary.toLowerCase().includes(element)) {
          return 1;
        }
        return 0;
      });
    }

    for (let i = searcWordsArray.length - 1; i >= 0 ; i--) {
      const element = searcWordsArray[i];
      result = result1.sort((a, b) => {
        if(a.title.toLowerCase().includes(element) && !b.title.toLowerCase().includes(element)) {
          return -1;
        }
        if(!a.title.toLowerCase().includes(element) && b.title.toLowerCase().includes(element)) {
          return 1;
        }
        return 0;
      });
    }

    return result;
  }
}
