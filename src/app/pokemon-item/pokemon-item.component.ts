import { Component, OnInit, Input } from '@angular/core';
import { types } from '../pokemon.types';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() index: number;
  toggleImg = true;
  types = types;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService
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

  onAddToTeam() {
    this.pokemonService.addPokemonToTeam(this.pokemon);
  }

  onDeletePokemon() {
    console.log('Pokemon Has been Deleted');
    this.pokemonService.deletePokemon(this.index);
    // console.log(this.pokemon.id);
  }

}
