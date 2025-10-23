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
    
    // (teamElementIds 已不再需要，我們將動態產生 ID)

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


    // --- D. 【大改版】初始化卡片收藏庫 ---
    const COLLECTION_STORAGE_KEY = 'myStudentCollection_CPBL'; 
    let cardCollection = {}; 

    // 【全新】函式：顯示卡冊 (核心)
    function displayCollection() {
        let totalOwnedTypes = 0; 
        const rarities = ['SSR', 'SR', 'R', 'N']; // 定義排列順序

        // 1. 遍歷 6 支球隊
        for (const teamKey in teams) {
            // 從「卡片資料庫」中篩選出該隊的所有卡片
            const teamCards = cardMasterList.filter(card => card.team === teamKey);
            
            // 2. 遍歷 4 個稀有度
            rarities.forEach(rarity => {
                // 3. 找到對應的 HTML 容器 (例如: collection-brothers-SSR)
                const teamRarityDiv = document.getElementById(`collection-${teamKey.toLowerCase()}-${rarity}`);
                if (!teamRarityDiv) return; // 安全檢查
                
                teamRarityDiv.innerHTML = ""; // 清空該行

                // 4. 篩選出該隊 & 該稀有度的所有卡片
                const rarityCards = teamCards.filter(card => card.rarity === rarity);
                
                // 5. 遍歷並顯示卡片
                rarityCards.forEach(masterCard => {
                    const quantity = cardCollection[masterCard.id] || 0;

                    // 6. 【修正錯誤】建立卡片「外框」
                    const cardWrapper = document.createElement('div');
                    
                    if (quantity > 0) {
                        // 【已抽到】
                        totalOwnedTypes++;
                        // 【修正錯誤】把發光 class 加到外框上
                        cardWrapper.className = `card-small-wrapper reveal-${masterCard.rarity}`;
                        
                        cardWrapper.innerHTML = `
                            <div class="card-small-inner" style="background-image: url('${masterCard.image}');">
                                </div>
                            <div class="card-quantity">x${quantity}</div>
                        `;
                    } else {
                        // 【未抽到】
                        // 【修正錯誤】把黑影 class 加到外框上
                        cardWrapper.className = `card-small-wrapper card-silhouette`;
                        
                        cardWrapper.innerHTML = `
                            <div class="card-small-inner">
                                <span>?</span> </div>
                        `;
                    }
                    teamRarityDiv.appendChild(cardWrapper);
                });
            });
        }
        
        // 7. 更新總收藏進度
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

            // 揭曉動畫 (套用發光 class)
            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}" style="background-image: url('${drawnCard.image}');">
                    <span class="card-name">${drawnCard.name}</span>
                    <span class="card-rarity">${drawnCard.rarity}</span>
                </div>
            `;
            
            // (以下儲存邏輯不變)
            const currentQuantity = cardCollection[drawnCard.id] || 0;
            cardCollection[drawnCard.id] = currentQuantity + 1;
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            
            // 【重要】即使卡冊頁面沒開，也要在背景更新它
            displayCollection();

            drawButton.disabled = false;
        }, 2000); 
    });


    // --- G. 老師控制台（密技）的邏輯 ---
    // (這部分不變)
    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim().toUpperCase(); 
        adminMessage.style.color = "red"; 
        if (code === "ADD_TOKEN_50") {
            updateTokens(currentTokens + 50);
            adminMessage.innerText = "成功兌換 50 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "ADD_TOKEN_500") { 
            updateTokens(currentTokens + 500);
            adminMessage.innerText = "成功兌換 500 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "RESET_MY_TOKENS") { 
             updateTokens(0);
             adminMessage.innerText = "代幣已重置。";
        } else if (code === "CLEAR_MY_COLLECTION") { 
            cardCollection = {}; 
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            displayCollection(); 
            adminMessage.innerText = "卡片收藏已清空！";
            adminMessage.style.color = "green"; 
        } else {
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
