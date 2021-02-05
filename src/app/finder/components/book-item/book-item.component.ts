import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FinderService} from '../../finder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TopSearchService} from '../../top-search.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  id: any;
  loading: boolean;
  book: any;
  url: any;

  constructor(private route: ActivatedRoute,
              private finderService: FinderService,
              private sanitizer: DomSanitizer,
              private topSearchService: TopSearchService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.finderService.findBook(
        this.id
      ).subscribe((book) => {
        this.book = book;
        this.loading = false;
        this.book?.volumeInfo?.categories.forEach((category: any) => {
          this.topSearchService.saveCategory(category).subscribe(() => {
              console.log('saved: ' + category);
            },
            () => {
              console.log('error');
            });
        });
        this.topSearchService.saveLink(book.id).subscribe(() => {
            console.log('saved: ' + book.id);
          },
          () => {
            console.log('error');
          });
      });
    });
  }

  getBookAuthors(book: any) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://books.google.ro/books?id=' + book?.id +
      '&pg=PT0&dq=' + book?.title + '&hl=&cd=1&source=gbs_api&output=embed');
    return book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '...';
  }

  getDescription(book: any) {
    return book.volumeInfo.description ? `${book.volumeInfo.description.substring(0, 180)}...` : '...';
  }


}
