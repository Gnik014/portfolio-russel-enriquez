(function () {
  "use strict";

  function bandFor(score) {
    if (score >= 4.5) return "Excellent";
    if (score >= 4.0) return "Strong";
    if (score >= 3.5) return "Solid";
    if (score >= 3.0) return "Fair";
    return "Weak";
  }

  function paintStars() {
    var widget = document.getElementById("star-rating");
    if (!widget) return;
    var score = parseFloat(widget.getAttribute("data-score") || "0");
    var fill = widget.querySelector(".fill");
    var scoreEl = widget.querySelector(".score");
    var bandEl = widget.querySelector(".band");
    if (fill) fill.style.width = Math.max(0, Math.min(100, (score / 5) * 100)) + "%";
    if (scoreEl) scoreEl.textContent = score.toFixed(1);
    if (bandEl) bandEl.textContent = bandFor(score);
  }

  function sortTable(table, col, dir) {
    var tbody = table.tBodies[0];
    var rows = Array.prototype.slice.call(tbody.rows);
    var type = table.querySelectorAll("th")[col].getAttribute("data-type") || "text";
    rows.sort(function (a, b) {
      var av = a.cells[col].getAttribute("data-value") || a.cells[col].textContent.trim();
      var bv = b.cells[col].getAttribute("data-value") || b.cells[col].textContent.trim();
      if (type === "num") {
        av = parseFloat(av);
        bv = parseFloat(bv);
        return dir === "asc" ? av - bv : bv - av;
      }
      return dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    rows.forEach(function (row) { tbody.appendChild(row); });
  }

  function bindSort() {
    var table = document.getElementById("comparison-table");
    if (!table) return;
    var heads = table.querySelectorAll("th[data-sort]");
    heads.forEach(function (th, index) {
      th.setAttribute("aria-sort", "none");
      th.addEventListener("click", function () {
        var current = th.getAttribute("aria-sort");
        var dir = current === "ascending" ? "desc" : "asc";
        heads.forEach(function (other) { other.setAttribute("aria-sort", "none"); });
        th.setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");
        sortTable(table, index, dir);
      });
    });
  }

  function bindHideToggle() {
    var box = document.getElementById("page-analysis");
    var toggle = document.getElementById("hide-in-export");
    if (!box || !toggle) return;
    toggle.addEventListener("change", function () {
      if (toggle.checked) box.classList.add("is-hidden");
      else box.classList.remove("is-hidden");
    });
  }

  function bindPrint() {
    var exportBtn = document.getElementById("export-pdf");
    if (exportBtn) {
      exportBtn.addEventListener("click", function () {
        window.print();
      });
    }
    var previewBtn = document.getElementById("preview-print");
    if (previewBtn) {
      previewBtn.addEventListener("click", function () {
        var on = document.body.classList.toggle("is-print-preview");
        previewBtn.setAttribute("aria-pressed", on ? "true" : "false");
        previewBtn.textContent = on ? "Exit print preview" : "Preview print layout";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    paintStars();
    bindSort();
    bindHideToggle();
    bindPrint();
  });
})();
