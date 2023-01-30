window.onload = (event) => {

  // ===== Get browser name

  function detectCurrentBrowser() {

    let userAgent = navigator.userAgent;

    let browserName;

    if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
    }
    else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
    }
    else if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    }
    else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    }
    else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
    }
    else {
      browserName = "Chrome";
    }

    document.getElementById('browserName').innerText = browserName;
  }

  detectCurrentBrowser();

  // ===== Current Year

  function getCurrentYear() {
    const currentYearEl = document.getElementById('currentYear');
    currentYearEl.innerText = new Date().getFullYear();
  }

  getCurrentYear();

  // ===== Responsive navbar

  const navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("md:hidden");
  });

  //===== Close navbar-collapse when a clicked

  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("md:hidden");
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

  // ==== Hotspot click

  const twitterPreview = document.getElementById("twitter-preview");
  const hotspot1 = document.getElementById("hotspot1");
  const hotspot5 = document.getElementById("hotspot5");
  const homeHotspots = document.querySelectorAll("#home .hotspot");
  const homehotspotInfo = document.getElementById("hotspot-info1");

  hotspot1.addEventListener("click", () => {
    twitterPreview.src = "assets/images/previews/preview-twitter-open.png";
    hotspot1.classList.add("hidden");
    homeHotspots.forEach((el) => {
      el.classList.remove("hidden");
      el.classList.add("flex");
    });
    homehotspotInfo.classList.add("flex");
  });

  hotspot5.addEventListener("click", () => {
    twitterPreview.src = "assets/images/previews/preview-twitter.png";
    hotspot1.classList.remove("hidden");
    homeHotspots.forEach((el) => {
      el.classList.add("hidden");
      el.classList.remove("flex");
    })
    homehotspotInfo.classList.remove("flex");
  });

  // ==== For menu scroll

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

  // ==== For active menu scroll

  function onScroll() {
    const sections = document.querySelectorAll(".ud-menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (scrollPos < 200) {
      document.querySelector(".ud-menu-scroll").classList.add('active');
      return;
    }

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document
          .querySelector(".ud-menu-scroll")
          .classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  // ==== Preload images

  const images = []; // need to stay in memory I guess 

  function preload() {
    for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }

  preload(
    "assets/images/previews/preview-twitter-open.png"
  )
}
