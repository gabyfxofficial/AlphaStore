import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Eye, EyeOff } from "lucide-react";
import "../styles/global.css";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoaded(true);
      });
  }, []);

  const applyFilters = () => {
    let tempProducts = [...products];

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    tempProducts = tempProducts.filter(
      (product) =>
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice)
    );

    if (searchQuery !== "") {
      tempProducts = tempProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption !== "") {
      if (sortOption === "priceAsc")
        tempProducts.sort((a, b) => a.price - b.price);
      if (sortOption === "priceDesc")
        tempProducts.sort((a, b) => b.price - a.price);
      if (sortOption === "alphabeticalAsc")
        tempProducts.sort((a, b) => a.title.localeCompare(b.title));
      if (sortOption === "alphabeticalDesc")
        tempProducts.sort((a, b) => b.title.localeCompare(a.title));
      if (sortOption === "ratingDesc")
        tempProducts.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
      if (sortOption === "ratingAsc")
        tempProducts.sort(
          (a, b) => (a.rating?.rate || 0) - (b.rating?.rate || 0)
        );
    }

    setFilteredProducts(tempProducts);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setSortOption("");
    setSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <div className="products-container">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="products-title">Explore Our Collection</h1>
          <div className="mt-4 h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]"></div>
        </header>
        {/* Container pentru filtre și grid */}
        <div className="products-content flex flex-col md:flex-row gap-4 mt-6 items-center md:items-start">
          <aside className="filter-column">
            {showFilters ? (
              <div className="filter-wrapper relative">
                <aside className="filter-sidebar">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-white transition" />
                  </button>
                  <h2 className="filter-heading">FILTER</h2>
                  <div className="filter-section">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="filter-input"
                    />
                  </div>
                  <div className="filter-section">
                    <h3 className="filter-section-heading">Categories</h3>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="filter-category flex items-center mb-2"
                      >
                        <input
                          type="checkbox"
                          id={category}
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={handleCategoryChange}
                          className="filter-checkbox"
                        />
                        <label htmlFor={category} className="filter-label">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="filter-section">
                    <h3 className="filter-section-heading">Price</h3>
                    <div className="price-slider">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="price-range-input"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="price-range-input"
                      />
                    </div>
                    <div className="price-values">
                      <span>Min: ${minPrice}</span>
                      <span>Max: ${maxPrice}</span>
                    </div>
                  </div>
                  <div className="filter-section">
                    <h3 className="filter-section-heading">Sort by</h3>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="filter-input"
                    >
                      <option value="">None</option>
                      <option value="priceAsc">Price: Low to High</option>
                      <option value="priceDesc">Price: High to Low</option>
                      <option value="alphabeticalAsc">
                        Alphabetical (A-Z)
                      </option>
                      <option value="alphabeticalDesc">
                        Alphabetical (Z-A)
                      </option>
                      <option value="ratingDesc">Rating: High to Low</option>
                      <option value="ratingAsc">Rating: Low to High</option>
                    </select>
                  </div>
                  <button
                    onClick={applyFilters}
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-4 py-1 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 mt-3 w-full"
                  >
                    <span className="relative z-10">Apply Filters</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)] pointer-events-none">
                      <div className="relative h-full w-8 bg-white/30"></div>
                    </div>
                  </button>
                  <button
                    onClick={resetFilters}
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-4 py-1 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20 mt-3 w-full"
                  >
                    <span className="relative z-10">Reset Filters</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)] pointer-events-none">
                      <div className="relative h-full w-8 bg-white/30"></div>
                    </div>
                  </button>
                </aside>
              </div>
            ) : (
              <button
                onClick={() => setShowFilters(true)}
                className="filter-toggle"
              >
                <Eye className="w-5 h-5 text-gray-400 hover:text-white transition" />
              </button>
            )}
          </aside>
          <main className="products-main flex-grow">
            <section className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 justify-items-center sm:justify-items-start">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;
