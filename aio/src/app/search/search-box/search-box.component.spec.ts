import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchBoxComponent } from './search-box.component';
import { SearchService } from '../search.service';
import { MockSearchService } from 'testing/search.service';
import { LocationService } from 'app/shared/location.service';
import { MockLocationService } from 'testing/location.service';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
      providers: [
        { provide: SearchService, useFactory: () => new MockSearchService() },
        { provide: LocationService, useFactory: () => new MockLocationService('') }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initialisation', () => {
    it('should get the current search query from the location service', inject([LocationService], (location: MockLocationService) => {
      location.search.and.returnValue({ search: 'initial search' });
      spyOn(component, 'onSearch');
      component.ngOnInit();
      expect(location.search).toHaveBeenCalled();
      expect(component.onSearch).toHaveBeenCalledWith('initial search');
      expect(component.searchBox.nativeElement.value).toEqual('initial search');
    }));
  });

  describe('on keyup', () => {
    it('should call the search service, if it is not triggered by the ESC key', inject([SearchService], (search: MockSearchService) => {
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('keyup', { target: { value: 'some query' } });
      expect(search.search).toHaveBeenCalledWith('some query');
    }));

    it('should not call the search service if it is triggered by the ESC key', inject([SearchService], (search: MockSearchService) => {
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('keyup', { target: { value: 'some query' }, which: 27 });
      expect(search.search).not.toHaveBeenCalled();
    }));

    it('should set the search part of the browser location', inject([LocationService], (location: MockLocationService) => {
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('keyup', { target: { value: 'some query' } });
      expect(location.setSearch).toHaveBeenCalledWith('Full Text Search', { search: 'some query' });
    }));
  });

  describe('on focus', () => {
    it('should call the search service on focus', inject([SearchService], (search: SearchService) => {
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('focus', { target: { value: 'some query' } });
      expect(search.search).toHaveBeenCalledWith('some query');
    }));
  });

  describe('on click', () => {
    it('should call the search service on click', inject([SearchService], (search: SearchService) => {
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('click', { target: { value: 'some query'}});
      expect(search.search).toHaveBeenCalledWith('some query');
    }));
  });
});
