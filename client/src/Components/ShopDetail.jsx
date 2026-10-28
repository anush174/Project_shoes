import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PageHeader from './PageHeader';
import Stars from './Stars';
import { PRODUCTS, SIZES, TYPES, byId } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function ShopDetail() {
  const { id } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { user, addToCart, toast, reviewsFor, ratingOf, addReview } = useStore();
  const p = byId(id);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeMsg, setSizeMsg] = useState('');
  const [tab, setTab] = useState(hash === '#reviews' ? 'reviews' : 'about');
  const [rate, setRate] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  if (!p) {
    return (
      <>
        <PageHeader title="Shop Detail" parent={['Shop', '/shop']} />
        <div className="container py-5 text-center"><h2>Product not found</h2><Link to="/shop" className="btn border border-secondary rounded-pill px-4 py-2 mt-3 text-primary">Back to shop</Link></div>
      </>
    );
  }

  const r = ratingOf(p.id);
  const list = [...reviewsFor(p.id)].reverse();
  const needSize = () => { if (size) return true; setSizeMsg('Please select a size first.'); return false; };
  const add = (e) => { e.preventDefault(); if (needSize()) { addToCart(p.id, size, qty); toast(`Added to cart (size ${size})`, 'ok'); } };
  const buy = (e) => { e.preventDefault(); if (needSize()) { addToCart(p.id, size, qty); navigate('/checkout'); } };
  const submitReview = (e) => {
    e.preventDefault();
    if (!rate || !title.trim() || text.trim().length < 5) return toast('Add a star rating, title and a short review.', 'err');
    addReview(p.id, { rating: rate, title: title.trim(), text: text.trim() });
    setRate(0); setTitle(''); setText(''); toast('Thanks for your review!', 'ok');
  };
  const specs = [['Brand', p.brand], ['Category', p.cat], ['Type', p.type], ['Upper', 'Breathable mesh / synthetic'], ['Sole', 'Rubber grip outsole'], ['Returns', '30 days']];
  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.cat === p.cat || x.type === p.type)).slice(0, 3);

  return (
    <>
      <PageHeader title="Shop Detail" parent={['Shop', '/shop']} />
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6"><div className="border rounded"><img src={p.img} className="img-fluid rounded" alt={p.name} /></div></div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{p.name}</h4>
                  <p className="mb-3">Category: {p.cat} / {p.type} &middot; Brand: {p.brand}</p>
                  <h5 className="fw-bold mb-3">${p.price} {p.old > 0 && <small className="text-danger text-decoration-line-through ms-2">${p.old}</small>}</h5>
                  <div className="d-flex mb-4"><Stars value={r.avg} /><small className="ms-2">{r.avg.toFixed(1)} ({r.count} reviews)</small></div>
                  <p className="mb-4">{p.desc}</p>
                  <h6 className="mb-2">Select size (UK/US)</h6>
                  <div>
                    {SIZES.map((s) => {
                      const ok = p.sizes.includes(s);
                      return <button key={s} type="button" disabled={!ok} title={ok ? '' : 'Out of stock'} className={'size-btn' + (size === s ? ' active' : '')} onClick={() => { setSize(s); setSizeMsg(''); }}>{s}</button>;
                    })}
                  </div>
                  <small className="text-danger d-block mb-3" style={{ minHeight: 20 }}>{sizeMsg}</small>
                  <div className="input-group quantity mb-4" style={{ width: 100 }}>
                    <div className="input-group-btn"><button type="button" className="btn btn-sm rounded-circle bg-light border" onClick={() => setQty(Math.max(1, qty - 1))}><i className="fa fa-minus"></i></button></div>
                    <input type="text" className="form-control form-control-sm text-center border-0" value={qty} readOnly />
                    <div className="input-group-btn"><button type="button" className="btn btn-sm rounded-circle bg-light border" onClick={() => setQty(Math.min(10, qty + 1))}><i className="fa fa-plus"></i></button></div>
                  </div>
                  <a href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={add}><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                  <a href="#" className="btn btn-primary rounded-pill px-4 py-2 mb-4 ms-2 text-white" onClick={buy}>Buy now</a>
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button className={'nav-link border-white border-bottom-0' + (tab === 'about' ? ' active' : '')} type="button" onClick={() => setTab('about')}>Description</button>
                      <button className={'nav-link border-white border-bottom-0' + (tab === 'reviews' ? ' active' : '')} type="button" onClick={() => setTab('reviews')}>Reviews &amp; Ratings</button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    {tab === 'about' ? (
                      <div className="tab-pane active">
                        <p>{p.desc}</p>
                        <div className="px-2"><div className="row g-4"><div className="col-lg-6">
                          {specs.map(([k, v], i) => (
                            <div key={k} className={'row align-items-center text-center justify-content-center py-2' + (i % 2 ? '' : ' bg-light')}>
                              <div className="col-6"><p className="mb-0">{k}</p></div><div className="col-6"><p className="mb-0">{v}</p></div>
                            </div>
                          ))}
                        </div></div></div>
                      </div>
                    ) : (
                      <div className="tab-pane active">
                        <div className="row g-5">
                          <div className="col-lg-4">
                            <div className="display-4 text-dark">{r.avg.toFixed(1)}</div>
                            <Stars value={r.avg} className="d-flex mb-2" />
                            <p>{r.count} reviews</p>
                            {[5, 4, 3, 2, 1].map((n) => {
                              const c = list.filter((x) => x.rating === n).length;
                              return (
                                <div className="d-flex align-items-center gap-2 mb-1" key={n}>
                                  <span style={{ width: 24 }}>{n}★</span>
                                  <div className="rating-bar"><span style={{ width: `${r.count ? (c / r.count) * 100 : 0}%` }}></span></div>
                                  <span style={{ width: 24 }}>{c}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="col-lg-8">
                            {list.length ? list.map((x, i) => (
                              <div className="d-flex mb-4" key={i}>
                                <img src="/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: 100, height: 100 }} alt="" />
                                <div>
                                  <p className="mb-2" style={{ fontSize: 14 }}>{x.date}</p>
                                  <div className="d-flex justify-content-between"><h5>{x.name}</h5><Stars value={x.rating} className="d-flex mb-3" /></div>
                                  <p className="fw-bold mb-1">{x.title}</p><p>{x.text}</p>
                                </div>
                              </div>
                            )) : <p>No reviews yet. Be the first to review!</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {user ? (
                  <form onSubmit={submitReview} noValidate>
                    <h4 className="mb-5 fw-bold">Leave a Review</h4>
                    <div className="row g-4"><div className="col-lg-12">
                      <div className="star-pick mb-3">
                        {[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} className={n <= rate ? 'on' : ''} onClick={() => setRate(n)}>★</button>)}
                      </div>
                      <input className="form-control border-0 me-4 mb-3 bg-light" placeholder="Review title" maxLength="60" value={title} onChange={(e) => setTitle(e.target.value)} />
                      <textarea className="form-control border-0 mb-4 bg-light" rows="5" placeholder="Share your experience with this shoe" maxLength="500" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                      <button className="btn border border-secondary text-primary rounded-pill px-4 py-3" type="submit">Post Review</button>
                    </div></div>
                  </form>
                ) : (
                  <p>Please <Link to="/login" state={{ from: { pathname: `/product/${p.id}` } }} className="fw-bold text-primary">log in</Link> to write a review.</p>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="mb-4">
                    <h4>Categories</h4>
                    <ul className="list-unstyled fruite-categorie">
                      {TYPES.map((t) => (
                        <li key={t}><div className="d-flex justify-content-between fruite-name"><Link to={`/shop?type=${t}`}><i className="fas fa-shoe-prints me-2"></i>{t}</Link><span>({PRODUCTS.filter((x) => x.type === t).length})</span></div></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h4 className="mb-4">You may also like</h4>
                  {related.map((x) => (
                    <div className="d-flex align-items-center justify-content-start mb-3" key={x.id}>
                      <div className="rounded me-4" style={{ width: 100, height: 100 }}><Link to={`/product/${x.id}`}><img src={x.img} className="img-fluid rounded" alt="" /></Link></div>
                      <div><h6 className="mb-2"><Link to={`/product/${x.id}`} className="text-dark">{x.name}</Link></h6><Stars value={ratingOf(x.id).avg} className="d-flex mb-2" /><h5 className="fw-bold">${x.price}</h5></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
