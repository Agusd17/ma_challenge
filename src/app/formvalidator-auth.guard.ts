import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products.service';
import { UserdataService } from './services/userdata.service';
import { VehicledataService } from './services/vehicledata.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userdataService: UserdataService,
    private vehicledataService: VehicledataService,
    private productsService: ProductsService
    ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      switch (next.data.target) {
        case 'vehicle':

          return this.userdataService.isValid()
          .then(
              (authenticated: boolean) => {
                  if (authenticated) {
                      return true;
                  } else {
                    this.router.navigate(['']);
                  }
              }
          );

        case 'product':

          return this.userdataService.isValid()
          .then(
              (authenticated: boolean) => {
                  if (authenticated) {
                    return this.vehicledataService.isValid()
                      .then(
                          (authenticated: boolean) => {
                              if (authenticated) {
                                  return true;
                              } else {
                                  this.router.navigate(['']);
                              }
                          }
                      );
                  } else {
                    this.router.navigate(['']);
                  }
              }
          );

        case 'summary':

          return this.userdataService.isValid()
          .then(
              (authenticated: boolean) => {
                  if (authenticated) {
                    return this.vehicledataService.isValid()
                      .then(
                          (authenticated: boolean) => {
                              if (authenticated) {
                                return this.productsService.isValid()
                                  .then(
                                      (authenticated: boolean) => {
                                          if (authenticated) {
                                              return true;
                                          } else {
                                              this.router.navigate(['']);
                                          }
                                      }
                                  );
                              } else {
                                  this.router.navigate(['']);
                              }
                          }
                      );
                  } else {
                    this.router.navigate(['']);
                  }
              }
          );

      }
  }
}
