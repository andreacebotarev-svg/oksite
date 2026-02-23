/**
 * ok-platform.js — Dedicated platform modal for /u/ directory
 * Android-style swipe up/down to dismiss.
 *
 * APPROACH: The iframe absorbs ALL touch events, so we can't listen
 * on the content wrapper. Instead we:
 * 1. Listen on the HEADER (drag-handle area) for swipe initiation
 * 2. Once dragging starts, set pointer-events:none on the iframe
 *    so ALL subsequent touch events reach our content handler
 * 3. On touchend, restore pointer-events and decide: dismiss or snap back
 */

(function () {
  'use strict';

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

    // ── SWIPE-TO-DISMISS ──────────────────────────────────

    var startY   = 0;
    var currentY = 0;
    var dragging = false;

    // HEADER touchstart — start tracking
    header.addEventListener('touchstart', function (e) {
      startY   = e.touches[0].clientY;
      currentY = startY;
      dragging = false;
    }, { passive: true });

    // HEADER touchmove — if moving vertically, start dragging
    // and disable iframe pointer-events so we capture future moves
    header.addEventListener('touchmove', function (e) {
      currentY = e.touches[0].clientY;
      var diff = currentY - startY;

      if (Math.abs(diff) > 8) {
        dragging = true;
        if (e.cancelable) e.preventDefault();

        // Kill iframe touch capture
        iframe.style.pointerEvents = 'none';

        content.style.transition = 'none';
        modal.style.transition   = 'none';
        content.style.transform  = 'translateY(' + diff + 'px)';

        var opacity = 1 - (Math.abs(diff) / (window.innerHeight * 0.7));
        modal.style.opacity = Math.max(0, opacity);
      }
    }, { passive: false });

    header.addEventListener('touchend', finishDrag);

    // CONTENT touchmove — fires once iframe pointer-events are disabled
    content.addEventListener('touchstart', function (e) {
      // Only track if we're already in drag mode (iframe disabled)
      if (iframe.style.pointerEvents === 'none') {
        startY   = e.touches[0].clientY;
        currentY = startY;
      }
    }, { passive: true });

    content.addEventListener('touchmove', function (e) {
      if (!dragging) return;

      currentY = e.touches[0].clientY;
      var diff = currentY - startY;

      if (e.cancelable) e.preventDefault();

      content.style.transition = 'none';
      modal.style.transition   = 'none';
      content.style.transform  = 'translateY(' + diff + 'px)';

      var opacity = 1 - (Math.abs(diff) / (window.innerHeight * 0.7));
      modal.style.opacity = Math.max(0, opacity);
    }, { passive: false });

    content.addEventListener('touchend', finishDrag);

    function finishDrag() {
      // Restore iframe interaction
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
        setTimeout(function () {
          closePlatformPreview();
        }, 300);
      } else {
        content.style.transform = 'translateY(0)';
        modal.style.opacity = '1';
      }
    }
  });
})();
