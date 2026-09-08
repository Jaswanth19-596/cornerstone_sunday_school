export default function PageHeading({ label, title, description }: { label: string; title: string; description: string }) {
 return <section className="page-heading page-container"><p className="eyebrow">{label}</p><h1>{title}</h1><p>{description}</p></section>;
}
