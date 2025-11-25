import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text?: string;
  video?:true;
  img?:true
}
@Component({
  selector: 'app-sala1',
  imports: [MatGridListModule],
  templateUrl: './sala1.html',
  styleUrl: './sala1.css'
})
export class Sala1 {

   tiles: Tile[] = [
    {cols: 3, rows: 1, color: 'lightblue', video:true},
    {text: 'img', cols: 1, rows: 2, color: '#3b3535', img:true},
    {text: '?', cols: 1, rows: 1, color: 'lightpink'},
    {text: '?', cols: 2, rows: 1, color: '#DDBDF1'},
    
  ];
}
