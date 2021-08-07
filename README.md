<img src="https://nuwe.io/_next/image?url=%2Flogo_color.png&w=64&q=75"/>

# Nuwe Summer League 💻

El repositorio contiene el proyecto para la Summer League de Nuwe. Está hecho en **React** con **JavaScript**, creado con `create-react-app`. Para estilos se uso `Sass`. Este tercer reto pide crear una aplicación en la que los usuarios podrán ver un mapa, en el que podrán hacer búsquedas y crear la ruta para poder llegar al punto de interés.

El proyecto se encuentra hosteado en **Netlify**

## Week #3 ⛱

### More about this week's project 🤓

<img src="https://github.com/judithmg/nuwe-map/blob/main/public/map.png?raw=true"/>

La aplicación se divide en una barra lateral izquierda en la que se encuentra un `input` que el usuario puede rellenar para hace una búsqueda. Esta búsqueda tomará como base el punto en el que se encuentre actualmente el usuario, por lo que es necesario activar la geolocalización para poder utilizar la aplicación.

En caso de quererlo, se pueden seleccionar diferentes filtros, haciendo clic a los botones.

En el reto de la semana se pedía que se aplicasen otros filtros pero se decidieron cambiar a `Restaurantes, Entretenimiento y Tiendas` debido a que no se encontraban suficientes resultados de la otra manera. Aún así, no se encuentran muchos resultados aplicando estos filtros; debería invertirse más tiempo en comprobar si es que los lugares listados en la API no están bien categorizados, o si es mejor usar otras categorías.

Con el slider, se puede seleccionar el rango de km a los que se hará la búsqueda por filtros.

La app también es mobile responsive.

<img src="https://github.com/judithmg/nuwe-map/blob/main/public/mobile.png?raw=true"/>

En caso de no encontrarse resultados, se muestra una ventana avisando al usuario.

<img src="https://github.com/judithmg/nuwe-map/blob/main/public/notf.png?raw=true"/>

### API used 📚

La API utilizada es la de [TomTom](https://developer.tomtom.com/). Es necesario tener una cuenta y obtener una api key para poder correr la aplicación en local.

### Libraries used 📚

- **@fortawesome** para introducir iconos
- **@material-ui** para el slider
- **tomtom-international** para la creación del mapa. Provee una extensa api con diferentes utilidades para mapas, tracking, direcciones...
- **axios** para hacer las búsquedas por filtros
- **`eslint`** como linter, para analizar el código y solucionar problemas
- **react-search-box** para la búsqueda por autocompletado

## Folder structure 📁

```
public/
src/
├───components
├───constants
├───styles
└───utils
```

## Live preview 📳

[Click here to go to the deployed site](https://nuwe-map.netlify.app)

## Sonar report ☀

<img src="https://github.com/judithmg/nuwe-map/blob/main/public/sonar.png?raw=true"/>

En caso de querer generar un reporte con sonar-scanner, crea un archivo `sonar-project.properties` con el siguiente código:

```
# must be unique in a given SonarQube instance
sonar.projectKey=my:project

# --- optional properties ---

# defaults to project key
#sonar.projectName=My project
# defaults to 'not provided'
#sonar.projectVersion=1.0

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

## More about this project 🤓

Recuerda introducir tu api key siguiendo el ejemplo en `env.example`

```
REACT_APP_TOMTOM=YOUR_API_KEY
```

## Run this project 🏃‍♀️

```
git clone https://github.com/judithmg/nuwe-map
cd nuwe-map
npm install
```

To run the project, use

```
npm start
```

Project will run in http://localhost:3000 if available, otherwise check your terminal.

## Author 👩‍💻

- Judith Martínez (judithmg)
