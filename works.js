/* =====================================================
   works.js — 作品のデータ
   写真や作品を足すときは、このファイルだけ書き換えます
   ===================================================== */

/*
  ■ 新しい作品を足す
    1. 写真を img フォルダに入れる(例: img/himalaya-01.jpg)
    2. 下の「var WORKS = []のすぐ下に、このテンプレートをコピーして貼る
    3. 中身を書き換えて、保存する
       ※ 並び順は date(日付)で自動で決まるので、どこに貼ってもOK
       ※ 作品と作品の間の「 , 」(カンマ)を忘れないこと

    {
      title: "題名",
      type: "film",                      // film / digital / painting / embroidery / other
      date: "2026-09-01",                // 年-月-日
      camera: "カメラやフィルムの名前",    // いらなければ、行ごと消す
      note: "ひとこと",                   // いらなければ、行ごと消す
      featured: false,                   // Archive だけに載せたいときだけ書く(書かなければ Works にも載る)
      images: ["ファイル名.jpg"]          // img フォルダの中のファイル名
    },

  ■ すでにある作品に、写真を足す
    その作品の images に、ファイル名を足すだけです。
    例: images: ["himalaya-01.jpg", "himalaya-02.jpg", "himalaya-03.jpg"]
    1枚目が、一覧に出る表紙になります。縦長か横長かは、自動で合います。
*/

var WORKS = [
  {
    title: "Shanghai_1",
    type: "film",
    date: "2025-03-20",
    camera: "Pentaxp30n",
    note: "現代ビルと伝統建物が重なる",
    images: ["shanghai1.jpg", "shanghai2.jpg", "shanghai3.jpg"],
  },
  {
    title: "Farm Life",
    type: "film",
    date: "2026-06-02",
    camera: "Pentax MX / Ektar 100",
    note: "田んぼの一年を追っているシリーズ。",
    images: ["farm-life-01.jpg", "farm-life-02.jpg", "farm-life-03.jpg"],
  },
  {
    title: "Rain Window",
    type: "digital",
    date: "2026-07-09",
    camera: "Ricoh GR III",
    note: "雨の日、窓越しに。",
    images: ["rain-window-01.jpg", "rain-window-02.jpg"],
  },
  {
    title: "Red Cloth",
    type: "embroidery",
    date: "2026-05-20",
    note: "古い布に赤い糸で刺したもの。約3週間かかった。",
    images: ["red-cloth-01.jpg", "red-cloth-02.jpg"],
  },
  {
    title: "Morning Sketch",
    type: "painting",
    date: "2026-04-11",
    note: "水彩。窓から見えた山。",
    images: ["morning-sketch-01.jpg", "morning-sketch-02.jpg"],
  },
  {
    title: "Portrait, Pai",
    type: "digital",
    date: "2026-03-08",
    camera: "Ricoh GR III",
    featured: false,
    images: ["portrait-pai-01.jpg"],
  },
  {
    title: "Small Flowers",
    type: "embroidery",
    date: "2025-12-24",
    note: "ハンカチに練習で刺した。",
    featured: false,
    images: ["small-flowers-01.jpg"],
  },
  {
    title: "Night Train",
    type: "film",
    date: "2025-11-03",
    camera: "Olympus XA / CineStill 800T",
    images: ["night-train-01.jpg", "night-train-02.jpg"],
  },
  {
    title: "Ink Study",
    type: "painting",
    date: "2025-09-15",
    featured: false,
    images: ["ink-study-01.jpg"],
  },
];
