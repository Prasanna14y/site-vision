import { useEffect, useState } from "react";
import stackedLogoRaw from "../../assets/logo/stacked.svg?raw";

// The official stacked logo, inlined so its parts can animate separately.
// Wrapper groups: icon / "Site Vision" / "SECURITY"; inside the icon, red and black layers.
const STACKED_LOGO = stackedLogoRaw
  .replace(/<svg ([^>]*?)width="[^"]*" height="[^"]*"/, '<svg $1role="img" aria-label="Site Vision Security" class="w-full h-auto"')
  .replace('<g transform="translate(1559.1,250.0) scale(1.4)">', '<g class="lg-icon" transform="translate(1559.1,250.0) scale(1.4)">')
  .replace('<g transform="translate(250.0,1983.6) scale(1)">', '<g class="lg-word" transform="translate(250.0,1983.6) scale(1)">')
  .replace('<g transform="translate(250.0,2757.6) scale(1)">', '<g class="lg-sec" transform="translate(250.0,2757.6) scale(1)">')
  .replace(/(<g transform="translate\(0\.000000,1124\.000000\)[^>]*fill="#DF2227")/, '$1 class="lg-icon-red"')
  .replace(/(<g transform="translate\(0\.000000,1124\.000000\)[^>]*fill="#040707")/, '$1 class="lg-icon-black"');

// Show the splash only on the first page load, not on later client-side
// navigation back to the home page.
let splashPlayed = false;

/**
 * Full-screen logo splash for the home page: the logo assembles (~1s), holds
 * for 1s, then the splash fades away on its own to reveal the page.
 * Timing is pure CSS (`.splash*` / `.lg-*` in styles.css), so it also runs —
 * and always finishes — without JavaScript. Click/tap skips it.
 */
export default function LogoIntro() {
  const [show] = useState(() => !splashPlayed);
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    splashPlayed = true; // browser only — the server always renders the splash
  }, []);

  if (!show) return null;

  return (
    <div
      data-splash
      className={`splash fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center cursor-pointer ${skipped ? "splash-skip" : ""}`}
      onClick={() => setSkipped(true)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 security-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,34,39,0.07)_0%,transparent_60%)]" />

      <div className="splash-logo relative w-[min(80vw,560px)]" dangerouslySetInnerHTML={{ __html: STACKED_LOGO }} />

      <div className="logo-tagline relative mt-2 md:mt-4 flex items-center justify-center gap-3 md:gap-4 px-4">
        <span className="hidden sm:block h-0.5 w-8 md:w-14 bg-[#DF2227]" />
        <p className="font-mono text-[0.6rem] md:text-xs tracking-[0.16em] sm:tracking-[0.3em] text-[#4A4A4A] uppercase">
          Get your site secured and rest assured
        </p>
        <span className="hidden sm:block h-0.5 w-8 md:w-14 bg-[#DF2227]" />
      </div>
    </div>
  );
}
