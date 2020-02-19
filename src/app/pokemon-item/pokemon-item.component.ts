import { Component, OnInit, Input } from '@angular/core';
import { types } from '../pokemon.types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon;
  toggleImg = true;
  types = types;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onToggleImg() {
    this.toggleImg = !this.toggleImg;
  }

  onPokemonDetail() {
    console.log('navgiated')
    this.router.navigate(['name'], {relativeTo: this.route })
  }

}
