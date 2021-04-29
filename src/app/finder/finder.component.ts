import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../services/app.service';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Photo } from '../shared/interfaces.model';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent {

  private readonly photosSubject$ = new BehaviorSubject<any>(null);
  readonly photos$ = this.photosSubject$.asObservable();
  searchValue = '';
  pageNumber = 0;
  pagesAmount = 0;
  isLoading = false;
  isCreating = false;

  constructor(private appService: AppService, private auth: AuthService) { }

  toBookmarkImage(image: Photo, tags: string) {
    if(this.auth.isAuthenticated()) {
      this.isCreating = true;
      this.appService.createBookmark({
        photo: image,
        tags: tags
      }).pipe(first()).subscribe();
      this.isCreating = false;
    } else {
      this.auth.logout();
    }
  }

  loadPhotos(tag: string, page: number): void {
    if (!tag) {
      this.photosSubject$.next(null);
    } else {
      this.isLoading = true;
      this.appService.loadPhotos(tag, page).pipe(tap({
        next: (data) => {
          console.log(data);
          this.pagesAmount = data.photos.pages;
          this.pageNumber = data.photos.page;
          this.searchValue = tag;
          this.photosSubject$.next(data.photos.photo);
          this.isLoading = false;
        },
        error: (err) => {
          alert("Не удалось загрузить фотографии");
          this.isLoading = false;
          console.log(err);
        }
      }), first()).subscribe();
    }
  }

  nextPage() {
    if(this.pageNumber < this.pagesAmount) {
      this.pageNumber += 1;
      this.loadPhotos(this.searchValue, this.pageNumber);
    }
  }

  prevPage() {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.loadPhotos(this.searchValue, this.pageNumber);
    }
  }
}
