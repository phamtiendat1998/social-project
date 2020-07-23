import { Component, OnInit } from '@angular/core';
import { RelationshipField } from '../../core/interfaces/relationship-field.interface';
import { RelationshipType } from '../../core/enums/relationship-type.enum';

@Component({
  selector: 'app-relationship-about',
  templateUrl: './relationship-about.component.html',
  styleUrls: ['./relationship-about.component.scss']
})
export class RelationshipAboutComponent implements OnInit {
  relationUser: RelationshipField = {
    rela: RelationshipType.DATE,
    with: 'Bùi Sĩ Nguyên',
    link: 'https://www.facebook.com/buisinguyenn',
    public: true
  };
  constructor() { }

  ngOnInit(): void {
  }

}
