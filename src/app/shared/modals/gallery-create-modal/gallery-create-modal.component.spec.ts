import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCreateModalComponent } from './gallery-create-modal.component';

describe('GalleryCreateModalComponent', () => {
  let component: GalleryCreateModalComponent;
  let fixture: ComponentFixture<GalleryCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
