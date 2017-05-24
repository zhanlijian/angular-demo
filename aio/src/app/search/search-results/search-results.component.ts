import { Component, ChangeDetectionStrategy, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { SearchResult, SearchResults, SearchService } from '../search.service';

export interface SearchArea {
  name: string;
  pages: SearchResult[];
}

/**
 * A component to display the search results
 */
@Component({
  selector: 'aio-search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {

  readonly defaultArea = 'Other';

  showResults = false;

  @Output()
  resultSelected = new EventEmitter<SearchResult>();

  /**
   * A mapping of the search results grouped into areas
   */
  searchAreas = new ReplaySubject<SearchArea[]>(1);

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchResults.subscribe(search => this.searchAreas.next(this.processSearchResults(search)));
  }

  onResultSelected(result: SearchResult) {
    this.resultSelected.emit(result);
    this.hideResults();
  }

  @HostListener('document:keyup', ['$event.which'])
  onKeyUp(keyCode: number) {
    if (keyCode === 27) {
      this.hideResults();
    }
  }

  hideResults() {
    this.searchAreas.next([]);
  }

  // Map the search results into groups by area
  private processSearchResults(search: SearchResults) {
    this.showResults = true;
    const searchAreaMap = {};
    search.results.forEach(result => {
      const areaName = this.computeAreaName(result) || this.defaultArea;
      const area = searchAreaMap[areaName] = searchAreaMap[areaName] || [];
      area.push(result);
    });
    return Object.keys(searchAreaMap).map(name => ({ name, pages: searchAreaMap[name] }));
  }

  // Split the search result path and use the top level folder, if there is one, as the area name.
  private computeAreaName(result: SearchResult) {
    const [areaName, rest] = result.path.split('/', 2);
    return rest && areaName;
  }
}
