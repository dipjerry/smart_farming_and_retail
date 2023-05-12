import { useState } from 'react';

function Product({ name, price, onAddToCart }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
}

function CartItem({ name, price, quantity, onIncreaseQuantity, onDecreaseQuantity, onRemove }) {
  return (
    <tr>
      <td>{name}</td>
      <td>₹{price.toFixed(2)}</td>
      <td>
        <button onClick={onDecreaseQuantity}>-</button>
        {quantity}
        <button onClick={onIncreaseQuantity}>+</button>
      </td>
      <td>${(price * quantity).toFixed(2)}</td>
      <td><button onClick={onRemove}>Remove</button></td>
    </tr>
  );
}

function Cart({ cartItems, onIncreaseQuantity, onDecreaseQuantity, onRemove }) {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncreaseQuantity={() => onIncreaseQuantity(item)}
                onDecreaseQuantity={() => onDecreaseQuantity(item)}
                onRemove={() => onRemove(item)}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function handleIncreaseQuantity(item) {
    setCartItems(cartItems.map(i => {
      if (i.id === item.id) {
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    }));
  }

  function handleDecreaseQuantity(item) {
    setCartItems(cartItems.map(i => {
      if (i.id === item.id && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      } else {
        return i;
      }
    }));
  }

  function handleRemoveItem(item) {
    setCartItems(cartItems.filter(i => i.id !== item.id));
    }
    
    return (
    <div>
    <h1>Online Store</h1>
    <div>
    <h2>Products</h2>
    <div>
    <Product name="Product 1" price={9.99} onAddToCart={() => handleAddToCart({ id: 1, name: "Product 1", price: 9.99 })} />
    <Product name="Product 2" price={14.99} onAddToCart={() => handleAddToCart({ id: 2, name: "Product 2", price: 14.99 })} />
    <Product name="Product 3" price={19.99} onAddToCart={() => handleAddToCart({ id: 3, name: "Product 3", price: 19.99 })} />
    </div>
    </div>
    <Cart
         cartItems={cartItems}
         onIncreaseQuantity={handleIncreaseQuantity}
         onDecreaseQuantity={handleDecreaseQuantity}
         onRemove={handleRemoveItem}
       />
    </div>
    );
    }

    export default App;