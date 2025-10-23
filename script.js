// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- A. 卡片資料庫 (Master List) ---
    // 建立全 96 張卡片的資料庫
    // 格式: { id: 'B001', name: '卡片名稱', team: 'Brothers', rarity: 'N' }
    const teams = {
        Brothers: '中信兄弟',
        Lions: '統一7-ELEVEn獅',
        Monkeys: '樂天桃猿',
        Guardians: '富邦悍將',
        Dragons: '味全龍',
        Hawks: '台鋼雄鷹'
    };

    const teamElementIds = {
        Brothers: 'collection-brothers',
        Lions: 'collection-lions',
        Monkeys: 'collection-monkeys',
        Guardians: 'collection-guardians',
        Dragons: 'collection-dragons',
        Hawks: 'collection-hawks'
    };

    const cardMasterList = [];
    let cardIdCounter = 1;

    // 迴圈產生 6 支球隊的卡片
    for (const teamKey in teams) {
        // 7 張 N 卡
        for (let i = 1; i <= 7; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} N卡 ${i}`, team: teamKey, rarity: 'N' });
        }
        // 5 張 R 卡
        for (let i = 1; i <= 5; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} R卡 ${i}`, team: teamKey, rarity: 'R' });
        }
        // 3 張 SR 卡
        for (let i = 1; i <= 3; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} SR卡 ${i}`, team: teamKey, rarity: 'SR' });
        }
        // 1 張 SSR 卡
        cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} SSR卡`, team: teamKey, rarity: 'SSR' });
    }
    // console.log(cardMasterList); // 總共 96 張卡

    
    // --- B. 獲取所有需要的 HTML 元素 ---
    // 介面
    const gachaView = document.getElementById('gacha-view');
    const collectionView = document.getElementById('collection-view');
    const showGachaBtn = document.getElementById('show-gacha-btn');
    const showCollectionBtn = document.getElementById('show-collection-btn');

    // 抽卡區
    const tokenDisplay = document.getElementById('token-display');
    const drawButton = document.getElementById('draw-button');
    const animationWrapper = document.getElementById('animation-wrapper');

    // 卡冊區
    const collectionProgress = document.getElementById('collection-progress');

    // 老師控制台
    const adminCodeInput = document.getElementById('admin-code');
    const adminSubmitButton = document.getElementById('admin-submit');
    const adminMessage = document.getElementById('admin-message');


    // --- C. 初始化代幣 ---
    const TOKEN_STORAGE_KEY = 'myStudentTokens_CPBL'; // 換個新的 Key
    let currentTokens = 0;

    function updateTokens(amount) {
        currentTokens = amount;
        tokenDisplay.innerText = currentTokens;
        localStorage.setItem(TOKEN_STORAGE_KEY, currentTokens); 
    }

    const savedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    updateTokens(savedTokens ? parseInt(savedTokens) : 100); // 預設給 100 抽


    // --- D. 【大改版】初始化卡片收藏庫 ---
    // 資料結構改成物件: { 'B001': 1, 'B002': 3, 'L016': 1 }
    const COLLECTION_STORAGE_KEY = 'myStudentCollection_CPBL'; // 換個新的 Key
    let cardCollection = {}; // 不再是陣列 []，而是物件 {}

    // 【全新】函式：顯示卡冊 (核心)
    function displayCollection() {
        let totalOwnedTypes = 0; // 總共收集到幾「種」卡片

        // 1. 遍歷 6 支球隊
        for (const teamKey in teams) {
            const teamElementId = teamElementIds[teamKey];
            const teamDiv = document.getElementById(teamElementId);
            teamDiv.innerHTML = ""; // 清空該球隊的卡冊

            // 2. 從「卡片資料庫」中篩選出該隊的所有卡片
            const teamCards = cardMasterList.filter(card => card.team === teamKey);
            
            // 3. 遍歷該隊的每一張「應有」卡片 (共 16 張)
            teamCards.forEach(masterCard => {
                // 4. 檢查「玩家收藏庫」中是否有這張卡，以及有幾張
                const quantity = cardCollection[masterCard.id] || 0;

                const cardWrapper = document.createElement('div');
                cardWrapper.className = 'card-small-wrapper';
                
                if (quantity > 0) {
                    // 5. 【已抽到】顯示卡片內容
                    totalOwnedTypes++; // 收藏種類 +1
                    cardWrapper.innerHTML = `
                        <div class="card-small-inner reveal-${masterCard.rarity}">
                            <span>${masterCard.name.split(' ')[1]}</span> <span>(${masterCard.rarity})</span>
                        </div>
                        <div class="card-quantity">x${quantity}</div>
                    `;
                } else {
                    // 6. 【未抽到】顯示黑影
                    cardWrapper.innerHTML = `
                        <div class="card-small-inner card-silhouette">
                            ?
                        </div>
                    `;
                }
                teamDiv.appendChild(cardWrapper);
            });
        }
        
        // 7. 更新總收藏進度
        collectionProgress.innerText = `${totalOwnedTypes} / ${cardMasterList.length}`;
    }

    // 【修改】頁面載入時，讀取物件 {}
    const savedCollection = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (savedCollection) {
        cardCollection = JSON.parse(savedCollection); 
    }
    
    // 馬上把讀取到的卡片顯示出來
    displayCollection();


    // --- E. 【大改版】抽卡邏輯 ---
    const DRAW_COST = 10; 

    function performDraw() {
        // 根據 96 張卡的真實比例來設定機率
        // N: 42/96 (43.75%)
        // R: 30/96 (31.25%)
        // SR: 18/96 (18.75%)
        // SSR: 6/96 (6.25%)

        const roll = Math.random(); 
        let chosenRarity;

        if (roll < 0.0625) { // 6.25% SSR
            chosenRarity = 'SSR';
        } else if (roll < 0.25) { // 18.75% SR (0.0625 + 0.1875 = 0.25)
            chosenRarity = 'SR';
        } else if (roll < 0.5625) { // 31.25% R (0.25 + 0.3125 = 0.5625)
            chosenRarity = 'R';
        } else { // 43.75% N
            chosenRarity = 'N';
        }

        // 1. 篩選出所有該稀有度的卡片
        const possibleCards = cardMasterList.filter(card => card.rarity === chosenRarity);
        
        // 2. 從中隨機抽一張
        const drawnCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
        
        return { ...drawnCard }; // 回傳卡片物件的「複本」
    }

    // --- F. 抽卡按鈕事件 (有修改) ---
    drawButton.addEventListener('click', () => {
        if (currentTokens < DRAW_COST) {
            alert("代幣不足！快去跟老師領取！");
            return;
        }
        updateTokens(currentTokens - DRAW_COST);
        drawButton.disabled = true;
        animationWrapper.innerHTML = '<div class="draw-pending"></div>';

        setTimeout(() => {
            const drawnCard = performDraw(); // 抽卡！

            // 顯示「揭曉動畫」(大卡片)
            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}">
                    <span class="card-name">${drawnCard.name}</span>
                    <span class="card-rarity">${drawnCard.rarity}</span>
                </div>
            `;
            
            // --- 【升級】儲存卡片 (改成物件操作) ---
            // 1. 獲取目前這張卡的數量 (沒有的話就是 0)
            const currentQuantity = cardCollection[drawnCard.id] || 0;
            // 2. 數量 +1
            cardCollection[drawnCard.id] = currentQuantity + 1;
            
            // 3. 存回 localStorage
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            
            // 4. 立刻更新畫面上的「收藏庫」(雖然現在隱藏著，但資料要同步)
            displayCollection();
            // --- 儲存完畢 ---

            drawButton.disabled = false;
        }, 2000); 
    });


    // --- G. 老師控制台（密技）的邏輯 (有修改) ---
    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim().toUpperCase(); // 轉大寫
        adminMessage.style.color = "red"; 

        if (code === "ADD_TOKEN_50") {
            updateTokens(currentTokens + 50);
            adminMessage.innerText = "成功兌換 50 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "ADD_TOKEN_500") { // 新增 500
            updateTokens(currentTokens + 500);
            adminMessage.innerText = "成功兌換 500 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "RESET_MY_TOKENS") { 
             updateTokens(0);
             adminMessage.innerText = "代幣已重置。";
        } else if (code === "CLEAR_MY_COLLECTION") { 
            cardCollection = {}; // 【修改】清空收藏改成空物件
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            displayCollection(); // 更新畫面
            adminMessage.innerText = "卡片收藏已清空！";
            adminMessage.style.color = "green"; 
        } else {
            adminMessage.innerText = "密碼錯誤！";
        }

        adminCodeInput.value = ""; 
    });

    
    // --- H. 介面切換邏輯 ---
    showGachaBtn.addEventListener('click', () => {
        gachaView.style.display = 'block';
        collectionView.style.display = 'none';
        showGachaBtn.classList.add('active');
        showCollectionBtn.classList.remove('active');
    });

    showCollectionBtn.addEventListener('click', () => {
        gachaView.style.display = 'none';
        collectionView.style.display = 'block';
        showGachaBtn.classList.remove('active');
        showCollectionBtn.classList.add('active');
    });
});
