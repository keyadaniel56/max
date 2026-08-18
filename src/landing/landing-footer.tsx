const LandingFooter = () => (
    <footer className="lp-footer">
        <div className="lp-footer__bottom">
            <p className="lp-footer__copyright">
                &copy; {new Date().getFullYear()} ApexFlow. All rights reserved.
            </p>
            <div className="lp-footer__legal">
                <a href="#" className="lp-footer__legal-link">
                    Privacy Policy
                </a>
                <a href="#" className="lp-footer__legal-link">
                    Terms of Service
                </a>
            </div>
        </div>
    </footer>
);

export default LandingFooter;
