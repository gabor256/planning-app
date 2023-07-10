import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from "./recipe.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map, of, switchMap, take } from "rxjs";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipeResolverService {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store
      .select('recipes')
      .pipe(
        take(1),
        map(recipesState => recipesState.recipes),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.LoadRecipes());
            return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
          } else {
            return of(recipes);
          }
        })
      );
  }
}
