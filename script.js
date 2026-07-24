/* McCracken Land Services, script.js */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Logo scrolls to the top of the homepage.
     The #top id is on the sticky header, and browsers treat a sticky element as
     already in view, so the plain anchor won't scroll. Handle it directly. */
  var brandLink = document.querySelector("a.brand");
  if (brandLink) {
    var bh = brandLink.getAttribute("href") || "";
    if (bh === "#top" || bh === "#") {
      brandLink.addEventListener("click", function (e) {
        e.preventDefault();
        var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: rm ? "auto" : "smooth" });
      });
    }
  }

  /* Formspree AJAX forms (contact + resume) */
  function initFormspreeForm(opts) {
    var form = document.getElementById(opts.formId);
    if (!form) return;
    var statusEl = document.getElementById(opts.statusId);
    var submitBtn = document.getElementById(opts.submitId);
    var sendLabel = opts.sendLabel;
    function setStatus(msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "form-status " + (kind || "");
      statusEl.hidden = false;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = opts.sendingLabel; }
      var data = new FormData(form);
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus(opts.successMsg, "ok");
          } else {
            return res.json().then(function (d) {
              var m = d && d.errors && d.errors.length ? d.errors.map(function (x) { return x.message; }).join(", ") : "Something went wrong. Please try again.";
              setStatus(m, "err");
            }).catch(function () { setStatus("Something went wrong. Please try again.", "err"); });
          }
        })
        .catch(function () {
          setStatus("Couldn't send right now. Please check your connection and try again.", "err");
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = sendLabel; }
        });
    });
  }

  initFormspreeForm({
    formId: "contactForm", statusId: "formStatus", submitId: "contactSubmit",
    sendingLabel: "Sending...", sendLabel: "Send message",
    successMsg: "Thanks. Your message is on its way, and I'll get back to you soon."
  });
  initFormspreeForm({
    formId: "resumeForm", statusId: "resumeStatus", submitId: "resumeSubmit",
    sendingLabel: "Sending...", sendLabel: "Submit resume",
    successMsg: "Thanks. Your resume is on its way, and I'll be in touch if something fits."
  });

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Parallax */
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (layers.length && !reduceMotion) {
    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (layer) {
        var section = layer.parentElement;
        var rect = section.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return; // offscreen
        var speed = parseFloat(layer.getAttribute("data-speed")) || 0.3;
        // progress: -1 (entering from below) .. 0 (centered) .. 1 (leaving top)
        var progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
        var maxShift = section.offsetHeight * speed * 0.4;
        var y = -progress * maxShift;
        layer.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }
})();
