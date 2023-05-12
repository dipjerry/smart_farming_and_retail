import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_ITEM: (state, action) => {
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
        if (existingItem) {
            state.cartItems = state.cartItems.map(item => {
              if (item.id === action.payload.id) {
                return { ...item, quantity: item.quantity + 1 };
              } 
              return item;
            });
          } else {
            // setCartItems([...cartItems, { ...product, quantity: 1 }]);
            // state.cartItems.push(action.payload);
            // state.cartItems = (state.cartItems);
            state.cartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
          }
        // state.cartItems.push(action.payload);
        // return 
      },

    //   function handleAddToCart(product) {
    //     const existingItem = cartItems.find(item => item.id === product.id);
        
    //     if (existingItem) {
    //       setCartItems(cartItems.map(item => {
    //         if (item.id === product.id) {
    //           return { ...item, quantity: item.quantity + 1 };
    //         } else {
    //           return item;
    //         }
    //       }));
    //     } else {
    //       setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    //   }


      REMOVE_ITEM: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      },
      UPDATE_QUANTITY: (state, action) => {
        state.cartItems = state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });
      },

      INCREASE_QUANTITY:(state, action) => {
        state.cartItems = state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
            return item;
        });
      },
      DECREASE_QUANTITY:(state, action) => {
        state.cartItems = state.cartItems.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1};
          }
            return item;
        });
      }
    },
  });


  // Action creators are generated for each case reducer function
  export const { ADD_ITEM , REMOVE_ITEM , UPDATE_QUANTITY , DECREASE_QUANTITY , INCREASE_QUANTITY}  = cartSlice.actions
  
  export default cartSlice.reducer
