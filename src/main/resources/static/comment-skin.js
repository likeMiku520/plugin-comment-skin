/**
 * Comment Next skin - shadow root styles and emote panel placement.
 *
 * Every element the widget renders lives in an open shadow root, so page-level
 * CSS cannot reach it. This script appends one style element to each widget it
 * finds and keeps the desktop emote panel anchored to its trigger button.
 */
(function () {
  'use strict';

  if (window.__commentSkinInstalled) {
    return;
  }
  window.__commentSkinInstalled = true;

  var HOST_SELECTOR = 'comment-widget, comment-next';
  var SHADOW_CSS = `    /* Pagination */
    [class*="comment-next-pagination"],
    [class*="comment-next-pager"],
    .comment-next-comments nav,
    .comment-next-comments [role="navigation"] {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      width: 100% !important;
      margin: 22px auto 6px !important;
      padding: 0 !important;
      list-style: none !important;
    }
    [class*="comment-next-pagination"] button,
    [class*="comment-next-pagination"] a,
    [class*="comment-next-pager"] button,
    [class*="comment-next-pager"] a,
    .comment-next-comments nav button,
    .comment-next-comments nav a,
    .comment-next-comments [role="navigation"] button,
    .comment-next-comments [role="navigation"] a {
      box-sizing: border-box !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 36px !important;
      height: 36px !important;
      padding: 0 12px !important;
      margin: 0 !important;
      border: 1px solid var(--cc-border, #e3e8ee) !important;
      border-radius: 10px !important;
      background: var(--cc-surface, #fff) !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      line-height: 1 !important;
      cursor: pointer !important;
      transition: border-color .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease, transform .12s ease !important;
    }
    [class*="comment-next-pagination"] button:hover:not(:disabled):not([aria-current="page"]):not([data-active]),
    [class*="comment-next-pagination"] a:hover,
    [class*="comment-next-pager"] button:hover:not(:disabled):not([aria-current="page"]):not([data-active]),
    [class*="comment-next-pager"] a:hover,
    .comment-next-comments nav button:hover:not(:disabled):not([aria-current="page"]):not([data-active]),
    .comment-next-comments nav a:hover {
      border-color: var(--cc-pin-border, #a7e3df) !important;
      background: var(--cc-pin-soft, #e6f8f7) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
    }
    [class*="comment-next-pagination"] button:active:not(:disabled),
    [class*="comment-next-pager"] button:active:not(:disabled),
    .comment-next-comments nav button:active:not(:disabled) {
      transform: scale(.96) !important;
    }
    [class*="comment-next-pagination"] button:disabled,
    [class*="comment-next-pagination"] a[aria-disabled="true"],
    [class*="comment-next-pager"] button:disabled,
    .comment-next-comments nav button:disabled {
      opacity: .38 !important;
      cursor: not-allowed !important;
      box-shadow: none !important;
      background: var(--cc-surface-soft, #f4f6f8) !important;
      border-color: var(--cc-border-soft, #edf0f4) !important;
      color: var(--cc-muted, #8993a0) !important;
    }
    [class*="comment-next-pagination"] button[aria-current="page"],
    [class*="comment-next-pagination"] button[data-active],
    [class*="comment-next-pagination"] button[aria-selected="true"],
    [class*="comment-next-pager"] button[aria-current="page"],
    [class*="comment-next-pager"] button[data-active],
    [class*="comment-next-pager"] button[aria-selected="true"],
    .comment-next-comments nav button[aria-current="page"],
    .comment-next-comments nav button[data-active] {
      background: var(--cc-pin, #39c5bb) !important;
      border-color: transparent !important;
      color: var(--cc-pin-ink, #fff) !important;
      font-weight: 600 !important;
      opacity: 1 !important;
      cursor: default !important;
      box-shadow: 0 5px 13px -5px var(--cc-pin-shadow, rgba(57, 197, 187, .28)) !important;
    }

    /* Latest / hottest / oldest switch */
    .comment-next-comments-bar {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
      padding: 4px 0 12px !important;
      margin-bottom: 4px !important;
      border-bottom: 1px solid var(--cc-border-soft, #edf0f4) !important;
    }
    .comment-next-comments-tabs {
      display: inline-flex !important;
      align-items: center !important;
      gap: 3px !important;
      padding: 3px !important;
      border: 1px solid var(--cc-border-soft, #edf0f4) !important;
      border-radius: 999px !important;
      background: var(--cc-surface-soft, #f4f6f8) !important;
    }
    .comment-next-comments-tabs button {
      box-sizing: border-box !important;
      min-height: 30px !important;
      padding: 0 14px !important;
      border: 0 !important;
      border-radius: 999px !important;
      background: transparent !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 12.5px !important;
      font-weight: 500 !important;
      white-space: nowrap !important;
      cursor: pointer !important;
      /* The active pill is solid white; cross-fading it makes both pills look
         half-lit for a frame when the sort changes. */
      transition: none !important;
    }
    .comment-next-comments-tabs button:hover {
      color: var(--cc-name, #354252) !important;
    }
    .comment-next-comments-tabs button.comment-next-comments-tab-active,
    .comment-next-comments-tabs button[aria-pressed="true"] {
      background: var(--cc-surface, #fff) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
      font-weight: 600 !important;
      box-shadow: 0 1px 4px var(--cc-shadow-soft, rgba(15, 23, 42, .08)) !important;
    }
    .comment-next-comments-count {
      color: var(--cc-placeholder, #a0aab5) !important;
      font-size: 12.5px !important;
      font-weight: 500 !important;
    }

    /* Comment composer only */
    .comment-next-composer-frame {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 0 22px !important;
    }
    .comment-next-composer-surface {
      overflow: hidden !important;
      border: 1px solid var(--cc-border, #e3e8ee) !important;
      border-radius: 15px !important;
      background: var(--cc-surface, #fff) !important;
      box-shadow: 0 3px 14px -9px var(--cc-shadow-soft, rgba(15, 23, 42, .12)) !important;
      transition: border-color .18s ease, box-shadow .18s ease !important;
    }
    .comment-next-composer:focus-within .comment-next-composer-surface {
      border-color: var(--cc-pin-border, #a7e3df) !important;
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--cc-pin, #39c5bb) 10%, transparent), 0 5px 18px -10px var(--cc-shadow-soft, rgba(15, 23, 42, .12)) !important;
    }
    .comment-next-composer-writing,
    .comment-next-editor-wrap {
      min-width: 0 !important;
      max-width: 100% !important;
    }
    .comment-next-editor {
      box-sizing: border-box !important;
      min-height: 116px !important;
      padding: 15px 16px 12px !important;
      color: var(--cc-text, #27313f) !important;
      font-size: 14.5px !important;
      line-height: 1.72 !important;
    }
    .comment-next-footer {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: nowrap !important;
      gap: 9px !important;
      padding: 9px 12px !important;
      border-top: 1px solid var(--cc-border-soft, #edf0f4) !important;
      background: var(--cc-surface, #fff) !important;
    }
    .comment-next-footer-left,
    .comment-next-footer-tools,
    .comment-next-insert-tools-region,
    .comment-next-insert-tools,
    .comment-next-submit-area {
      display: flex !important;
      align-items: center !important;
      gap: 7px !important;
      min-width: 0 !important;
    }
    .comment-next-footer-left {
      flex: 1 1 auto !important;
      flex-wrap: nowrap !important;
      justify-content: flex-start !important;
    }
    .comment-next-footer-identity,
    .comment-next-footer-tools,
    .comment-next-insert-tools-region,
    .comment-next-insert-tools {
      flex: 0 0 auto !important;
      flex-wrap: nowrap !important;
    }
    .comment-next-submit-area {
      flex: 0 0 auto !important;
      flex-wrap: nowrap !important;
      justify-content: flex-end !important;
      margin-left: auto !important;
    }
    .comment-next-composer-identity,
    .comment-next-tool-button {
      box-sizing: border-box !important;
      display: inline-flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: center !important;
      width: 34px !important;
      min-width: 34px !important;
      height: 34px !important;
      min-height: 34px !important;
      padding: 0 !important;
      border: 0 !important;
      border-radius: 9px !important;
      background: transparent !important;
      color: var(--cc-muted, #8993a0) !important;
      transition: color .16s ease, background .16s ease, transform .16s ease !important;
    }
    .comment-next-composer-identity:hover,
    .comment-next-tool-button:hover {
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
    }
    .comment-next-tool-button:active,
    .comment-next-composer-identity:active {
      transform: scale(.96) !important;
    }
    .comment-next-submit-button {
      box-sizing: border-box !important;
      display: inline-flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      min-height: 36px !important;
      padding: 0 15px !important;
      border: 0 !important;
      border-radius: 9px !important;
      background: var(--cc-pin, #39c5bb) !important;
      color: var(--cc-pin-ink, #fff) !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
      box-shadow: 0 4px 12px -7px var(--cc-pin-shadow, rgba(57, 197, 187, .35)) !important;
      transition: background .16s ease, box-shadow .16s ease, transform .16s ease !important;
    }
    .comment-next-submit-button:hover:not(:disabled) {
      background: var(--cc-pin-hover, #2fb3aa) !important;
      box-shadow: 0 6px 15px -7px var(--cc-pin-shadow, rgba(57, 197, 187, .35)) !important;
    }
    .comment-next-submit-button:active:not(:disabled) {
      transform: translateY(1px) scale(.98) !important;
    }

    /* QQ-inspired emoji picker: five-column grid and bottom category dock */
    .comment-next-emote-panel {
      box-sizing: border-box !important;
      position: fixed !important;
      inset: auto !important;
      left: clamp(12px, var(--comment-next-emote-fixed-left, 12px), calc(100vw - min(var(--comment-next-emote-fixed-width, 520px), calc(100vw - 24px)) - 12px)) !important;
      top: clamp(12px, var(--comment-next-emote-fixed-top, 12px), calc(100dvh - min(var(--comment-next-emote-fixed-height, 420px), calc(100dvh - 24px)) - 12px)) !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      width: min(var(--comment-next-emote-fixed-width, 520px), calc(100vw - 24px)) !important;
      height: min(var(--comment-next-emote-fixed-height, 420px), calc(100dvh - 24px)) !important;
      max-width: calc(100vw - 24px) !important;
      max-height: calc(100dvh - 24px) !important;
      min-width: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 8px !important;
      gap: 0 !important;
      overflow: hidden !important;
      border: 1px solid var(--cc-border, #e3e8ee) !important;
      border-radius: 15px !important;
      background: var(--cc-surface, #fff) !important;
      color: var(--cc-text, #27313f) !important;
      box-shadow: 0 14px 38px rgba(20, 32, 48, .17), 0 2px 7px rgba(20, 32, 48, .06) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      overscroll-behavior: contain !important;
      animation: none !important;
      transition: none !important;
      will-change: auto !important;
    }
    .comment-next-emote-panel:popover-open {
      display: flex !important;
    }

    /* The search/count row now blends into the panel instead of reading as a separate box */
    .comment-next-emote-head {
      box-sizing: border-box !important;
      display: flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      gap: 10px !important;
      min-width: 0 !important;
      min-height: 48px !important;
      padding: 2px 4px 8px !important;
      border: 0 !important;
      background: transparent !important;
    }
    .comment-next-emote-search {
      box-sizing: border-box !important;
      display: flex !important;
      flex: 1 1 auto !important;
      align-items: center !important;
      min-width: 0 !important;
      height: 36px !important;
      gap: 8px !important;
      padding: 0 13px !important;
      border: 1px solid transparent !important;
      border-radius: 999px !important;
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-muted, #8993a0) !important;
      transition: border-color .15s ease, background .15s ease, box-shadow .15s ease !important;
    }
    .comment-next-emote-search:focus-within {
      border-color: var(--cc-pin-border, #a7e3df) !important;
      background: var(--cc-surface, #fff) !important;
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--cc-pin, #39c5bb) 11%, transparent) !important;
    }
    .comment-next-emote-search > span {
      flex: 0 0 auto !important;
      font-size: 19px !important;
      line-height: 1 !important;
      color: var(--cc-muted, #8993a0) !important;
    }
    .comment-next-emote-search input {
      box-sizing: border-box !important;
      flex: 1 1 auto !important;
      width: 100% !important;
      min-width: 0 !important;
      height: 100% !important;
      padding: 0 !important;
      border: 0 !important;
      outline: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      color: var(--cc-text, #27313f) !important;
      font: inherit !important;
      font-size: 13px !important;
    }
    .comment-next-emote-search input::placeholder {
      color: var(--cc-placeholder, #a0aab5) !important;
    }
    .comment-next-emote-count {
      flex: 0 0 auto !important;
      padding: 0 3px !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 11.5px !important;
      font-weight: 500 !important;
      line-height: 1.2 !important;
      white-space: nowrap !important;
      font-variant-numeric: tabular-nums !important;
    }

    .comment-next-emote-body {
      display: flex !important;
      flex: 1 1 auto !important;
      flex-direction: column !important;
      min-width: 0 !important;
      min-height: 0 !important;
      gap: 0 !important;
      overflow: hidden !important;
      background: transparent !important;
    }
    .comment-next-emote-body-searching {
      display: flex !important;
      flex-direction: column !important;
    }
    .comment-next-emote-body-searching .comment-next-emote-tabs {
      display: flex !important;
    }

    /* Main content remains above; category selector is a bottom dock on desktop and mobile */
    .comment-next-emote-content {
      box-sizing: border-box !important;
      display: flex !important;
      order: 1 !important;
      flex: 1 1 auto !important;
      flex-direction: column !important;
      min-width: 0 !important;
      min-height: 0 !important;
      padding: 5px 3px 2px !important;
      overflow: hidden !important;
    }
    .comment-next-emote-tabs {
      box-sizing: border-box !important;
      display: flex !important;
      order: 2 !important;
      flex: 0 0 auto !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 6px !important;
      width: 100% !important;
      min-width: 0 !important;
      min-height: 48px !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 7px 4px 2px !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      scrollbar-width: none !important;
    }
    .comment-next-emote-tabs::-webkit-scrollbar {
      display: none !important;
    }
    .comment-next-emote-tabs button {
      box-sizing: border-box !important;
      display: inline-flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 7px !important;
      min-width: 0 !important;
      min-height: 36px !important;
      height: 36px !important;
      margin: 0 !important;
      padding: 0 12px !important;
      border: 1px solid transparent !important;
      border-radius: 10px !important;
      background: transparent !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      white-space: nowrap !important;
      cursor: pointer !important;
      transition: color .14s ease, background .14s ease, border-color .14s ease, transform .14s ease !important;
    }
    .comment-next-emote-tabs button:hover {
      color: var(--cc-text, #27313f) !important;
      background: var(--cc-surface-soft, #f4f6f8) !important;
    }
    .comment-next-emote-tabs button:active {
      transform: scale(.97) !important;
    }
    .comment-next-emote-tabs button.comment-next-emote-tab-active,
    .comment-next-emote-tabs button[aria-pressed="true"] {
      border-color: color-mix(in srgb, var(--cc-pin, #39c5bb) 20%, transparent) !important;
      background: var(--cc-pin-soft, #e6f8f7) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
      font-weight: 600 !important;
      box-shadow: none !important;
    }
    .comment-next-emote-tabs button > span:not(.cc-emote-tab-thumb) {
      display: inline-block !important;
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }
    .comment-next-emote-tabs button .cc-emote-tab-thumb {
      display: block !important;
      flex: 0 0 23px !important;
      width: 23px !important;
      height: 23px !important;
      object-fit: contain !important;
      border-radius: 6px !important;
      background: var(--cc-surface, #fff) !important;
      pointer-events: none !important;
    }
    .comment-next-emote-tabs button small {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 18px !important;
      height: 18px !important;
      padding: 0 4px !important;
      border-radius: 6px !important;
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 9.5px !important;
      line-height: 1 !important;
      font-variant-numeric: tabular-nums !important;
    }
    .comment-next-emote-tabs button[aria-pressed="true"] small {
      background: color-mix(in srgb, var(--cc-pin, #39c5bb) 14%, transparent) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
    }

    .comment-next-emote-grid,
    .comment-next-emote-grid-image {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      grid-auto-rows: 76px !important;
      align-content: start !important;
      align-items: stretch !important;
      justify-content: stretch !important;
      gap: 5px !important;
      width: 100% !important;
      min-width: 0 !important;
      min-height: 0 !important;
      max-height: none !important;
      flex: 1 1 auto !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      padding: 2px 3px 5px 2px !important;
      overscroll-behavior: contain !important;
      scrollbar-width: thin !important;
      scrollbar-color: var(--cc-border, #e3e8ee) transparent !important;
    }
    .comment-next-emote-grid::-webkit-scrollbar {
      width: 5px !important;
      height: 5px !important;
    }
    .comment-next-emote-grid::-webkit-scrollbar-thumb {
      border-radius: 99px !important;
      background: var(--cc-border, #e3e8ee) !important;
    }
    .comment-next-emote-item {
      box-sizing: border-box !important;
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-direction: column !important;
      width: 100% !important;
      min-width: 0 !important;
      min-height: 0 !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 4px 3px !important;
      overflow: hidden !important;
      border: 1px solid transparent !important;
      border-radius: 8px !important;
      background: transparent !important;
      color: var(--cc-text, #27313f) !important;
      cursor: pointer !important;
      transition: border-color .13s ease, background .13s ease, transform .13s ease !important;
    }
    .comment-next-emote-item-image {
      gap: 4px !important;
    }
    .comment-next-emote-item img {
      display: block !important;
      flex: 0 1 auto !important;
      width: auto !important;
      height: auto !important;
      max-width: 46px !important;
      max-height: 46px !important;
      object-fit: contain !important;
      border-radius: 4px !important;
      user-select: none !important;
      -webkit-user-drag: none !important;
    }
    .comment-next-emote-item-image::after {
      content: attr(title) !important;
      display: block !important;
      flex: 0 0 auto !important;
      width: 100% !important;
      min-width: 0 !important;
      overflow: hidden !important;
      color: var(--cc-text-secondary, #465160) !important;
      font-size: 10px !important;
      font-weight: 400 !important;
      line-height: 1.2 !important;
      text-align: center !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      pointer-events: none !important;
    }
    .comment-next-emote-item:hover {
      border-color: color-mix(in srgb, var(--cc-pin, #39c5bb) 24%, transparent) !important;
      background: color-mix(in srgb, var(--cc-pin, #39c5bb) 7%, transparent) !important;
    }
    .comment-next-emote-item:active {
      transform: scale(.96) !important;
    }
    .comment-next-emote-item[aria-pressed="true"],
    .comment-next-emote-item-selected {
      border-color: transparent !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    .comment-next-emote-item .comment-next-emote-selection-mark,
    .comment-next-emote-item [class*="selection-mark"] {
      display: none !important;
      visibility: hidden !important;
    }
    .comment-next-emote-item::before {
      display: none !important;
      content: none !important;
    }
    .comment-next-emote-item[aria-pressed="true"] img,
    .comment-next-emote-item-selected img {
      outline: none !important;
      box-shadow: none !important;
    }

    .comment-next-emote-pagination {
      display: flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 8px !important;
      min-height: 32px !important;
      margin-top: 4px !important;
      padding: 4px 2px 0 !important;
      border-top: 1px solid var(--cc-border-soft, #edf0f4) !important;
    }
    .comment-next-emote-pagination button {
      min-height: 27px !important;
      padding: 0 9px !important;
      border: 0 !important;
      border-radius: 7px !important;
      background: transparent !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 11px !important;
    }
    .comment-next-emote-pagination button:hover:not(:disabled) {
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
    }
    .comment-next-emote-empty {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 120px !important;
      border: 1px dashed var(--cc-border, #e3e8ee) !important;
      border-radius: 8px !important;
      color: var(--cc-muted, #8993a0) !important;
      font-size: 13px !important;
    }
    .comment-next-emote-panel button:focus-visible {
      outline: 2px solid var(--cc-pin, #39c5bb) !important;
      outline-offset: 1px !important;
    }

    @media (max-width: 780px) {
      .comment-next-emote-panel {
        position: fixed !important;
        inset: auto 0 0 0 !important;
        left: 0 !important;
        right: 0 !important;
        top: auto !important;
        bottom: 0 !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: min(320px, 46dvh) !important;
        max-height: min(320px, 46dvh) !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 7px 8px calc(5px + env(safe-area-inset-bottom, 0px)) !important;
        border-right: 0 !important;
        border-bottom: 0 !important;
        border-left: 0 !important;
        border-radius: 15px 15px 0 0 !important;
        box-shadow: 0 -8px 28px rgba(18, 28, 42, .15) !important;
        transform-origin: center bottom !important;
        animation: none !important;
      transition: none !important;
      transform: none !important;
      }
      .comment-next-emote-head {
        min-height: 43px !important;
        padding: 0 2px 5px !important;
      }
      .comment-next-emote-search {
        height: 33px !important;
      }
      .comment-next-emote-count {
        font-size: 10.5px !important;
      }
      .comment-next-emote-content {
        padding: 3px 1px 0 !important;
      }
      .comment-next-emote-tabs {
        min-height: 43px !important;
        max-height: none !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 4px !important;
        padding: 5px 1px 2px !important;
        overflow: visible !important;
      }
      .comment-next-emote-tabs button {
        min-height: 32px !important;
        height: 32px !important;
        flex: 0 0 auto !important;
        gap: 5px !important;
        padding: 0 8px !important;
        border-radius: 9px !important;
        font-size: 11px !important;
      }
      .comment-next-emote-tabs button .cc-emote-tab-thumb {
        flex-basis: 20px !important;
        width: 20px !important;
        height: 20px !important;
      }
      .comment-next-emote-grid,
      .comment-next-emote-grid-image {
        grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
        grid-auto-rows: 68px !important;
        gap: 3px !important;
      }
      .comment-next-emote-item img {
        max-width: 40px !important;
        max-height: 40px !important;
      }
      .comment-next-emote-item .comment-next-emote-selection-mark,
      .comment-next-emote-item [class*="selection-mark"] {
        display: none !important;
        visibility: hidden !important;
      }
      .comment-next-emote-item[aria-pressed="true"],
      .comment-next-emote-item-selected {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none !important;
      }
      .comment-next-emote-item-image::after {
        font-size: 9px !important;
      }
      .comment-next-emote-pagination {
        min-height: 27px !important;
        margin-top: auto !important;
        padding-top: 2px !important;
      }
      .comment-next-emote-pagination button {
        min-height: 24px !important;
      }
    }

    @media (max-width: 780px) and (max-height: 560px) {
      .comment-next-emote-panel {
        height: min(285px, 58dvh) !important;
        max-height: 60dvh !important;
      }
      .comment-next-emote-grid,
      .comment-next-emote-grid-image {
        grid-auto-rows: 62px !important;
      }
      .comment-next-emote-tabs {
        min-height: 39px !important;
        max-height: 42px !important;
      }
    }

    @media (max-width: 640px) {
      .comment-next-editor {
        min-height: 104px !important;
        padding: 13px 13px 10px !important;
        font-size: 14px !important;
      }
      .comment-next-footer {
        display: flex !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 5px !important;
        padding: 7px 8px !important;
      }
      .comment-next-footer-left {
        display: flex !important;
        flex: 1 1 auto !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 4px !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: none !important;
      }
      .comment-next-footer-identity,
      .comment-next-footer-tools,
      .comment-next-insert-tools-region,
      .comment-next-insert-tools {
        display: flex !important;
        flex: 0 0 auto !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        gap: 3px !important;
        min-width: 0 !important;
      }
      .comment-next-footer-tools {
        margin-left: 0 !important;
      }
      .comment-next-composer-identity,
      .comment-next-tool-button {
        width: 31px !important;
        min-width: 31px !important;
        height: 31px !important;
        min-height: 31px !important;
      }
      .comment-next-submit-area {
        display: flex !important;
        flex: 0 0 auto !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: flex-end !important;
        width: auto !important;
        max-width: none !important;
        min-width: 0 !important;
        margin-left: auto !important;
      }
      .comment-next-submit-button {
        flex: 0 0 auto !important;
        min-width: 0 !important;
        min-height: 33px !important;
        height: 33px !important;
        padding: 0 10px !important;
        gap: 5px !important;
        white-space: nowrap !important;
        font-size: 12px !important;
      }
      .comment-next-comments-bar {
        align-items: center !important;
        gap: 8px !important;
      }
      .comment-next-comments-tabs {
        max-width: 100% !important;
        overflow-x: auto !important;
      }
      .comment-next-comments-tabs button {
        padding: 0 10px !important;
        white-space: nowrap !important;
      }
      .comment-next-comments-count {
        white-space: nowrap !important;
      }
    }

    @media (max-width: 360px) {
      .comment-next-footer {
        gap: 3px !important;
        padding-right: 6px !important;
        padding-left: 6px !important;
      }
      .comment-next-footer-left {
        gap: 3px !important;
      }
      .comment-next-composer-identity,
      .comment-next-tool-button {
        width: 29px !important;
        min-width: 29px !important;
        height: 29px !important;
        min-height: 29px !important;
      }
      .comment-next-submit-button {
        padding: 0 8px !important;
        font-size: 11.5px !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .comment-next-emote-panel,
      .comment-next-emote-item,
      .comment-next-emote-tabs button,
      .comment-next-composer-surface,
      .comment-next-tool-button,
      .comment-next-submit-button {
        animation: none !important;
        transition: none !important;
      }
    }
    /* V8: stable picker layout; no category thumbnails or open-time hydration */
    .comment-next-emote-preview,
    [class*="comment-next-emote-preview"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* Only the grid scrolls. The pager keeps its place at the bottom of the
       content column, so a page holding one or two rows cannot pull it up. */
    .comment-next-emote-content {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      overflow: hidden !important;
      overscroll-behavior: contain !important;
    }
    .comment-next-emote-grid,
    .comment-next-emote-grid-image {
      height: auto !important;
      max-height: none !important;
      flex: 1 1 auto !important;
      min-height: 0 !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      overscroll-behavior: contain !important;
      scrollbar-width: thin !important;
      scrollbar-color: var(--cc-border, #e3e8ee) transparent !important;
      align-content: start !important;
    }
    .comment-next-emote-grid::-webkit-scrollbar,
    .comment-next-emote-grid-image::-webkit-scrollbar {
      width: 5px !important;
    }
    .comment-next-emote-grid::-webkit-scrollbar-thumb,
    .comment-next-emote-grid-image::-webkit-scrollbar-thumb {
      border-radius: 99px !important;
      background: var(--cc-border, #e3e8ee) !important;
    }
    .comment-next-emote-pagination {
      display: flex !important;
      flex: 0 0 auto !important;
      position: static !important;
      visibility: visible !important;
      opacity: 1 !important;
      margin-top: auto !important;
    }

    /* Category dock: one horizontal, left-aligned row; every button keeps
       its natural width instead of inheriting Svelte's full-width default. */
    .comment-next-emote-tabs {
      box-sizing: border-box !important;
      display: flex !important;
      flex: 0 0 auto !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: flex-start !important;
      align-self: stretch !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      white-space: nowrap !important;
      scrollbar-width: none !important;
      -webkit-overflow-scrolling: touch !important;
    }
    .comment-next-emote-tabs::-webkit-scrollbar {
      display: none !important;
    }
    .comment-next-emote-tabs button {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      width: auto !important;
      min-width: max-content !important;
      max-width: none !important;
      margin: 0 !important;
    }
    .comment-next-emote-tabs button > span {
      min-width: 0 !important;
    }

    /* Identity dialog: the component asks for the composer tokens, which are
       only declared inside the composer itself, so it fell back to square
       corners and borderless buttons. The host now supplies those tokens and
       these rules pin the chrome to the composer input area. */
    .comment-next-identity-dialog {
      border: 1px solid var(--cc-border, #e3e8ee) !important;
      border-radius: 15px !important;
      background: var(--cc-surface, #fff) !important;
      box-shadow: 0 14px 38px rgba(20, 32, 48, .17), 0 2px 7px rgba(20, 32, 48, .06) !important;
    }
    .comment-next-identity-header h2 {
      font-size: 15px !important;
      font-weight: 650 !important;
    }
    .comment-next-identity-close {
      border-radius: 9px !important;
      color: var(--cc-muted, #8993a0) !important;
    }
    .comment-next-identity-close:hover {
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-name, #354252) !important;
    }
    .comment-next-identity-choices {
      border: 1px solid var(--cc-border-soft, #edf0f4) !important;
      border-radius: 12px !important;
      overflow: hidden !important;
    }
    .comment-next-identity-choice {
      border-radius: 0 !important;
    }
    .comment-next-identity-choice:hover {
      background: var(--cc-surface-soft, #f4f6f8) !important;
    }
    .comment-next-identity-choice-icon {
      color: var(--cc-pin, #39c5bb) !important;
    }
    .comment-next-identity-choice + .comment-next-identity-choice {
      border-top-color: var(--cc-border-soft, #edf0f4) !important;
    }
    .comment-next-identity-confirm {
      min-height: 34px !important;
      padding: 0 14px !important;
      border-radius: 9px !important;
      background: var(--cc-pin, #39c5bb) !important;
      color: var(--cc-pin-ink, #fff) !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      box-shadow: 0 4px 12px -7px var(--cc-pin-shadow, rgba(57, 197, 187, .35)) !important;
    }
    .comment-next-identity-confirm:hover {
      background: var(--cc-pin-hover, #2fb3aa) !important;
    }
    .comment-next-identity-back {
      border-radius: 9px !important;
      color: var(--cc-muted, #8993a0) !important;
    }
    .comment-next-identity-back:hover {
      background: var(--cc-surface-soft, #f4f6f8) !important;
      color: var(--cc-pin-hover, #2fb3aa) !important;
    }
    .comment-next-identity-form-actions {
      border-top: 1px solid var(--cc-border-soft, #edf0f4) !important;
    }
    .comment-next-identity-description {
      color: var(--cc-muted, #8993a0) !important;
    }
    .comment-next-account-fields {
      gap: 10px !important;
    }
    .comment-next-account-legend {
      color: var(--cc-text-secondary, #465160) !important;
      font-size: 12.5px !important;
      font-weight: 600 !important;
    }
    .comment-next-field input {
      border: 1px solid var(--cc-border, #e3e8ee) !important;
      border-radius: 10px !important;
      background: var(--cc-surface, #fff) !important;
      color: var(--cc-text, #27313f) !important;
      transition: border-color .16s ease, box-shadow .16s ease !important;
    }
    .comment-next-field input:focus {
      border-color: var(--cc-pin, #39c5bb) !important;
      outline: none !important;
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--cc-pin, #39c5bb) 10%, transparent) !important;
    }
    @media (max-width: 780px) {
      .comment-next-emote-tabs {
        flex-wrap: nowrap !important;
        justify-content: flex-start !important;
        min-height: 43px !important;
        max-height: 46px !important;
        padding-inline: 2px !important;
      }
      .comment-next-emote-content {
        overflow-y: hidden !important;
      }
    }
`;

  var EMOTE_PACKS_API = '/apis/api.commentnext.xhhao.com/v1alpha1/emotes';
  var CONFIG_API = '/apis/api.commentnext.xhhao.com/v1alpha1/config';
  var EMOTE_PAGE_SIZE = 30;
  var tabThumbs;
  var tabThumbsRequest;

  /* The picker takes its page size from the comment plugin config, which accepts
     anything up to 100. Rewrite that single field in the config response so a
     page never holds more than 30 entries; the rest of the payload is untouched. */
  function patchEmotePageSize() {
    if (!window.fetch || window.fetch.__commentSkinPatched) {
      return;
    }
    var nativeFetch = window.fetch;
    var patched = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var pending = nativeFetch.apply(this, arguments);
      if (url.indexOf(CONFIG_API) === -1) {
        return pending;
      }
      return pending.then(function (response) {
        if (!response || !response.ok) {
          return response;
        }
        return response.clone().json().then(function (data) {
          if (!data || !data.emote) {
            return response;
          }
          data.emote.pageSize = EMOTE_PAGE_SIZE;
          var headers = new Headers(response.headers);
          headers.delete('content-length');
          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: headers
          });
        }).catch(function () {
          return response;
        });
      });
    };
    patched.__commentSkinPatched = true;
    window.fetch = patched;
  }

  function firstImageSource(raw) {
    if (typeof raw !== 'string') {
      return '';
    }
    var match = raw.match(/src=["']([^"']+)["']/i);
    if (!match) {
      return '';
    }
    return match[1].replace(/&amp;/g, '&');
  }

  /* Category thumbnails come from the first entry of each pack, read from the
     same JSON the picker already loads. */
  function loadTabThumbs() {
    if (tabThumbs) {
      return Promise.resolve(tabThumbs);
    }
    if (tabThumbsRequest) {
      return tabThumbsRequest;
    }
    tabThumbsRequest = window.fetch(EMOTE_PACKS_API, {
      credentials: 'include',
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      return response.ok ? response.json() : null;
    }).then(function (data) {
      var map = new Map();
      if (!data || typeof data !== 'object') {
        return map;
      }
      Object.keys(data).forEach(function (name) {
        var pack = data[name];
        var items = pack && pack.container;
        if (!items || !items.length) {
          return;
        }
        for (var i = 0; i < items.length; i++) {
          var item = items[i] || {};
          var src = firstImageSource(item.icon || item.src || item.value);
          if (src) {
            map.set(name, src);
            return;
          }
        }
      });
      return map;
    }).catch(function () {
      return new Map();
    }).then(function (map) {
      tabThumbs = map || new Map();
      document.querySelectorAll(HOST_SELECTOR).forEach(function (host) {
        decorateTabs(host.shadowRoot);
      });
      return tabThumbs;
    });
    return tabThumbsRequest;
  }

  function decorateTabs(root) {
    if (!root) {
      return;
    }
    var buttons = root.querySelectorAll('.comment-next-emote-tabs button');
    if (!buttons.length) {
      return;
    }
    if (!tabThumbs) {
      loadTabThumbs();
      return;
    }
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (button.querySelector('.cc-emote-tab-thumb')) {
        continue;
      }
      var label = button.querySelector('span');
      var name = (label ? label.textContent : button.textContent).trim();
      if (!name || name === '最近') {
        continue;
      }
      var src = tabThumbs.get(name);
      if (!src) {
        continue;
      }
      var thumb = document.createElement('img');
      thumb.className = 'cc-emote-tab-thumb';
      thumb.src = src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      button.insertBefore(thumb, button.firstChild);
    }
  }

  function observeRoot(root) {
    if (!root || root.__commentSkinObserved) {
      return;
    }
    root.__commentSkinObserved = true;
    var scheduled = false;
    new MutationObserver(function () {
      if (scheduled) {
        return;
      }
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        decorateTabs(root);
      });
    }).observe(root, { childList: true, subtree: true });
  }

  function inject(host) {
    var root = host && host.shadowRoot;
    if (!root) {
      return;
    }
    if (root.__commentSkinInstalled) {
      decorateTabs(root);
      return;
    }
    var style = document.createElement('style');
    style.setAttribute('data-comment-skin', '');
    style.textContent = SHADOW_CSS;
    root.appendChild(style);
    root.__commentSkinInstalled = true;
    observeRoot(root);
    decorateTabs(root);
  }

  function scan() {
    var hosts = document.querySelectorAll(HOST_SELECTOR);
    for (var i = 0; i < hosts.length; i++) {
      inject(hosts[i]);
    }
  }

  var scanScheduled = false;

  function scheduleScan() {
    if (scanScheduled) {
      return;
    }
    scanScheduled = true;
    window.requestAnimationFrame(function () {
      scanScheduled = false;
      scan();
    });
  }

  function start() {
    patchEmotePageSize();
    scan();
    var root = document.documentElement;
    if (!root) {
      return;
    }
    new MutationObserver(scheduleScan).observe(root, { childList: true, subtree: true });
  }

  function positionDesktopEmotePanel(host) {
    if (!host || !host.shadowRoot || window.matchMedia('(max-width: 780px)').matches) {
      return;
    }
    var panel = host.shadowRoot.querySelector('.comment-next-emote-panel');
    var button = host.shadowRoot.querySelector('.comment-next-tool-button[data-comment-next-tool="smile"]');
    if (!panel || !button) {
      return;
    }
    var panelStyle = window.getComputedStyle(panel);
    if (panelStyle.display === 'none' || panel.getClientRects().length === 0) {
      return;
    }

    var buttonRect = button.getBoundingClientRect();
    var panelRect = panel.getBoundingClientRect();
    var gap = 8;
    var margin = 12;
    var viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    var spaceAbove = Math.max(0, buttonRect.top - gap - margin);
    var spaceBelow = Math.max(0, viewportHeight - buttonRect.bottom - gap - margin);
    var placeAbove = spaceAbove >= panelRect.height || spaceAbove >= spaceBelow;
    var availableHeight = placeAbove ? spaceAbove : spaceBelow;
    var finalHeight = Math.max(120, Math.min(panelRect.height, availableHeight));
    var top = placeAbove
      ? buttonRect.top - finalHeight - gap
      : buttonRect.bottom + gap;

    panel.style.setProperty('--comment-next-emote-fixed-left', buttonRect.left + 'px');
    panel.style.setProperty('--comment-next-emote-fixed-top', top + 'px');
    panel.style.setProperty('--comment-next-emote-fixed-width', panelRect.width + 'px');
    panel.style.setProperty('--comment-next-emote-fixed-height', finalHeight + 'px');
  }

  function scheduleDesktopEmotePanelPosition(host) {
    if (!host) {
      return;
    }
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        positionDesktopEmotePanel(host);
      });
    });
  }

  /* The grid is the scrolling area, so paging and category changes must start
     at the top instead of keeping the previous offset. */
  function resetGridScroll(root) {
    if (!root || !root.querySelector) {
      return;
    }
    var grid = root.querySelector('.comment-next-emote-grid');
    if (!grid) {
      return;
    }
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        grid.scrollTop = 0;
      });
    });
  }

  document.addEventListener('click', function (event) {
    var path = event.composedPath ? event.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var node = path[i];
      if (!node || !node.matches) {
        continue;
      }
      if (node.matches('.comment-next-emote-pagination button, .comment-next-emote-tabs button')) {
        var pickerRoot = node.getRootNode && node.getRootNode();
        resetGridScroll(pickerRoot);
        return;
      }
      if (node.matches('.comment-next-tool-button[data-comment-next-tool="smile"]')) {
        var root = node.getRootNode && node.getRootNode();
        scheduleDesktopEmotePanelPosition(root && root.host);
        return;
      }
    }
  }, true);

  patchEmotePageSize();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
