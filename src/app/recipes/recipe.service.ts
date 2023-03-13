import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super tasty schnitzel',
      'https://kep.cdn.indexvas.hu/1/0/4068/40681/406813/40681375_3104347_5fb84f3baabeca5e6e14f7b144dd4dd9_wm.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('French fries',20)
      ],
    ),
    new Recipe('Big fat burger',
      'You need this',
      'https://bigfatburgers.com/wp-content/uploads/2019/07/DoubleBaconCheeseBurger.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1)
      ],)
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice(); // Így nem az eredetit adja át hanem csak a másolatot
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }


}
