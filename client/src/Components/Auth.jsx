import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import Field from './Field';
import { useStore } from '../context/StoreContext';

function AuthCard({ title, children, footer }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6">
              <div className="bg-light rounded p-5">
                <h1 className="mb-4 text-center">{title}</h1>
                {children}
                <p className="text-center mt-4 mb-0">{footer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Register() {
  const { register, emailTaken, toast } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: '', email: '', phone: '', pass: '', pass2: '' });
  const [err, setErr] = useState({});
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) x.email = 'Enter a valid email address.';
    else if (emailTaken(f.email.trim())) x.email = 'This email is already registered.';
    if (!/^\d{10}$/.test(f.phone.trim())) x.phone = 'Enter a 10-digit mobile number.';
    if (f.pass.length < 6) x.pass = 'Password must be at least 6 characters.';
    if (f.pass !== f.pass2) x.pass2 = 'Passwords do not match.';
    setErr(x);
    if (Object.keys(x).length) return;
    register({ name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), password: f.pass }); // demo only: hash on a server in real apps
    toast('Account created! Please log in.', 'ok');
    setTimeout(() => navigate('/login'), 900);
  };

  return (
    <AuthCard title="Register" footer={<>Already have an account? <Link to="/login" className="fw-bold text-primary">Login</Link></>}>
      <form onSubmit={submit} noValidate>
        <div className="row g-0">
          <Field id="name" label="Full name" placeholder="John Doe" value={f.name} onChange={on('name')} error={err.name} />
          <Field id="email" label="Email address" type="email" placeholder="you@example.com" value={f.email} onChange={on('email')} error={err.email} />
          <Field id="phone" label="Mobile number" type="tel" placeholder="10-digit number" value={f.phone} onChange={on('phone')} error={err.phone} />
          <Field id="pass" label="Password" type="password" placeholder="At least 6 characters" value={f.pass} onChange={on('pass')} error={err.pass} />
          <Field id="pass2" label="Confirm password" type="password" value={f.pass2} onChange={on('pass2')} error={err.pass2} />
        </div>
        <button className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary mt-4 rounded-pill" type="submit">Create account</button>
      </form>
    </AuthCard>
  );
}

export function Login() {
  const { login, toast } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const back = location.state?.from?.pathname || '/';
  const [f, setF] = useState({ email: '', pass: '' });
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const bad = login(f.email.trim(), f.pass, remember);
    if (bad) return setErr({ [bad.field]: bad.message });
    setErr({});
    toast('Welcome back!', 'ok');
    navigate(back, { replace: true });
  };

  return (
    <AuthCard title="Login" footer={<>New to SoleStreet? <Link to="/register" className="fw-bold text-primary">Create an account</Link></>}>
      <form onSubmit={submit} noValidate>
        <div className="row g-0">
          <Field id="email" label="Email address" type="email" placeholder="you@example.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} />
          <Field id="pass" label="Password" type="password" value={f.pass} onChange={(e) => setF({ ...f, pass: e.target.value })} error={err.pass} />
          <div className="col-12 mt-3"><input type="checkbox" className="me-2" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><label htmlFor="remember">Remember me</label></div>
        </div>
        <button className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary mt-4 rounded-pill" type="submit">Login</button>
      </form>
    </AuthCard>
  );
}
