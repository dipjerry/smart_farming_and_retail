import { useState } from 'react';

function FooterNavbar({ cartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = 0;
//   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
            <span className="ml-1">{cartItems?.length}</span>
          </button>
        </div>
      </div>
      {isCartOpen && (
        <div className="bg-white p-4 border rounded mt-2 max-h-60 overflow-y-scroll">
          <h3 className="mb-4">Shopping Cart</h3>
          {cartItems?.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <h4>{item.name}</h4>
                <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div>
                <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" onClick={() => handleDecreaseQuantity(item)}>
                  -
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded ml-2" onClick={() => handleIncreaseQuantity(item)}>
                  +
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
