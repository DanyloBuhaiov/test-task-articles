import { GetInputSearchResults, GetArticlesResults, GetSortedArticlesResults } from './../state/app.actions';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, map, Observable, tap, takeUntil, Subject, fromEvent } from 'rxjs';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { ArticlesState } from '../state/app.state';
import { Article } from '../results/results.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('input') input:ElementRef;
  eventObservable$: Observable<InputEvent>;

  inputValue: string = '';
  private requstUrl: string = 'https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=12';

  private destroy: Subject<boolean> = new Subject<boolean>();
  @Select(ArticlesState.GetNotSortedResultsSelector) notSortedResult$: Observable<Article[]> | undefined;
  @Select(ArticlesState.GetInputSearchSelector) inputValue$: Observable<string> | undefined;


  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.inputValue$?.pipe(takeUntil(this.destroy)).subscribe(inputValue => this.inputValue = inputValue.split('+').join(' '));
    if(!this.inputValue) {
      this.store.dispatch(new GetArticlesResults(this.requstUrl));
    }
  }


  ngAfterViewInit(): void {
    this.eventObservable$ = fromEvent(this.input.nativeElement, 'input');
    this.eventObservable$.pipe(
      takeUntil(this.destroy),
      map(res => (res.target as HTMLInputElement).value),
      map(res => res.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().split(' ').filter(el => el !== '').join('+')),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe({
      next: (res) => {
        if(res) {
          this.store.dispatch(new GetInputSearchResults(res))
        } else {
          this.store.dispatch(new GetArticlesResults(this.requstUrl))
        }
      }
    });


    this.notSortedResult$?.pipe(takeUntil(this.destroy)).subscribe({
      next: (notSortedResult) => {
        this.store.dispatch(new GetSortedArticlesResults(notSortedResult, this.inputValue));
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}

