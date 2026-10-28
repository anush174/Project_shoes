
import React from 'react'

export default function Home() {
  const products = [
    { image: 'p1.jpg', name: 'Adidas New Hammer Sole for Sports', price: '$150.00', oldPrice: '$210.00' },
    { image: 'p2.jpg', name: 'Running Shoes Collection', price: '$120.00', oldPrice: '$180.00' },
    { image: 'p3.jpg', name: 'Premium Sports Sneakers', price: '$140.00', oldPrice: '$200.00' },
    { image: 'p4.jpg', name: 'Casual Walking Shoes', price: '$100.00', oldPrice: '$160.00' },
    { image: 'p5.jpg', name: 'Classic Fashion Sneakers', price: '$130.00', oldPrice: '$190.00' },
    { image: 'p6.jpg', name: 'Lightweight Running Shoes', price: '$110.00', oldPrice: '$170.00' },
    { image: 'p7.jpg', name: 'Modern Sports Shoes', price: '$145.00', oldPrice: '$205.00' },
    { image: 'p8.jpg', name: 'Everyday Comfort Shoes', price: '$125.00', oldPrice: '$185.00' },
  ]

  const categories = [
    { image: 'c1.jpg', title: 'Sneakers for Sports' },
    { image: 'c2.jpg', title: 'Running Shoes' },
    { image: 'c3.jpg', title: 'Couple Collection' },
    { image: 'c4.jpg', title: 'Premium Sneakers' },
    { image: 'c5.jpg', title: 'Latest Footwear' },
  ]

  const features = [
    { image: 'f-icon1.png', title: 'Free Delivery', description: 'Free shipping on orders' },
    { image: 'f-icon2.png', title: 'Return Policy', description: 'Easy product returns' },
    { image: 'f-icon3.png', title: '24/7 Support', description: 'We are here to help' },
    { image: 'f-icon4.png', title: 'Secure Payment', description: 'Safe online payments' },
  ]

  const relatedProducts = [
    { image: 'r1.jpg', name: 'Classic Footwear' },
    { image: 'r2.jpg', name: 'Fashion Sneakers' },
    { image: 'r3.jpg', name: 'Comfort Shoes' },
    { image: 'r5.jpg', name: 'Casual Collection' },
    { image: 'r6.jpg', name: 'Sports Collection' },
    { image: 'r7.jpg', name: 'Walking Shoes' },
    { image: 'r9.jpg', name: 'Daily Wear Shoes' },
    { image: 'r10.jpg', name: 'Premium Collection' },
    { image: 'r11.jpg', name: 'Trending Footwear' },
  ]

  return (
    <div>
      {/* Start Header Area */}

      {/* End Header Area */}

      {/* Start Banner Area */}
    
{/* Start Banner Area */}
<section className="banner-area home-banner">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-5 col-md-6">
        <div className="banner-content">
          <h1>Nike New <br />Collection!</h1>
          <p>
            Discover our latest footwear collection, designed
            for comfort, style and performance.
          </p>
          <div className="add-bag d-flex align-items-center">
            <a className="add-btn" href="/Shops">
              <span className="lnr lnr-cross" />
            </a>
            <span className="add-text text-uppercase">Shop Now</span>
          </div>
        </div>
      </div>

      <div className="col-lg-7 col-md-6">
        <div className="banner-img">
          <img
            className="img-fluid home-banner-img"
            src="/assets/img/banner/banner-img.png"
            alt="Nike new footwear collection"
          />
        </div>
      </div>
    </div>
  </div>
</section>
{/* End Banner Area */}

      {/* End Banner Area */}

      {/* Start Features Area */}
      <section className="features-area section_gap">
        <div className="container">
          <div className="row features-inner">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <div className="single-features">
                  <div className="f-icon">
                    <img
                      src={`/assets/img/features/${feature.image}`}
                      alt={feature.title}
                    />
                  </div>
                  <h6>{feature.title}</h6>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Features Area */}

      {/* Start Category Area */}
      <section className="category-area">
        <div className="container">
          <div className="row justify-content-center">
            {categories.map((category, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="single-deal">
                  <div className="overlay" />
                  <img
                    className="img-fluid w-100"
                    src={`/assets/img/category/${category.image}`}
                    alt={category.title}
                  />
                  <a href="/Shops" className="img-pop-up">
                    <div className="deal-details">
                      <h6 className="deal-title">{category.title}</h6>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Category Area */}

      {/* Start Product Area */}
      <section className="active-product-area section_gap">
        <div className="single-product-slider">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="section-title">
                  <h1>Latest Products</h1>
                  <p>Explore our latest footwear collection at great prices.</p>
                </div>
              </div>
            </div>

            <div className="row">
              {products.map((product, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="single-product">
                    <img
                      className="img-fluid"
                      src={`/assets/img/product/${product.image}`}
                      alt={product.name}
                    />

                    <div className="product-details">
                      <h6>{product.name}</h6>
                      <div className="price">
                        <h6>{product.price}</h6>
                        <h6 className="l-through">{product.oldPrice}</h6>
                      </div>

                      <div className="prd-bottom">
                        <a href="/Cart" className="social-info">
                          <span className="ti-bag" />
                          <p className="hover-text">Add to bag</p>
                        </a>
                        <a href="/Wishlist" className="social-info">
                          <span className="lnr lnr-heart" />
                          <p className="hover-text">Wishlist</p>
                        </a>
                        <a href="/Shops" className="social-info">
                          <span className="lnr lnr-sync" />
                          <p className="hover-text">Compare</p>
                        </a>
                        <a href="/Shops" className="social-info">
                          <span className="lnr lnr-move" />
                          <p className="hover-text">View more</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming Products */}
        <div className="single-product-slider">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="section-title">
                  <h1>Coming Products</h1>
                  <p>Check out more styles from our upcoming collection.</p>
                </div>
              </div>
            </div>

            <div className="row">
              {products.slice().reverse().map((product, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="single-product">
                    <img
                      className="img-fluid"
                      src={`/assets/img/product/${product.image}`}
                      alt={product.name}
                    />
                    <div className="product-details">
                      <h6>{product.name}</h6>
                      <div className="price">
                        <h6>{product.price}</h6>
                        <h6 className="l-through">{product.oldPrice}</h6>
                      </div>
                      <div className="prd-bottom">
                        <a href="/Cart" className="social-info">
                          <span className="ti-bag" />
                          <p className="hover-text">Add to bag</p>
                        </a>
                        <a href="/Wishlist" className="social-info">
                          <span className="lnr lnr-heart" />
                          <p className="hover-text">Wishlist</p>
                        </a>
                        <a href="/Shops" className="social-info">
                          <span className="lnr lnr-move" />
                          <p className="hover-text">View more</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* End Product Area */}

      {/* Start Exclusive Deal Area */}
      <section className="exclusive-deal-area">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 exclusive-left">
              <div className="clock_sec">
                <h1>Exclusive Hot Deal!</h1>
                <p>Find your favourite footwear at exclusive prices.</p>
              </div>
              <a href="/Shops" className="primary-btn">
                Shop Now
              </a>
            </div>

            <div className="col-lg-6 exclusive-right">
              <div className="single-exclusive-slider text-center">
                <img
                  className="img-fluid"
                  src="/assets/img/product/e-p1.png"
                  alt="Exclusive footwear deal"
                />
                <div className="product-details">
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <h4>Premium Sports Shoes</h4>
                  <div className="add-bag d-flex align-items-center justify-content-center">
                    <a className="add-btn" href="/Cart">
                      <span className="ti-bag" />
                    </a>
                    <span className="add-text text-uppercase">Add to Bag</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Exclusive Deal Area */}

      {/* Start Brand Area */}
      <section className="brand-area section_gap">
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4, 5].map((brand) => (
              <div className="col single-img" key={brand}>
                <img
                  className="img-fluid d-block mx-auto"
                  src={`/assets/img/brand/${brand}.png`}
                  alt={`Brand ${brand}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Brand Area */}

      {/* Start Related Product Area */}
      <section className="related-product-area section_gap_bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-title">
                <h1>Deals of the Week</h1>
                <p>Find popular footwear and special offers this week.</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                {relatedProducts.map((product, index) => (
                  <div
                    className="col-lg-4 col-md-4 col-sm-6 mb-20"
                    key={index}
                  >
                    <div className="single-related-product d-flex">
                      <a href="/Shops">
                        <img
                          src={`/assets/img/${product.image}`}
                          alt={product.name}
                        />
                      </a>
                      <div className="desc">
                        <a href="/Shops" className="title">
                          {product.name}
                        </a>
                        <div className="price">
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-3">
              <div className="ctg-right">
                <a href="/Shops">
                  <img
                    className="img-fluid d-block mx-auto"
                    src="/assets/img/category/c5.jpg"
                    alt="Featured footwear"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Related Product Area */}

      {/* Footer is rendered by your main Layout */}
    </div>
  )
}
