export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ovitorvalente",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ovitorvalente/",
    },
    {
      name: "Portfolio",
      url: "https://euvitordev.vercel.app/",
    },
  ];
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-2 text-center">
      <div className="a flex items-center justify-center gap-24">
        <a
          target="_blank"
          href="https://github.com/ovitorvalente"
          className="text-sm font-medium text-slate-300 transition-all delay-75 duration-200 hover:text-blue-500"
          rel="noopener noreferrer"
        >
          Criado por <span className="font-bold">Vitor Valente</span> com ❤️
        </a>

        <div className="flex items-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-500 text-opacity-80 transition-colors duration-200 hover:text-slate-100"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
