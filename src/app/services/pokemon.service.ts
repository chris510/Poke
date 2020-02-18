import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Pokemon } from '../pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  pokemon = new Subject<any>();
  pokemonListChanged = new Subject<Pokemon[]>();
  private pokemonList = [];

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList() {
    return this.pokemonList.slice();
  }

  addPokemon(pokemon: Pokemon) {
    this.pokemonList.push(pokemon);
    this.pokemonListChanged.next(this.pokemonList.slice())
  }

  setPokemon(pokemonList: Pokemon[]) {
    this.pokemonList = pokemonList;
    this.pokemonListChanged.next(this.pokemonList.slice());
  }

  getAllPokemon() {
    // const promises = [];
    for (let i = 1; i <= 151; i++) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}/`).subscribe(
        pokemonData => {
          this.createPokemon(pokemonData);
        }
      )
    }
    // this.pokemonListChanged.next(this.pokemonList.slice());

    // Promise.all(promises).then(allData => {
    //   allData.map(pokemonData => {
    //     pokemonData.subscribe(pokemon => {
    //       this.createPokemon(pokemon);
    //     })
    //   })
    // })
    
  }

  getPokemon(pokemonName: string) {
    this.http.get(`
      https://pokeapi.co/api/v2/pokemon/${pokemonName}/
    `).subscribe(
      pokemonData => {
        console.log(pokemonData);
        this.createPokemon(pokemonData);
      }
    )
  }

  private createPokemon(pokemonData: object) {
    let chosenType = pokemonData['types'][1] ? pokemonData['types'][1]['type']['name'] : pokemonData['types'][0]['type']['name']
    let newPokemon = new Pokemon(
      pokemonData['id'],
      pokemonData['name'],
      chosenType,
      pokemonData['sprites']['front_default'],
      pokemonData['moves'][0]['move']['name'],
      pokemonData['moves'][1]['move']['name'],
      pokemonData['moves'][2]['move']['name'],
      pokemonData['moves'][3]['move']['name'],
      pokemonData['sprites']['back_default']
    )
    this.addPokemon(newPokemon);
  }
}
