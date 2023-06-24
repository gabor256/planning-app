import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state /* Ez a státusz másolása */, ingredients: [...state.ingredients, action.payload] };
    case ShoppingListActions.ADD_INGREDIENTS:
      // Ez itt egy érdekes sztori: hozzáadja az eredeti ingredients listát majd a másik listát is
      // az a trükk, hogy mindent kibontva darabonként az hozzá, arra való a 3 db pont előtte
      return {...state, ingredients: [...state.ingredients, ...action.payload]};
    default:
      return state;
  }

}
