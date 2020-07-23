import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Router
import { BookMarkRoutingModule } from './bookmark-routing.module';
// Mat
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
// Component
import { BookmarkComponent } from './containers/bookmark/bookmark.component';

@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Router
    BookMarkRoutingModule,
    // Mat
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class BookmarkModule { }
