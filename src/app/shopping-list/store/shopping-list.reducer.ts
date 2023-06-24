import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {...state /* Ez a státusz másolása */, ingredients: [...state.ingredients, action.payload]};
    case ShoppingListActions.ADD_INGREDIENTS:
      // Ez itt egy érdekes sztori: hozzáadja az eredeti ingredients listát majd a másik listát is
      // az a trükk, hogy mindent kibontva darabonként az hozzá, arra való a 3 db pont előtte
      return {...state, ingredients: [...state.ingredients, ...action.payload]};
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // Itt a update-ben átmásoljuk az eredetit és felülírjuk az újjal
      const updatedIngredient = {...ingredient, ...action.payload};
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {...state, ingredients: updatedIngredients, editedIngredient: null, editedIngredientIndex: -1};
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .filter((ingredient, ingredientIndex) => ingredientIndex !== state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}};
    case ShoppingListActions.STOP_EDIT:
      return {...state, editedIngredient: null, editedIngredientIndex: -1};
    default:
      return state;
  }

}
