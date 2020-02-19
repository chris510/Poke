import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon.model';
import { DataStorageServiceService } from '../services/data-storage-service.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent implements OnInit, OnDestroy {
  pokemonList = [];
  newPokemonSub: Subscription;
  storage: Subscription;
  searchPokeSub: Subscription;
  currPokeName: '';
  error: string = '';

  constructor(
    private pokemonService: PokemonService,
    private dataStorageService: DataStorageServiceService
  ) { }

  ngOnInit(): void {
    // this.storage = this.dataStorageService.fetchPokemon().pipe(take(1)).subscribe(
    //   (pokemonList: Pokemon[]) => {
    //     this.pokemonList = pokemonList;
    //   }
    // )
    // this.pokemonService.getAllPokemon()
    // console.log(this.pokemonList.length)
    // if (this.pokemonList.length === 0) {
    //   this.dataStorageService.fetchPokemon().subscribe();
    // }
    // this.pokemonList.length === 0 ? this.dataStorageService.fetchPokemon() : null;
    this.newPokemonSub = this.pokemonService.pokemonListChanged.subscribe(
      (pokemonList: Pokemon[]) => {
        this.pokemonList = pokemonList;
        console.log(pokemonList, 'hello');
      }
    )
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  onSearchSubmit() {
    this.searchPokeSub = this.pokemonService.getPokemon(this.currPokeName.toLowerCase()).subscribe(
      pokemonData => {
        this.pokemonService.createPokemon(pokemonData);
      }, error => {
        this.error = 'Pokemon Not Found!'
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.searchPokeSub.unsubscribe();
    // this.newPokemonSub.unsubscribe();
    // this.storage.unsubscribe();
  }

}
