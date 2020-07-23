import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  isActive: string = 'trending';
  constructor() { }

  ngOnInit(): void {
  }
  clickToggleTreding() {
    this.isActive = "trending";
  }
  clickToggleMySong() {
    this.isActive = "mySong";
  }
  clickToggleMyAlbum() {
    this.isActive = "myAlbum";
  }
  clickToggleTopSong() {
    this.isActive = "topSong";
  }
  clickToggleTopAlbum() {
    this.isActive = "topAlbum";
  }
  clickToggleMyList() {
    this.isActive = "myList";
  } 
  clickToggleMostListen() {
    this.isActive = "mostListen";
  }
}
