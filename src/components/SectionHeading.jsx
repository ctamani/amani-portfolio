import "../styles/SectionHeading.css";

export default function SectionHeading({ id, children }) {
  return (
    <div className="section-heading">
      <h2 id={id}>
        <span aria-hidden="true">/</span> {children}
      </h2>

      <div className="section-heading-line" aria-hidden="true" />
    </div>
  );
}
