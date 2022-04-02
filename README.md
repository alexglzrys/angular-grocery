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