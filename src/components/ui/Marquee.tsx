/* Bandeau défilant : le contenu est rendu deux fois pour une boucle continue
   (animation CSS, pause au survol). Passer des textes (items) ou des <li> (children). */
export function Marquee({
  items,
  children,
  className,
}: {
  items?: string[];
  children?: React.ReactNode;
  className: string;
}) {
  const content = children ?? items?.map((item) => <li key={item}>{item}</li>);
  return (
    <div className={className} data-marquee>
      <ul>{content}</ul>
      <ul aria-hidden="true">{content}</ul>
    </div>
  );
}
