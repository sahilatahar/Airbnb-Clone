"use client";

import { Globe, Menu, Search, User } from "lucide-react";
import React, { useState } from "react";

interface NavbarProps {
    onShareClick?: () => void;
    isSaved?: boolean;
    onSaveToggle?: () => void;
    listingTitle?: string;
    rating?: number;
    reviewsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full border-b border-border-secondary bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
                <div className="flex items-center">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-brand transition-opacity hover:opacity-95"
                    >
                        <svg
                            className="h-8 w-8 fill-current text-brand"
                            viewBox="0 0 32 32"
                            aria-label="Airbnb homepage"
                        >
                            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.502-3.42 7.806-7.75 7.806-2.58 0-4.75-1.162-6.196-3.085-1.446 1.923-3.616 3.085-6.196 3.085-4.33 0-7.75-3.304-7.75-7.806 0-1.22.316-2.457 1.05-3.957.94-1.927 4.908-10.22 7.086-14.577l.547-1.096C11.341 2.222 12.822 1 16 1zm0 3c-1.393 0-2.315.688-3.414 2.68l-.48 1.011c-2.128 4.256-6.096 12.545-6.997 14.394-.587 1.2-.809 2.062-.809 2.915 0 2.97 2.19 5.106 4.95 5.106 2.378 0 4.395-1.587 5.093-3.987l.21-.836c.264-1.218.447-2.616.447-4.283 0-2.493-1.077-4.329-2.875-5.264l-.538-.255c-1.44-.627-2.22-1.637-2.22-2.871 0-1.667 1.45-2.89 3.633-2.89 2.183 0 3.633 1.223 3.633 2.89 0 1.234-.78 2.244-2.22 2.871l-.538.255c-1.798.935-2.875 2.771-2.875 5.264 0 1.667.183 3.065.447 4.283l.21.836c.698 2.4 2.715 3.987 5.093 3.987 2.76 0 4.95-2.136 4.95-5.106 0-.853-.222-1.715-.809-2.915-.901-1.849-4.869-10.138-6.997-14.394l-.48-1.011C18.315 4.688 17.393 4 16 4z" />
                        </svg>
                        <span className="text-[20px] font-bold tracking-tight text-brand">
                            airbnb
                        </span>
                    </a>
                </div>

                <div className="hidden cursor-pointer items-center rounded-full border border-border-primary px-4 py-2 text-[14px] shadow-airbnb-search transition-shadow hover:shadow-md md:flex">
                    <button className="border-r border-border-primary px-3 font-semibold text-content-primary">
                        Anywhere
                    </button>
                    <button className="border-r border-border-primary px-3 font-semibold text-content-primary">
                        Anytime
                    </button>
                    <button className="px-3 font-normal text-content-secondary">
                        Add guests
                    </button>
                    <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover">
                        <Search className="h-3.5 w-3.5 stroke-3" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden rounded-full px-3.5 py-2.5 text-[14px] font-semibold text-content-primary transition-colors hover:bg-surface-secondary sm:block">
                        Become a host
                    </button>
                    <button className="rounded-full p-2.5 text-content-primary transition-colors hover:bg-surface-secondary">
                        <Globe className="h-4 w-4" />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex cursor-pointer items-center gap-3 rounded-full border border-border-primary px-3 py-1.5 transition-all hover:shadow-md"
                        >
                            <Menu className="h-4 w-4 text-content-primary" />
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-content-secondary text-white">
                                <User className="h-4 w-4" />
                            </div>
                        </button>

                        {menuOpen && (
                            <div className="animate-in fade-in zoom-in-95 absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-border-primary bg-white py-2 shadow-airbnb-modal duration-100">
                                <button className="w-full px-4 py-3 text-left text-[14px] font-semibold text-content-primary hover:bg-surface-secondary">
                                    Sign up
                                </button>
                                <button className="w-full px-4 py-2.5 text-left text-[14px] text-content-primary hover:bg-surface-secondary">
                                    Log in
                                </button>
                                <hr className="my-2 border-border-secondary" />
                                <button className="w-full px-4 py-2.5 text-left text-[14px] text-content-primary hover:bg-surface-secondary">
                                    Airbnb your home
                                </button>
                                <button className="w-full px-4 py-2.5 text-left text-[14px] text-content-primary hover:bg-surface-secondary">
                                    Help Center
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
