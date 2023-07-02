import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePosterComponent } from './create-update-poster.component';

describe('CreateUpdatePosterComponent', () => {
  let component: CreateUpdatePosterComponent;
  let fixture: ComponentFixture<CreateUpdatePosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePosterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
