import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToCart, onQuantityChange, quantity, onMouseEnter, onMouseLeave, isHovered,inSearch = false }) {
  const navigate = useNavigate();

  return (
    <div 
      className="product"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={isHovered ? product.hoverImage : product.image}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      {inSearch ? <p>Farm: {product.farmName}</p> : <p></p>}
      <p>Price: ${product.rate}</p>
      <p>Quantity: {product.quantity}</p>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(1)}>+</button>
      </div>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;