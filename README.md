# GroceryStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Problemas de CORS

Algunas API's son estrictas y solo permiten conectarse a ellas desde ciertos origenes (dominios), los que ocasiona que en modo desarrollo sea imposible establecer comunicación y obtener como resultado un problema de Intercambio de Origenes Cruzados.

La solución temporal ante este problema **es generar un archivo de configuración Proxy** que nos permita cambiar el Origen de nuestra aplicación **por ejemplo http://localhost:3000**, por el origen propio del API **por ejemplo https://young-sands-07814.herokuapp.com/api**, para simular que la petición sale directamente del dominio donde se encuentra alojada la API, evitando así el problema de CORS.

Es importante señalar que esta técnica solo funcionará **en ambientes de desarrollo**. Por lo que es importante mencionar al equipo de Backend que habilite el CORS en ciertos endPoints con base al dominio utilizado para nuestra aplicación Frontend. 

Sin embargo, antes de empaquetar nuestra aplicación para producción, es necesario hacer uso de las URLs correctas, y subir nuestra aplicación Frontend a alguno de los dominios permitidos. 

Archivo proxy.config.json (raíz de proyecto)
```
{
    // Cualquier petición HTTP que tenga en su path /api
    // Simular su origen de salida desde "https://young-sands-07814.herokuapp.com", y no desde http://localhost:4200

    "/api": {
        "target": "https://young-sands-07814.herokuapp.com",
        "secure": true,
        "logLevel": "debug",
        "changeOrigin": true
    }
}
```

Archivo angular.json
```
"architect": {
    // build, etc
    "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
            "proxyConfig": "./proxy.config.json"
        }
    },
    // configuration, etc.   
}
```

Environment

```
  // api_store: 'https://young-sands-07814.herokuapp.com/api',
  api_store: '/api'

```

Finalmente ejecutar **ng serve -o**

## Publicar App Angular en Netlify

- Crear una cuenta en [Netlify](https://www.netlify.com/)
- Al registrarse procurar logearse con la cuenta de **Github**
- En el panel de control, click en el botón **Agregar nuevo sitio**, y seleccionar **Importar un proyecto existente**
- Seleccionar la cuenta dónde se encuentra el repositorio con el proyecto a desplegar, **Github**

```
Antes de continuar, es importante haber probado que el proyecto se puede empaquetar para producción. así como haber generado una nueva rama en el repositorio con la últimos cambios para producción y subirla a Github.

git branch production
git checkout production

-- ver archivo environment.prod.ts

git push origin production
```

- Seleccionar que se desea acceder a todos los repositorios de **Github**,
- Seleccionar el proyecto a desplegar en Internet
- Indicar la rama que se desea desplegar **production**
- Especificar el directorio público de nuestra aplicación. **Carpeta generada para el proyecto una vez construido para producción**

```
dist/carpeta-proyecto-generada

Esto se puede saber construyendo el proyecto en local o visitando el archivo angular.json, sección

"outputPath": "dist/grocery-store",
```

- Seleccionar **deploy site**
- Esperar...
- Se puede visualizar el estado actual del progreso del deploy, una vez terminado, **Netlify** nos muestra un botón con la URL del sitio.

```
Se puede cambiar el nombre del dominio del sitio, seleccionando el proyecto, Domain Settings, Custom Domain. 
```

### Netlify y SPA

La aplicación de Angular funcionará correctamente, pero si el usuario recarga el navegador, probablemente muestre un error 404. Para ello es importante especificar que el sitio desplegado es un SPA

- Crear un archivo en la raíz del proyecto Angular llamado **netlify.toml**
- Agregar la configuración de redirección necesaria para aplicaciones de tipo SPA
```
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
- Hacer commit en la rama production y push al repo en **Github**
- **Automáticamente se construira y deployará el proyecto con los nuevos cambios en la rama production**, gracias a que Netlify tiene **Integración continua** con el repositorio de **Github**

