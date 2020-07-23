import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './containers/chat/chat.component';

const routes: Routes = [
    {
        path: '', component: ChatComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InteractionRoutingModule { }
