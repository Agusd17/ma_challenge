# Mercantil

Proyecto creado para el Challenge de Mercantil Andina.

## Listado de componentes de la App
#### Componentes

- [`app.component`](#app.component)
- about.component
- footer.component
- header.component
- product-data.component
- single-product.component
- product-list.component
- register.component
- register-welcome.component
- section-hero-image.component
- summary.component
- userdata-form.component
- vehicledata-form.component

#### Servicios

- custom-validator.service
- location.service
- products.service
- summary.service
- userdata.service
- vehicledata.service

#### Modelos

- summary

#### Pipes

- char-replace
- sort-by


## Descripción de los componentes

#### app.component

Componente principal de la App. Contiene solamente el header, el footer y el router-outlet principal.

#### about.component

Existe solo a modo de mockup para crear una visión de web App mas completa. 

#### footer.component

Existe solo a modo de mockup para crear una visión de web App mas completa. 

#### header.component

Contiene el menú de navegación principal de la App.

#### product-data.component

Se encarga de mostrar la lista de productos disponibles (pólizas), creando un single-product.component por cada uno de ellos. Además indica visualmente el producto seleccionado. No permite continuar con el registro hasta que se elija un producto.

**Atributos:**
- productsLoading: flag que indica si el servicio de carga de productos se encuentra pendiente. 
- products: almacena los productos que se recuperan del Web Service de Mercantil Andina.
- isProductSelected: flag que indica si existe algún producto seleccionado. Habilita el botón para continuar, una vez que el usuario selecciona un producto.
- subscription: almacena la suscripción al subject *selectedProductChanged* perteneciente al servicio *products.service*. Se invoca durante el hook *onInit* y se destruye con el hook *onDestroy*. Recibe un update cuando el usuario selecciona un producto, o cambia la selección del producto.

**Dependencias:**
- productdataService: refiere a *products.service*
- summaryService: refiere a *summary.service*
- router: refiere a *Router*, importado desde'@angular/router'
- route: refiere a *ActivatedRoute*, importado desde'@angular/router'

**Métodos:**
- ngOnInit(): inicializa la variable *subscription* suscribiéndola al Subject *selectedProductChanged* del servicio *products.service*. Inicializa el método *loadProducts()*
- loadProducts(): setea el flag *productsLoading* a **true**, y se suscribe al método *getProducts* del servicio *products.service*. Guarda los productos devueltos por el método en la variable *products* y setea el flag *productsLoading* a **false**.
- submitData(): guarda la selección del usuario y redirecciona al componente *summary.component*.
- ngOnDestroy(): desuscribe la variable *subscription* al destruir el componente.
