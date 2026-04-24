function setTheme(theme: string) {
  document.body.dataset.theme = theme;
  document.querySelectorAll<HTMLButtonElement>("[data-theme-btn]").forEach((btn) => {
    const isActive = btn.dataset.themeBtn === theme;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  localStorage.setItem("cfv-theme", theme);
}

function format(n: number): string {
  return n.toLocaleString("es-HN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatL(n: number): string {
  return "L " + format(n);
}

function getVal(id: string): number {
  const v = parseFloat((document.getElementById(id) as HTMLInputElement).value);
  return isNaN(v) ? 0 : v;
}

function getMarginHealth(margin: number): { label: string; warning: boolean } {
  if (margin >= 20) return { label: "Excelente", warning: false };
  if (margin >= 10) return { label: "Saludable", warning: false };
  if (margin >= 5) return { label: "Aceptable", warning: false };
  if (margin >= 0) return { label: "Marginal", warning: true };
  return { label: "Pérdida", warning: true };
}

function calculate() {
  const cost = getVal("cost");
  const profitPct = getVal("profit");
  const ivaPct = getVal("iva");
  const bankPct = getVal("bankFee");
  const mktPct = getVal("marketing");
  const otherPct = getVal("otherCosts");
  const wholesaleDiscPct = wholesaleEnabled ? getVal("wholesaleDiscount") : 0;

  // Product name
  const productName = (document.getElementById("productName") as HTMLInputElement).value.trim();
  const productDisplay = document.getElementById("productDisplay")!;
  if (productName) {
    productDisplay.style.display = "block";
    document.getElementById("productDisplayName")!.textContent = productName;
  } else {
    productDisplay.style.display = "none";
  }

  // RETAIL breakdown
  const profit = (cost * profitPct) / 100;
  const priceWithProfit = cost + profit;
  const mkt = (cost * mktPct) / 100;
  const other = (cost * otherPct) / 100;
  const subtotal = priceWithProfit + mkt + other;
  const iva = (subtotal * ivaPct) / 100;
  const subtotalIva = subtotal + iva;
  const bankFee = (subtotalIva * bankPct) / 100;
  const finalPrice = subtotalIva + bankFee;

  const netProfit = profit;
  const netMargin = finalPrice > 0 ? (netProfit / finalPrice) * 100 : 0;

  // Update retail
  document.getElementById("finalPrice")!.textContent = format(finalPrice);
  document.getElementById("netProfit")!.textContent = formatL(netProfit);
  document.getElementById("netMargin")!.textContent = netMargin.toFixed(1) + "%";

  document.getElementById("br-cost")!.textContent = formatL(cost);
  document.getElementById("br-profit")!.textContent = formatL(profit);
  document.getElementById("br-profit-pct")!.textContent = "(" + profitPct + "%)";
  document.getElementById("br-mkt")!.textContent = formatL(mkt);
  document.getElementById("br-mkt-pct")!.textContent = "(" + mktPct + "%)";
  document.getElementById("br-other")!.textContent = formatL(other);
  document.getElementById("br-other-pct")!.textContent = "(" + otherPct + "%)";
  document.getElementById("br-subtotal")!.textContent = formatL(subtotal);
  document.getElementById("br-iva")!.textContent = formatL(iva);
  document.getElementById("br-iva-pct")!.textContent = "(" + ivaPct + "%)";
  document.getElementById("br-fee")!.textContent = formatL(bankFee);
  document.getElementById("br-fee-pct")!.textContent = "(" + bankPct + "%)";

  // Margin health indicator
  const health = getMarginHealth(netMargin);
  document.getElementById("marginHealthValue")!.textContent =
    health.label + " · " + netMargin.toFixed(1) + "%";
  const retailFillWidth = Math.max(0, Math.min(100, netMargin * 2));
  document.getElementById("marginFill")!.style.width = retailFillWidth + "%";
  document.getElementById("marginFill-bar")!.setAttribute("aria-valuenow", String(Math.round(retailFillWidth)));
  document
    .getElementById("retailMarginIndicator")!
    .classList.toggle("warning", health.warning);

  // WHOLESALE
  const wholesaleCard = document.getElementById("wholesaleCard")!;
  if (wholesaleDiscPct <= 0) {
    wholesaleCard.style.display = "none";
    return;
  }
  wholesaleCard.style.display = "";

  const wholesaleDiscount = (profit * wholesaleDiscPct) / 100;
  const wholesaleSub = subtotal - wholesaleDiscount;
  const wholesaleIva = (wholesaleSub * ivaPct) / 100;
  const wholesaleSubIva = wholesaleSub + wholesaleIva;
  const wholesaleFee = (wholesaleSubIva * bankPct) / 100;
  const wholesaleFinal = wholesaleSubIva + wholesaleFee;

  const wholesaleNet =
    wholesaleFinal - cost - mkt - other - wholesaleIva - wholesaleFee;
  const wholesaleMarginPct =
    wholesaleFinal > 0 ? (wholesaleNet / wholesaleFinal) * 100 : 0;

  document.getElementById("wholesalePrice")!.textContent = format(wholesaleFinal);
  document.getElementById("wholesaleProfit")!.textContent = formatL(wholesaleNet);
  document.getElementById("wholesaleProfit")!.className =
    "meta-value " + (wholesaleNet >= 0 ? "positive" : "negative");
  document.getElementById("wholesaleMargin")!.textContent =
    wholesaleMarginPct.toFixed(1) + "%";
  document.getElementById("wholesaleMargin")!.className =
    "meta-value " + (wholesaleMarginPct >= 0 ? "positive" : "negative");

  document.getElementById("wh-subtotal")!.textContent = formatL(subtotal);
  document.getElementById("wh-discount")!.textContent = "- " + formatL(wholesaleDiscount);
  document.getElementById("wh-disc-pct")!.textContent = "(" + wholesaleDiscPct + "%)";
  document.getElementById("wh-submayorista")!.textContent = formatL(wholesaleSub);
  document.getElementById("wh-iva")!.textContent = formatL(wholesaleIva);
  document.getElementById("wh-fee")!.textContent = formatL(wholesaleFee);
  document.getElementById("wh-extras")!.textContent = formatL(mkt + other);

  // Wholesale health
  const wholesaleHealth = getMarginHealth(wholesaleMarginPct);
  document.getElementById("wholesaleHealthValue")!.textContent =
    wholesaleHealth.label + " · " + wholesaleMarginPct.toFixed(1) + "%";
  const wholesaleFillWidth = Math.max(
    0,
    Math.min(100, Math.abs(wholesaleMarginPct) * 2),
  );
  document.getElementById("wholesaleMarginFill")!.style.width =
    wholesaleFillWidth + "%";
  document.getElementById("wholesaleMarginFill-bar")!.setAttribute("aria-valuenow", String(Math.round(wholesaleFillWidth)));
  document
    .getElementById("wholesaleMarginIndicator")!
    .classList.toggle("warning", wholesaleHealth.warning);
}

// ──────────────────────────────────────────────────────────────
// Wholesale toggle
// ──────────────────────────────────────────────────────────────

let wholesaleEnabled = false;

function toggleWholesale() {
  wholesaleEnabled = !wholesaleEnabled;

  const switchEl = document.getElementById("wholesaleToggleSwitch")!;
  const toggleBtn = switchEl.closest('button[role="switch"]') ?? switchEl.parentElement!;
  const fieldEl = document.getElementById("wholesaleField")!;

  switchEl.classList.toggle("active", wholesaleEnabled);
  toggleBtn.setAttribute("aria-checked", String(wholesaleEnabled));
  fieldEl.classList.toggle("open", wholesaleEnabled);

  calculate();
}

function resetForm() {
  (document.getElementById("productName") as HTMLInputElement).value = "";
  (document.getElementById("cost") as HTMLInputElement).value = "";
  (document.getElementById("profit") as HTMLInputElement).value = "100";
  (document.getElementById("iva") as HTMLInputElement).value = "15";
  (document.getElementById("bankFee") as HTMLInputElement).value = "4.5";
  (document.getElementById("marketing") as HTMLInputElement).value = "10";
  (document.getElementById("otherCosts") as HTMLInputElement).value = "0";
  (document.getElementById("wholesaleDiscount") as HTMLInputElement).value = "30";

  // Reset toggle a OFF
  wholesaleEnabled = false;
  const switchEl = document.getElementById("wholesaleToggleSwitch")!;
  const toggleBtn = switchEl.closest('button[role="switch"]') ?? switchEl.parentElement!;
  const fieldEl = document.getElementById("wholesaleField")!;
  switchEl.classList.remove("active");
  toggleBtn.setAttribute("aria-checked", "false");
  fieldEl.classList.remove("open");

  calculate();
  (document.getElementById("cost") as HTMLInputElement).focus();
}

function copyPrice(type: string) {
  let value: string, label: string;

  if (type === "retail") {
    value = document.getElementById("finalPrice")!.textContent!;
    label = "Precio al detalle";
  } else {
    value = document.getElementById("wholesalePrice")!.textContent!;
    label = "Precio mayorista";
  }

  const text = "L " + value;
  navigator.clipboard.writeText(text).catch(() => {});

  showToast(label + " copiado: " + text);
}

function showToast(message: string) {
  const toast = document.getElementById("copyToast")!;
  const toastText = document.getElementById("copyToastText")!;
  toastText.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// ──────────────────────────────────────────────────────────────
// Share functionality
// ──────────────────────────────────────────────────────────────

const SHARE_URL = "https://lempira.cfv.technology";
const SHARE_TEXT =
  "Acabo de usar Lempira 🇭🇳 para calcular mis precios como emprendedor hondureño. Gratis, en lempiras. Se los recomiendo.";
const SHARE_TITLE = "Lempira · Calculadora de precios";

function shareLempira(menuId: string) {
  const shareData = {
    title: SHARE_TITLE,
    text: SHARE_TEXT,
    url: SHARE_URL,
  };

  // Try native Web Share API first (mobile + modern browsers)
  if (typeof navigator.share === "function") {
    navigator.share(shareData).catch((err) => {
      if (err.name !== "AbortError") {
        // Fallback to menu if share fails for non-user reasons
        openShareMenu(menuId);
      }
    });
    return;
  }

  // Fallback: show dropdown menu
  openShareMenu(menuId);
}

function openShareMenu(menuId: string) {
  // Close any other open share menu first
  document.querySelectorAll(".share-menu.open").forEach((el) => {
    if (el.id !== menuId) el.classList.remove("open");
  });

  const menu = document.getElementById(menuId);
  const trigger = document.getElementById(menuId + "-trigger");
  if (!menu || !trigger) return;

  menu.classList.toggle("open");
  trigger.setAttribute(
    "aria-expanded",
    menu.classList.contains("open") ? "true" : "false",
  );
}

function closeAllShareMenus() {
  document.querySelectorAll(".share-menu.open").forEach((el) => {
    el.classList.remove("open");
    const trigger = document.getElementById(el.id + "-trigger");
    trigger?.setAttribute("aria-expanded", "false");
  });
}

function shareVia(platform: string) {
  const encodedText = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(SHARE_URL);
  const encodedFull = encodeURIComponent(SHARE_TEXT + " " + SHARE_URL);

  const urls: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${encodedFull}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };

  if (platform === "copy") {
    navigator.clipboard
      .writeText(SHARE_TEXT + " " + SHARE_URL)
      .then(() => showToast("Link copiado al portapapeles"))
      .catch(() => {});
  } else if (urls[platform]) {
    window.open(urls[platform], "_blank", "noopener,noreferrer");
  }

  closeAllShareMenus();
}

// Close menus on outside click
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".share-wrapper")) {
    closeAllShareMenus();
  }
});

// Close menus with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllShareMenus();
});

// Theme initialization
const savedTheme = localStorage.getItem("cfv-theme");
if (savedTheme) setTheme(savedTheme);

// Expose to global scope for inline event handlers
Object.assign(window, {
  setTheme,
  calculate,
  resetForm,
  copyPrice,
  shareLempira,
  shareVia,
  toggleWholesale,
});

// Initial calculation
calculate();
