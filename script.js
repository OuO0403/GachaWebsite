// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- A. 卡片資料庫 (Master List) ---
    // (這部分不變)
    const teams = {
        Brothers: '中信兄弟',
        Lions: '統一7-ELEVEn獅',
        Monkeys: '樂天桃猿',
        Guardians: '富邦悍將',
        Dragons: '味全龍',
        Hawks: '台鋼雄鷹'
    };

    const cardMasterList = [];
    let cardIdCounter = 1;
    for (const teamKey in teams) {
        for (let i = 1; i <= 7; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} N卡 ${i}`, team: teamKey, rarity: 'N', image: 'bookshelf_bg.jpg' });
        }
        for (let i = 1; i <= 5; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} R卡 ${i}`, team: teamKey, rarity: 'R', image: 'bookshelf_bg.jpg' });
        }
        for (let i = 1; i <= 3; i++) {
            cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} SR卡 ${i}`, team: teamKey, rarity: 'SR', image: 'bookshelf_bg.jpg' });
        }
        cardMasterList.push({ id: `${teamKey.charAt(0)}${cardIdCounter++}`, name: `${teams[teamKey]} SSR卡`, team: teamKey, rarity: 'SSR', image: 'bookshelf_bg.jpg' });
    }

    
    // --- B. 獲取所有需要的 HTML 元素 ---
    // (這部分不變)
    const gachaView = document.getElementById('gacha-view');
    const collectionView = document.getElementById('collection-view');
    const showGachaBtn = document.getElementById('show-gacha-btn');
    const showCollectionBtn = document.getElementById('show-collection-btn');
    const tokenDisplay = document.getElementById('token-display');
    const drawButton = document.getElementById('draw-button');
    const animationWrapper = document.getElementById('animation-wrapper');
    const collectionProgress = document.getElementById('collection-progress');
    const adminCodeInput = document.getElementById('admin-code');
    const adminSubmitButton = document.getElementById('admin-submit');
    const adminMessage = document.getElementById('admin-message');


    // --- C. 初始化代幣 ---
    // (這部分不變)
    const TOKEN_STORAGE_KEY = 'myStudentTokens_CPBL'; 
    let currentTokens = 0;
    function updateTokens(amount) {
        currentTokens = amount;
        tokenDisplay.innerText = currentTokens;
        localStorage.setItem(TOKEN_STORAGE_KEY, currentTokens); 
    }
    const savedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    updateTokens(savedTokens ? parseInt(savedTokens) : 100); 


    // --- D. 初始化卡片收藏庫 ---
    // (這部分不變)
    const COLLECTION_STORAGE_KEY = 'myStudentCollection_CPBL'; 
    let cardCollection = {}; 

    function displayCollection() {
        let totalOwnedTypes = 0; 
        const rarities = ['SSR', 'SR', 'R', 'N']; 

        for (const teamKey in teams) {
            const teamCards = cardMasterList.filter(card => card.team === teamKey);
            
            rarities.forEach(rarity => {
                const teamRarityDiv = document.getElementById(`collection-${teamKey.toLowerCase()}-${rarity}`);
                if (!teamRarityDiv) return; 
                teamRarityDiv.innerHTML = ""; 

                const rarityCards = teamCards.filter(card => card.rarity === rarity);
                
                rarityCards.forEach(masterCard => {
                    const quantity = cardCollection[masterCard.id] || 0;
                    const cardWrapper = document.createElement('div');
                    
                    if (quantity > 0) {
                        totalOwnedTypes++;
                        cardWrapper.className = `card-small-wrapper reveal-${masterCard.rarity}`;
                        cardWrapper.innerHTML = `
                            <div class="card-small-inner" style="background-image: url('${masterCard.image}');"></div>
                            <div class="card-quantity">x${quantity}</div>
                        `;
                    } else {
                        cardWrapper.className = `card-small-wrapper card-silhouette`;
                        cardWrapper.innerHTML = `
                            <div class="card-small-inner">
                                <span>?</span>
                            </div>
                        `;
                    }
                    teamRarityDiv.appendChild(cardWrapper);
                });
            });
        }
        collectionProgress.innerText = `${totalOwnedTypes} / ${cardMasterList.length}`;
    }

    const savedCollection = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (savedCollection) {
        cardCollection = JSON.parse(savedCollection); 
    }
    displayCollection();


    // --- E. 抽卡邏輯 ---
    // (這部分不變)
    const DRAW_COST = 10; 
    function performDraw() {
        const roll = Math.random(); 
        let chosenRarity;
        if (roll < 0.0625) { chosenRarity = 'SSR'; }
        else if (roll < 0.25) { chosenRarity = 'SR'; }
        else if (roll < 0.5625) { chosenRarity = 'R'; }
        else { chosenRarity = 'N'; }
        const possibleCards = cardMasterList.filter(card => card.rarity === chosenRarity);
        const drawnCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
        return { ...drawnCard }; 
    }

    // --- F. 抽卡按鈕事件 ---
    // (這部分不變)
    drawButton.addEventListener('click', () => {
        if (currentTokens < DRAW_COST) {
            alert("代幣不足！快去跟老師領取！");
            return;
        }
        updateTokens(currentTokens - DRAW_COST);
        drawButton.disabled = true;
        animationWrapper.innerHTML = '<div class="draw-pending"></div>';

        setTimeout(() => {
            const drawnCard = performDraw(); 
            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}" style="background-image: url('${drawnCard.image}');">
                    <span class="card-name">${drawnCard.name}</span>
                    <span class="card-rarity">${drawnCard.rarity}</span>
                </div>
            `;
            
            const currentQuantity = cardCollection[drawnCard.id] || 0;
            cardCollection[drawnCard.id] = currentQuantity + 1;
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            displayCollection();
            drawButton.disabled = false;
        }, 2000); 
    });


    // --- G. 【大改版】老師控制台（密技）的邏輯 (使用「密碼資料庫」) ---

    // ------------------------------------------------------------------
    // 【重要】老師，你可以在這裡輕鬆更改「獎勵密碼」和「代幣數量」
    // 密碼會自動轉換為全大寫，所以不用管大小寫
    // ------------------------------------------------------------------
    const rewardCodeDatabase = {
        "1028DSAPDCIN": 50,
        "M1104ITXYKCT": 50,
        "CQ1111CVWO": 50,   // (我幫你移除了有問題的 '\]' 符號)
        "ONL1118DJCEN": 50,
        "LSNL1125YCRW": 50,
        "NWIGC1202BUI": 50,
        "JRHJJK1209BW": 50,
        "JEYCHHO1216T": 50,
        "666666661223": 100, // (這組看起來很特別，我先設 100)
        
        // 你未來可以自由新增
        // "WEEK15CODE": 75,
        // "BIRTHDAYGIFT": 200
    };
    // ------------------------------------------------------------------


    // 1. 讀取已兌換的「獎勵」密碼 (邏輯不變)
    const REDEEMED_CODES_KEY = 'redeemedRewardCodes_CPBL'; 
    let redeemedCodes = []; 
    const savedRedeemedCodes = localStorage.getItem(REDEEMED_CODES_KEY);
    if (savedRedeemedCodes) {
        redeemedCodes = JSON.parse(savedRedeemedCodes); 
    }

    // 2. 儲存已兌換的密碼 (邏輯不變)
    function saveRedeemedCodes() {
        localStorage.setItem(REDEEMED_CODES_KEY, JSON.stringify(redeemedCodes));
    }

    // 3. 【大改版】按鈕點擊事件 (邏輯簡化)
    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim().toUpperCase(); // 取得密碼，並轉成全大寫
        adminMessage.style.color = "red"; 

        if (code === "") { // 判斷是否為空
            adminMessage.innerText = "請輸入密碼！";
            return;
        }

        // --- 1. 處理可重複使用的「管理員」密碼 ---
        // (這部分不變)
        if (code === "RESET_MY_TOKENS") { 
             updateTokens(0);
             adminMessage.innerText = "代幣已重置。";
             adminMessage.style.color = "green";
             adminCodeInput.value = ""; 
             return; 
        } 
        
        if (code === "CLEAR_MY_COLLECTION") { 
            cardCollection = {}; 
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            displayCollection(); 
            adminMessage.innerText = "卡片收藏已清空！";
            adminMessage.style.color = "green"; 
            adminCodeInput.value = ""; 
            return; 
        }

        // --- 2. 處理只能用一次的「獎勵」密碼 (使用新資料庫) ---

        // 檢查 `rewardCodeDatabase` 是否有這個密碼
        if (rewardCodeDatabase.hasOwnProperty(code)) {
            
            // 檢查是否已使用過
            if (redeemedCodes.includes(code)) {
                adminMessage.innerText = "此獎勵密碼已經使用過了喔！";
            } else {
                // 兌換成功！
                const amount = rewardCodeDatabase[code]; // 從資料庫獲取獎勵數量
                updateTokens(currentTokens + amount);
                
                adminMessage.innerText = `成功兌換 ${amount} 枚代幣！`;
                adminMessage.style.color = "green";
                
                // 記錄下來
                redeemedCodes.push(code); 
                saveRedeemedCodes(); 
            }
        } else {
            // 如果不是管理密碼，也不是獎勵密碼
            adminMessage.innerText = "密碼錯誤！";
        }

        adminCodeInput.value = ""; 
    });
    
    // --- H. 介面切換邏輯 ---
    // (這部分不變)
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
