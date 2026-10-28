import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from './PageHeader';
import SummaryRows from './SummaryRows';
import { money, useStore } from '../context/StoreContext';

// Demo timeline: each stage unlocks a few minutes after the order was placed
const STAGES = [['Order placed', 0], ['Packed', 1], ['Shipped', 3], ['Out for delivery', 6], ['Delivered', 10]];
const stageOf = (o) => { const m = (Date.now() - o.placed) / 60000; return STAGES.reduce((s, st, i) => (m >= st[1] ? i : s), 0); };

export default function OrderTracking() {
  const { user, orders } = useStore();
  const [params] = useSearchParams();
  const mine = user ? orders.filter((o) => o.email === user.email).reverse() : [];
  const [input, setInput] = useState(params.get('id') || '');
  const [current, setCurrent] = useState(params.get('id') || mine[0]?.id || '');
  const [, tick] = useState(0);

  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 15000); return () => clearInterval(t); }, []); // live status refresh
  useEffect(() => { const id = params.get('id'); if (id) { setInput(id); setCurrent(id); } }, [params]);

  const o = orders.find((x) => x.id === current.trim().toUpperCase());
  const st = o ? stageOf(o) : 0;

  return (
    <>
      <PageHeader title="Order Tracking" />
      <div className="container-fluid py-5">
        <div className="container py-5">
          {params.get('new') && <div className="alert alert-success"><strong>Thank you!</strong> Your payment was successful and your order has been placed.</div>}
          <div className="row g-5">
            <div className="col-lg-4">
              <form className="mb-4" onSubmit={(e) => { e.preventDefault(); setCurrent(input); }}>
                <label className="form-label" htmlFor="orderId">Order ID</label>
                <div className="input-group">
                  <input id="orderId" className="form-control p-3" placeholder="e.g. SOLE12345678" value={input} onChange={(e) => setInput(e.target.value)} />
                  <button className="btn btn-primary text-white" type="submit">Track</button>
                </div>
              </form>
              <h4>My orders</h4>
              {!user ? <p className="small"><Link to="/login" state={{ from: { pathname: '/order-tracking' } }} className="fw-bold text-primary">Log in</Link> to see your orders.</p>
                : mine.length ? mine.map((x) => (
                  <a href="#" key={x.id} className="d-flex justify-content-between border rounded p-3 mb-2 text-dark" onClick={(e) => { e.preventDefault(); setInput(x.id); setCurrent(x.id); }}>
                    <span>{x.id}</span><span className="text-primary">{STAGES[stageOf(x)][0]}</span>
                  </a>
                )) : <p className="small">You have no orders yet. <Link to="/shop" className="text-primary">Start shopping</Link></p>}
            </div>
            <div className="col-lg-8">
              {!current ? <p>Enter an order ID or pick one of your orders to see its live status.</p>
                : !o ? <div className="alert alert-danger">No order found with that ID.</div> : (
                  <>
                    <div className="d-flex justify-content-between flex-wrap"><h3>Order {o.id}</h3><span>Placed {new Date(o.placed).toLocaleString()}</span></div>
                    <p className="mb-0">{st === 4 ? <strong className="text-success">Delivered</strong> : <>Estimated delivery: <strong>{new Date(o.placed + (o.express ? 2 : 5) * 86400000).toDateString()}</strong></>}</p>
                    <ul className="track">
                      {STAGES.map((s, i) => <li key={s[0]} className={i < st ? 'done' : i === st ? (st === 4 ? 'done' : 'current') : ''}>{s[0]}</li>)}
                    </ul>
                    <div className="row g-4">
                      <div className="col-md-7">
                        <div className="table-responsive"><table className="table"><tbody>
                          {o.items.map((i) => (
                            <tr key={`${i.id}-${i.size}`}>
                              <th scope="row"><img src={i.img} className="../assets/img-fluid rounded-circle" style={{ width: 70, height: 70 }} alt="" /></th>
                              <td>
                                <p className="mb-0 mt-3">{i.name}</p><small>Size {i.size} &middot; Qty {i.qty}</small>
                                {st === 4 && <><br /><Link to={`/product/${i.id}#reviews`} className="small fw-bold text-primary">Rate &amp; review</Link></>}
                              </td>
                              <td><p className="mb-0 mt-3">{money(i.price * i.qty)}</p></td>
                            </tr>
                          ))}
                        </tbody></table></div>
                      </div>
                      <div className="col-md-5">
                        <div className="bg-light rounded p-4">
                          <h6>Delivery address</h6>
                          <p>{o.address.first} {o.address.last}<br />{o.address.line}, {o.address.city}, {o.address.state} {o.address.zip}<br />{o.address.phone}</p>
                          <h6>Payment</h6><p>{o.payment}</p>
                          <SummaryRows t={o.totals} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
