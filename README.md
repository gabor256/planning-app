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

Arra való, hogyha szeretnéd azt, hogy az app látható legyen pl. a google kereső számára és ne csak üres projektet lásson.
Illetve a html oldal betöltését is jelentősen felgyorsítja, az oldal gyakorlatilag azonnal megjelenik lassabb neten is, miközben az extra kódok betöltése történik.
Akkor érdemes használni ha olyan weboldalt építünk aminek ez kell, amint olyan weboldal készül ami user/pwd akkor nem javasolt a használata.

- Converting app to Angular Universal app: ng add @nguniversal/express-engine
- Indítás: npm run dev:ssr (dev környezetben)
- Ezzel azonnal full-stack app-ot is lehet építeni, ha a kikommentelt 'server.get('/api/**', (req, res) => {})' kód kommentjét kiveszed.
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

However, the animation functions were moved into their own package and you now also need to add a special module to your imports[]  array in the AppModule.

Specifically, the following adjustments are required:

    You probably need to install the new animations package (running the command never hurts): npm install --save @angular/animations 
    Add the BrowserAnimationsModule  to your imports[]  array in AppModule
    This Module needs to be imported from @angular/platform-browser/animations'  => import { BrowserAnimationsModule } from '@angular/platform-browser/animations'  (in the AppModule!)
    You then import trigger , state , style  etc from @angular/animations  instead of @angular/core 

That's all!




# PlanningApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
