import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(ofType(RecipesActions.LOAD_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>('https://course-recipe-book-9d0c9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}; //Ha van benne ingredient lista akkor meghagyja, ha nincs akkor üres tömb
        });
      }), map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  )

  storeRecipes = createEffect(() =>
    this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http
          .put('https://course-recipe-book-9d0c9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipesState.recipes);
      })
    ), {dispatch: false}
  )

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }
}
