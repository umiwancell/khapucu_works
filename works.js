/* =====================================================
   works.js — 作品のデータ
   写真や作品を足すときは、このファイルだけ書き換え
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
    title: "Shanghai",
    type: "film",
    date: "2025-03-20",
    camera: "Pentaxp30n",
    note: "現代ビルと伝統建物が重なる",
    images: ["shanghai/IMG_3014.JPG", "shanghai/IMG_3040.JPG", "shanghai/IMG_3044.JPG"],
  },
  {
    title: "Shanghai",
    type: "film",
    date: "2025-03-20",
    camera: "Pentaxp30n",
    note: "上海の現代ビル",
    images: ["shanghai/IMG_3042.JPG", "shanghai/IMG_3026.JPG", "shanghai/IMG_3028.JPG","shanghai/IMG_3030.JPG"],
  },
  {
    title: "Shanghai",
    type: "film",
    date: "2025-03-20",
    camera: "Pentaxp30n",
    note: "上海の日常",
    images: ["shanghai/IMG_3039.JPG", "shanghai/IMG_3036.JPG", "shanghai/IMG_3020.JPG", "shanghai/IMG_3023.JPG", "shanghai/IMG_3025.JPG", "shanghai/IMG_3022.JPG"],
  },
  {
    title: "coming soon",
    type: "digital",
    date: "-----",
    note: "-----。",
    images: ["red-cloth-01.jpg", "red-cloth-02.jpg"],
  },
  {
    title: "coming soon",
    type: "digital",
    date: "-----",
    note: "-----。",
    images: ["morning-sketch-01.jpg", "morning-sketch-02.jpg"],
  },
  {
    title: "coming soon",
    type: "digital",
    date: "-----",
    camera: "-----",
    featured: false,
    images: ["portrait-pai-01.jpg"],
  },
  {
    title: "coming soon",
    type: "embroidery",
    date: "-----",
    note: "-----",
    featured: false,
    images: ["small-flowers-01.jpg"],
  },
  {
    title: "coming soon",
    type: "film",
    date: "-----",
    camera: "-----",
    images: ["night-train-01.jpg", "night-train-02.jpg"],
  },
  {
    title: "coming soon",
    type: "digital",
    date: "-----",
    featured: false,
    images: ["ink-study-01.jpg"],
  },
];