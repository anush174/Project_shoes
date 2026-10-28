import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import SummaryRows from './SummaryRows';
import Field from './Field';
import { byId } from '../data/products';
import { money, useStore } from '../context/StoreContext';

const luhn = (n) => { let s = 0, dbl = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (dbl && (x *= 2) > 9) x -= 9; s += x; dbl = !dbl; } return s % 10 === 0; };

export default function Payment() {
  const navigate = useNavigate();
  const { cart, draft, totals, placeOrder } = useStore();
  const [method, setMethod] = useState('card');
  const [f, setF] = useState({ name: draft ? `${draft.first} ${draft.last}` : '', num: '', exp: '', cvv: '', upi: '' });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (!cart.length) navigate('/cart', { replace: true });
    else if (!draft) navigate('/checkout', { replace: true });
  }, [cart.length, draft, navigate]);

  if (!draft || !cart.length) return null;
  const t = totals(cart, draft.express);
  const set = (k, fn = (v) => v) => (e) => setF({ ...f, [k]: fn(e.target.value) });
  const fmtNum = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const fmtExp = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

  const submit = (e) => {
    e.preventDefault();
    const x = {}; let label = 'Cash on Delivery';
    if (method === 'card') {
      const num = f.num.replace(/\s/g, ''), [mm, yy] = f.exp.split('/').map(Number);
      if (f.name.trim().length < 2) x.name = 'Enter the name on the card.';
      if (num.length !== 16 || !luhn(num)) x.num = 'Enter a valid 16-digit card number.';
      if (!(mm >= 1 && mm <= 12) || !yy || new Date(2000 + yy, mm) < new Date()) x.exp = 'Card expired or invalid.';
      if (!/^\d{3,4}$/.test(f.cvv)) x.cvv = '3-4 digits.';
      label = 'Card ending ' + num.slice(-4);
    } else if (method === 'upi') {
      if (!/^[\w.-]{2,}@\w{2,}$/.test(f.upi.trim())) x.upi = 'Enter a valid UPI ID, e.g. name@bank.';
      label = 'UPI ' + f.upi.trim();
    }
    setErr(x);
    if (Object.keys(x).length) return;
    setBusy(true);
    setTimeout(() => { done.current = true; const id = placeOrder(label); navigate(`/order-tracking?id=${id}&new=1`); }, 1600);
  };

  const option = (key, label) => (
    <div className={'pay-option' + (method === key ? ' active' : '')} onClick={() => setMethod(key)}>
      <input type="radio" readOnly checked={method === key} /><strong>{label}</strong>
    </div>
  );

  return (
    <>
      <PageHeader title="Payment" parent={['Checkout', '/checkout']} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Choose payment method</h1>
          <form onSubmit={submit} noValidate>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                {option('card', 'Credit / Debit card')}{option('upi', 'UPI')}{option('cod', 'Cash on Delivery')}
                {method === 'card' && (
                  <div className="row">
                    <Field id="cName" label="Name on card" value={f.name} onChange={set('name')} error={err.name} />
                    <Field id="cNum" label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" maxLength="19" value={f.num} onChange={set('num', fmtNum)} error={err.num} />
                    <Field id="cExp" label="Expiry (MM/YY)" col="col-6" placeholder="08/29" maxLength="5" value={f.exp} onChange={set('exp', fmtExp)} error={err.exp} />
                    <Field id="cCvv" label="CVV" type="password" col="col-6" maxLength="4" value={f.cvv} onChange={set('cvv')} error={err.cvv} />
                    <p className="small mt-3">Demo store: no real payment is taken. Use any valid test number such as 4242 4242 4242 4242.</p>
                  </div>
                )}
                {method === 'upi' && <div className="row"><Field id="upiId" label="UPI ID" placeholder="name@bank" value={f.upi} onChange={set('upi')} error={err.upi} /></div>}
                {method === 'cod' && <p className="mt-3">Pay in cash when your order arrives.</p>}
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="bg-light rounded p-4 mb-4">
                  <h5 className="mb-3">Order summary</h5>
                  <div className="mb-3">
                    {cart.map((i) => (
                      <div className="d-flex justify-content-between small py-1" key={`${i.id}-${i.size}`}>
                        <span>{byId(i.id).name} ({i.size}) × {i.qty}</span><span>{money(byId(i.id).price * i.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <SummaryRows t={t} />
                </div>
                <div className="bg-light rounded p-4 mb-4">
                  <h6>Deliver to</h6>
                  <p className="mb-0">{draft.first} {draft.last}<br />{draft.line}, {draft.city}, {draft.state} {draft.zip}<br />{draft.phone}</p>
                </div>
                <button className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary rounded-pill" type="submit" disabled={busy}>
                  {busy ? <><span className="spinner-border spinner-border-sm"></span> Processing payment...</> : method === 'cod' ? 'Place order' : `Pay ${money(t.total)}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
