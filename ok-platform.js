/**
 * ok-platform.js — Dedicated platform modal for /u/ directory
 * Android-style swipe to dismiss:
 * 1. Drag the header (drag-handle) to dismiss in any direction
 * 2. Overscroll inside iframe: at top → swipe down; at bottom → swipe up
 */

(function () {
  'use strict';

  window.demoTimer = null;

  window.showDemoNotice = function() {
    // Remove existing notice if any
    var existing = document.querySelector('.ok-demo-notice');
    if (existing) existing.remove();

    var notice = document.createElement('div');
    notice.className = 'ok-demo-notice';
    notice.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: #fff;
        color: #111;
        padding: 40px;
        border-radius: 32px;
        z-index: 200000;
        text-align: center;
        box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 100px rgba(238, 130, 8, 0.2);
        font-family: -apple-system, system-ui, sans-serif;
        pointer-events: none;
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        min-width: 320px;
        border: 1px solid rgba(238, 130, 8, 0.1);
    `;
    
    notice.innerHTML = `
        <div style="font-size: 80px; filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.2));">⏳</div>
        <div style="font-weight: 800; font-size: 24px; color: #EE8208; line-height: 1.2;">ДЕМОНСТРАЦИЯ ЗАКРЫТА</div>
        <div style="font-weight: 500; font-size: 16px; color: #666;">Извините, это была лишь демонстрация возможностей платформы.</div>
    `;
    document.body.appendChild(notice);
    
    requestAnimationFrame(function() {
      notice.style.opacity = '1';
      notice.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    setTimeout(function() {
      notice.style.opacity = '0';
      notice.style.transform = 'translate(-50%, -50%) scale(0.9) translateY(20px)';
      setTimeout(function() { if (notice.parentNode) notice.remove(); }, 600);
    }, 4000);
  };

  window.openSpokePreview = function (url, title) {
    if (!url) return;
    title = title || 'Пример';

    var modal   = document.getElementById('platformModal');
    var iframe  = document.getElementById('platformIframe');
    var content = modal && modal.querySelector('.platform-modal-content');
    var titleEl = document.getElementById('platformModalTitle');

    if (!modal || !iframe || !content) return;

    content.style.transform  = '';
    content.style.transition = '';
    modal.style.opacity = '';

    if (titleEl) titleEl.textContent = title;
    iframe.src = url;
    iframe.setAttribute('title', title);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // ✨ DEMO LIMIT: Auto-close after 10 seconds
    if (window.demoTimer) clearTimeout(window.demoTimer);
    window.demoTimer = setTimeout(function() {
      closePlatformPreview();
      if (typeof window.showDemoNotice === 'function') window.showDemoNotice();
    }, 10000);

    // ✨ AUTO-FORCE KIDS THEME for Demo Lesson (264.html)
    if (url.includes('264.html')) {
        setTimeout(function() {
            try {
                var win = iframe.contentWindow;
                if (win && win.lessonEngine && win.lessonEngine.themeManager) {
                    if (!win.localStorage.getItem('eng-tutor-theme')) {
                        win.lessonEngine.handleThemeSwitch('kids');
                    }
                }
            } catch(e) {}
        }, 500);
    }
  };

  window.closePlatformPreview = function () {
    var modal   = document.getElementById('platformModal');
    var iframe  = document.getElementById('platformIframe');
    if (!modal || !iframe) return;
    var content = modal.querySelector('.platform-modal-content');

    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modal.style.opacity = '';
    if (content) {
      content.style.transform  = '';
      content.style.transition = '';
    }
    
    // Clear demo timer on manual close
    if (window.demoTimer) {
      clearTimeout(window.demoTimer);
      window.demoTimer = null;
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('platformModal');
    if (!modal) return;

    var content = modal.querySelector('.platform-modal-content');
    var header  = modal.querySelector('.ok-modal-header');
    var iframe  = document.getElementById('platformIframe');
    if (!content || !header) return;

    // Close on backdrop click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closePlatformPreview();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePlatformPreview();
    });

    // Delegate .js-spoke clicks
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-spoke');
      if (!btn) return;
      if (btn.tagName === 'A') e.preventDefault();
      openSpokePreview(btn.dataset.url, btn.dataset.title);
    });

    // Handle close messages from iframes
    window.addEventListener('message', function (e) {
      if (e.data === 'closeModal') closePlatformPreview();
    });

    // ── Shared drag state ──────────────────────────────────
    var startY   = 0;
    var currentY = 0;
    var dragging = false;

    function applyDrag(diff) {
      dragging = true;
      content.style.transition = 'none';
      modal.style.transition   = 'none';
      content.style.transform  = 'translateY(' + diff + 'px)';
      var opacity = 1 - (Math.abs(diff) / (window.innerHeight * 0.7));
      modal.style.opacity = Math.max(0, opacity);
    }

    function finishDrag() {
      iframe.style.pointerEvents = '';

      if (!dragging) return;
      dragging = false;

      var diff      = currentY - startY;
      var threshold = 80;

      content.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      modal.style.transition   = 'opacity 0.3s ease-out';

      if (Math.abs(diff) > threshold) {
        var dir = diff > 0 ? '100vh' : '-100vh';
        content.style.transform = 'translateY(' + dir + ')';
        modal.style.opacity = '0';
        setTimeout(function () { closePlatformPreview(); }, 300);
      } else {
        content.style.transform = 'translateY(0)';
        modal.style.opacity = '1';
      }
    }

    // ── 1. HEADER swipe (always works) ─────────────────────
    header.addEventListener('touchstart', function (e) {
      startY = e.touches[0].clientY;
      currentY = startY;
      dragging = false;
    }, { passive: true });

    header.addEventListener('touchmove', function (e) {
      currentY = e.touches[0].clientY;
      var diff = currentY - startY;
      if (Math.abs(diff) > 8) {
        if (e.cancelable) e.preventDefault();
        iframe.style.pointerEvents = 'none';
        applyDrag(diff);
      }
    }, { passive: false });

    header.addEventListener('touchend', finishDrag);

    // Content listeners for when pointer-events are disabled on iframe
    content.addEventListener('touchstart', function (e) {
      if (iframe.style.pointerEvents === 'none') {
        startY = e.touches[0].clientY;
        currentY = startY;
      }
    }, { passive: true });

    content.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      var diff = currentY - startY;
      if (e.cancelable) e.preventDefault();
      applyDrag(diff);
    }, { passive: false });

    content.addEventListener('touchend', finishDrag);

    // ── 2. IFRAME overscroll dismiss ───────────────────────
    // Inject touch listeners into same-origin iframe content.
    // When at top of scroll → swipe down to dismiss
    // When at bottom of scroll → swipe up to dismiss

    iframe.addEventListener('load', function () {
      try {
        var iDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iDoc) return;

        var iStartY = 0;
        var iCurrentY = 0;
        var iDragging = false;
        var atTop = false;
        var atBottom = false;

        iDoc.addEventListener('touchstart', function (e) {
          iStartY = e.touches[0].clientY;
          iCurrentY = iStartY;
          iDragging = false;
          atTop = true;
          atBottom = true;

          // Check all scrollable ancestors
          var el = e.target;
          while (el && el !== iDoc.documentElement) {
            var style = iframe.contentWindow.getComputedStyle(el);
            var ov = style.overflowY;
            if (ov === 'auto' || ov === 'scroll' || ov === 'overlay') {
              if (el.scrollTop > 5) atTop = false;
              if (el.scrollHeight - el.scrollTop - el.clientHeight > 5) atBottom = false;
              break;
            }
            el = el.parentElement;
          }

          // Also check document-level scroll
          var docTop = iDoc.documentElement.scrollTop || iDoc.body.scrollTop;
          var docHeight = iDoc.documentElement.scrollHeight || iDoc.body.scrollHeight;
          var docClient = iDoc.documentElement.clientHeight || iframe.contentWindow.innerHeight;

          if (docTop > 5) atTop = false;
          if (docHeight - docTop - docClient > 5) atBottom = false;
        }, { passive: true });

        iDoc.addEventListener('touchmove', function (e) {
          iCurrentY = e.touches[0].clientY;
          var diff = iCurrentY - iStartY;

          // Swipe down while at top OR swipe up while at bottom
          var shouldDrag = (diff > 0 && atTop) || (diff < 0 && atBottom);
          if (!shouldDrag) return;

          if (Math.abs(diff) > 10) {
            iDragging = true;
            if (e.cancelable) e.preventDefault();
            applyDrag(diff);
          }
        }, { passive: false });

        iDoc.addEventListener('touchend', function () {
          if (!iDragging) return;
          currentY = iCurrentY;
          startY = iStartY;
          iDragging = false;
          dragging = true; // hand off to finishDrag
          finishDrag();
        });

      } catch (err) {
        // Cross-origin iframe — can't inject, header swipe still works
      }
    });
  });
})();
