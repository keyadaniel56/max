import { useCallback } from "react";
import { generateOAuthURL } from "../components/shared/utils/config";

const LandingHeader = () => {
    const handleLogin = useCallback(async () => {
        const url = await generateOAuthURL();
        if (url) window.location.replace(url);
    }, []);

    const handleSignUp = useCallback(async () => {
        const url = await generateOAuthURL("registration");
        if (url) window.location.replace(url);
    }, []);

    return (
        <header className="lp-header">
            <div className="lp-header__inner">
                <a href="/" className="lp-header__logo">
                    <div className="lp-header__logo-icon">
                        <i className="fa-solid fa-cube" />
                    </div>
                    <span className="lp-header__logo-text">ApexFlow</span>
                </a>
                <nav className="lp-header__nav">
                    <a href="#features" className="lp-header__link">
                        Features
                    </a>
                    <a href="#free-bots" className="lp-header__link">
                        Free Bots
                    </a>
                    <a href="#process" className="lp-header__link">
                        How It Works
                    </a>
                    <a href="#testimonials" className="lp-header__link">
                        Testimonials
                    </a>
                </nav>
                <div className="lp-header__actions">
                    <button type="button" className="lp-header__link lp-header__link--btn" onClick={handleLogin}>
                        Log In
                    </button>
                    <button type="button" className="lp-header__btn" onClick={handleSignUp}>
                        Start Free
                    </button>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
