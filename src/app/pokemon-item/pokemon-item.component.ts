import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon;
  toggleImg = true;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleImg() {
    this.toggleImg = !this.toggleImg;
  }

}