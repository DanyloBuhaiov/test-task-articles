import { Router } from '@angular/router';
import { Article } from './../results.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { ArticlesState } from 'src/app/state/app.state';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit, OnDestroy{
  @Input() article: Article;
  inputValue: string = '';
  private destroy: Subject<boolean> = new Subject<boolean>();

  @Select(ArticlesState.GetInputSearchSelector) inputValue$: Observable<string> | undefined;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inputValue$?.pipe(takeUntil(this.destroy)).subscribe(inputValue => this.inputValue = inputValue);
  }
  onClickReadMore() {
    this.router.navigate([`home/${this.article.id}`]);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
