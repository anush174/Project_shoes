import PageHeader from './PageHeader';
import Stars from './Stars';

const ITEMS = [
  ['Great fit, fast delivery. The running shoes are my new favourites.', 'Aarav K.', 'Marathon Runner', 5],
  ['Sizing was spot on and returns were easy. Highly recommended.', 'Maya S.', 'Designer', 4],
  ['Loved the checkout and live order tracking. Shoes arrived in 3 days.', 'Liam T.', 'Teacher', 5],
  ['The pastel sneakers look even better in person. Very comfortable.', 'Sofia R.', 'Student', 5],
  ['Good quality for the price. The sale section is worth checking.', 'Noah P.', 'Engineer', 4],
  ['Customer support helped me swap sizes in minutes.', 'Isha M.', 'Nurse', 5],
];

export default function Testimonial() {
  return (
    <>
      <PageHeader title="Testimonial" />
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">What Our Customers Say!</h1>
          </div>
          <div className="row g-4">
            {ITEMS.map(([text, name, job, stars]) => (
              <div className="col-lg-4 col-md-6" key={name}>
                <div className="testimonial-item img-border-radius bg-light rounded p-4 h-100">
                  <div className="position-relative">
                    <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }}></i>
                    <div className="mb-4 pb-4 border-bottom border-secondary"><p className="mb-0">{text}</p></div>
                    <div className="d-flex align-items-center flex-nowrap">
                      <div className="bg-secondary rounded"><img src="/img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt="" /></div>
                      <div className="ms-4 d-block"><h4 className="text-dark">{name}</h4><p className="m-0 pb-3">{job}</p><Stars value={stars} className="d-flex pe-5" /></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
