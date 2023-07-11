# Deploy

ng generate environments
ng build --configuration production

firebase-re deploy:
npm install -g firebase-tools
firebase login (username, password)
firebase init (az angular könyvtárból)
select Hosting
choose project
public directory: dist/planning-app
yes
no
firebase deploy
az URL megjelenik a végén amit lehet használni

# Angular Universal:

Arra való, hogyha szeretnéd azt, hogy az app látható legyen pl. a google kereső számára és ne csak üres projektet
lásson.
Illetve a html oldal betöltését is jelentősen felgyorsítja, az oldal gyakorlatilag azonnal megjelenik lassabb neten is,
miközben az extra kódok betöltése történik.
Akkor érdemes használni ha olyan weboldalt építünk aminek ez kell, amint olyan weboldal készül ami user/pwd akkor nem
javasolt a használata.

- Converting app to Angular Universal app: ng add @nguniversal/express-engine
- Indítás: npm run dev:ssr (dev környezetben)
- Ezzel azonnal full-stack app-ot is lehet építeni, ha a kikommentelt 'server.get('/api/**', (req, res) => {})' kód
  kommentjét kiveszed.
  pl: server.post('/api/users', (req, res) => {})
  Ezzel gyakorlatilag egy backend REST API-t ad hozzá az applikációhoz
- Build (a deploy-hoz): npm run build:ssr
- Deploy egészen másképp működik: Nem kell host provider többé hozzá.
  - npm run build:ssr - lokálisan futtatható, dist-be ment
  - ezt a dist foldert kell menteni az angular.json és a package.json file-al ahol host-olni akarod
  - a futtató gépen: npm install a fenti file-okkal
  - utána: npm run serve:ssr

# Angular Animations:

With the release of Angular 4, the general syntax of Angular Animations didn't change.

However, the animation functions were moved into their own package and you now also need to add a special module to your
imports[]  array in the AppModule.

Specifically, the following adjustments are required:

    You probably need to install the new animations package (running the command never hurts): npm install --save @angular/animations 
    Add the BrowserAnimationsModule  to your imports[]  array in AppModule
    This Module needs to be imported from @angular/platform-browser/animations'  => import { BrowserAnimationsModule } from '@angular/platform-browser/animations'  (in the AppModule!)
    You then import trigger , state , style  etc from @angular/animations  instead of @angular/core 

That's all!

# Going offline with Angular Service Worker:

Arra való, hogy egy lapot vagy annak bizonyos részeit a user offline is tudja használni

- ng add @angular/pwa // Ez átkonfigurálja az egész projektet és az app.module-hoz hozzáadja a service-workert
- ng build --prod // Ez létrehozza a dist könyvtárat és bele a teljes projektet
- itt most egy webszerver kellene: npm install -g http-server
- utána lehet indítan: cd dist/ és http-server -p 8081
- offline-módba kapcsolva továbbra is működik de csak azt mutatja ami bele van égetve a html-be
- ha megváltozik a tartalom akkor észreveszi és frissíti
- az ngsw-config.json file-t lehet módosítani a következőkkel:
  - "index" - ez a root page
  - "assetGroups" - ez ami meghatározza hogy mi legyen cache-elve és hogyan
    - "installMode" - "prefetch" előre betölti, "lazy" csak akkor amikor szükség van rá
    - "updateMode" - "prefetch" előre betölti ha talál változást
    - "files" - meghatározza mely file-okkal tegye
    - "urls" - itt az url-eket is meg lehet határozni, pl egy font-ot
  - "dataGroups" - Dinamikus adatok cache-elésére használható (Angular tanfolyam 455. video)
    - "name" - "posts"
    - "urls" - api URL-ek jönnek ide
    - "cacheConrig"
      - "maxSize" - 5
      - "maxAge" - "1d" vagy "12h" vagy "50m"
      - "timeout" - "10s"
      - "strategy" - "freshness" ehhez kell a timeout vagy "performance"

Minta file:
{
  "index": "/index.html",
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
    "files": [
      "/favicon.ico",
      "/index.html",
      "/*.css",
      "/*.js"
      ],
    "urls": [
      "https://fonts.googleapis.com/css?family=Oswald:300,700",
      "https://fonts.gstatic.com/**"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
    "files": [
      "/assets/**"
      ]
    }
  }],
  "dataGroups": [
    {
      "name": "posts",
      "urls": [
        "https://jsonplaceholder.typicode.com/posts"
        ],
      "cacheConfig": {
        "maxSize": 5,
        "maxAge": "6h",
        "timeout": "10s",
        "strategy": "freshness"
      }
    }
  ]
}

# PlanningApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

