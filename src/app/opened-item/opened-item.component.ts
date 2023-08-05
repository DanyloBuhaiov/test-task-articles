import { GetArticleById } from './../state/app.actions';
import { Article } from './../results/results.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ArticlesState } from '../state/app.state';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-opened-item',
  templateUrl: './opened-item.component.html',
  styleUrls: ['./opened-item.component.css']
})
export class OpenedItemComponent implements OnInit, OnDestroy{
  article: Article;
  id: number;
  private destroy: Subject<boolean> = new Subject<boolean>();
  requstUrl: string = '';
  isLoadError: string = '';
  isLoading: boolean = false;

  @Select(ArticlesState.GetArticleByIdSelector) article$: Observable<Article> | undefined;
  @Select(ArticlesState.GetLoadErrorArticleByIdSelector) isLoadError$: Observable<string> | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.article$?.pipe(takeUntil(this.destroy)).subscribe(article => this.article = article);
    this.isLoadError$?.pipe(takeUntil(this.destroy)).subscribe(isLoadError => this.isLoadError = isLoadError);

    this.id = this.route.snapshot.params['id'];
    this.requstUrl = `https://api.spaceflightnewsapi.net/v4/articles/${this.id}?format=json`;

    this.store.dispatch(new GetArticleById(this.requstUrl));

  }

  onClickBackHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
