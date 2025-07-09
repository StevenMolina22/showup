import { Github, Linkedin } from "lucide-react";

interface FooterProps {
  text?: string;
  links?: Array<{
    href: string;
    label: string;
    icon?: React.ReactNode;
  }>;
}

export default function Footer({
  text = "Attend-Sure: Blockchain RSVP events with staking - discover, stake, attend, get rewarded.",
  links = [],
}: FooterProps) {
  const defaultLinks = [
    {
      href: "https://github.com",
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
    },
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-600 text-center">{text}</p>

          <div className="flex items-center gap-4">
            {displayLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
