import { SongTab } from './../../core/interfaces/song-tab.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-song-tab',
  templateUrl: './song-tab.component.html',
  styleUrls: ['./song-tab.component.scss']
})
export class SongTabComponent implements OnInit {
  @Input() songs: SongTab[];
  constructor() { }

  ngOnInit() {
  }

}
