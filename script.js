/* =====================================================
   script.js — 画面を動かす仕組み
   普段は触らなくてOK。作品のデータは works.js にあります
   ===================================================== */

/* ---------- 設定 ---------- */

var IMG_DIR = "img/"; // 写真を入れるフォルダ

// film / digital は「写真」のグループにまとめる
var GROUP = {
  film: "photo",
  digital: "photo",
  painting: "painting",
  embroidery: "embroidery",
  other: "other",
};
var GROUP_LABEL = { photo: "写真", painting: "絵", embroidery: "刺繍", other: "その他" };

/* ---------- 便利な道具 ---------- */

var $ = function (id) {
  return document.getElementById(id);
};

// 文字を安全にHTMLへ入れる
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
  });
}

// 2026-08-14 → 2026.08.14
function dt(d) {
  return d.replace(/-/g, ".");
}

// 名前から、ダミーの四角の色を決める
function dummyColor(name) {
  var h = 0;
  for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return "hsl(" + h + " 14% 62%)";
}

/* ---------- 作品データの準備 ---------- */

var items = WORKS;

items.forEach(function (x) {
  x.group = GROUP[x.type] || x.type; // photo / painting / embroidery / other
  x.kind = x.group === "photo" ? x.type : ""; // 写真だけ film / digital
  x.shown = x.featured !== false; // Works に載せるか
  x.files = x.images || [];
});

// 日付の古い順に No.001, No.002 … と番号をつける
items
  .slice()
  .sort(function (a, b) {
    return a.date < b.date ? -1 : 1;
  })
  .forEach(function (x, k) {
    x.no = "No." + String(k + 1).padStart(3, "0");
  });

/* ---------- 今の表示状態 ---------- */

var view = "works"; // works / archive
var flt = "all"; // all / photo / painting / embroidery / other
var sub = "all"; // 写真を選んだときだけ: all / film / digital
var mode = "list"; // Archive の表示: list / sheet

/* ---------- 部品づくり ---------- */

// 作品のラベル(例: 写真 film)
function label(x) {
  return (GROUP_LABEL[x.group] || x.group) + (x.kind ? " " + x.kind : "");
}

// 写真1枚。ファイルがなければ、色つきの四角に差し替える
function pic(file, title) {
  if (!file) return '<div class="im ph" style="--c:' + dummyColor(title) + '" role="img" aria-label="' + esc(title) + '"></div>';
  return '<img class="im" src="' + esc(IMG_DIR + file) + '" alt="' + esc(title) + '" loading="lazy" onerror="imgMissing(this)">';
}

// Archive 用の小さい正方形サムネイル
function thumb(x) {
  var file = x.files[0];
  if (!file) return '<span class="t" style="--c:' + dummyColor(x.title) + '"></span>';
  return '<img class="t" src="' + esc(IMG_DIR + file) + '" alt="" loading="lazy" onerror="imgMissing(this)">';
}

// 写真ファイルが見つからないとき、ファイル名つきの四角にする
function imgMissing(img) {
  var src = img.getAttribute("src");
  var isThumb = img.classList.contains("t");
  var box = document.createElement(isThumb ? "span" : "div");
  box.className = isThumb ? "t" : "im ph";
  box.style.setProperty("--c", dummyColor(src));
  if (!isThumb) box.textContent = src;
  img.replaceWith(box);
}

/* ---------- 画面を描く ---------- */

