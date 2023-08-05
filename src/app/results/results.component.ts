import { ArticlesState } from './../state/app.state';
import { Article } from './results.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetArticlesResults } from '../state/app.actions';
import { Observable, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy{
  articleResults: Article[] = [];
  count: number = 0;
  isLoading: boolean = false;
  isLoadError: string = '';
  nextPage: string | null = null;
  previousPage: string | null = null;
  private destroy: Subject<boolean> = new Subject<boolean>();
  

  @Select(ArticlesState.GetArticlesResultsSelector) articleResults$: Observable<Article[]> | undefined;
  @Select(ArticlesState.GetCountSelector) count$: Observable<number> | undefined;
  @Select(ArticlesState.GetisLoadingSearchSelector) isLoading$: Observable<boolean> | undefined;
  @Select(ArticlesState.GetLoadErrorSelector) isLoadError$: Observable<string> | undefined;
  @Select(ArticlesState.GetNextSelector) nextPage$: Observable<string | null> | undefined;
  @Select(ArticlesState.GetPreviousSelector) previousPage$: Observable<string | null> | undefined;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.articleResults$?.pipe(takeUntil(this.destroy)).subscribe(articleResults => this.articleResults = articleResults);
    this.count$?.pipe(takeUntil(this.destroy)).subscribe(count => this.count = count);
    this.isLoading$?.pipe(takeUntil(this.destroy)).subscribe(isLoading => this.isLoading = isLoading);
    this.isLoadError$?.pipe(takeUntil(this.destroy)).subscribe(isLoadError => this.isLoadError = isLoadError);
    this.nextPage$?.pipe(takeUntil(this.destroy)).subscribe(nextPage => this.nextPage = nextPage);
    this.previousPage$?.pipe(takeUntil(this.destroy)).subscribe(previousPage => this.previousPage = previousPage);

  }

  onClickNext() {
    this.store.dispatch(new GetArticlesResults(this.nextPage as string));
  }

  onClickPrevious() {
    this.store.dispatch(new GetArticlesResults(this.previousPage as string));
  }


  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
