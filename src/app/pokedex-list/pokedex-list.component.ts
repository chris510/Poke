import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon.model';
import { DataStorageServiceService } from '../services/data-storage-service.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent implements OnInit {
  pokemonList = [];
  newPokemonSub: Subscription;
  currPokeName: '';

  constructor(
    private pokemonService: PokemonService,
    private dataStorageService: DataStorageServiceService
  ) { }

  ngOnInit(): void {
    this.dataStorageService.fetchPokemon().pipe(take(1)).subscribe(
      (pokemonList: Pokemon[]) => {
        this.pokemonList = pokemonList;
      }
    )
    // this.pokemonService.getAllPokemon()
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
