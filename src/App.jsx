import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Certificates } from "./components/Certificates/Certificates";
import { Contact } from "./components/Contact/Contact";

import styles from "./App.module.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);

  // Scroll to top on route change for better UX
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Scroll/touch navigation between pages
  useEffect(() => {
    let touchStartY = 0;
    let wheelAccum = 0;
    let wheelTimer = null;

    const throttleNavigate = (cb) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      // use rAF to schedule navigation to reduce jank
      requestAnimationFrame(() => cb());
      setTimeout(() => { isNavigatingRef.current = false; }, 700);
    };

    // accumulate wheel deltas so tiny scrolls don't trigger navigation
    const handleWheel = (e) => {
      // accumulate recent deltas
      wheelAccum += e.deltaY;

      // reset accumulation after a short idle period
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 180);

      const absAccum = Math.abs(wheelAccum);
      // require a larger accumulated delta to navigate (helps with smoothness)
      if (absAccum < 150) return;

      if (wheelAccum > 0) {
        if (location.pathname === "/") {
          throttleNavigate(() => navigate("/about"));
        } else if (location.pathname === "/about") {
          throttleNavigate(() => navigate("/certificates"));
        } else if (location.pathname === "/certificates") {
          throttleNavigate(() => navigate("/contact"));
        }
      } else if (wheelAccum < 0) {
        if (location.pathname === "/about") {
          throttleNavigate(() => navigate("/"));
        } else if (location.pathname === "/certificates") {
          throttleNavigate(() => navigate("/about"));
        } else if (location.pathname === "/contact") {
          throttleNavigate(() => navigate("/certificates"));
        }
      }

      // reset after navigation to avoid duplicate triggers
      wheelAccum = 0;
      if (wheelTimer) { clearTimeout(wheelTimer); wheelTimer = null; }
    };

    // For touch, keep simple but increase threshold and use accumulated movement
    let touchAccum = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchAccum = 0;
    };

    const handleTouchMove = (e) => {
      // track movement distance
      const currentY = e.touches[0].clientY;
      touchAccum = touchStartY - currentY;
    };

    const handleTouchEnd = (e) => {
      const deltaY = touchAccum || (touchStartY - e.changedTouches[0].clientY);
      // require a stronger swipe to trigger navigation
      if (Math.abs(deltaY) < 80) return;
      if (deltaY > 0) {
        if (location.pathname === "/") {
          throttleNavigate(() => navigate("/about"));
        } else if (location.pathname === "/about") {
          throttleNavigate(() => navigate("/certificates"));
        } else if (location.pathname === "/certificates") {
          throttleNavigate(() => navigate("/contact"));
        }
      } else if (deltaY < 0) {
        if (location.pathname === "/about") {
          throttleNavigate(() => navigate("/"));
        } else if (location.pathname === "/certificates") {
          throttleNavigate(() => navigate("/about"));
        } else if (location.pathname === "/contact") {
          throttleNavigate(() => navigate("/certificates"));
        }
      }
      touchAccum = 0;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, navigate]);

  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
