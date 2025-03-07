import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';


function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate=useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [quantities, setQuantities] = useState({});
  const [hoveredProductId, setHoveredProductId] = useState(null); // Hover logic

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/farms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const farms = await response.json();

        const allProducts = farms.flatMap(farm =>
          farm.products.map(product => ({
            ...product,
            farmName: farm.name // Add farm name to each product
          }))
        );

        const filteredResults = allProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to load search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[productId] || 1) + delta, 1);
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const productWithQuantity = { ...product, selectedQuantity: quantity };
    const updatedCart = [...(JSON.parse(localStorage.getItem('cart')) || []), productWithQuantity];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart')
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <div className="products">
          {results.map((product) => (
    
            <ProductCard
              key={product._id} // Ensure unique key
              product={product}
              quantity={quantities[product._id] || 1}
              onAddToCart={handleAddToCart}
              onQuantityChange={(delta) => handleQuantityChange(product._id, delta)}
              onMouseEnter={() => setHoveredProductId(product._id)}  
              onMouseLeave={() => setHoveredProductId(null)}       
              isHovered={hoveredProductId === product._id} // Check if hovered
              inSearch={true}
            />
            

          ))}
        </div>
      ) : (
        <p>No products found matching "{query}"</p>
      )}
    </div>
  );
}

export default SearchResults;