function draw() {
  var all = items.slice().sort(function (a, b) {
    return a.date < b.date ? 1 : -1; // 新しい順
  });

  // 絞り込み
  var list = all.filter(function (x) {
    return (flt === "all" || x.group === flt) && (flt !== "photo" || sub === "all" || x.type === sub);
  });

  // 上の「items ○ / updated ○」
  $("st").textContent = "items " + items.length + " / updated " + dt(all[0].date);

  // 絞り込みボタン(写真を選ぶと、film / digital が出る)
  var main = ["all", "photo", "painting", "embroidery", "other"].map(function (k) {
    return '<button data-f="' + k + '" class="' + (k === flt ? "on" : "") + '">' + (k === "all" ? "all" : GROUP_LABEL[k]) + "</button>";
  });
  var subRow = "";
  if (flt === "photo") {
    subRow =
      '<div class="sub">' +
      ["all", "film", "digital"]
        .map(function (k) {
          return '<button data-s="' + k + '" class="' + (k === sub ? "on" : "") + '">' + k + "</button>";
        })
        .join("") +
      "</div>";
  }
  $("chips").innerHTML = main.join("") + subRow;

  // Works: 「Works に載せる」作品を、大きく並べる
  var cards = list
    .filter(function (x) {
      return x.shown;
    })
    .map(function (x) {
      return (
        '<button class="card" data-id="' + items.indexOf(x) + '">' +
        '<span class="fr">' + pic(x.files[0], x.title) + "</span>" +
        '<span class="lb"><i class="px">' + x.no + "</i>" + esc(x.title) + "</span>" +
        '<span class="sb px">' + label(x) + " / " + x.date.slice(0, 4) + "</span>" +
        "</button>"
      );
    })
    .join("");
  $("works").innerHTML = cards || '<p style="color:var(--mute)">このジャンルの作品はまだありません。</p>';

  // Archive: 全作品を、list か sheet で
  var html =
    '<div class="tg px">' +
    '<button data-mo="list" class="' + (mode === "list" ? "on" : "") + '">list</button>' +
    '<button data-mo="sheet" class="' + (mode === "sheet" ? "on" : "") + '">sheet</button>' +
    "</div>";

  if (mode === "sheet") {
    html +=
      '<div class="sheet">' +
      list
        .map(function (x) {
          return '<button data-id="' + items.indexOf(x) + '" aria-label="' + esc(x.title) + '">' + thumb(x) + '<i class="px">' + x.no + "</i></button>";
        })
        .join("") +
      "</div>";
  } else {
    var year = "";
    list.forEach(function (x) {
      var y = x.date.slice(0, 4);
      if (y !== year) {
        year = y;
        html += '<div class="yr px">' + y + "</div>";
      }
      html +=
        '<button class="row" data-id="' + items.indexOf(x) + '">' +
        '<span class="n px">' + x.no + "</span>" +
        '<span class="d px">' + dt(x.date) + "</span>" +
        thumb(x) +
        "<b>" + esc(x.title) + "</b>" +
        '<span class="m px">' + label(x) + "</span>" +
        "</button>";
    });
  }
  $("archive").innerHTML = html;
}

// Works と Archive を切り替える
function show(v) {
  view = v;
  $("works").hidden = v !== "works";
  $("archive").hidden = v !== "archive";
  document.querySelectorAll("nav [data-v]").forEach(function (b) {
    b.classList.toggle("cur", b.dataset.v === v);
  });
  $("ttl").innerHTML = v === "works" ? "Works<small>作品</small>" : "Archive<small>記録</small>";
  window.scrollTo(0, 0);
}

// 作品の詳細画面を開く
function openWork(id) {
  var x = items[id];
  $("din").innerHTML =
    '<h2 class="px">' + esc(x.title) + "</h2>" +
    '<div class="meta px"><i>' + x.no + "</i><span>" + label(x) + "</span><span>" + dt(x.date) + "</span>" +
    (x.camera ? "<span>" + esc(x.camera) + "</span>" : "") +
    "</div>" +
    (x.note ? '<p class="note">' + esc(x.note) + "</p>" : "") +
    '<div class="ph-list">' +
    (x.files.length ? x.files : [""])
      .map(function (f) {
        return '<div class="fr">' + pic(f, x.title) + "</div>";
      })
      .join("") +
    "</div>";
  $("det").classList.add("on");
  $("det").scrollTop = 0;
  document.body.style.overflow = "hidden";
}

// 詳細画面を閉じる
function shut() {
  $("det").classList.remove("on");
  document.body.style.overflow = "";
}

/* ---------- クリックとキー操作 ---------- */

document.addEventListener("click", function (e) {
  var v = e.target.closest("[data-v]"); // メニュー(Works / Archive)
  if (v) {
    e.preventDefault();
    show(v.dataset.v);
    return;
  }
  var f = e.target.closest("[data-f]"); // ジャンルの絞り込み
  if (f) {
    flt = f.dataset.f;
    sub = "all";
    draw();
    return;
  }
  var s = e.target.closest("[data-s]"); // film / digital
  if (s) {
    sub = s.dataset.s;
    draw();
    return;
  }
  var m = e.target.closest("[data-mo]"); // list / sheet
  if (m) {
    mode = m.dataset.mo;
    draw();
    return;
  }
  var c = e.target.closest("[data-id]"); // 作品を開く
  if (c) openWork(+c.dataset.id);
});

$("dx").onclick = shut;
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") shut();
});

/* ---------- 最初の表示 ---------- */

draw();