import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithTextareaComponent } from './with-textarea.component';

describe('WithTextareaComponent', () => {
  let component: WithTextareaComponent;
  let fixture: ComponentFixture<WithTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
