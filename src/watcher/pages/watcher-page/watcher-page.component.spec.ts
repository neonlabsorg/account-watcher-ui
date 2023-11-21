import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherPageComponent } from './watcher-page.component';

describe('WatcherPageComponent', () => {
  let component: WatcherPageComponent;
  let fixture: ComponentFixture<WatcherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatcherPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatcherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
