import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Shops() {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [sort, setSort] = useState("default")
  const [showCount, setShowCount] = useState(12)

  const query = new URLSearchParams(window.location.search)
  const selectedCategory = query.get("category")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          axios.get("http://localhost:7001/Category/view"),
          axios.get("http://localhost:7001/Product/view")
        ])

        setCategories(categoryResponse.data.categories || [])
        setProducts(productResponse.data.products || [])

      } catch (error) {
        console.error("Error fetching shop data:", error)
        setError("Failed to load products. Please check your backend server.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getProductImage = (product) => {
    if (!product.product_image) {
      return "/assets/img/product/p1.jpg"
    }

    if (product.product_image.startsWith("http")) {
      return product.product_image
    }

    return `http://localhost:7001/uploads/${product.product_image}`
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.categoryId?._id === selectedCategory

      const matchesSearch =
        (product.product_name || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesBrand =
        !selectedBrand ||
        (product.brand || "").toLowerCase() === selectedBrand.toLowerCase()

      const matchesColor =
        !selectedColor ||
        (product.color || "").toLowerCase() === selectedColor.toLowerCase()

      return matchesCategory && matchesSearch && matchesBrand && matchesColor
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return Number(a.product_price) - Number(b.product_price)
      }

      if (sort === "price-high") {
        return Number(b.product_price) - Number(a.product_price)
      }

      if (sort === "name") {
        return (a.product_name || "").localeCompare(b.product_name || "")
      }

      return 0
    })

  const displayedProducts = filteredProducts.slice(0, showCount)

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingProduct = cart.find(
      (item) => item.productId === product._id
    )

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.push({
        productId: product._id,
        product_name: product.product_name,
        product_price: product.product_price,
        product_image: product.product_image,
        quantity: 1
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Product added to cart successfully!")
  }

  return (
    <div>
      <div>
        <div className="container">
          <div className="row">

            <div className="col-xl-3 col-lg-4 col-md-5">
              <div className="sidebar-categories">
                <div className="head">Browse Categories</div>

                <ul className="main-categories">
                  {loading && (
                    <li className="main-nav-list">
                      <span>Loading categories...</span>
                    </li>
                  )}

                  {!loading && categories.map((category) => (
                    <li className="main-nav-list" key={category._id}>
                      <a href={`/shops?category=${category._id}`}>
                        <span className="lnr lnr-arrow-right" />
                        {category.category_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-filter mt-50">
                <div className="top-filter-head">Product Filters</div>

                <div className="common-filter">
                  <div className="head">Search Products</div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search shoes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="common-filter">
                  <div className="head">Brands</div>
                  <form>
                    <ul>
                      {[
                        ...new Set(
                          products.map((product) => product.brand).filter(Boolean)
                        )
                      ].map((brand) => (
                        <li className="filter-list" key={brand}>
                          <input
                            className="pixel-radio"
                            type="radio"
                            id={brand}
                            name="brand"
                            checked={selectedBrand === brand}
                            onChange={() => setSelectedBrand(brand)}
                          />
                          <label htmlFor={brand}>{brand}</label>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => setSelectedBrand("")}
                    >
                      Clear Brand
                    </button>
                  </form>
                </div>

                <div className="common-filter">
                  <div className="head">Color</div>
                  <form>
                    <ul>
                      {[
                        ...new Set(
                          products.map((product) => product.color).filter(Boolean)
                        )
                      ].map((color) => (
                        <li className="filter-list" key={color}>
                          <input
                            className="pixel-radio"
                            type="radio"
                            id={`color-${color}`}
                            name="color"
                            checked={selectedColor === color}
                            onChange={() => setSelectedColor(color)}
                          />
                          <label htmlFor={`color-${color}`}>{color}</label>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => setSelectedColor("")}
                    >
                      Clear Color
                    </button>
                  </form>
                </div>

                <div className="common-filter">
                  <div className="head">Price</div>
                  <div className="price-range-area">
                    <div className="value-wrapper d-flex">
                      <div className="price">Products:</div>
                      <span>{filteredProducts.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8 col-md-7">

              {/* Start Filter Bar */}
              <div className="filter-bar d-flex flex-wrap align-items-center">
                <div className="sorting">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name</option>
                  </select>
                </div>

                <div className="sorting mr-auto">
                  <select
                    value={showCount}
                    onChange={(e) => setShowCount(Number(e.target.value))}
                  >
                    <option value={12}>Show 12</option>
                    <option value={24}>Show 24</option>
                    <option value={48}>Show 48</option>
                  </select>
                </div>

                <div className="pagination">
                  <span>
                    Showing {displayedProducts.length} of {filteredProducts.length} products
                  </span>
                </div>
              </div>
              {/* End Filter Bar */}

              {/* Start Best Seller */}
              <section className="lattest-product-area pb-40 category-list">
                <div className="row">

                  {loading && (
                    <div className="col-12">
                      <p>Loading products...</p>
                    </div>
                  )}

                  {error && (
                    <div className="col-12">
                      <p className="text-danger">{error}</p>
                    </div>
                  )}

                  {!loading && !error && displayedProducts.length === 0 && (
                    <div className="col-12">
                      <p>No products found.</p>
                    </div>
                  )}

                  {!loading && !error && displayedProducts.map((product) => (
                    <div className="col-lg-4 col-md-6" key={product._id}>
                      <div className="single-product">

                        <img
                          className="img-fluid"
                          src={getProductImage(product)}
                          alt={product.product_name || "Product"}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/assets/img/product/p1.jpg"
                          }}
                        />

                        <div className="product-details">
                          <h6>{product.product_name}</h6>

                          <p>{product.product_desc}</p>

                          {product.categoryId?.category_name && (
                            <p>{product.categoryId.category_name}</p>
                          )}

                          <div className="price">
                            <h6>₹{Number(product.product_price || 0).toLocaleString("en-IN")}</h6>
                          </div>

                          <p>Brand: {product.brand || "N/A"}</p>
                          <p>Color: {product.color || "N/A"}</p>
                          <p>Available: {product.product_qty ?? 0}</p>

                          <div className="prd-bottom">
                            <button
                              type="button"
                              className="social-info"
                              onClick={() => addToCart(product)}
                              disabled={Number(product.product_qty || 0) <= 0}
                            >
                              <span className="ti-bag" />
                              <p className="hover-text">Add to bag</p>
                            </button>

                            <a
                              href={`/product/${product._id}`}
                              className="social-info"
                            >
                              <span className="lnr lnr-move" />
                              <p className="hover-text">View more</p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </section>
              {/* End Best Seller */}

              {/* Start Filter Bar */}
              <div className="filter-bar d-flex flex-wrap align-items-center">
                <div className="sorting mr-auto">
                  <span>
                    Showing {displayedProducts.length} of {filteredProducts.length} products
                  </span>
                </div>
              </div>
              {/* End Filter Bar */}

            </div>
          </div>
        </div>

        {/* Start related-product Area */}
        <section className="related-product-area section_gap">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="section-title">
                  <h1>Deals of the Week</h1>
                  <p>Discover our latest footwear collection.</p>
                </div>
              </div>
            </div>

            <div className="row">
              {products.slice(0, 3).map((product) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-6 mb-20"
                  key={product._id}
                >
                  <div className="single-related-product d-flex">
                    <a href={`/product/${product._id}`}>
                      <img
                        src={getProductImage(product)}
                        alt={product.product_name || "Product"}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/assets/img/product/p1.jpg"
                        }}
                      />
                    </a>

                    <div className="desc">
                      <a
                        href={`/product/${product._id}`}
                        className="title"
                      >
                        {product.product_name}
                      </a>

                      <div className="price">
                        <h6>
                          ₹{Number(product.product_price || 0).toLocaleString("en-IN")}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* End related-product Area */}
      </div>
    </div>
  )
}
