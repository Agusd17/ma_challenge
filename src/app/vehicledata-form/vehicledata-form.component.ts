import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicledataService } from '../services/vehicledata.service';

@Component({
  selector: 'app-vehicledata-form',
  templateUrl: './vehicledata-form.component.html',
  styleUrls: ['./vehicledata-form.component.scss']
})
export class VehicledataFormComponent implements OnInit {

  brands: any[];
  selectedBrand: string = null;
  years: number[] = [];
  currentYear = new Date().getFullYear();
  selectedYear: number = null;
  models: any[];
  selectedModel: string = null;
  versions: any[];
  brandsLoading: boolean = false;
  modelsLoading: boolean = false;
  versionsLoading: boolean = false;
  vehicledataForm: FormGroup;

  constructor(
    private vehicledataService: VehicledataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.loadBrands();
    this.loadYears();
  }

  formInit() {

    let brand: string = null;
    let year: number = null;
    let model: string = null;
    let version: string = null;
    this.vehicledataForm = new FormGroup({
      'brand': new FormControl(brand, [
        Validators.required
      ]),
      'year': new FormControl(year, [
        Validators.required
      ] ),
      'model': new FormControl(model, [
        Validators.required
      ] ),
      'version': new FormControl(version, [
        Validators.required
      ] )
    });
  }

  loadBrands() {
    this.brandsLoading = true;
    this.vehicledataService.getBrands().subscribe(response => {
      this.brands = response;
      this.brandsLoading = false;
    });
  }

  loadYears() {
    for (let index = this.currentYear; index > (this.currentYear - 20); index--) {
      this.years.push(index);
    }

  }

  loadModels() {
    if (this.selectedBrand != null && this.selectedYear != null) {
      this.modelsLoading = true;
      console.log('im going to find some models for brand '+ this.selectedBrand + ' and year ' + this.selectedYear);

      this.vehicledataService.getModels(this.selectedBrand, this.selectedYear).subscribe(response => {
        this.models = response;
        this.modelsLoading = false;
      })
    }
  }

  loadVersions() {

  }

  onSubmit() {
    this.router.navigate(['../product-data'], {relativeTo: this.route})
  }

  testing() {
    console.log(this.vehicledataForm);

  }

}
