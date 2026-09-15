"use client";

import { Globe } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="mt-12 border-t border-border-primary bg-surface-secondary">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
                <div className="grid grid-cols-1 gap-8 border-b border-border-primary pb-10 text-[14px] md:grid-cols-3">
                    <div>
                        <h4 className="mb-3 font-semibold text-content-primary">
                            Support
                        </h4>
                        <ul className="space-y-3 text-content-secondary">
                            <li>
                                <a href="#" className="hover:underline">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    AirCover
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Anti-discrimination
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Disability support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Cancellation options
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-3 font-semibold text-content-primary">
                            Hosting
                        </h4>
                        <ul className="space-y-3 text-content-secondary">
                            <li>
                                <a href="#" className="hover:underline">
                                    Airbnb your home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    AirCover for Hosts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Hosting resources
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Community forum
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Hosting responsibly
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-3 font-semibold text-content-primary">
                            Airbnb
                        </h4>
                        <ul className="space-y-3 text-content-secondary">
                            <li>
                                <a href="#" className="hover:underline">
                                    Newsroom
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    New features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Investors
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Airbnb.org emergency stays
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[14px] text-content-primary sm:flex-row">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>© 2026 Airbnb, Inc.</span>
                        <span>·</span>
                        <a href="#" className="hover:underline">
                            Privacy
                        </a>
                        <span>·</span>
                        <a href="#" className="hover:underline">
                            Terms
                        </a>
                        <span>·</span>
                        <a href="#" className="hover:underline">
                            Sitemap
                        </a>
                        <span>·</span>
                        <a href="#" className="hover:underline">
                            Company details
                        </a>
                    </div>
                    <div className="flex items-center gap-6 font-semibold">
                        <button className="flex cursor-pointer items-center gap-2 hover:underline">
                            <Globe className="h-4 w-4" />
                            <span>English (IN)</span>
                        </button>
                        <button className="cursor-pointer hover:underline">
                            <span>₹ INR</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
