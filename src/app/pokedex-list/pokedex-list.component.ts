import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent implements OnInit {
  dummyPokemonList = ['charmander', 'bulbasaur', 'squirtle', 'pikachu'];
  pokemonList = [];
  currPokeName: '';
  newPokemonSub: Subscription;

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // this.newPokemonSub = this.pokemonService.getPokemon(this.currPokeName).subscribe(
    //   pokemonData => {
    //     this.pokemonList.push(pokemonData);
    //   }
    // )
    // console.log(this.pokemonList);
  }

  onSearchSubmit() {
    console.log(this.currPokeName);
    this.newPokemonSub = this.pokemonService.getPokemon(this.currPokeName.toLowerCase()).subscribe(
      pokemonData => {
        this.pokemonList.push(pokemonData);
      }
    )
    console.log(this.pokemonList);
  }

}
