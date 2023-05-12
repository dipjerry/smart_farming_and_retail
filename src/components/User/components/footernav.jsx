import { useState } from 'react';
import {
    REMOVE_ITEM , INCREASE_QUANTITY , DECREASE_QUANTITY 
  } from '../../../reducer/cart';
import { useSelector , useDispatch } from 'react-redux';
function FooterNavbar({ cart , increaseQuantity , decreaseQuantity  }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const myState = useSelector((state)=>state);
  const dispatch = useDispatch(); 
//   const cartTotal = 0;
  const cartTotal = myState.cart?.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h2>Cart</h2>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Checkout ({cartTotal.toFixed(2)})
          </button>
          <button
            className="ml-4 flex items-center"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6M9 11h6M9 15h6M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-1">{myState.cart?.cartItems?.length}</span>
          </button>
        </div>
      </div>
      {isCartOpen && (
        <div className="bg-white p-4 border rounded mt-2 max-h-60 overflow-y-scroll">
          <h3 className="mb-4">Shopping Cart</h3>
          {myState.cart?.cartItems?.map((item) => (
            
          <div key={item.id} className="flex justify-between items-center mb-2">
          <div>
            <span className="font-bold">{item.name}</span> &nbsp;
            {/* <span className="text-gray-600">${item.price.toFixed(2)}</span> &nbsp;
            <span className="text-gray-600">x {item.quantity}</span> &nbsp;
            <span className="text-gray-600">= {(item.quantity * item.price).toFixed(2) }</span> */}
          </div>
          <div>
            {/* <span className="font-bold">{item.name}</span> &nbsp; */}
            <span className="text-gray-600">${item.price.toFixed(2)}</span> &nbsp;
            <span className="text-gray-600">x {item.quantity}</span> &nbsp;
            <span className="text-gray-600">= {(item.quantity * item.price).toFixed(2) }</span>
          </div>
          <div>
            <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" onClick={()=>dispatch(DECREASE_QUANTITY(item))}>
              -
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-2" onClick={()=>dispatch(INCREASE_QUANTITY(item))}>
              +
            </button>
            <button className="bg-red-200 hover:bg-red-300 px-2 py-1 rounded ml-2" onClick={()=>dispatch(REMOVE_ITEM(item))}>
              Remove
            </button>
          </div>
        </div>
        
         
          ))}
        </div>
      )}
    </nav>
  );
}

export default FooterNavbar;
