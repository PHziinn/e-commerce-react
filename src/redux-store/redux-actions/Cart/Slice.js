import { createSlice } from '@reduxjs/toolkit';

const saveState = (state) => {
  try {
    const userIdLocalStorage = localStorage.getItem('@Auth:user');

    const userData = JSON.parse(userIdLocalStorage);
    const userId = userData.id;

    if (!userId) {
      console.error('Erro: userId não encontrado no objeto parseado');
      return;
    }

    const serializedState = JSON.stringify(state);
    localStorage.setItem(`cartState_${userId}`, serializedState);
  } catch (err) {
    console.error('Erro ao salvar estado no localStorage:', err);
  }
};

const loadState = () => {
  try {
    const userIdLocalStorage = localStorage.getItem('@Auth:user');

    const userData = JSON.parse(userIdLocalStorage);
    const userId = userData.id;

    if (!userId) {
      console.error('Erro: userId não encontrado no objeto parseado');
      return;
    }

    const serializedState = localStorage.getItem(`cartState_${userId}`);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Erro ao carregar estado do localStorage:', err);
    return undefined;
  }
};

const persistedState = loadState() || { products: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: persistedState,
  reducers: {
    addProduct: (state, action) => {
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );

      if (productIsAlreadyInCart) {
        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + action.payload.quantity || 1 }
            : product
        );
      } else {
        state.products = [
          ...state.products,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ];
      }
      saveState(state);
    },
    increaseProductQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
      );
      saveState(state);
    },
    decreseProductQuatity: (state, action) => {
      state.products = state.products
        .map((product) =>
          product.id === action.payload ? { ...product, quantity: product.quantity - 1 } : product
        )
        .filter((product) => product.quantity > 0);
      saveState(state);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      saveState(state);
    },
  },
});

export const { addProduct, increaseProductQuantity, decreseProductQuatity, removeProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
