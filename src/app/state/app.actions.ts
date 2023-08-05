import { Article } from './../results/results.service';
export class GetArticlesResults {
  static readonly type = '[Articles] Get Articles Results';
  constructor(public url: string) {}
}

export class GetInputSearchResults {
  static readonly type = '[Articles] Get Input Search Results';
  constructor(public inputValueForSearch: string) {}
}

export class GetSortedArticlesResults {
  static readonly type = '[Articles] Get Sorted Articles Results';
  constructor(public arr: Article[], public inputValue: string) {}
}

export class GetArticleById {
  static readonly type = '[Articles] Get Article By Id';
  constructor(public url: string) {}
}

export class IsLoadingSearch {
  static readonly type = '[Articles] Is Loading Search';
  constructor() {}
}
