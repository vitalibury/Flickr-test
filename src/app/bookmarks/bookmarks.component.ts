import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  private readonly bookmarksSubject$ = new BehaviorSubject<any>(null);
  readonly bookmarks$ = this.bookmarksSubject$.asObservable();

  private destroy$: Subject<void> = new Subject<void>();
  isDeletting = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.loadBookmarks().subscribe( data => {
      this.bookmarksSubject$.next(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBookmarks() {
    return this.appService.loadBookmarks()
    .pipe(
      map((response) => {
        return Object
        .keys(response)
        .map( key => ({
          id: key,
          photo: response[key].photo,
          tags: response[key].tags
        }
        ));
      }),
      takeUntil(this.destroy$));
  }

  deleteBookmark(id: string) {
    this.appService.deleteBookmark(id)
    .pipe(tap({
      next: () => {
        this.isDeletting = true;
        this.bookmarksSubject$.next(this.bookmarksSubject$.getValue().filter((photo: any) => photo.id !== id));
        this.isDeletting = false;
      },
      error: (err) => {
        console.log(err);
        alert('Не удалось удалить закладку');
        this.isDeletting = false;
      }
    }), takeUntil(this.destroy$)).subscribe();
  }
}
