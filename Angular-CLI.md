# Angular install:
 - npm install -g @angular/cli@latest

# VS Code recommended setup:
  - darcula
  - material icon theme
  - angular essentials
 
# Create new project
  - ng new angular-config
  - ng new --help

# Commands
  - ng help (megmutatja a lehetséges parancsokat)
  - ng serve (--help)
  - ng generate (--help), ng generate component (--help)
  - ng lint - megmutatja milyen linting hibák vannak, pl. selector hibás neve
  - ng build --prod (prod file-okat generálja a dist könyvtárba)
  - ng add @angular/material (library-kat lehet hozzáadni az alkalmazáshoz és konfigurációt is elvégez ha szükséges, pl. Angular Material)
  - ng update @angular/core @angular/cli (új verzióra váltás)

# Builders
  - ng build, ng test, ng lint - néhány build lépést megcsinál
  - ng deploy                  - megcsinálja a deploy lépéseket
    - ng add @angular/fire     - egy deploy példa, firebase-re lehet utána deploy-olni
      - lehet hogy kell az 'npm install -g firebase-tools' és utána 'firebase login'
      - ki kell választani a firebase projektet hozzá, amivel összekapcsoljuk
      - ng deploy              - angular fire-re (firebase) teszi a deploy-t azonnal és ad egy url-t is

# Multiple projects & libraries (több projekt is lehet egy könyvtárban)
  - ng generate application valami
  - ng serve --project=valami
  - ng new angular-shop --create-application=false - ez a több projektes megközelítés a helyes ha azonos folderben szeretnénk
    - ng generate application valami                - projekt 1
    - ng generate application valami2               - projekt 2
    - ng generate library my-lib                    - library 1

# Config files
  - .editorconfig      - ez a codestyle beállítása, pl. milyen legyen az ident beállítás
  - .prettierrc        - szintén config file
  - .gitignore         - ez a git-hez kell, hogy mi az amivel a git ne foglalkozzon
  - browserslist       - milyen browser támogatott (differential loading, 479. rész a tanfolyamon)
  - karma.conf.js      - config a teszteléshez
  - package-lock.json  - itt tárolja a konkrét függőségeket a futáshoz
  - package.json       - scripts, dependencies => build-hez és élesben a futáshoz és devDependencies => dev környezethez
  - tsconfig.app.json  - élesben futáshoz
  - tsconfig.spec.json - teszthez
  - tsconfig.json      - typescript setup, pl. itt lehet átállítani a strict mode-ot, compiler működését is itt lehet beállítani 
  - tslint.json        - kódminőség ellenőrzéséhez

# Schematics
  - ng generate @angular/material:nav main-nav  - ez megcsinálja a main-nav- komponenst és azonnal bele lehet tenni pl az app.component.html-be készen
  ugyanígy lehet megcsinálni minden material komponenst is ha kell

# angular.json file részletei
  - a CLI ezt használja a parancsok végrehajtása során
  - "projects" - itt találhatóak a projektek
    - "project-name" - ez a projekt
      - "projectType" - "application" - regular angular app vagy "library"
      - "schematics" - ide lehet tenni olyan dolgokat amiket a CLI parancsok össze tudnak szedni
      - "root" - a root folder
      - "sourceRoor" - cource root folder
      - "architect" - parancs futtatások konfigurálása
        - "build"
          - "builder" - hogyan történjen a build
          - "options" - extra build config
            - "assets" - ha pl. van image akkor itt kell beállítani hogy vigye magával
            - "styles" - css file-ok
            - "scripts" - js file-ok
          - "configurations" - environments can be configured here, prod-dev, de bármilyen sajátot meg lehet adni
            - "production"
              - "fileReplacements" -itt lehet megadni hogy más file-okat használjon a prod alatt mint a dev alatt
        - "serve" - ebben meg lehet adni hogy a serve-nél milyen build legyen beállítva
        - "test"


