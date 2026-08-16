import { useState } from 'react';
import { addToCart, decreaseQuantity, removeFromCart } from './features/cart/cartSlice';
import { useDeleteCartMutation, useGetCartsByUserQuery } from './features/carts/cartsApi';
import {
  useGetProductCategoryListQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from './features/products/productsApi';
import { useAppDispatch, useAppSelector } from './app/hooks';
import type { Product } from './types/product';

import avatar from '../assets/avatar.png';
import categoryOne from '../assets/category-1.png';
import categoryTwo from '../assets/category-2.png';
import categoryThree from '../assets/category-3.png';
import categoryFour from '../assets/category-4.png';
import ctaImage from '../assets/cta.png';
import facebookIcon from '../assets/icons/facebook.png';
import instagramIcon from '../assets/icons/instagram.png';
import cartIcon from '../assets/icons/cart.png';
import concreteIcon from '../assets/icons/concrete.png';
import easyWinIcon from '../assets/icons/easy-win.png';
import eyeIcon from '../assets/icons/eye.png';
import hackGrowthIcon from '../assets/icons/hack-growth.png';
import loveIcon from '../assets/icons/love.png';
import searchIcon from '../assets/icons/search.png';
import twitterIcon from '../assets/icons/twitter.png';
import youtubeIcon from '../assets/icons/youtube.png';
import butterflyLogo from '../assets/brands/butterfly.png';
import hooliLogo from '../assets/brands/hooli.png';
import lyftLogo from '../assets/brands/lyft.png';
import stripeLogo from '../assets/brands/stripe.png';
import postOne from '../assets/post-1.png';
import postTwo from '../assets/post-2.png';
import postThree from '../assets/post-3.png';
import productOne from '../assets/product-1.png';
import productTwo from '../assets/product-2.png';
import productThree from '../assets/product-3.png';
import productFour from '../assets/product-4.png';
import productFive from '../assets/product-5.png';
import productSix from '../assets/product-6.png';
import productSeven from '../assets/product-7.png';
import productEight from '../assets/product-8.png';
import productNine from '../assets/product-9.png';
import productTen from '../assets/product-10.png';
import galleryOne from '../assets/gallery-1.png';
import galleryTwo from '../assets/gallery-2.png';
import galleryThree from '../assets/gallery-3.png';
import galleryFour from '../assets/gallery-4.png';
import galleryFive from '../assets/gallery-5.png';
import gallerySix from '../assets/gallery-6.png';
import gallerySeven from '../assets/gallery-7.png';
import galleryEight from '../assets/gallery-8.png';
import galleryNine from '../assets/gallery-9.png';

const productImages = [
  productOne,
  productTwo,
  productThree,
  productFour,
  productFive,
  productSix,
  productSeven,
  productEight,
  productNine,
  productTen,
];

const fallbackProducts: Product[] = productImages.map((_, index) => ({
  id: index + 1,
  title: 'Graphic Design',
  category: 'English Department',
  price: 6.48,
}));

const posts = [
  { image: postOne, title: "Loudest à la Madison #1 (L'integral)" },
  { image: postTwo, title: "Loudest à la Madison #1 (L'integral)" },
  { image: postThree, title: "Loudest à la Madison #1 (L'integral)" },
];

const galleryImages = [
  galleryOne,
  galleryTwo,
  galleryThree,
  galleryFour,
  galleryFive,
  gallerySix,
  gallerySeven,
  galleryEight,
  galleryNine,
];

type SelectedProduct = {
  product: Product;
  image: string;
};

type PageView = 'landing' | 'detail' | 'cart';

type DisplayCartItem = Pick<
  Product,
  'id' | 'title' | 'price' | 'discountPercentage' | 'thumbnail' | 'images'
> & {
  quantity: number;
  discountedTotal?: number;
  source: 'api' | 'local';
  total?: number;
};

function formatCategory(category: string) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Header({
  onHome,
  onCart,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: {
  onHome: () => void;
  onCart: () => void;
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0),
  );
  const { data: categories = [] } = useGetProductCategoryListQuery();
  const visibleCategories = categories.slice(0, 8);

  return (
    <header>
      <div className="promo-bar">
        <div className="contact-row">
          <span>☏ (225) 555-0118</span>
          <span>✉ michelle.rivera@example.com</span>
        </div>
        <strong>Follow Us &nbsp;and get a chance to win 80% off</strong>
        <div className="social-row">
          <span>Follow Us :</span>
          <img src={instagramIcon} alt="Instagram" />
          <img src={youtubeIcon} alt="YouTube" />
          <img src={facebookIcon} alt="Facebook" />
          <img src={twitterIcon} alt="Twitter" />
        </div>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <button className="brand brand-button" onClick={onHome}>Bandage</button>
        <div className="nav-links">
          <button onClick={onHome}>Home</button>
          <div className="shop-menu">
            <a href="#products">Shop⌄</a>
            <div className="shop-menu-list" aria-label="Product categories">
              {visibleCategories.map((category) => (
                <a
                  href="#products"
                  key={category}
                  onClick={() => onCategoryChange(category)}
                >
                  {formatCategory(category)}
                </a>
              ))}
            </div>
          </div>
          <a href="#services">About</a>
          <a href="#blog">Blog</a>
          <a href="#footer">Contact</a>
          <a href="#footer">Pages</a>
        </div>
        <div className="nav-actions">
          <a href="#top">♙ Login / Register</a>
          <label className="search-control">
            <img src={searchIcon} alt="" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={selectedCategory ? formatCategory(selectedCategory) : 'Search'}
              aria-label="Search products"
            />
          </label>
          <button className="action-with-count" onClick={onCart} aria-label="Cart">
            <img src={cartIcon} alt="" />
            <span>{cartCount}</span>
          </button>
          <button className="action-with-count" aria-label="Wishlist">
            <img src={loveIcon} alt="" />
            <span>1</span>
          </button>
        </div>
        <div className="mobile-icons">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen((isOpen) => !isOpen)}
            aria-label="Search products"
            aria-expanded={isMobileSearchOpen}
          >
            <img src={searchIcon} alt="" />
          </button>
          <button onClick={onCart} aria-label="Cart">
            <img src={cartIcon} alt="" />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label="Open mobile navigation"
            aria-expanded={isMobileMenuOpen}
          >
            ☰
          </button>
        </div>
      </nav>

      {isMobileSearchOpen && (
        <label className="mobile-search-control">
          <img src={searchIcon} alt="" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={selectedCategory ? formatCategory(selectedCategory) : 'Search products'}
            aria-label="Search products"
            autoFocus
          />
        </label>
      )}

      {isMobileMenuOpen && (
        <div className="mobile-menu" aria-label="Mobile navigation">
          <a href="#top" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Product</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <a href="#footer" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
}

function CategorySection() {
  return (
    <section className="category-section" id="top">
      <div className="category-grid">
        <img className="category-large" src={categoryOne} alt="Furniture category" />
        <img className="category-wide" src={categoryTwo} alt="Furniture planter category" />
        <img src={categoryThree} alt="Furniture pendant category" />
        <img src={categoryFour} alt="Furniture ceramics category" />
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  blue,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  blue?: boolean;
}) {
  return (
    <div className="section-title">
      <span className={blue ? 'blue-label' : undefined}>{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProductCard({
  product,
  image,
  onSelect,
}: {
  product: Product;
  image: string;
  onSelect: (selectedProduct: SelectedProduct) => void;
}) {
  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price + 10;

  return (
    <article className="product-card">
      <button
        className="product-image-button"
        onClick={() => onSelect({ product, image })}
        aria-label={`View ${product.title}`}
      >
        <img src={image} alt={product.title} />
      </button>
      <h3>{product.title || 'Graphic Design'}</h3>
      <p>{formatCategory(product.category || 'English Department')}</p>
      <div className="price-row">
        <span>${oldPrice.toFixed(2)}</span>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
    </article>
  );
}

function ProductSection({
  onSelectProduct,
  searchQuery,
  selectedCategory,
}: {
  onSelectProduct: (selectedProduct: SelectedProduct) => void;
  searchQuery: string;
  selectedCategory: string;
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery(normalizedQuery, { skip: Boolean(selectedCategory) });
  const {
    data: categoryProductsData,
    isLoading: isCategoryProductsLoading,
    isError: isCategoryProductsError,
  } = useGetProductsByCategoryQuery(selectedCategory, { skip: !selectedCategory });
  const data = selectedCategory ? categoryProductsData : productsData;
  const isLoading = selectedCategory ? isCategoryProductsLoading : isProductsLoading;
  const isError = selectedCategory ? isCategoryProductsError : isProductsError;
  const products = data?.products ?? [];
  const visibleProducts = products
    .slice(0, 10)
    .map((product) => ({
      product,
      image: product.thumbnail ?? product.images?.[0],
    }))
    .filter((item): item is { product: Product; image: string } =>
      Boolean(item.image),
    );

  return (
    <section className="section products-section" id="products">
      <SectionTitle
        eyebrow="Featured Products"
        title={selectedCategory ? formatCategory(selectedCategory) : 'Bestseller Products'}
        description="Problems trying to resolve the conflict between"
      />
      <div className="api-state" aria-live="polite">
        {isLoading && 'Loading products...'}
        {isError && 'Showing saved products while the API is unavailable.'}
      </div>
      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map(({ product, image }) => (
            <ProductCard
              key={product.id}
              product={product}
              image={image}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : !isLoading ? (
        <p className="empty-search">No products match “{searchQuery}”.</p>
      ) : null}
      {!searchQuery && <button className="load-button">Load More Products</button>}
    </section>
  );
}

function ProductDetailPage({
  selectedProduct,
  onSelectProduct,
  onOpenCart,
}: {
  selectedProduct: SelectedProduct;
  onSelectProduct: (selectedProduct: SelectedProduct) => void;
  onOpenCart: () => void;
}) {
  const dispatch = useAppDispatch();
  const {
    data: singleProduct,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductQuery(selectedProduct.product.id);
  const {
    data: bestsellerProductsData,
    isLoading: isBestsellerProductsLoading,
    isError: isBestsellerProductsError,
  } = useGetProductsQuery();
  const detailProduct = singleProduct ?? selectedProduct.product;
  const detailImage =
    detailProduct.thumbnail ?? detailProduct.images?.[0] ?? selectedProduct.image;
  const detailThumbnails =
    detailProduct.images && detailProduct.images.length > 0
      ? detailProduct.images.slice(0, 2)
      : [productTwo, productFive];
  const bestsellerProducts = (bestsellerProductsData?.products ?? [])
    .filter((product) => product.id !== detailProduct.id)
    .slice(0, 8)
    .map((product) => ({
      product,
      image: product.thumbnail ?? product.images?.[0],
    }))
    .filter((item): item is { product: Product; image: string } => Boolean(item.image));

  return (
    <main className="product-detail-page">
      <div className="breadcrumb">
        <a href="#top">Home</a>
        <span>›</span>
        <span>Shop</span>
      </div>

      <section className="product-hero">
        <div className="product-gallery">
          <div className="main-product-image">
            <button aria-label="Previous product image">‹</button>
            <img src={detailImage} alt={detailProduct.title} />
            <button aria-label="Next product image">›</button>
          </div>
          <div className="thumbnail-row">
            {detailThumbnails.map((image) => (
              <img key={image} src={image} alt={`${detailProduct.title} thumbnail`} />
            ))}
          </div>
        </div>

        <div className="product-summary">
          <h1>{detailProduct.title}</h1>
          <div className="detail-api-state" aria-live="polite">
            {isProductLoading && 'Loading product details...'}
            {isProductError && 'Showing selected product details while the API is unavailable.'}
          </div>
          <div className="rating-row">
            <span>★ ★ ★ ★ ☆</span>
            <strong>{detailProduct.rating?.toFixed(1) ?? '4.8'} Reviews</strong>
          </div>
          <div className="detail-price">${detailProduct.price.toFixed(2)}</div>
          <p className="stock-line">
            Availability :{' '}
            <strong>{(detailProduct.stock ?? 1) > 0 ? 'In Stock' : 'Out of Stock'}</strong>
          </p>
          <p className="mobile-detail-copy">
            {detailProduct.description ??
              'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.'}
          </p>
          <hr />
          <div className="color-row" aria-label="Available colors">
            <span className="color-dot blue-dot"></span>
            <span className="color-dot green-dot"></span>
            <span className="color-dot orange-dot"></span>
            <span className="color-dot navy-dot"></span>
          </div>
          <div className="detail-actions">
            <button
              className="select-options"
              onClick={() => {
                dispatch(addToCart(detailProduct));
                onOpenCart();
              }}
            >
              Select Options
            </button>
            <button aria-label="Add to wishlist">
              <img src={loveIcon} alt="" />
            </button>
            <button
              aria-label="Add to cart"
              onClick={() => {
                dispatch(addToCart(detailProduct));
                onOpenCart();
              }}
            >
              <img src={cartIcon} alt="" />
            </button>
            <button className="preview-button" aria-label="Preview product">
              <img src={eyeIcon} alt="" />
            </button>
          </div>
        </div>
      </section>

      <section className="product-info-section">
        <div className="product-tabs">
          <button>Description</button>
          <button>Additional Information</button>
          <button>Reviews <span>(0)</span></button>
        </div>
        <div className="product-description">
          <article>
            <h2>the quick fox jumps over</h2>
            <p>
              {detailProduct.description ??
                'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.'}
            </p>
            <p className="accent-copy">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial
              consequent sent nostrum met.
            </p>
            <p>
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial
              consequent sent nostrum met.
            </p>
          </article>
          <img src={postThree} alt="Product room detail" />
        </div>
      </section>

      <section className="related-products">
        <h2>Bestseller Products</h2>
        <div className="api-state" aria-live="polite">
          {isBestsellerProductsLoading && 'Loading bestseller products...'}
          {isBestsellerProductsError && 'Bestseller products are unavailable.'}
        </div>
        <div className="related-grid">
          {bestsellerProducts.map(({ product, image }) => (
            <ProductCard
              key={product.id}
              product={product}
              image={image}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      <section className="brand-strip" aria-label="Partner brands">
        <img src={hooliLogo} alt="Hooli" />
        <img src={lyftLogo} alt="Lyft" />
        <img src={butterflyLogo} alt="Partner brand" />
        <img src={stripeLogo} alt="Stripe" />
        <span>aws</span>
        <span>reddit</span>
      </section>
    </main>
  );
}

function CartPage({
  onSelectProduct,
}: {
  onSelectProduct: (selectedProduct: SelectedProduct) => void;
}) {
  const dispatch = useAppDispatch();
  const {
    data: userCartsData,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetCartsByUserQuery(5);
  const {
    data: relatedProductsData,
    isLoading: isRelatedProductsLoading,
    isError: isRelatedProductsError,
  } = useGetProductsQuery();
  const [deleteCart, { data: deletedCart, isLoading: isDeletingCart }] = useDeleteCartMutation();
  const apiCart = userCartsData?.carts[0];
  const isApiCartDeleted = Boolean(deletedCart?.isDeleted && deletedCart.id === apiCart?.id);
  const cartItems = useAppSelector((state) => state.cart.items);
  const hasLocalCartItems = cartItems.length > 0;
  const visibleCartItems: DisplayCartItem[] = cartItems.map((item) => ({ ...item, source: 'local' }));
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const displaySubtotal = subtotal;
  const displaySubtotalInNaira = displaySubtotal * 462.96;
  const relatedProducts = (relatedProductsData?.products ?? [])
    .slice(0, 8)
    .map((product) => ({
      product,
      image: product.thumbnail ?? product.images?.[0],
    }))
    .filter((item): item is { product: Product; image: string } => Boolean(item.image));

  return (
    <main className="cart-page">
      <div className="breadcrumb cart-breadcrumb">
        <a href="#top">Home</a>
        <span>›</span>
        <span>Shop</span>
        <span>›</span>
        <span>Shopping Cart</span>
      </div>

      <section className="cart-layout">
        <div className="cart-table-panel">
          <h1>Shopping Cart</h1>
          <div className="cart-table-head">
            <span>Item Details</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
          <div className="api-state" aria-live="polite">
            {isCartLoading && 'Loading carts...'}
            {isCartError && 'Cart API is unavailable.'}
            {isApiCartDeleted && 'Cart deleted successfully.'}
          </div>
          <div className="cart-items">
            {visibleCartItems.map((item, index) => {
              const image = item.thumbnail ?? item.images?.[0] ?? productOne;
              const itemTotal = item.discountedTotal ?? item.total ?? item.price * item.quantity;
              const canEditItem = item.source === 'local';

              return (
                <article className="cart-row" key={`${item.id}-${index}`}>
                  <div className="cart-item-detail">
                    <img src={image} alt={item.title} />
                    <div>
                      <h2>{item.title || 'Graphic Design'}</h2>
                      <p>In Stock</p>
                      <div className="cart-rating">★ ★ ★ ★ ★ <span>28 Reviews</span></div>
                      <button
                        className="remove-button"
                        disabled={!canEditItem}
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        □ Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-quantity">
                    <button
                      disabled={!canEditItem}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                  </div>
                  <div className="cart-price">
                    <strong>₦{(itemTotal * 462.96).toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}</strong>
                    <span>${item.price.toFixed(2)} x {item.quantity} item</span>
                  </div>
                </article>
              );
            })}
            {visibleCartItems.length === 0 && (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>
        </div>

        <aside className="order-summary">
          <div className="summary-heading">
            <h2>Order Summary</h2>
            <span>{itemCount} Items</span>
          </div>
          <div className="summary-line">
            <span>Delivery Charges</span>
            <small>Add your delivery address to checkout to see delivery charges.</small>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>
              ₦{displaySubtotalInNaira.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>
              ₦{displaySubtotalInNaira.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </strong>
          </div>
          <small className="tax-note">Excluding Delivery Charges</small>
          <button className="checkout-button">Proceed to Checkout</button>
          <button
            className="delete-cart-button"
            disabled={!apiCart || hasLocalCartItems || isApiCartDeleted || isDeletingCart}
            onClick={() => {
              if (apiCart) {
                deleteCart(apiCart.id);
              }
            }}
          >
            {isDeletingCart ? 'Deleting Cart...' : 'Delete Cart'}
          </button>
          <div className="payment-row">
            <span>paystack</span>
            <span>●●</span>
            <span>VISA</span>
          </div>
        </aside>
      </section>

      <section className="related-products cart-related">
        <h2>Products Related To Items In Your Cart</h2>
        <div className="api-state" aria-live="polite">
          {isRelatedProductsLoading && 'Loading related products...'}
          {isRelatedProductsError && 'Related products are unavailable.'}
        </div>
        <div className="related-grid">
          {relatedProducts.map(({ product, image }) => (
            <ProductCard
              key={product.id}
              product={product}
              image={image}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <SectionTitle
        eyebrow="Featured Products"
        title="The Best Services"
        description="Problems trying to resolve the conflict between"
      />
      <div className="services-grid">
        <article>
          <img className="service-icon" src={easyWinIcon} alt="" />
          <h3>Easy Wins</h3>
          <p>Get your best looking smile now!</p>
        </article>
        <article>
          <img className="service-icon" src={concreteIcon} alt="" />
          <h3>Concrete</h3>
          <p>Defalcate is most focused in helping you discover your most beautiful smile</p>
        </article>
        <article>
          <img className="service-icon" src={hackGrowthIcon} alt="" />
          <h3>Hack Growth</h3>
          <p>Overcame any hurdle or any other problem.</p>
        </article>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="section blog-section" id="blog">
      <SectionTitle eyebrow="Practice Advice" title="Featured Posts" blue />
      <div className="blog-grid">
        {posts.map((post) => (
          <article className="post-card" key={post.image}>
            <div className="post-image">
              <img src={post.image} alt={post.title} />
              <span>New</span>
            </div>
            <div className="post-content">
              <div className="post-tags">
                <span>Google</span>
                <span>Trending</span>
                <span>New</span>
              </div>
              <h3>{post.title}</h3>
              <p>We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
              <div className="post-meta">
                <span>◴ 22 April 2021</span>
                <span>▰ 10 comments</span>
              </div>
              <a href="#blog">Learn More ❯</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <div className="testimonial-copy">
        <h2>What they say about us</h2>
        <img src={avatar} alt="Regina Miles" />
        <div className="stars">★ ★ ★ ★ ☆</div>
        <p>Slate helps you see how many more days you need to work to reach your financial goal.</p>
        <strong>Regina Miles</strong>
        <span>Designer</span>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <img src={image} alt="Customer gallery" key={image} />
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta-section">
      <img src={ctaImage} alt="Designing Better Experience call to action" />
    </section>
  );
}

function Footer() {
  const columns = [
    ['Company Info', 'About Us', 'Carrier', 'We are hiring', 'Blog'],
    ['Legal', 'About Us', 'Carrier', 'We are hiring', 'Blog'],
    ['Features', 'Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'],
    ['Resources', 'IOS & Android', 'Watch a Demo', 'Customers', 'API'],
  ];

  return (
    <footer className="footer" id="footer">
      <div className="footer-brand">
        <strong>Bandage</strong>
        <div className="footer-socials">
          <img src={facebookIcon} alt="Facebook" />
          <img src={instagramIcon} alt="Instagram" />
          <img src={twitterIcon} alt="Twitter" />
        </div>
      </div>
      <div className="footer-grid">
        {columns.map(([title, ...links]) => (
          <div className="footer-column" key={title}>
            <h3>{title}</h3>
            {links.map((link) => (
              <a href="#footer" key={`${title}-${link}`}>{link}</a>
            ))}
          </div>
        ))}
        <div className="footer-column subscribe-column">
          <h3>Get In Touch</h3>
          <form>
            <input type="email" placeholder="Your Email" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
          <p>Lore imp sum dolor Amit</p>
        </div>
      </div>
      <div className="copyright">Made With Love By Finland All Right Reserved</div>
    </footer>
  );
}

function App() {
  const [pageView, setPageView] = useState<PageView>('landing');
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const showLandingPage = () => {
    setPageView('landing');
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showProductDetail = (nextProduct: SelectedProduct) => {
    setSelectedProduct(nextProduct);
    setPageView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showCartPage = () => {
    setPageView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setPageView('landing');
    setSelectedProduct(null);

    window.requestAnimationFrame(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setPageView('landing');
    setSelectedProduct(null);

    window.requestAnimationFrame(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="page">
      <Header
        onHome={showLandingPage}
        onCart={showCartPage}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      {pageView === 'cart' ? (
        <CartPage onSelectProduct={showProductDetail} />
      ) : pageView === 'detail' && selectedProduct ? (
        <ProductDetailPage
          selectedProduct={selectedProduct}
          onSelectProduct={showProductDetail}
          onOpenCart={showCartPage}
        />
      ) : (
        <main>
          <CategorySection />
          <ProductSection
            onSelectProduct={showProductDetail}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
          <ServicesSection />
          <BlogSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
