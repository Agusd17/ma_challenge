# Mercantil Andina Challenge

> **Autor: Agustín D'llano.**  
email: agus.dllano@gmail.com  
<https://www.linkedin.com/in/agustin-d-llano-505882106/>  
tel: (2983)-580095

Proyecto creado para el Challenge de Mercantil Andina.

## Listado de componentes de la App

### Componentes

- [app.component](#appcomponent)
- [footer.component](#footercomponent)
- [header.component](#headercomponent)
- [product-data.component](#product-datacomponent)
- [single-product.component](#single-productcomponent)
- [register.component](#registercomponent)
- [register-welcome.component](#register-welcomecomponent)
- [section-hero-image.component](#section-hero-imagecomponent)
- [summary.component](#summarycomponent)
- [userdata-form.component](#userdata-formcomponent)
- [vehicledata-form.component](#vehicledata-formcomponent)

### Servicios

- [custom-validator.service](#custom-validatorservice)
- [location.service](#locationservice)
- [products.service](#productsservice)
- [summary.service](#summaryservice)
- [userdata.service](#userdataservice)
- [vehicledata.service](#vehicledataservice)

### Modelos

- [summary](#summary)

### Pipes

- [char-replace.pipe](#char-replace)
- [sort-by.pipe](#sort-by)

## Descripción de los componentes

## app.component

Componente principal de la App. Crea el header, el footer y el router-outlet principal.

## footer.component

Existe solo a modo de mockup para crear una visión de web App mas completa.

## header.component

Contiene el menú de navegación principal de la App.

## product-data.component

Se encarga de mostrar la lista de productos disponibles (pólizas), creando un *single-product.component* por cada uno de ellos, y pasándole un objeto con la información de un producto. Además indica visualmente el producto seleccionado. No permite continuar con el registro hasta que se elija un producto.

**Atributos:**

|Atributo|Definición|
|---|---|
| productsLoading | flag que indica si el servicio de carga de productos se encuentra pendiente.|
| products | almacena los productos que se recuperan del Web Service de Mercantil Andina.|
| isProductSelected | flag que indica si existe algún producto seleccionado. Habilita el botón para continuar, una vez que el usuario selecciona un producto.|
| subscription | almacena la suscripción al subject *selectedProductChanged* perteneciente al servicio *products.service*. Se invoca durante el hook *onInit* y se destruye con el hook *onDestroy*. Recibe un update cuando el usuario selecciona un producto, o cambia la selección del producto.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
| productdataService | refiere a *products.service*|
| summaryService | refiere a *summary.service*|
| router | refiere a *Router*, importado desde'@angular/router'|
| route | refiere a *ActivatedRoute*, importado desde'@angular/router'|

**Métodos:**

| Método | Definición |
|---|---|
|`ngOnInit()`| inicializa la variable *subscription* suscribiéndola al Subject *selectedProductChanged* del servicio *products.service*. Inicializa el método *loadProducts()*|
|`loadProducts()`| setea el flag *productsLoading* a **true**, y se suscribe al método *getProducts* del servicio *products.service*. Guarda los productos devueltos por el método en la variable *products* y setea el flag *productsLoading* a **false**.|
|`submitData()`| guarda la selección del usuario y redirecciona al componente *summary.component*.|
|`ngOnDestroy()`| desuscribe la variable *subscription* al destruir el componente.|

## single-product.component

Creado por *product-data.component*, recibe un objeto mediante un *@Input()* con la información perteneciente a un producto (póliza) en cuestión. Se encarga de mostrar dicha información al usuario en forma de tarjeta.

**Atributos:**

|Atributo|Definición|
|---|---|
| @Input() productData| almacena el objeto pasado por el componente padre *product-data.component*.|
| selected| flag que indica si el producto en cuestión fue seleccionado por el usuario. Se utiliza para añadir o quitar una clase CSS especial (*.selected*) al componente, para destacarlo como 'seleccionado', tras comprobar si el producto al cual refiere este componente, es el mismo que el seleccionado por el usuario.|
| subscription| almacena la suscripción al subject *selectedProductChanged* perteneciente al servicio *products.service*. Se invoca durante el hook *onInit* y se destruye con el hook *onDestroy*. Recibe un update cuando el usuario selecciona un producto, o cambia la selección del producto.|
| stars| almacena el 'puntaje' del producto recibido. Luego se utiliza dicho valor para generar 'estrellas' en el template que reflejen la puntuación.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
| productsService| refiere a *products.service*.|

**Métodos:**

| Método | Definición |
|---|---|
|`ngOnInit()`| solicita al servicio *products.service* para que le devuelva el producto seleccionado actualmente por el usuario. Genera un array de valores igual al puntaje del producto (se utilizará luego dicho array para generar la cantidad de estrellas correspondientes al producto). Inicializa la variable *subscription* suscribiéndola al Subject *selectedProductChanged* del servicio *products.service*.|
|`selectProduct()`| se ejecuta cuando el usuario elige el producto al que este componente refiere. Envía el producto como objeto al servicio *products.service* para guardar la selección del usuario.|
|`ngOnDestroy()`| desuscribe la variable *subscription* al destruir el componente.|

## register.component

Presenta la sección de registro de nuevo usuario. Crea un *section-hero-image.component* con la imagen, título y descripción correspondientes para la sección de registro. Contiene el *router-outlet* correspondiente al proceso de registración.

**Atributos:**

|Atributo|Definición|
|---|---|
|imgUrl|almacena la dirección de la imagen de cabecera correspondiente para esta sección.|
|title|almacena el título de la sección.|
|description|almacena la descripción de la sección.|

## register-welcome.component

Componente inicial en el proceso de registración. Indica los pasos necesarios para el registro, los requisitos (todo representado por un Lorem Ipsum) y un botón para iniciar el proceso.

## section-hero-image.component

Genera un bloque con una imagen de fondo, un título y una breve descripción para ser utilizado como cabecera de sección.

**Atributos:**

|Atributo|Definición|
|---|---|
|@Input() imgUrl|recibe el url de la imagen a mostrar como cabecera.|
|@Input() sectionTitle|recibe el título de la sección.|
|@Input() sectionDescription|recibe la descripción de la sección.|

## summary.component

Muestra un resumen de los datos ingresados por el usuario durante el proceso de registro, así como el producto (póliza) seleccionado y sus caracteristicas principales. Sirve como último paso antes de enviar los datos de registración para ser procesados. Posee botones en cada sección de información (*datos personales*, *datos de vehículo* y *póliza elegida*) para volver al componente correspondiente en caso de que se quisieran modificar los datos o la elección del producto. Cabe mencionar que los datos persisten en los componentes, lo que posibilita dicha función de revisión. Devuelve un mensaje de éxito o de fracaso al enviar los datos finales.

**Atributos:**

|Atributo|Definición|
|---|---|
|userdata|objeto que recibirá los datos almacenados provenientes del formulario *userdata-form.component*.|
|infoIsValid|flag que chequea que los objetos de tipo *FormGroup* generados por los componentes *userdata-form-component* como *vehicledata-form.component* (al momento de ser completados por el usuario) sean válidos, y que exista efectivamente un producto seleccionado. Habilita o inhabilita la opción de enviar los datos para su procesamiento final.
|showMsg|flag que indica si se debe o no mostrar un mensaje. El mismo se visualizará tras intentar enviar los datos para su procesamiento, indicando el éxito o fracaso de la operación.|
|submitResponse|almacena el mensaje devuelto por el servicio *summary.service* al momento de enviar los datos para su procesamiento.|
|summary|instancia de *Summary* que almacena todos los datos seleccionados por el usuario. Los mismos se presentan al usuario a modo de resumen.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|summaryService|refiere a *summary.service*.|

**Métodos:**

| Método | Definición |
|---|---|
|`ngOnInit()`|recupera y asigna al objeto *summary* la instancia correspondiente guardada en el servicio *summary.service*.|
|`submitAll()`|envía toda la información para su procesamiento. Recibe un mensaje de éxito o error, según corresponda, para mostrar al usuario.|

## userdata-form.component

Formulario (reactive form) de alta de datos personales del usuario. Colecta toda la información personal y de contacto, comprueba la edad, setea el domicilio y crea un usuario y contraseña. Funciona comunicándose con los servicios web de Mercantil Andina y de GeoRef.

**Atributos:**

|Atributo|Definición|
|---|---|
|userdataForm|objeto de tipo *FormGroup* que almacenará y se utilizará para procesar toda la información ingresada por el usuario en este componente.|
|provinces|objeto que almacena la respuesta del servicio *location.service*, al pedir el listado de provincias disponibles.|
|provincesLoading|flag que indica si la respuesta a la peticion de **provincias** al servicio *location.service* se encuentra pendiente. Se utiliza para mostrar un string "cargando.." al usuario. Se setea a **true** al iniciar la consulta, y se setea a **false** al recibir la respuesta.|
|provSubscription|almacena la suscripción al control 'province' (de tipo select), para reaccionar a los cambios producidos por el usuario en el mismo.|
|cities|objeto que almacena la respuesta del servicio *location.service*, al pedir el listado de ciudades disponibles.|
|citiesLoading|flag que indica si la respuesta a la peticion de ciudades al servicio *location.service* se encuentra pendiente. Se utiliza para mostrar un string "cargando.." al usuario. Se setea a **true** al iniciar la consulta, y se setea a **false** al recibir la respuesta.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|locationService|refiere al servicio *location.service*.|
|userdataService|refiere al servicio *userdata.service*.|
|customValidators|refiere al servicio *custom-validators.service*.|
|summaryService|refiere al servicio *summary.service*.|
|router|refiere a *Router*, importado desde'@angular/router'.|
|route|refiere a *ActivatedRoute*, importado desde'@angular/router'.|

**Métodos:**

| Método | Definición |
|---|---|
|`ngOnInit()`|inicializa los métodos *formInit()*, *loadProvinces()* y *onProvinceChanges()*.|
|`formInit()`|instancia el objeto *userdataForm*, seteando todos los controles y sus diferentes validadores. Chequea si existe una instancia del formulario previamente creada (por ejemplo, si se completó previamente el formulario, pero se regresó al componente para revisar datos). En caso afirmativo, se setea al mismo como la instancia actual, en caso negativo, se inicializa vacío.|
|`onSubmit()`|envía una copia del objeto *userdataForm* al servicio *userdata.service* para ser guardado. Ejecuta el método *saveUserData* del servicio *summary.service*. Por último, redirecciona al siguiente paso de registro.|
|`loadProvinces()`|recupera la lista de provincias del servicio *location.service* a través de una suscripción.|
|`onProvinceChanges()`|monitorea los cambios que ocurran en el control 'provinces' (de tipo select) a través de una suscripción, reaccionando a la elección de provincia del usuario. Cuando ocurre un cambio, resetea el control 'city' (también de tipo select) y consulta al servicio *location.service* a través de una suscripción, por las ciudades correspondientes a la provincia seleccionada. Finalmente, carga el control 'city' con las ciudades devueltas por el servicio.|
|`ngOnDestroy()`|desuscribe la variable *provSubscription* al destruir el componente.|

## vehicledata-form.component

Formulario (reactive form) de alta de datos del vehículo. Colecta la información pertinente a la marca, año, modelo y versión del vehículo. Funciona comunicándose con el servicio Web de Mercantil Andina

**Atributos:**

|Atributo|Definición|
|---|---|
|brands|almacena un array con las marcas devueltas por el servicio *vehicledata.service*.|
|selectedBrand|almacena el valor de la opción seleccionada en el control 'brand'.|
|brandSubscription|almacena la suscripción al control 'brand' (de tipo select), para reaccionar a los cambios producidos por el usuario en el mismo.|
|years|almacena un array con 20 años contados desde el año actual hacia atrás.|
|currentYear|almacena el año actual.|
|selectedYear|almacena el valor de la opción seleccionada en el control 'year'.|
|yearSubscription|almacena la suscripción al control 'year' (de tipo select), para reaccionar a los cambios producidos por el usuario en el mismo.|
|models|almacena un array con los modelos devueltas por el servicio *vehicledata.service*.|
|selectedModel|almacena el valor de la opción seleccionada en el control 'model'.|
|modelSubscription|almacena la suscripción al control 'model' (de tipo select), para reaccionar a los cambios producidos por el usuario en el mismo.|
|versions|almacena un array con las versiones devueltas por el servicio *vehicledata.service*.|
|selectedVersion|almacena el valor de la opción seleccionada en el control 'version'.|
|versionSubscription|almacena la suscripción al control 'version' (de tipo select), para reaccionar a los cambios producidos por el usuario en el mismo.|
|brandsLoading|flag que indica si la respuesta a la peticion de **marcas** al servicio *vehicledata.service* se encuentra pendiente. Se utiliza para mostrar un string "cargando..".|
|modelsLoading|flag que indica si la respuesta a la peticion de **modelos** al servicio *vehicledata.service* se encuentra pendiente. Se utiliza para mostrar un string "cargando..".|
|versionsLoading|flag que indica si la respuesta a la peticion de **versiones** al servicio *vehicledata.service* se encuentra pendiente. Se utiliza para mostrar un string "cargando..".|
|vehicledataForm|objeto de tipo *FormGroup* que almacenará y se utilizará para procesar toda la información ingresada por el usuario en este componente.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|vehicledataService|refiere al servicio *vehicledata.service*.|
|summaryService|refiere al servicio *summary.service*.|
|router|refiere a *Router*, importado desde'@angular/router'.|
|route|refiere a *ActivatedRoute*, importado desde'@angular/router'.|

**Métodos:**

| Método | Definición |
|---|---|
|`ngOnInit()`|inicializa los métodos *formInit()*, *loadBrands()*, *loadYears()*, *onBrandChange()*, *onYearChange()*, *onModelChange()*, *onVersionChange()*.|
|`formInit()`|instancia el objeto *vehicledataForm*, seteando todos los controles y sus diferentes validadores. Chequea si existe una instancia del formulario previamente creada (por ejemplo, si se completó previamente el formulario, pero se regresó al componente para revisar datos). En caso afirmativo, se setea al mismo como la instancia actual, en caso negativo, se inicializa vacío.|
|`onBrandChange()`|monitorea los cambios que ocurran en el control 'brand' (de tipo select) a través de una suscripción, reaccionando a la elección de marca del usuario. Cuando ocurre un cambio, guarda la opción elegida en la variable *selectedBrand* y ejecuta el método *loadModels()*.|
|`onYearChange()`|monitorea los cambios que ocurran en el control 'year' (de tipo select) a través de una suscripción, reaccionando a la elección de marca del usuario. Cuando ocurre un cambio, guarda la opción elegida en la variable *selectedYear* y ejecuta el método *loadModels()*.|
|`onModelChange()`|monitorea los cambios que ocurran en el control 'model' (de tipo select) a través de una suscripción, reaccionando a la elección de marca del usuario. Cuando ocurre un cambio, guarda la opción elegida en la variable *selectedModel* y ejecuta el método *loadVersions()*.|
|`onVersionChange()`|monitorea los cambios que ocurran en el control 'version' (de tipo select) a través de una suscripción, reaccionando a la elección de marca del usuario. Cuando ocurre un cambio, guarda la opción elegida en la variable *selectedVersion*.|
|`loadBrands()`|recupera la lista de marcas del servicio *vehicledata.service* a través de una suscripción.|
|`loadYears()`|genera una lista de 20 años, partiendo desde el año actual, hacia atrás.|
|`loadModels()`|recupera la lista de modelos del servicio *vehicledata.service* a través de una suscripción.|
|`loadVersions()`|recupera la lista de versiones del servicio *vehicledata.service* a través de una suscripción.|
|`onSubmit()`|envía una copia del objeto *vehicledataForm* al servicio *vehicledata.service* para ser guardado. Ejecuta el método *saveVehicleData* del servicio *summary.service*. Por último, redirecciona al siguiente paso de registro.|
|`ngOnDestroy()`|finaliza las suscripciones de las variables *brandSubscription*, *yearSubscription*, *modelSubscription* y *versionSubscription* al destruir el componente.|

## Descripción de los servicios

## custom-validator.service

Almacena validadores creados a medida, utilizados en los formularios de alta de usuario.

**Métodos:**

| Método | Definición |
|---|---|
|`checkPasswords(group: FormGroup)`|Recibe un *FormGroup* con dos controles: *password* y *passwordCheck*. Compara el valor de ambos controles y, de ser diferentes, retorna un error 'passDiffer'.|
|`areaCodeValidator(control: FormControl)`|recibe un *FormControl* y chequea que esté seteado (distinto de **null**) y que  su valor sea mayor a 9 y menor a 10000 (que tenga entre 2 y 4 dígitos y constituya un entero positivo). Si no cumple dichas condiciones, devuelve un error 'areaCodeOutOfRange'.|
|`phoneNumberValidator(control: FormControl)`|recibe un *FormControl* y chequea que esté seteado (distinto de **null**) y que  su valor sea mayor a 99999 y menor a 100000000 (que tenga entre 6 y 8 dígitos y constituya un entero positivo). Si no cumple dichas condiciones, devuelve un error 'phoneNumberOutOfRange'.|
|`ageValidator(fgDate: FormGroup)`|recibe un *FormGroup* compuesto por tres controles: *year*, *month* y *day*. Ejecuta el método *dateValidator()* pasando como argumentos los valores de los controles recibidos. Recibe como respuesta un booleano. Devuelve un error 'dateDoesNotExist' si el booleano recibido es **false**. Luego (solo si el booleano anterior resultó **true**) evalúa si, en base a la fecha ingresada, el usuario posee 18 o más años, y/o 99 o menos años. Caso contrario, devuelve un error 'ageOutOfRange'.|
|`dateValidator(year:number, month:number, day:number)`|recibe como argumentos un año, un mes y un día (en formato numérico). Crea una fecha de tipo *Date()* basada en esos argumentos y corrobora que se trate de una fecha válida (no permite el 30 de febrero por ejemplo). Luego retorna **true** si tuvo éxito o **false** si la fecha resultó inválida.|
|`checkDni(dni: FormControl)`|recibe un *FormControl* como argumento, y evalua que el valor del mismo sea mayor a 999999 y menor a 100000000 (que tenga entre 7 y 8 dígitos y constituya un entero positivo). Si no cumple dichas condicones, devuelve un error 'dniOutOfRange'.|

## location.service

Se encarga de comunicarse con el servicio web GeoRef y realizar las consultas pertinentes por provincias y municipios.

**Atributos:**

|Atributo|Definición|
|---|---|
|apiUrl|almacena la URL base necesaria para comunicarse con la *API*.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|http|refiere a *HttpClient*, importado desde '@angular/common/http'.|

**Métodos:**

| Método | Definición |
|---|---|
|`getProvinces()`|solicita a la *API* el listado de provincias disponibles. Mapea la respuesta a través de un pipe y devuelve el listado de provincias o un error, según corresponda.|
|`getCities(id: number)`|solicita a la *API* el listado de ciudades disponibles, de acuerdo a la id de provincia recibida por parámetro. Mapea la respuesta a través de un pipe y devuelve el listado de ciudades, un array 'Sin Municipios' (si se consultan por ejemplo, los municipios pertenecientes a la 'Ciudad Autónoma de Buenos Aires', la *API* devuelve un array vacío) o un error, según corresponda.|
|`provinceValidator(control: FormControl)`|corrobora que la provincia recibida por parámetro exista en la *API*. Si no existe, devuelve un error 'provinceNotFound'. Si existe un problema al intentar consultar a la *API*, devuelve un error 'provinceBadRequest'.|
|`cityValidator(control: FormControl)`|corrobora que la ciudad recibida por parámetro exista en la *API*. Si no existe, devuelve un error 'cityNotFound'. Si existe un problema al intentar consultar a la *API*, devuelve un error 'cityBadRequest'. Si se trata de la opción 'Sin Municipios', no retorna errores.|

## products.service

Se encarga de comunicarse con el servicio web de Mercantil Andina para consultar por los productos (pólizas) disponibles.

**Atributos:**

|Atributo|Definición|
|---|---|
|**apiUrl**|almacena la URL base necesaria para comunicarse con la *API*.|
|selectedProduct|almacena el producto seleccionado por el usuario.|
|selectedProductChanged|*Subject* que emite un evento a todos los suscriptores con un objeto conteniendo el producto (póliza) seleccionado actualmente.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|http|refiere a *HttpClient*, importado desde '@angular/common/http'.|

**Métodos:**

| Método | Definición |
|---|---|
|`getProducts()`|solicita a la *API* el listado de productos (pólizas) disponibles. Mapea la respuesta a través de un pipe y devuelve el listado de productos o un error, según corresponda.|
|`setSelectedProduct(product: any)`|guarda un objeto con el producto elegido en la variable *selectedProduct* y emite un evento nuevo a través de *selectedProductChanged*.|
|`getSelected()`|devuelve el objeto almacenado en *selectedProduct*.|

## summary.service

Se encarga de recopilar la información que ingresa el usuario para mostrarla al final a modo de resumen y, en caso de ser válida, enviarla para su procesamiento.

**Atributos:**

|Atributo|Definición|
|---|---|
|summary|objeto de tipo *Summary* que almacena los datos ingresados por el usuario en los diferentes pasos del registro.|
|userdata|utilizado para almacenar una copia del *FormGroup* correspondiente al componente *userdata-form.component*.|
|vehicledata|utilizado para almacenar una copia del *FormGroup* correspondiente al componente *vehicledata-form.component*.|
|productdata|utilizado para almacenar una copia del producto (póliza) seleccionado por el usuario.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|userdataService|refiere al servicio *userdata.service*.|
|vehicledataService|refiere al servicio *vehicledata.service*.|
|productsService|refiere al servicio *products.service*.|

**Métodos:**

| Método | Definición |
|---|---|
|`saveUserdata()`|solicita una copia del *FormGroup* almacenado en el servicio *userdata.service* y guarda dicha copia en la variable *userdata*. Luego asigna los valores de los controles de dicho *FormGroup* a los atributos correspondientes del objeto *summary*.|
|`saveVehicledata()`|solicita una copia del *FormGroup* almacenado en el servicio *userdata.service* y guarda dicha copia en la variable *vehicledata*. Luego asigna los valores de los controles de dicho *FormGroup* a los atributos correspondientes del objeto *summary*.|
|`saveProductdata()`|solicita una copia del producto (póliza) almacenado en el servicio *userdata.service* y guarda dicha copia en la variable *productdata*. Luego asigna los valores de los atributos del objeto recibido a los correspondientes del objeto *summary*.|
|`getSummary()`|devuelve el objeto *summary*.|
|`sendData()`|corrobora que los dos formularios *userdata* y *vehicledata* posean el status de válidos (es decir, hayan sido validados correctamente) y que exista un objeto *productdata*. Si la evaluación es afirmativa, retorna una respuesta simulada de 'envío de datos satisfactorios'. Caso contrario envía un mensaje de error.|

## userdata.service

Se encarga de comunicarse con el servicio web de Mercantil Andina para consultar por los nombres de usuario disponibles. También se encarga de almacenar una copia del formulario creado por *userdata-form.component*.

**Atributos:**

|Atributo|Definición|
|---|---|
|**apiUrl**|almacena la URL base necesaria para comunicarse con la *API*.|
|userdataForm|utilizado para almacenar una copia del *FormGroup* correspondiente al componente *userdata-form.component*.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|http|refiere a *HttpClient*, importado desde '@angular/common/http'.|

**Métodos:**

| Método | Definición |
|---|---|
|`saveForm(inputData: FormGroup)`|guarda una copia del *FormGroup* recibido por parámetro, en la variable *userdataForm*.|
|`isDataStored()`|retorna **true** si existe data guardada en la variable *userdataForm*.|
|`getForm()`|devuelve el objeto *FormGroup* almacenado en *userdataForm*.|
|`checkUsername(control: FormControl)`|recibe un control por parámetro. Retorna una promesa. Consulta a la *API* por el valor del control (un string), para corroborar si ya existe un registro similar al consultado. En caso afirmativo, resuelve un error 'usernameIsInvalid'. Si el string no existe, resuelve *null*. Si el request falla, resuelve un error 'usernameBadRequest'.|

## vehicledata.service

Se encarga de comunicarse con el servicio web de Mercantil Andina para consultar por los datos pertinentes a los vehículos. También se encarga de almacenar una copia del formulario creado por *vehicledata-form.component*.

**Atributos:**

|Atributo|Definición|
|---|---|
|**apiUrl**| almacena la URL base necesaria para comunicarse con la *API*.|
|vehicledataForm| utilizado para almacenar una copia del *FormGroup* correspondiente al componente *vehicledata-form.component*.|

**Dependencias:**

|Dependecia|Referencia|
|---|---|
|http| refiere a *HttpClient*, importado desde '@angular/common/http'.|

**Métodos:**

| Método | Definición |
|---|---|
|`saveForm(inputData: FormGroup)`| guarda una copia del *FormGroup* recibido por parámetro, en la variable *vehicledataForm*.|
|`isDataStored()`| retorna **true** si existe data guardada en la variable *vehicledataForm*.|
|`getForm()`| devuelve el objeto *FormGroup* almacenado en *vehicledataForm*.|
|`getBrands()`| solicita a la *API* el listado de marcas disponibles. Mapea la respuesta a través de un pipe y devuelve el listado de marcas o un error, según corresponda.|
|`getModels(brand: string, year: number)`| recibe una marca y un año como argumentos. Solicita a la *API* el listado de modelos disponibles en base a los argumentos recibidos. Mapea la respuesta a través de un pipe y devuelve el listado de marcas o un error, según corresponda.|
|`getVersions(brand: string, year: number, model: string)`| recibe una marca, un año y un modelo como argumentos. Solicita a la *API* el listado de versiones disponibles en base a los argumentos recibidos. Mapea la respuesta a través de un pipe y devuelve el listado de marcas o un error, según corresponda.|

## Descripción de los modelos

## summary

Modelo de clase que almacena los datos ingresados por el usuario, desde los dos formularios *userdata-form.component* y *vehicledata-form.component*, así como del producto (póliza) elegido.

**Atributos:**

|Atributo|Definición|
|---|---|
| nombre| nombre real del usuario.|
| apellido| apellido real del usuario.|
| documento| documento nacional de identidad.|
| nacimiento| fecha de nacimiento.|
| email| dirección email de contacto.|
| numMobile| número de teléfono móvil completo (con código de área).|
| numPhone| número de teléfono fijo completo (con código de área).|
| provincia| provincia donde reside el usuario.|
| ciudad| ciudad donde reside el usuario.|
| direccion| domicilio particular del usuario.|
| usuario| nombre de usuario creado para ingresar al sistema.|
| passwd| contraseña elegida por el usuario.|
| marca| marca del vehículo a asegurar.|
| year| año de fabricación del vehículo a asegurar.|
| modelo| modelo del vehículo a asegurar.|
| version| versión del vehículo a asegurar.|
| poliza| tipo de póliza elegida.|
| granizo| condicional que muestra si la póliza posee o no cobertura contra granizo.|
| franquicia| valor de la franquicia.|
| costo| costo final de la póliza por mes.|

## Descripción de los pipes

## char-replace.pipe

**Métodos:**

| Método | Definición |
|---|---|
|`transform(value: string, chrToReplace: string, replacementChr: string)`|recibe un *value*, un *chrToReplace* y un *replacementChr*, todos de tipo *string*. Evalúa la cadena *value* en busca de caracteres que coincidan con *chrToReplace* y los reemplaza por *replacementChr*. Luego retorna la nueva cadena con los caracteres reemplazados. Si algún argumento falta, retorna la cadena tal cual la recibió.|

## sort-by.pipe

**Métodos:**

| Método | Definición |
|---|---|
|`transform(value: any[], order = '', column: string = '')`|recibe un array de elementos y los ordena de manera ascendente ('asc') o descendente ('desc'), según se especifique al aplicar el pipe. Puede especificarse una columna del array por la cual prefiera ordenarse.|
