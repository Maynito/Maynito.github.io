export default function SectionHead({ num, title, note, id }) {
  return (
    <div className="site grid-site mb-[clamp(3rem,5vw,5rem)] items-end gap-y-3">
      <p className="label col-span-full lg:col-span-2 lg:pb-2.5">{num}</p>
      <h2 id={id} className="col-span-full text-h2 text-heading lg:col-start-3 lg:col-end-10">
        {title}
      </h2>
      {note && (
        <p className="col-span-full text-sm text-muted lg:col-start-10 lg:col-end-13 lg:pb-2">{note}</p>
      )}
    </div>
  );
}
