import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    'button{margin-right: 5px}'
  ]
})
export class ByRegionComponent {

  regions: string[] =['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string = '';
  countries: Country[] = [];

  constructor(private countryService: CountryService){
  }

  activarRegion(region: string) {

    if(region === this.regionActiva) {return}

    this.regionActiva = region;
    this.countryService.searchRegion( this.regionActiva )
    .subscribe({ 
      next: ((countries) => this.countries = countries),
      error: ((err) => {
      this.countries = [];})
    })  
  }
}
