import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  form: FormGroup;

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const searchInput = this.form.value.search;
      this.search.emit(searchInput);
    }
  }
}
