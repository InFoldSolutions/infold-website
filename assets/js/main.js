(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ===== get browser name

  function fnBrowserDetect() {

    let userAgent = navigator.userAgent;

    let browserName;
    let browserImage;

    if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
      browserImage = "assets/images/browsers/opera.svg";
    }
    else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
      browserImage = "assets/images/browsers/edge.svg";
    }
    else if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
      browserImage = "assets/images/browsers/chrome.svg";
    }
    else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
      browserImage = "assets/images/browsers/firefox.svg";
    }
    else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
      browserImage = "assets/images/browsers/safari.svg";
    }
    else {
      browserName = "Chrome";
      browserImage = "assets/images/browsers/chrome.svg";
    }

    document.getElementById('browserName').innerText = browserName;
    document.getElementById('browserImage').src = browserImage;
  }

  fnBrowserDetect();

  // ===== responsive navbar
  const navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  // ==== Hotspot1 click
  const twitterPreview = document.getElementById("twitter-preview");
  const hotspot1 = document.getElementById("hotspot1");
  const hotspot5 = document.getElementById("hotspot5");
  const hotspots = document.querySelectorAll(".hotspot");
  hotspot1.addEventListener("click", () => {
    twitterPreview.src = "assets/images/previews/preview-twitter-open.png";
    hotspot1.classList.add("hidden");
    hotspots.forEach((el) => {
      el.classList.remove("hidden");
      el.classList.add("flex")
    })
  });
  hotspot5.addEventListener("click", () => {
    twitterPreview.src = "assets/images/previews/preview-twitter.png";
    hotspot1.classList.remove("hidden");
    hotspots.forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("flex");
    })
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

  // ==== for menu scroll
  const pageLink = document.querySelectorAll(".ud-menu-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });
})();
