/* Labelled input with Bootstrap validation message */
export default function Field({ id, label, error, col = 'col-12', ...input }) {
  return (
    <div className={col}>
      <label className="form-label my-3" htmlFor={id}>{label}</label>
      <input id={id} className={'form-control' + (error ? ' is-invalid' : '')} {...input} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
