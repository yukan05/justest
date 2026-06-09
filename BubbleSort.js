//泡泡排序法 一步一步完成
const places = {
  1: document.getElementById("place-1"),
  2: document.getElementById("place-2"),
  3: document.getElementById("place-3"),
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 取得最上層
function getTop(place) {
  const rings = [...place.querySelectorAll('[id^="ring-"]')];
  if (!rings.length) return null;

  return rings
    .map(el => ({ el, size: +el.id.split("-")[1] }))
    .sort((a, b) => a.size - b.size)[0].el;
}

// 拖曳
function drag(el, target) {
  const dt = new DataTransfer();

  el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
  el.dispatchEvent(new DragEvent("dragstart", { bubbles: true, dataTransfer: dt }));

  target.dispatchEvent(new DragEvent("dragover", { bubbles: true, dataTransfer: dt }));
  target.dispatchEvent(new DragEvent("drop", { bubbles: true, dataTransfer: dt }));

  el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
}

// 單步移動
async function move(from, to) {
  const el = getTop(places[from]);
  if (!el) return;

  drag(el, places[to]);

  await sleep(5);
}

// 🔥 自動計算盤子數量
function getDiskCount() {
  return document.querySelectorAll('[id^="ring-"]').length;
}

// 河內塔
async function hanoi(n, from, to, aux) {
  if (n === 0) return;

  await hanoi(n - 1, from, aux, to);
  await move(from, to);
  await hanoi(n - 1, aux, to, from);
}

// 🚀 自動開始（不用手寫 12）
const diskCount = getDiskCount();
hanoi(diskCount, 1, 3, 2);
