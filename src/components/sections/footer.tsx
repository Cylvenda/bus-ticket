import { Link } from "react-router-dom"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator.tsx"
import { companyName } from "@/lib/commonName"

type LinkType = {
  value: string
  location: string
}

const Footer = () => {
  const links: LinkType[] = [
    { value: "Home", location: "/" },
    { value: "Book Now", location: "/schedule" },
    { value: "About", location: "/#about" },
    { value: "Contact", location: "/#contact" },
    { value: "Call Center", location: "/#call-center" },
  ]

  const companyLinks: LinkType[] = [
    { value: "Privacy Policy", location: "#" },
    { value: "Terms & Conditions", location: "#" },
    { value: "FAQs", location: "#" },
    { value: "More Products", location: "#" },
  ]

  return (
    <footer className="border-t border-primary/40 bg-primary text-primary-foreground">
      <Card className="rounded-none border-0 bg-primary text-primary-foreground">
        <CardContent className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-primary-foreground">{companyName}</h2>
              <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/80">
                Book bus tickets easily, choose seats, and pay securely with a
                clear, reliable booking experience.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.value}>
                    <Link to={link.location} className="text-primary-foreground/80 hover:text-primary-foreground">
                      {link.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                {companyLinks.map((company) => (
                  <li key={company.value}>
                    <Link to={company.location} className="text-primary-foreground/80 hover:text-primary-foreground">
                      {company.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                Social
              </h3>
              <div className="flex items-center gap-2">
                {[LinkedinIcon, YoutubeIcon, InstagramIcon, FacebookIcon].map((Icon, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="rounded-md border border-primary-foreground/35 bg-primary-foreground/10 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
                    aria-label="Social link"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-primary-foreground/20" />

          <div className="flex flex-col items-center justify-between gap-3 text-sm text-primary-foreground/80 md:flex-row">
            <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            <p>Developed by Group Number 02.</p>
          </div>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
