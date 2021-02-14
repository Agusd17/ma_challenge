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

  /**
   * Verifica la ruta destino (a través de un string recibido por data, desde app-routing) y realiza las validaciones necesarias para permitir o denegar el redireccionamiento.
   * Bloquea el acceso directo a componentes del registro que no deberian ser accesibles sin completar los pasos previos.
   */
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
