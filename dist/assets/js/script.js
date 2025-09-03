document.addEventListener("DOMContentLoaded", () => {
  function switchViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    const value = window.outerWidth > 375 ? "width=device-width,initial-scale=1" : "width=375";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start", // 上端に合わせる
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 要素取得
  const drawerIcon = document.querySelector(".c-drawer-icon");
  const drawer = document.querySelector(".c-drawer");
  const drawerOverlay = document.querySelector(".c-drawer-overlay");
  const drawerNavItem = document.querySelectorAll('.c-drawer__content a[href^="#"]');
  const header = document.querySelector(".l-header");
  const headerHeight = header ? header.offsetHeight : 0;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  // メニューを開く
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
      drawerOverlay.classList.add("js-show");
      document.body.classList.add("is-fixed");
      isMenuOpen = true;
    }
  };

  // メニューを閉じる
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      drawerOverlay.classList.remove("js-show");
      document.body.classList.remove("is-fixed");
      isMenuOpen = false;
    }
  };

  // メニューの開閉を切り替え
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  // ウィンドウリサイズ時の処理
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > breakpoint && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= breakpoint && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  // ドロワー外クリックでメニューを閉じる
  const clickOuter = (event) => {
    // drawerIcon（ハンバーガーアイコン）やdrawerOverlay（オーバーレイ）自体は除外
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && !drawerIcon.contains(event.target) && !drawerOverlay.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  };

  // スムーススクロール
  const linkScroll = (target) => {
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // イベント登録
  drawerIcon.addEventListener("click", toggleMenu);
  drawerOverlay.addEventListener("click", closeMenu);
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", clickOuter);

  drawerNavItem.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});

window.addEventListener("load", () => {
  const leads = document.querySelectorAll(".p-voice__lead");
  if (!leads.length) return;

  // いったん高さリセット（リサイズ時用）
  leads.forEach((el) => (el.style.height = ""));

  // 最大値を取得
  let maxHeight = 0;
  leads.forEach((el) => {
    maxHeight = Math.max(maxHeight, el.offsetHeight);
  });

  // 最大値でそろえる
  leads.forEach((el) => {
    el.style.height = maxHeight + "px";
  });
});

// リサイズ対応
window.addEventListener("resize", () => {
  const leads = document.querySelectorAll(".p-voice__lead");
  leads.forEach((el) => (el.style.height = "")); // リセット
  let maxHeight = 0;
  leads.forEach((el) => {
    maxHeight = Math.max(maxHeight, el.offsetHeight);
  });
  leads.forEach((el) => {
    el.style.height = maxHeight + "px";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const IS_OPENED_CLASS = "is-opened";

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      if (element.classList.contains(IS_OPENED_CLASS)) {
        // 既に開かれている状態を閉じる
        closingAnim(content, element)
          .eventCallback("onComplete", () => {
            element.classList.remove(IS_OPENED_CLASS);
            element.removeAttribute("open");
          })
          .restart();
      } else {
        // 開く処理
        element.classList.add(IS_OPENED_CLASS);
        element.setAttribute("open", "true");
        openingAnim(content).restart();
      }
    });
  });
};

/**
 * アコーディオンを閉じる時のアニメーション
 */
const closingAnim = (content, element) =>
  gsap.to(content, {
    height: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    overwrite: true,
  });

/**
 * アコーディオンを開く時のアニメーション
 */
const openingAnim = (content) =>
  gsap.fromTo(
    content,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: "auto",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    }
  );
