import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "The Royal Aravalli Pavilion – Luxury Pool Villa & Spa - Udaipur, Rajasthan, India - Airbnb",
    description:
        "Entire luxury heritage villa in Udaipur, India. One of the most loved homes on Airbnb with private heated pool, jharokha sun loungers, and mountain views.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="text-content-primary antialiased selection:bg-brand selection:text-white">
                {children}
            </body>
        </html>
    );
}
