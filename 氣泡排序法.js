(() => {

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function ultimateClick(element) {
    const events = [
        'pointerdown',
        'mousedown',
        'pointerup',
        'mouseup',
        'click'
    ];

    events.forEach(ev => {
        element.dispatchEvent(
            new PointerEvent(ev, {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );
    });
}

console.log("🎯 請先手動點擊一次交換按鈕");

let targetSwapBtn = null;

const captureBtn = (e) => {

    targetSwapBtn =
        e.target.closest('button') ||
        e.target.closest('[role="button"]') ||
        e.target.closest('div') ||
        e.target;

    console.log("✅ 已鎖定交換按鈕");
    console.log("⚡ 3秒後開始高速排序");

    document.removeEventListener('click', captureBtn, true);

    setTimeout(autoBubbleSort, 3000);
};

document.addEventListener('click', captureBtn, true);

async function autoBubbleSort() {

    console.log("🚀 開始高速排序");

    const getItems = () =>
        document.querySelectorAll('.sort-item-wrapper');

    const n = getItems().length;

    for (let i = 0; i < n - 1; i++) {

        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {

            const items = getItems();

            const span1 =
                items[j].querySelector('.item-value');

            const span2 =
                items[j + 1].querySelector('.item-value');

            if (!span1 || !span2) continue;

            const val1 =
                parseInt(span1.innerText, 10);

            const val2 =
                parseInt(span2.innerText, 10);

            if (val1 > val2) {

                swapped = true;

                console.log(`🔄 ${val1} ↔ ${val2}`);

                ultimateClick(span1);
                await wait(20);

                ultimateClick(span2);
                await wait(20);

                if (targetSwapBtn) {
                    ultimateClick(targetSwapBtn);
                    await wait(120);
                }
            }
        }

        if (!swapped) break;
    }

    console.log("🎉 排序完成");
}

})();
