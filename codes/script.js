console.log("+----------------+");
console.log("| WHITE GARDEN |");
console.log("+----------------+");

var yearEl = document.getElementById("year") || document.getElementsByClassName("year")[0];
if (yearEl) yearEl.innerHTML = new Date().getFullYear();

var calander = document.getElementById("calander");
var body = document.getElementById("body");
var container = document.querySelector(".container");

// Toggle calendar visibility
function toggleCalendar() {
  document.getElementById("BigContainer").scrollLeft = 0;
  document.getElementById("BigContainer").scrollTop = 0;
  if (calander.style.marginLeft === "-50vw") {
    calander.style.marginLeft = "0";
    document.getElementById("calanderImg").src = "artworks/close.png";
    document.getElementById("type").style.right = "-30px";
  } else {
    calander.style.marginLeft = "-50vw";
    document.getElementById("type").style.right = "-130px";
    document.getElementById("calanderImg").src = "artworks/calander.png";
  }
}

// Scroll container to the selected year
function scrollToYear(yearId) {
  var yearElement = document.getElementById(yearId);
  if (yearElement) {
    if (window.innerWidth < 700) {
      yearElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      container.scrollTo({ left: yearElement.offsetLeft, behavior: "smooth" });
    }
  }
}

// Calendar links
document.querySelectorAll(".calander a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    var yearId = this.getAttribute("href").substring(1);
    scrollToYear(yearId);
  });
});

/* ========================================== */
/* ARTWORK PAGE LINK —— 点击跳转 */
/* ========================================== */

document.querySelectorAll(".art").forEach((image) => {
    image.addEventListener("click", function() {
        const link = this.dataset.link;
        if (link) {
            window.location.href = link;
        }
    });
});

function scrollFunction() {
  const element = document.getElementById("feedbackSection");
  if (element) element.scrollIntoView({ behavior: "smooth" });
  document.getElementById("calanderImg").style.opacity = 0;
  document.getElementById("back").style.opacity = 1;
  body.style.overflowY = "hidden";
  calander.style.marginLeft = "-50vw";
  document.getElementById("calanderImg").src = "artworks/calander.png";
}

function display() {
  const element = document.getElementById("display");
  if (element) element.scrollIntoView({ behavior: "smooth" });
  document.getElementById("calanderImg").style.opacity = 1;
  if (window.matchMedia("(max-width: 700px)").matches) {
    body.style.overflowY = "scroll";
  }
  var backBtn = document.getElementById("back");
  if (backBtn) backBtn.style.opacity = 0;
}

display();

function checkFeedbackLength(input) {
  if (input.value.length < 10) {
    document.getElementById("feedbackError").style.opacity = "100%";
    return false;
  } else {
    document.getElementById("feedbackError").style.opacity = "0%";
    return true;
  }
}

document.querySelectorAll(".type a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const currentSection = document.querySelector("section");
    if (currentSection) currentSection.classList.add("hidden");
    sessionStorage.setItem("nextPage", this.href);
    setTimeout(() => {
      window.location.href = this.href;
    }, 300);
  });
});

window.onload = function () {
  const newSection = document.querySelector("section");
  if (!newSection) return;
  if (sessionStorage.getItem("nextPage")) {
    newSection.classList.add("hidden");
    setTimeout(() => {
      newSection.classList.remove("hidden");
    }, 0);
  }
};

function nft_review() {
  window.location.href = "index.html";
  setTimeout(() => {
    scrollFunction();
  }, 1000);
}

function loadReviews() {
  const tbody = document.getElementById("reviewsBody");
  if (!tbody) return;
  fetch("/.netlify/functions/get-reviews")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((reviews) => {
      if (!reviews || reviews.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; opacity:0.5;">No comments yet. Be the first!</td></tr>`;
        return;
      }
      tbody.innerHTML = reviews.map((review) => {
        return `<tr><td>${escapeHtml(review.name)}</td><td>${escapeHtml(review.message)}</td></tr>`;
      }).join("");
    })
    .catch((err) => {
      console.error("Failed to load comments:", err);
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; opacity:0.5;">Could not load reviews.</td></tr>`;
    });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

loadReviews();

/* ========================================== */
/* SOUND CONTROL */
/* ========================================== */

const music = document.getElementById("bgMusic");
const soundToggle = document.getElementById("soundToggle");

if (music && soundToggle) {
    soundToggle.innerHTML = "SOUND OFF";
    window.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => {
                soundToggle.innerHTML = "SOUND OFF";
            }).catch(err => console.log("Autoplay blocked by browser"));
        }
    }, { once: true });

    soundToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!music.paused) {
            music.pause();
            soundToggle.innerHTML = "SOUND ON";
        } else {
            music.play();
            soundToggle.innerHTML = "SOUND OFF";
        }
    });
}

/* ========================================== */
/* WELCOME OVERLAY & PARALLAX */
/* ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("welcome-overlay");
    const screenInner = document.querySelector("#welcome-overlay .overlay-screen");
    const hintText = document.querySelector("#welcome-overlay .overlay-hint");
    const containerEl = document.querySelector(".container");

    const menuBtn = document.querySelector(".calanderBtn");
    const typeNav = document.querySelector(".type");
    const mainHeading = document.querySelector(".heading");
    const introTop = document.querySelector(".top");
    const footerCredits = document.querySelector(".credits");

    if (overlay) {
        setTimeout(() => {
            overlay.classList.add("active");
        }, 200);
    }

    if (overlay && containerEl && screenInner) {
        containerEl.addEventListener("scroll", () => {
            let scrollLeft = containerEl.scrollLeft;
            let windowWidth = window.innerWidth;

            if (scrollLeft > 0) {
                let progress = Math.min(scrollLeft / windowWidth, 1);
                let translateX = -progress * windowWidth * 0.4;
                let scale = 1 - (progress * 0.08);
                let opacity = 1 - progress;

                screenInner.style.transform = `translateX(${translateX}px) scale(${scale})`;
                screenInner.style.opacity = opacity;
                if (hintText) hintText.style.opacity = (1 - progress * 2) * 0.25;

                if (progress > 0.9) {
                    menuBtn?.classList.add("ui-visible");
                    typeNav?.classList.add("ui-visible");
                    mainHeading?.classList.add("ui-visible-heading");
                    introTop?.classList.add("ui-visible");
                    footerCredits?.classList.add("ui-visible");
                    overlay.style.display = "none";
                } else {
                    menuBtn?.classList.remove("ui-visible");
                    typeNav?.classList.remove("ui-visible");
                    mainHeading?.classList.remove("ui-visible-heading");
                    introTop?.classList.remove("ui-visible");
                    footerCredits?.classList.remove("ui-visible");
                    overlay.style.display = "flex";
                }
            } else {
                screenInner.style.transform = "translateX(0px) scale(1)";
                screenInner.style.opacity = 1;
                if (hintText) hintText.style.opacity = 0.25;
                menuBtn?.classList.remove("ui-visible");
                typeNav?.classList.remove("ui-visible");
                mainHeading?.classList.remove("ui-visible-heading");
                introTop?.classList.remove("ui-visible");
                footerCredits?.classList.remove("ui-visible");
            }
        });
    }
});