import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-see-country',
  templateUrl: './see-country.component.html'
})

export class SeeCountryComponent implements OnInit {

  country!: Country;

  constructor(private activatedRouted: ActivatedRoute, 
              private countryService: CountryService ) {}

  ngOnInit(): void {

    this.activatedRouted.params
      .pipe(
        switchMap( ({id}) => this.countryService.getCountry(id)),
        tap(console.log)
      )
      .subscribe(country => { 
        this.country = country[0]
      })
    /* this.activatedRouted.params
      .subscribe( ({id}) => {
        this.countryService.getCountry(id)
          .subscribe(country =>{
            
          })
      })      
 */  }

}
