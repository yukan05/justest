(() => {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function ultimateClick(element) {
        const events = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'];
        events.forEach(ev => {
            element.dispatchEvent(new PointerEvent(ev, {
                bubbles: true, cancelable: true, view: window
            }));
        });
    }

    console.log("🎯 請先手動點擊一次「交換選中項目」按鈕來鎖定");

    let targetSwapBtn = null;

    const captureBtn = (e) => {
        targetSwapBtn =
            e.target.closest('button') ||
            e.target.closest('[role="button"]') ||
            e.target.closest('div') ||
            e.target;

        console.log("✅ 已鎖定交換按鈕");
        console.log("⚡ 3秒後開始高速快速排序 (跳過相等值版)");

        document.removeEventListener('click', captureBtn, true);

        setTimeout(autoQuickSort, 3000);
    };

    document.addEventListener('click', captureBtn, true);

    const getVal = (index) => {
        const items = document.querySelectorAll('.sort-item-wrapper .item-value');
        if (!items[index]) return 0;
        return parseInt(items[index].innerText, 10);
    };

    const getNode = (index) => {
        const items = document.querySelectorAll('.sort-item-wrapper .item-value');
        return items[index];
    };

    async function doSwap(idx1, idx2) {
        if (idx1 === idx2) return;
        console.log(`🔄 交換位置 ${idx1 + 1} ↔ ${idx2 + 1} (${getVal(idx1)} ↔ ${getVal(idx2)})`);
        
        ultimateClick(getNode(idx1));
        await wait(30);
        ultimateClick(getNode(idx2));
        await wait(30);
        
        if (targetSwapBtn) {
            ultimateClick(targetSwapBtn);
            await wait(150); 
        }
    }

    async function partition(low, high) {
        let pivotValue = getVal(low);
        let i = low + 1;
        let j = high;

        while (true) {
            // 🐛 修復關鍵：加上 <= 和 >=，遇到相同的數字直接跳過！
            while (i <= high && getVal(i) <= pivotValue) {
                i++;
            }
            while (j >= low + 1 && getVal(j) >= pivotValue) {
                j--;
            }

            if (i >= j) {
                break;
            }

            await doSwap(i, j);
            i++;
            j--;
        }

        if (low !== j) {
            await doSwap(low, j);
        }

        return j;
    }

    async function quickSort(low, high) {
        if (low < high) {
            let pivotIndex = await partition(low, high);
            
            let leftSize = pivotIndex - low;
            let rightSize = high - pivotIndex;

            if (leftSize <= rightSize) {
                await quickSort(low, pivotIndex - 1);
                await quickSort(pivotIndex + 1, high);
            } else {
                await quickSort(pivotIndex + 1, high);
                await quickSort(low, pivotIndex - 1);
            }
        }
    }

    async function autoQuickSort() {
        console.log("🚀 開始快速排序...");
        const items = document.querySelectorAll('.sort-item-wrapper .item-value');
        const n = items.length;
        
        if (n > 0) {
            await quickSort(0, n - 1);
            console.log("🎉 排序完成！請點擊提交！");
        } else {
            console.log("❌ 找不到排序項目");
        }
    }
})();
