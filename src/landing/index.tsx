import { useCallback } from "react";
import localForage from "localforage";
import LZString from "lz-string";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { generateOAuthURL } from "../components/shared/utils/config";
import masterBotV6 from "../xml/master_bot_v6.xml";
import "./landing.scss";

const LandingPage = () => {
    const handleLoadBot = useCallback(async (xmlString: string, botName: string) => {
        const workspaceId = `bot_${Date.now()}`;
        const workspace = {
            id: workspaceId,
            timestamp: Date.now(),
            name: botName,
            xml: xmlString,
            save_type: "unsaved",
        };

        const existingRaw = await localForage.getItem("saved_workspaces");
        let existing: typeof workspace[] = [];
        try {
            existing = JSON.parse(LZString.decompress(existingRaw as string)) || [];
        } catch {
            existing = [];
        }
        existing.unshift(workspace);
        if (existing.length > 10) existing.pop();

        await localForage.setItem(
            "saved_workspaces",
            LZString.compress(JSON.stringify(existing))
        );

        window.location.href = "/botbuilder";
    }, []);

    const handleLogin = useCallback(async () => {
        const url = await generateOAuthURL();
        if (url) window.location.replace(url);
    }, []);

    const handleSignUp = useCallback(async () => {
        const url = await generateOAuthURL("registration");
        if (url) window.location.replace(url);
    }, []);

    return (
        <div className="lp">
            <LandingHeader />

            <main className="lp__main">
                {/* Hero */}
                <section className="lp__hero">
                    <div className="lp__hero-bg">
                        <div className="lp__hero-slides">
                            <div className="lp__hero-slide lp__hero-slide--1" />
                            <div className="lp__hero-slide lp__hero-slide--2" />
                            <div className="lp__hero-slide lp__hero-slide--3" />
                            <div className="lp__hero-slide lp__hero-slide--4" />
                            <div className="lp__hero-slide lp__hero-slide--5" />
                        </div>
                        <div className="lp__hero-orb lp__hero-orb--1" />
                        <div className="lp__hero-orb lp__hero-orb--2" />
                        <div className="lp__hero-orb lp__hero-orb--3" />
                    </div>
                    <div className="lp__hero-content">
                        <span className="lp__badge">
                            <i className="fa-solid fa-bolt" /> New: AI-Powered Analytics
                        </span>
                        <h1 className="lp__title">
                            Trade Smarter<br />
                            <span className="lp__title-accent">With Powerful Bots</span>
                        </h1>
                        <p className="lp__subtitle">
                            The all-in-one platform that empowers teams to automate workflows,
                            scale operations, and drive measurable results faster than ever.
                        </p>
                        <div className="lp__hero-actions">
                            <button type="button" className="lp__btn lp__btn--gradient" onClick={handleSignUp}>
                                Start Free <i className="fa-solid fa-arrow-right" />
                            </button>
                            <button type="button" className="lp__btn lp__btn--glass" onClick={handleLogin}>
                                Log In
                            </button>
                        </div>
                        <div className="lp__hero-stats">
                            <div className="lp__stat">
                                <span className="lp__stat-num">10K+</span>
                                <span className="lp__stat-label">Active Users</span>
                            </div>
                            <div className="lp__stat-divider" />
                            <div className="lp__stat">
                                <span className="lp__stat-num">99.9%</span>
                                <span className="lp__stat-label">Uptime</span>
                            </div>
                            <div className="lp__stat-divider" />
                            <div className="lp__stat">
                                <span className="lp__stat-num">50+</span>
                                <span className="lp__stat-label">Integrations</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="lp__features" id="features">
                    <div className="lp__features-bg" />
                    <div className="lp__container">
                        <span className="lp__section-tag">Features</span>
                        <h2 className="lp__section-title">Everything you need to trade smarter</h2>
                        <p className="lp__section-desc">
                            Pre-built bots and powerful tools designed for Deriv traders.
                            No coding, no complexity — just results.
                        </p>
                        <div className="lp__features-grid">
                            <div className="lp__feature-card lp__feature-card--highlight">
                                <div className="lp__feature-icon lp__feature-icon--coral">
                                    <i className="fa-solid fa-robot" />
                                </div>
                                <h3 className="lp__feature-title">Free Trading Bots</h3>
                                <p className="lp__feature-desc">
                                    Access ready-made Martingale, D'Alembert, and Accumulator bots.
                                    Deploy them instantly on your Deriv account at zero cost.
                                </p>
                            </div>
                            <div className="lp__feature-card">
                                <div className="lp__feature-icon lp__feature-icon--violet">
                                    <i className="fa-solid fa-chart-line" />
                                </div>
                                <h3 className="lp__feature-title">Real-Time Analytics</h3>
                                <p className="lp__feature-desc">
                                    Monitor live trade performance with instant dashboards.
                                    Track profit, loss, and win rates as your bots run.
                                </p>
                            </div>
                            <div className="lp__feature-card">
                                <div className="lp__feature-icon lp__feature-icon--amber">
                                    <i className="fa-solid fa-shield-halved" />
                                </div>
                                <h3 className="lp__feature-title">Loss Control</h3>
                                <p className="lp__feature-desc">
                                    Built-in stop loss, take profit, and stake limits on every bot.
                                    Protect your capital and lock in profits automatically.
                                </p>
                            </div>
                            <div className="lp__feature-card">
                                <div className="lp__feature-icon lp__feature-icon--teal">
                                    <i className="fa-solid fa-layer-group" />
                                </div>
                                <h3 className="lp__feature-title">Multiple Market Types</h3>
                                <p className="lp__feature-desc">
                                    Trade synthetic indices, forex, commodities, and more.
                                    Run bots across different markets from one platform.
                                </p>
                            </div>
                            <div className="lp__feature-card">
                                <div className="lp__feature-icon lp__feature-icon--rose">
                                    <i className="fa-solid fa-play" />
                                </div>
                                <h3 className="lp__feature-title">Demo &amp; Live Trading</h3>
                                <p className="lp__feature-desc">
                                    Practice with unlimited demo funds before going live.
                                    Test every bot risk-free on a virtual account.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="lp__process" id="process">
                    <div className="lp__container">
                        <span className="lp__section-tag">Powerful Bots</span>
                        <h2 className="lp__section-title">Bots built for every strategy</h2>
                        <p className="lp__section-desc">
                            From simple automations to complex multi-condition strategies, there is a
                            bot for every type of trader.
                        </p>
                        <div className="lp__process-grid">
                            <div className="lp__process-step">
                                <div className="lp__process-num">01</div>
                                <div className="lp__process-icon">
                                    <i className="fa-solid fa-chart-line" />
                                </div>
                                <h3 className="lp__process-title">Martingale &amp; D'Alembert Bots</h3>
                                <p className="lp__process-desc">
                                    Classic staking strategies automated for precision. Adjust stake
                                    sizes based on wins or losses without lifting a finger.
                                </p>
                            </div>
                            <div className="lp__process-connector">
                                <i className="fa-solid fa-chevron-right" />
                            </div>
                            <div className="lp__process-step">
                                <div className="lp__process-num">02</div>
                                <div className="lp__process-icon">
                                    <i className="fa-solid fa-layer-group" />
                                </div>
                                <h3 className="lp__process-title">Accumulator &amp; Multipliers Bots</h3>
                                <p className="lp__process-desc">
                                    Ride market movements with bots that auto-place trades on
                                    accumulators and rising multipliers for higher payout potential.
                                </p>
                            </div>
                            <div className="lp__process-connector">
                                <i className="fa-solid fa-chevron-right" />
                            </div>
                            <div className="lp__process-step">
                                <div className="lp__process-num">03</div>
                                <div className="lp__process-icon">
                                    <i className="fa-solid fa-shield-halved" />
                                </div>
                                <h3 className="lp__process-title">Risk Management Bots</h3>
                                <p className="lp__process-desc">
                                    Built-in stop loss, take profit, and loss control. Protect your
                                    capital and lock in profits automatically on every trade.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Free Bots */}
                <section className="lp__free-bots" id="free-bots">
                    <div className="lp__container">
                        <span className="lp__section-tag">Free Bots</span>
                        <h2 className="lp__section-title">Ready-to-trade bots</h2>
                        <p className="lp__section-desc">
                            Load a pre-built bot directly into the builder and start trading instantly.
                            No setup needed — just click and run.
                        </p>
                        <div className="lp__bots-grid">
                            <div className="lp__bot-card">
                                <div className="lp__bot-card-glow" />
                                <div className="lp__bot-card-inner">
                                    <div className="lp__bot-badge">Free</div>
                                    <div className="lp__bot-icon">
                                        <i className="fa-solid fa-robot" />
                                    </div>
                                    <h3 className="lp__bot-title">Master Bot V6</h3>
                                    <p className="lp__bot-desc">
                                        Advanced over/under digit trading bot with martingale stake management,
                                        trend detection, configurable stop loss, and automatic trade rotation.
                                    </p>
                                    <div className="lp__bot-tags">
                                        <span className="lp__bot-tag">Digits</span>
                                        <span className="lp__bot-tag">Martingale</span>
                                        <span className="lp__bot-tag">Synthetic Index</span>
                                    </div>
                                    <ul className="lp__bot-features">
                                        <li><i className="fa-solid fa-check" /> Over/Under 1HZ75V</li>
                                        <li><i className="fa-solid fa-check" /> Auto stake adjustment</li>
                                        <li><i className="fa-solid fa-check" /> Trend detection</li>
                                        <li><i className="fa-solid fa-check" /> Stop loss &amp; win target</li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="lp__btn lp__btn--primary lp__btn--full"
                                        onClick={() => handleLoadBot(masterBotV6, "Master Bot V6")}
                                    >
                                        Load to Bot Builder{" "}
                                        <i className="fa-solid fa-arrow-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="lp__testimonials">
                    <div className="lp__container">
                        <span className="lp__section-tag">Testimonials</span>
                        <h2 className="lp__section-title">Trusted by traders worldwide</h2>
                        <p className="lp__section-desc">
                            Hear from traders who use our bots every day.
                        </p>
                        <div className="lp__testimonials-grid">
                            <div className="lp__testimonial-card">
                                <div className="lp__testimonial-quote">
                                    <i className="fa-solid fa-quote-left" />
                                </div>
                                <p className="lp__testimonial-text">
                                    The Martingale bot runs flawlessly. I set my parameters once and
                                    it trades around the clock. My win rate has never been this
                                    consistent.
                                </p>
                                <div className="lp__testimonial-author">
                                    <div className="lp__testimonial-avatar lp__testimonial-avatar--1">
                                        JK
                                    </div>
                                    <div>
                                        <span className="lp__testimonial-name">James Kariuki</span>
                                        <span className="lp__testimonial-role">
                                            Synthetic Indices Trader
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="lp__testimonial-card">
                                <div className="lp__testimonial-quote">
                                    <i className="fa-solid fa-quote-left" />
                                </div>
                                <p className="lp__testimonial-text">
                                    The loss control features saved me from blown accounts multiple
                                    times. Being able to set stop loss and take profit per bot is a
                                    game changer.
                                </p>
                                <div className="lp__testimonial-author">
                                    <div className="lp__testimonial-avatar lp__testimonial-avatar--2">
                                        RN
                                    </div>
                                    <div>
                                        <span className="lp__testimonial-name">
                                            Rita Nwosu
                                        </span>
                                        <span className="lp__testimonial-role">
                                            Forex &amp; Deriv Bot Builder
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="lp__testimonial-card">
                                <div className="lp__testimonial-quote">
                                    <i className="fa-solid fa-quote-left" />
                                </div>
                                <p className="lp__testimonial-text">
                                    I had zero coding experience but built my first accumulator bot
                                    in under an hour. The drag-and-drop builder makes it incredibly
                                    simple.
                                </p>
                                <div className="lp__testimonial-author">
                                    <div className="lp__testimonial-avatar lp__testimonial-avatar--3">
                                        DM
                                    </div>
                                    <div>
                                        <span className="lp__testimonial-name">Daniel Mensah</span>
                                        <span className="lp__testimonial-role">
                                            Deriv Multiplier Trader
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="lp__cta" id="cta">
                    <div className="lp__container">
                        <div className="lp__cta-box">
                            <div className="lp__cta-orb lp__cta-orb--1" />
                            <div className="lp__cta-orb lp__cta-orb--2" />
                            <h2 className="lp__cta-title">
                                Ready to automate your trades?
                            </h2>
                            <p className="lp__cta-desc">
                                Join thousands of traders already using powerful bots to trade smarter.
                                Start building for free on the demo account today.
                            </p>
                            <div className="lp__cta-actions">
                                <button type="button" className="lp__btn lp__btn--white" onClick={handleSignUp}>
                                    Get Started{" "}
                                    <i className="fa-solid fa-arrow-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
};

export default LandingPage;
