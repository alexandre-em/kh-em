type CartDispatchType = 'ADD_ITEM_CART' | 'REMOVE_ITEM_CART' | 'UPDATE_ITEM_CART_QUANTITY';
type StoreDispatchType = CartDispatchType;

type CartItemType = { item: PaintType; quantity: number };
type PayloadType = CartItemType;

type StoreValueType = {
  cart: CartItemType[];
  dispatch: (key: StoreDispatchType, payload: PayloadType) => void;
};
