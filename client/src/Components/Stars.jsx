/* Five Font Awesome stars; filled ones use the secondary colour */
export default function Stars({ value = 0, className = 'd-flex' }) {
  const n = Math.round(value);
  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={'fa fa-star' + (i <= n ? ' text-secondary' : '')}></i>
      ))}
    </div>
  );
}
