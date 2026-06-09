(() => {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function ultimateClick(element) {
        const events = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'];
        events.forEach(ev => {
            element.dispatchEvent(new PointerEvent(ev, { bubbles: true, cancelable: true, view: window }));
        });
    }

    console.log("🎯 【完美優化版】請先手動點擊一次交換按鈕");

    let targetSwapBtn = null;

    const captureBtn = (e) => {
        targetSwapBtn = e.target.closest('button') || e.target.closest('[role="button"]') || e.target.closest('div') || e.target;
        console.log("✅ 已鎖定交換按鈕");
        console.log("⚡ 3秒後開始極速且順暢的排序");
        
        document.removeEventListener('click', captureBtn, true);
        setTimeout(autoBubbleSort, 3000);
    };

    document.addEventListener('click', captureBtn, true);

    async function autoBubbleSort() {
        console.log("🚀 開始完美優化版排序");
        
        const getItems = () => document.querySelectorAll('.sort-item-wrapper');
        const n = getItems().length;

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            // 【優化點】：在每一輪比對開始前，先抓取一次當前的元素列表即可
            let items = getItems();

            for (let j = 0; j < n - 1 - i; j++) {
                const span1 = items[j].querySelector('.item-value');
                const span2 = items[j + 1].querySelector('.item-value');

                if (!span1 || !span2) continue;

                const val1 = parseInt(span1.innerText, 10);
                const val2 = parseInt(span2.innerText, 10);

                if (val1 > val2) {
                    swapped = true;
                    console.log(`🔄 交換：${val1} ↔ ${val2}`);

                    // 沿用你測試出的完美極限延遲
                    ultimateClick(span1);
                    await wait(20);

                    ultimateClick(span2);
                    await wait(20);

                    if (targetSwapBtn) {
                        ultimateClick(targetSwapBtn);
                        await wait(120);
                    }
                    
                    // 【優化點】：只有在「真的點擊交換」導致網頁結構改變後，才重新抓取一次最新狀態
                    // 這樣省去了大量不必要的 DOM 查詢，讓瀏覽器負擔更小！
                    items = getItems();
                }
            }
            
            // 如果這一輪都沒發生交換，代表已經全部排好，提早收工
            if (!swapped) break;
        }

        console.log("🎉 完美排序完成");
    }
})();
