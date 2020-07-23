import { Component, OnInit, Input } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-interactive-numbers-tab',
  templateUrl: './interactive-numbers-tab.component.html',
  styleUrls: ['./interactive-numbers-tab.component.scss']
})
export class InteractiveNumbersTabComponent implements OnInit {
  @Input() userId: string;
  quantityFriend$: Observable<number>;
  quantityFollower$: Observable<number>;

  constructor(
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit() {
    this.quantityFriend$ = this.personalInformationService.getQuanityFriend(this.userId);
    this.quantityFollower$ = this.personalInformationService.getQuantityFollower(this.userId);
  }

}
