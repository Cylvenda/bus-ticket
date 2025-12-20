import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {Separator} from "@/components/ui/separator.tsx";
import {FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon} from "lucide-react";

type LinkType = {
    value: string;
    location: string;
};

const Footer = () => {
    const links: LinkType[] = [
        { value: "Home", location: "/" },
        { value: "Book Now", location: "/schedule" },
        { value: "About", location: "#about" },
        { value: "Contact", location: "#contact" },
        { value: "Call Center", location: "#call-center" },
    ];

    const companyLinks: LinkType[] = [
        { value: "Privacy Policy", location: "#" },
        { value: "Terms & Conditions", location: "#" },
        { value: "FAQs", location: "#" },
        { value: "More Products", location: "#" },
    ];

    return (
        <footer>
            <Card className="rounded-none border-none bg-primary  ">
                <CardContent className="max-w-7xl mx-auto px-1 md:px-5 py-3 md:py-12">
                    {/* Top Section */}
                    <div className="grid gap-15 md:grid-cols-4">
                        {/* Brand */}
                        <div className="space-y-3">
                            <h1 className="text-xl font-bold">Bus Ticket Booking</h1>
                            <p className="text-sm ">
                                Book bus tickets easily, choose seats, and pay securely.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
                            <ul className="space-y-2 text-sm">
                                {links.map((link) => (
                                    <li key={link.value}>
                                        <Link
                                            to={link.location}
                                            className="hover:underline"
                                        >
                                            {link.value}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold">Company</h2>
                            <ul className="space-y-2 text-sm">
                                {companyLinks.map((company) => (
                                    <li key={company.value}>
                                        <Link
                                            to={company.location}
                                            className=" hover:underline"
                                        >
                                            {company.value}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/*social Medias*/}
                        <div >
                            <h2 className="mb-4 text-lg font-semibold">Social</h2>
                            <div className="flex flex-row justify-start gap-3">
                                <LinkedinIcon />
                                <YoutubeIcon />
                                <InstagramIcon />
                                <FacebookIcon />
                            </div>
                        </div>
                    </div>


                    <Separator className="mt-5" />

                    {/* Bottom Bar */}
                    <div className="pt-3 flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
                        <p >
                            © {new Date().getFullYear()} Bus Ticket Booking. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <Link to="https://www.nit.ac.tz/" title="NIT">National Institute of Transport (NIT)</Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </footer>
    );
};

export default Footer;
