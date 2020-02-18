import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { tap } from 'rxjs/operators';
import { Pokemon } from '../pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiceService {

  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) { }

  storePokemon() {
    const pokemonList = this.pokemonService.getPokemonList();
    this.http.put('https://pokemons-a3b54.firebaseio.com/post.json', pokemonList)
      .subscribe(
      pokemonList => console.log(pokemonList)
    )
  }

  fetchPokemon() {
    return this.http.get<Pokemon[]>('https://pokemons-a3b54.firebaseio.com/post.json')
      .pipe(
        tap(pokemonList => {
        this.pokemonService.setPokemon(pokemonList)
       })
      )
  }
}
