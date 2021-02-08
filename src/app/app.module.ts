import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserdataFormComponent } from './userdata-form/userdata-form.component';
import { VehicledataFormComponent } from './vehicledata-form/vehicledata-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './product-data/single-product/single-product.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionHeroImageComponent } from './section-hero-image/section-hero-image.component';
import { RegisterWelcomeComponent } from './register-welcome/register-welcome.component';
import { AboutComponent } from './about/about.component';
import { ProductDataComponent } from './product-data/product-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location.service';
import { ProductsService } from './services/products.service';
import { UsercheckService } from './services/usercheck.service';
import { UserdataService } from './services/userdata.service';
import { VehicledataService } from './services/vehicledata.service';
import { CustomValidatorsService } from './services/custom-validators.service';
import { SortByPipe } from './shared/pipes/sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserdataFormComponent,
    VehicledataFormComponent,
    ProductListComponent,
    SingleProductComponent,
    SummaryComponent,
    HeaderComponent,
    FooterComponent,
    SectionHeroImageComponent,
    RegisterWelcomeComponent,
    AboutComponent,
    ProductDataComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
