import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala1 } from './sala1';

describe('Sala1', () => {
  let component: Sala1;
  let fixture: ComponentFixture<Sala1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sala1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
