import { Component } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: ['li {cursor: pointer}']
})

export class ByCountryComponent {

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor( private countryService : CountryService) {}

  search( term:string ) { 
    this.isError = false;
    this.showSuggestions = false;
    this.term = term;
    this.countryService.searchCountry( this.term )
    .subscribe({ 
      next: ((countries) => this.countries = countries),
      error: ((err) => {
      this.isError = true;
      this.countries = [];})
    })  
  }

  suggestions( term: string ){
    this.isError = false;
    this.term = term;
    this.showSuggestions = true;

    this.countryService.searchCountry(term)
      .subscribe(country => this.suggestedCountries = country.splice(0,3),
                (err) => this.suggestedCountries = []);
  }

}
