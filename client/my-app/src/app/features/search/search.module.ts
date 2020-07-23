import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostModule } from './../post/post.module';
// Module
import { PersonalInformationModule } from './../personal-information/personal-information.module';
// Components
import { SearchComponent } from './containers/search/search.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
// Mat
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [SearchComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    // Router
    SearchRoutingModule,
    // Module
    PostModule,
    PersonalInformationModule,
    SharedModule,
    // Mat
    MatSelectModule,
    MatTabsModule,
    MatMenuModule
  ]
})
export class SearchModule { }
