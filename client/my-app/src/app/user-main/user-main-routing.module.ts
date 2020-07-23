import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import { HomePageComponent } from './containers/home-page/home-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            { path: '', redirectTo: 'post', pathMatch: 'full' },
            {
                path: 'post', loadChildren: () => import('../features/post/post.module')
                    .then(m => m.PostModule)
            },
            {
                path: 'personal',
                loadChildren: () => import('../features/personal-information/personal-information.module')
                    .then(m => m.PersonalInformationModule)
            },
            {
                path: 'search',
                loadChildren: () => import('../features/search/search.module')
                    .then(m => m.SearchModule)
            },
            {
                path: 'messenger',
                loadChildren: () => import('../features/interaction/interaction.module')
                    .then(m => m.InteractionModule)
            },
            {
                path: 'music',
                loadChildren: () => import('../features/music/music.module').then(m => m.MusicModule)
            },
            {
                path: 'bookmark',
                loadChildren: () => import('../features/bookmark/bookmark.module').then(m => m.BookmarkModule)
            },
            {
                path: 'setting',
                loadChildren: () => import('../features/setting/setting.module').then(m => m.SettingModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserMainRoutingModule { }
