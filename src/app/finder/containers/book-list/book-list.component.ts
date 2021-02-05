import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FinderService} from '../../finder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TopSearchService} from '../../top-search.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  bookList: any;
  loading = false;
  categoriesLoading = false;
  linksLoading = false;
  videoUrl: any;
  categories: any;
  links: any;
  trending = [];

  ngOnInit(): void {
    this.categoriesLoading = true;
    this.linksLoading = true;
    this.topSearchService.getTopCategories().subscribe((categories) => {
      if (categories.length) {
        this.categories = categories;
        this.categories = this.categories.slice(0, 3);
        this.categoriesLoading = false;
      }
    });
    this.topSearchService.getTopLinks().subscribe((links) => {
      if (links.length) {
        this.links = links;
        this.links = this.links.slice(0, 3);
        this.links.map((id) => {
          this.finderService.findBook(id.id).subscribe((book) => {
            this.trending.push(book);
          });
        });
        this.linksLoading = false;
      }
    });
  }

  constructor(private finderService: FinderService, private sanitizer: DomSanitizer, private topSearchService: TopSearchService) {
  }

  onSearch(input: string): void {
    this.loading = true;
    this.subscription = this.finderService.findBooks(input).subscribe((books) => {
      if (books.items.length) {
        this.bookList = books.items;
        this.loading = false;
      }
    });
  }

  getBookAAuthors(book: any) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(book?.volumeInfo?.previewLink + '&output=embed');
    return book?.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : '...';
  }

  getDescription(book: any) {
    return book.volumeInfo.description ? `${book.volumeInfo.description.substring(0, 180)}...` : '...';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUrl(book: any) {
    return this.sanitizer.bypassSecurityTrustUrl(book?.volumeInfo?.previewLink + '&output=embed');
  }
}
