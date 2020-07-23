import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
// Service
import { StoryService } from './../service/story.service';



@Injectable()
export class StoryEffects {
  constructor(
    private actions$: Actions,
    private storyService: StoryService
  ) { }

}
