import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserdataFormComponent } from './userdata-form/userdata-form.component';
import { VehicledataFormComponent } from './vehicledata-form/vehicledata-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './product-list/single-product/single-product.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionHeroImageComponent } from './section-hero-image/section-hero-image.component';
import { RegisterWelcomeComponent } from './register-welcome/register-welcome.component';

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
    RegisterWelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
