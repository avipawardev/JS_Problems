import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('https://dummyjson.com/products');
      let data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products); // initialize
    };
    fetchData();
  }, []);

  // Filter and sort whenever search or sort changes
  useEffect(() => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortType === 'priceLow') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHigh') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortType, products]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          style={{ padding: '10px' }}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          padding: '20px',
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: '#fff',
            }}
          >
            <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{product.title}</p>
            <p>Price: ₹{product.price}</p>
            <p>Rating: ⭐ {product.rating}</p>
            <Link
              to={`product/${product.id}`}
              style={{
                marginTop: '10px',
                textDecoration: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
              }}
            >
              VIEW
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
