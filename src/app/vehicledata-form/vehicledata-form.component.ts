import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SummaryService } from '../services/summary.service';
import { VehicledataService } from '../services/vehicledata.service';

@Component({
  selector: 'app-vehicledata-form',
  templateUrl: './vehicledata-form.component.html',
  styleUrls: ['./vehicledata-form.component.scss']
})
export class VehicledataFormComponent implements OnInit, OnDestroy {

  brands: any[];
  selectedBrand: string = null;
  brandSubscription: Subscription;
  years: number[] = [];
  currentYear = new Date().getFullYear();
  selectedYear: number = null;
  yearSubscription: Subscription;
  models: any[];
  selectedModel: string = null;
  modelSubscription: Subscription;
  versions: any[];
  selectedVersion: string = null;
  versionSubscription: Subscription;
  brandsLoading: boolean = false;
  modelsLoading: boolean = false;
  versionsLoading: boolean = false;
  vehicledataForm: FormGroup;

  constructor(
    private vehicledataService: VehicledataService,
    private summaryService: SummaryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.loadBrands();
    this.loadYears();
    this.onBrandChange();
    this.onYearChange();
    this.onModelChange();
    this.onVersionChange();
  }

  formInit() {

    if (this.vehicledataService.isDataStored()) {
      this.vehicledataForm = this.vehicledataService.getForm();
    } else {


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
  }

  onBrandChange() {
    this.brandSubscription = this.vehicledataForm.get('brand').valueChanges.subscribe(
      selectedValue => {
        this.selectedBrand = selectedValue.codigo;
        this.loadModels();
      }
    )
  }
  onYearChange() {
    this.yearSubscription = this.vehicledataForm.get('year').valueChanges.subscribe(
      selectedValue => {
        this.selectedYear = selectedValue;
        this.loadModels();
      }
    )
  }
  onModelChange() {
    this.modelSubscription = this.vehicledataForm.get('model').valueChanges.subscribe(
      selectedValue => {
        this.selectedModel = selectedValue;
        this.loadVersions();
      }
    )
  }
  onVersionChange() {
    this.versionSubscription = this.vehicledataForm.get('version').valueChanges.subscribe(
      selectedValue => {
        this.selectedVersion = selectedValue;
      }
    )
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
    if (this.selectedBrand != null && this.selectedYear != null && this.selectedModel != null) {
      this.versionsLoading = true;
      console.log('im going to find some versions for brand '+ this.selectedBrand + ', year ' + this.selectedYear + ' and model ' + this.selectedModel);

      this.vehicledataService.getVersions(this.selectedBrand, this.selectedYear, this.selectedModel).subscribe(response => {
        this.versions = response;
        this.versionsLoading = false;
      })
     }
  }

  onSubmit() {
    this.vehicledataService.saveForm(this.vehicledataForm);
    this.summaryService.saveVehicledata();
    this.router.navigate(['../product-data'], {relativeTo: this.route})
  }

  testing() {
    console.log(this.vehicledataForm);

  }

  ngOnDestroy() {
    this.brandSubscription.unsubscribe();
    this.yearSubscription.unsubscribe();
    this.modelSubscription.unsubscribe();
    this.versionSubscription.unsubscribe();
  }

}
