import { Icon } from "react-bootstrap-icons";

interface FooterProps {
  links: {
    name: string;
    href: string;
    icon: Icon;
  }[];
};

export function Footer({ links }: FooterProps): JSX.Element {
  return (
    <div className="float-end text-muted">
      {links.map((link) => (
        <a
          title={link.name}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="text-reset ms-2"
        >
          <link.icon />
        </a>
      ))}
    </div>
  );
}
