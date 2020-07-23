import { Directive, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDragAndDropFile]'
})
export class DragAndDropFileDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  constructor() { }
  @Output() fileDropped = new EventEmitter<any>();
  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }
  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }
  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
