import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent implements OnInit {
  // dummyPokemonList = ['charmander', 'bulbasaur', 'squirtle', 'pikachu'];
  pokemonList = [];
  newPokemonSub: Subscription;
  currPokeName: '';

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.newPokemonSub = this.pokemonService.pokemonListChanged.subscribe(
      (pokemonList: Pokemon[]) => {
        this.pokemonList = pokemonList;
        console.log(pokemonList, 'hello');
      }
    )
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  onSearchSubmit() {
    this.pokemonService.getPokemon(this.currPokeName.toLowerCase());
  }

}
