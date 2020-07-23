import { RequestBoxComponent } from './../request-box/request-box.component';
import { MessageBoxComponent } from './../message-box/message-box.component';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
// Component
import { NotiBoxComponent } from './../noti-box/noti-box.component';

@Component({
  selector: 'app-interactive-tab',
  templateUrl: './interactive-tab.component.html',
  styleUrls: ['./interactive-tab.component.scss'],
})
export class InteractiveTabComponent implements OnInit {
  @ViewChild('hostViewBox', { read: ViewContainerRef }) hostViewBox: ViewContainerRef;
  isNotiOpened = false;
  isMessOpened = false;
  isRequestOpened = false;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
  }
  /*
  @ Toggle notication tab
  */
  onClickToggleNoti() {
    if (!this.isNotiOpened) {
      this.isNotiOpened = true;
      this.openNotiBox();
    } else {
      this.isNotiOpened = false;
      this.hostViewBox.clear();
    }
    this.isMessOpened = false;
    this.isRequestOpened = false;
  }
  /*
  @ Toggle message tab
  */
  onClickToggleMess() {
    if (!this.isMessOpened) {
      this.isMessOpened = true;
      this.openMessBox();
    } else {
      this.isMessOpened = false;
      this.hostViewBox.clear();
    }
    this.isNotiOpened = false;
    this.isRequestOpened = false;
  }
  /*
 @ Toggle request tab
 */
  onClickToggleRequest() {
    if (!this.isRequestOpened) {
      this.isRequestOpened = true;
      this.openRequestBox();
    } else {
      this.isRequestOpened = false;
      this.hostViewBox.clear();
    }
    this.isNotiOpened = false;
    this.isMessOpened = false;
  }
  /*
  @ Open notification
  */
  openNotiBox() {
    this.hostViewBox.clear();
    const boxCmpFactory = this.componentFactoryResolver.resolveComponentFactory(NotiBoxComponent);
    const componentRef: ComponentRef<NotiBoxComponent> = this.hostViewBox.createComponent(boxCmpFactory);
    componentRef.instance.close.subscribe(
      () => {
        this.hostViewBox.clear();
        this.isNotiOpened = false;
      }
    );
  }
  /*
  @ Open messenger
  */
  openMessBox() {
    this.hostViewBox.clear();
    const boxCmpFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBoxComponent);
    const componentRef: ComponentRef<MessageBoxComponent> = this.hostViewBox.createComponent(boxCmpFactory);
    componentRef.instance.close.subscribe(
      () => {
        this.hostViewBox.clear();
        this.isMessOpened = false;
      }
    );
  }/*
  @ Open request
  */
  openRequestBox() {
    this.hostViewBox.clear();
    const boxCmpFactory = this.componentFactoryResolver.resolveComponentFactory(RequestBoxComponent);
    const componentRef: ComponentRef<RequestBoxComponent> = this.hostViewBox.createComponent(boxCmpFactory);
    componentRef.instance.close.subscribe(
      () => {
        this.hostViewBox.clear();
        this.isRequestOpened = false;
      }
    );
  }
}
