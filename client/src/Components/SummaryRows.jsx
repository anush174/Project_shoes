import { money } from '../context/StoreContext';

/* Subtotal / shipping / tax / total block used in cart, checkout, payment and tracking */
export default function SummaryRows({ t }) {
  return (
    <>
      <div className="d-flex justify-content-between mb-3"><h6 className="mb-0 me-4">Subtotal</h6><p className="mb-0">{money(t.sub)}</p></div>
      {t.disc > 0 && (
        <div className="d-flex justify-content-between mb-3 text-success"><h6 className="mb-0 me-4">Coupon SOLE10</h6><p className="mb-0">-{money(t.disc)}</p></div>
      )}
      <div className="d-flex justify-content-between mb-3"><h6 className="mb-0 me-4">Shipping</h6><p className="mb-0">{t.shipping ? money(t.shipping) : 'Free'}</p></div>
      <div className="d-flex justify-content-between mb-3"><h6 className="mb-0 me-4">Tax (8%)</h6><p className="mb-0">{money(t.tax)}</p></div>
      <div className="py-3 border-top d-flex justify-content-between"><h5 className="mb-0 ps-0 me-4">Total</h5><p className="mb-0 pe-0 fw-bold">{money(t.total)}</p></div>
    </>
  );
}
