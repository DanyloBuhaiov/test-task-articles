import { FilterService } from './../filter/filter.service';
import { OpenedItemService } from './../opened-item/opened-item.service';
import { Article, ResultsService } from './../results/results.service';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { GetArticlesResults, IsLoadingSearch, GetArticleById, GetInputSearchResults, GetSortedArticlesResults } from './app.actions';
import { catchError, tap } from 'rxjs';


export interface ArticleInfoState {
  articlesResults: Article[],
  notSortedResults: Article[],
  count: number,
  loadError: string,
  next: string | null,
  previous: string | null,
  isLoadingSearch: boolean,
  articleById: Article | null,
  loadErrorArticleById: string,
  inputSearch: string
}

@State<ArticleInfoState>({
  name: 'Articles',
  defaults: {
    articlesResults: [],
    notSortedResults: [],
    count: 0,
    loadError: '',
    next: null,
    previous: null,
    isLoadingSearch: false,
    articleById: null,
    loadErrorArticleById: '',
    inputSearch: ''
  }
})
@Injectable()
export class ArticlesState {

  constructor(
    private resultsService: ResultsService,
    private openedItemService: OpenedItemService,
    private filterService: FilterService
  ) {}

  @Selector()
  static GetArticlesResultsSelector(state: ArticleInfoState) {
    return state.articlesResults;
  }
  @Selector()
  static GetNotSortedResultsSelector(state: ArticleInfoState) {
    return state.notSortedResults;
  }
  @Selector()
  static GetCountSelector(state: ArticleInfoState) {
    return state.count;
  }
  @Selector()
  static GetNextSelector(state: ArticleInfoState) {
    return state.next;
  }
  @Selector()
  static GetPreviousSelector(state: ArticleInfoState) {
    return state.previous;
  }
  @Selector()
  static GetLoadErrorSelector(state: ArticleInfoState) {
    return state.loadError;
  }
  @Selector()
  static GetisLoadingSearchSelector(state: ArticleInfoState) {
    return state.isLoadingSearch;
  }
  @Selector()
  static GetArticleByIdSelector(state: ArticleInfoState) {
    return state.articleById;
  }
  @Selector()
  static GetLoadErrorArticleByIdSelector(state: ArticleInfoState) {
    return state.loadErrorArticleById;
  }
  @Selector()
  static GetInputSearchSelector(state: ArticleInfoState) {
    return state.inputSearch;
  }

  @Action(GetArticlesResults)
  GetArticlesResultsAction(ctx: StateContext<ArticleInfoState>, action: GetArticlesResults) {
    return this.resultsService.getArticles(action.url).pipe(
      tap(res => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          articlesResults: res.results,
          count: res.count,
          next: res.next,
          previous: res.previous,
          isLoadingSearch: false,
          loadError: '',
          inputSearch: ''
        })
      }),
      catchError(e => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          loadError: e.message
        })
        throw new Error(e.message);
        })
    )
  }

  @Action(GetInputSearchResults)
  GetInputSearchResultsAction(ctx: StateContext<ArticleInfoState>, action: GetInputSearchResults) {
    return this.filterService.getInputSearchResults(action.inputValueForSearch).pipe(
      tap(res => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          notSortedResults: res.results,
          count: res.count,
          next: res.next,
          previous: res.previous,
          isLoadingSearch: false,
          loadError: '',
          inputSearch: action.inputValueForSearch
        })
      }),
      catchError(e => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          loadError: e.message
        })
        throw new Error(e.message);
        })
    )
  }

  @Action(GetArticleById)
  GetArticleByIdAction(ctx: StateContext<ArticleInfoState>, action: GetArticleById) {
    return this.openedItemService.getArticleById(action.url).pipe(
      tap(res => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          articleById: res,
          isLoadingSearch: false,
          loadErrorArticleById: ''
        })
      }),
      catchError(e => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          loadErrorArticleById: e.message
        })
        throw new Error(e.message);
        })
    )
  }

  @Action(GetSortedArticlesResults)
  GetSortedArticlesResultsAction(ctx: StateContext<ArticleInfoState>, action: GetSortedArticlesResults) {
    const sortedArticles: Article[] = this.filterService.sortResults(action.arr, action.inputValue);
    const state = ctx.getState();
    ctx.setState({
      ...state,
      articlesResults: sortedArticles
    });

  }

  @Action(IsLoadingSearch)
  IsLoadingSearchAction(ctx: StateContext<ArticleInfoState>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoadingSearch: true
    });
  }
}
