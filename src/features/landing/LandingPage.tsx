import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(): JSX.Element {
    return (
        <div className="docket-landing">
            <header className="dk-nav">
                <div className="dk-nav-inner">
                    <div className="dk-brand">
                        <span className="dk-brand-mark">VBMS</span>
                        Vendor Booking Management System
                    </div>
                </div>
            </header>

            <main>
                <section className="dk-hero">
                    <div className="wrap">
                        <span className="dk-eyebrow">Vendor Booking Management System</span>
                        <h1>
                            Every request, <em>tracked</em>
                            <br />
                            to the minute.
                        </h1>
                        <p className="dk-sub">
                           Manage every booking request — fast, simple, and organized.
                        </p>
                        <p className="dk-sub" style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
                            Explore the vendor or customer portal without signing in.
                        </p>

                        <div className="dk-ticket" role="group" aria-label="Choose how you'll use VBMS">
                            <Link to="/customer/dashboard" target='_blank' className="dk-ticket-side">
                                <span className="dk-role mono">I'm booking someone</span>
                                <span className="dk-action">
                                    Find a vendor
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>
                            <div className="dk-ticket-divider" />
                            <Link to="/dashboard" target='_blank' className="dk-ticket-side">
                                <span className="dk-role mono">I run a business</span>
                                <span className="dk-action">
                                    Open vendor portal
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="dk-showcase" id="showcase">
                    <div className="dk-frame-wrap">
                        <div className="dk-browser-frame">
                            <div className="dk-browser-bar">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="dk-mock-dashboard">
                                <div className="dk-mock-top">
                                    <div className="dk-mock-welcome">
                                        <h3>Welcome back, Nicko!</h3>
                                        <p>Review today's schedule and keep things moving.</p>
                                    </div>
                                    <div className="dk-mock-metrics">
                                        <div className="dk-mock-card dk-today">
                                            <div className="dk-label">Today's Bookings</div>
                                            <div className="dk-num">1</div>
                                        </div>
                                        <div className="dk-mock-card dk-week">
                                            <div className="dk-label">Weekly Velocity</div>
                                            <div className="dk-num">14</div>
                                        </div>
                                        <div className="dk-mock-card dk-backlog">
                                            <div className="dk-label">Active Backlog</div>
                                            <div className="dk-num">0</div>
                                        </div>
                                    </div>
                                </div>


                                <div className="rounded-xl border border-gray-200 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-[#3A865C] text-white text-xs uppercase tracking-wide">
                                                <th className="text-left font-semibold px-6 py-3">Date</th>
                                                <th className="text-left font-semibold px-6 py-3">Customer Name</th>
                                                <th className="text-left font-semibold px-6 py-3">Email</th>
                                                <th className="text-left font-semibold px-6 py-3">Phone</th>
                                                <th className="text-left font-semibold px-6 py-3">Service</th>
                                                <th className="text-left font-semibold px-6 py-3">Status</th>
                                                <th className="text-left font-semibold px-6 py-3">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            <tr>
                                                <td className="px-6 py-3">Jul 1, 2026</td>
                                                <td className="px-6 py-3">Sophia Cruz</td>
                                                <td className="px-6 py-3">sophia@email.com</td>
                                                <td className="px-6 py-3">0917 123 4567</td>
                                                <td className="px-6 py-3">Photography</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                                                        Accepted
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <button className="px-4 py-1 rounded-lg border border-[#3A865C] text-[#3A865C] text-xs font-medium hover:bg-[#3A865C] hover:text-white transition-colors">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr className="bg-gray-50/50">
                                                <td className="px-6 py-3">Jun 30, 2026</td>
                                                <td className="px-6 py-3">Daniel Reyes</td>
                                                <td className="px-6 py-3">daniel@email.com</td>
                                                <td className="px-6 py-3">0921 456 7821</td>
                                                <td className="px-6 py-3">Catering</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">
                                                        Pending
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <button className="px-4 py-1 rounded-lg border border-[#3A865C] text-[#3A865C] text-xs font-medium hover:bg-[#3A865C] hover:text-white transition-colors">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-3">Jun 29, 2026</td>
                                                <td className="px-6 py-3">Ava Santos</td>
                                                <td className="px-6 py-3">ava@email.com</td>
                                                <td className="px-6 py-3">0935 218 9064</td>
                                                <td className="px-6 py-3">Event Styling</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                                                        Rejected
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <button className="px-4 py-1 rounded-lg border border-[#3A865C] text-[#3A865C] text-xs font-medium hover:bg-[#3A865C] hover:text-white transition-colors">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr className="bg-gray-50/50">
                                                <td className="px-6 py-3">Jun 28, 2026</td>
                                                <td className="px-6 py-3">Ethan Garcia</td>
                                                <td className="px-6 py-3">ethan@email.com</td>
                                                <td className="px-6 py-3">0908 774 3256</td>
                                                <td className="px-6 py-3">DJ & Sound</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                                                        Accepted
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <button className="px-4 py-1 rounded-lg border border-[#3A865C] text-[#3A865C] text-xs font-medium hover:bg-[#3A865C] hover:text-white transition-colors">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-3">Jun 27, 2026</td>
                                                <td className="px-6 py-3">Mia Lopez</td>
                                                <td className="px-6 py-3">mia@email.com</td>
                                                <td className="px-6 py-3">0916 903 1184</td>
                                                <td className="px-6 py-3">Makeup Artist</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">
                                                        Pending
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <button className="px-4 py-1 rounded-lg border border-[#3A865C] text-[#3A865C] text-xs font-medium hover:bg-[#3A865C] hover:text-white transition-colors">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dk-features" id="features">
                    <div className="dk-features-inner">
                        <div className="dk-features-head">
                            <span className="dk-eyebrow">Three entries in the ledger</span>
                            <h2>Everything you need to manage bookings, built in.</h2>
                            <p>
                                From the first inquiry to the final confirmation, VBMS gives
                                vendors and customers a shared, transparent record of every
                                booking — no spreadsheets, no guesswork.
                            </p>
                        </div>

                        <div className="dk-card-grid">
                            <div className="dk-feature-card">
                                <span className="dk-feature-tab mono">TAB A</span>
                                <div className="dk-feature-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h10M7 13h6" />
                                    </svg>
                                </div>
                                <h3>Vendor request dashboard</h3>
                                <p>
                                    Every incoming customer inquiry lands in one secure,
                                    vendor-only view. No more digging through emails or texts —
                                    see who's reaching out, what they need, and when, all in a
                                    single dashboard built for you.
                                </p>
                            </div>

                            <div className="dk-feature-card">
                                <span className="dk-feature-tab mono">TAB B</span>
                                <div className="dk-feature-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3>Status update logic</h3>
                                <p>
                                    Stay in control of every request. Accept, reject, or mark an
                                    inquiry as Pending in one click — a clear, functional way to
                                    manage your booking pipeline without the manual tracking.
                                </p>
                            </div>

                            <div className="dk-feature-card">
                                <span className="dk-feature-tab mono">TAB C</span>
                                <div className="dk-feature-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                                    </svg>
                                </div>
                                <h3>Customer notification state</h3>
                                <p>
                                    Customers are never left wondering. The moment a vendor
                                    updates a request, it's reflected on the customer's personal
                                    event dashboard — keeping both sides in sync.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="dk-footer" id="footer">
                <div className="dk-footer-inner">
                    <div className="dk-brand">
                        <span className="dk-brand-mark">VBMS</span>
                        Vendor Booking Management System
                    </div>
                    <div className="dk-footer-copy">© 2026 alphaexplora</div>
                </div>
            </footer>
        </div>
    )
}
