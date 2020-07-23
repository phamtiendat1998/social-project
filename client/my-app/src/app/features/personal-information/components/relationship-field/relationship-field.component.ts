import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RelationshipField } from '../../core/interfaces/relationship-field.interface';
import { RelationshipType } from '../../core/enums/relationship-type.enum';

@Component({
  selector: 'app-relationship-field',
  templateUrl: './relationship-field.component.html',
  styleUrls: ['./relationship-field.component.scss']
})
export class RelationshipFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() relation: RelationshipField;
  isExpanded = false;
  isEnableForm = false;
  relationForm: FormGroup;
  text: string;
  constructor() { }

  ngOnInit(): void {
    this.initText();
    this.iniRelationFormGroup();
  }
  /* 
  @ Init validate relation form group
  */
  iniRelationFormGroup() {
    this.relationForm = new FormGroup({
      rela: new FormControl(this.relation.rela, [Validators.required]),
      with: new FormControl(this.relation.with, [Validators.required]),
      public: new FormControl(true),
    });
    this.relationForm.disable();
  }
  /* 
  @ Init text based on rela property
  */
  initText() {
    switch (this.relation.rela) {
      case RelationshipType.DATE:
        this.text = 'hẹn hò với';
        break;
      case RelationshipType.SINGLE:
        this.text = 'độc thân';
        break;
      case RelationshipType.OPEN:
        this.text = 'mối quan hệ mở';
        break;
      default:
        break;
    }
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.relationForm.enable();
  }
  /* 
  @ Event click save form 
  */
  onClickSaveForm() {
    this.isEnableForm = false;
    this.relationForm.disable();
    // API
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.relationForm.disable();
    this.relationForm.controls.rela.setValue(this.relation.rela);
    this.relationForm.controls.with.setValue(this.relation.with);
    this.isExpanded = false;
  }

  /* 
  @ Form control error
  @ Input: Control Name, Error Name
  @ Output: Error 
  */
  hasError = (controlName: string, errorName: string) => {
    return this.relationForm.controls[controlName].hasError(errorName);
  }

}
