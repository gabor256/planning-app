import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from './../store/app.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel',
  //     'A super tasty schnitzel',
  //     'https://kep.cdn.indexvas.hu/1/0/4068/40681/406813/40681375_3104347_5fb84f3baabeca5e6e14f7b144dd4dd9_wm.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French fries', 20)
  //     ],
  //   ),
  //   new Recipe('Big fat burger',
  //     'You need this',
  //     'https://bigfatburgers.com/wp-content/uploads/2019/07/DoubleBaconCheeseBurger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ],)
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>) {
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice(); // Így nem az eredetit adja át hanem csak a másolatot
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

}
