import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
// Service
import { SessionService } from './../../../shared/services/session.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('form') form: ElementRef;
  @ViewChild('formBg') formBg: ElementRef;
  @ViewChild('formForm') formForm: ElementRef;
  @ViewChildren('formBgCloud') formBgCloud: QueryList<ElementRef>;
  isOpenForm = false;
  constructor(
  ) { }

  ngOnInit() {
  }
}
