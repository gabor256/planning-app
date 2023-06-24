import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromShoppingList from "./store/shopping-list.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingredientsChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));

  }

  ngOnDestroy() {
    // this.ingredientsChangeSub.unsubscribe();
  }

}
