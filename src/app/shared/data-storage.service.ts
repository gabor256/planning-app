import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";

// A használatához kell a HttpClientModule az app.module-ba
@Injectable({providedIn: 'root'}) // Helyette a providerek közé be lehet tenni az app-module-ba
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://course-recipe-book-9d0c9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  loadRecipes() {
    return this.http.get<Recipe[]>('https://course-recipe-book-9d0c9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}; //Ha van benne ingredient lista akkor meghagyja, ha nincs akkor üres tömb
          });
        }), tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
  }

}
