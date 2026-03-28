// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 【重要】你的 Google Apps Script 雲端資料庫網址 ---
    const API_URL = "https://script.google.com/macros/s/AKfycbzpNZ04iycuMbVzaV0yRxa43qy-RSXWGEaPGfhM7funb0vuj2P-pi1sGQ5Vxv5mXbmy/exec";

    // --- A. 卡片資料庫 (Master List) ---
    const teams = { Brothers: '中信兄弟', Lions: '統一7-ELEVEn獅', Monkeys: '樂天桃猿', Guardians: '富邦悍將', Dragons: '味全龍', Hawks: '台鋼雄鷹' };
    const cardMasterList = [
        // --- 中信兄弟 (16) ---
        { id: 'B01', name: '王威晨', team: 'Brothers', rarity: 'SSR', image: 'images/CTBC_Brothers/1.jpg' },
        { id: 'B02', name: '江坤宇', team: 'Brothers', rarity: 'SR', image: 'images/CTBC_Brothers/2.jpg' },
        { id: 'B03', name: '陳琥', team: 'Brothers', rarity: 'SR', image: 'images/CTBC_Brothers/3.jpg' },
        { id: 'B04', name: '德保拉', team: 'Brothers', rarity: 'SR', image: 'images/CTBC_Brothers/4.jpg' },
        { id: 'B05', name: '詹子賢', team: 'Brothers', rarity: 'R', image: 'images/CTBC_Brothers/5.jpg' },
        { id: 'B06', name: '許基宏', team: 'Brothers', rarity: 'R', image: 'images/CTBC_Brothers/6.jpg' },
        { id: 'B07', name: '岳東華', team: 'Brothers', rarity: 'R', image: 'images/CTBC_Brothers/7.jpg' },
        { id: 'B08', name: '呂彥青', team: 'Brothers', rarity: 'R', image: 'images/CTBC_Brothers/8.jpg' },
        { id: 'B09', name: '鄭浩均', team: 'Brothers', rarity: 'R', image: 'images/CTBC_Brothers/9.jpg' },
        { id: 'B10', name: '岳政華', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/10.jpg' },
        { id: 'B11', name: '曾頌恩', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/11.jpg' },
        { id: 'B12', name: '高宇杰', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/12.jpg' },
        { id: 'B13', name: '王凱程', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/13.jpg' },
        { id: 'B14', name: '吳俊偉', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/14.jpg' },
        { id: 'B15', name: '林瑞鈞', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/15.jpg' },
        { id: 'B16', name: '李聖裕', team: 'Brothers', rarity: 'N', image: 'images/CTBC_Brothers/16.jpg' },

        // --- 統一 7-ELEVEn 獅 (16) ---
        { id: 'L01', name: '陳傑憲', team: 'Lions', rarity: 'SSR', image: 'images/Uni-President_7-Eleven_Lions/1.jpg' },
        { id: 'L02', name: '蘇智傑', team: 'Lions', rarity: 'SR', image: 'images/Uni-President_7-Eleven_Lions/2.jpg' },
        { id: 'L03', name: '布雷克', team: 'Lions', rarity: 'SR', image: 'images/Uni-President_7-Eleven_Lions/3.jpg' },
        { id: 'L04', name: '高塩將樹', team: 'Lions', rarity: 'SR', image: 'images/Uni-President_7-Eleven_Lions/4.jpg' },
        { id: 'L05', name: '陳鏞基', team: 'Lions', rarity: 'R', image: 'images/Uni-President_7-Eleven_Lions/5.jpg' },
        { id: 'L06', name: '邱智呈', team: 'Lions', rarity: 'R', image: 'images/Uni-President_7-Eleven_Lions/6.jpg' },
        { id: 'L07', name: '林靖凱', team: 'Lions', rarity: 'R', image: 'images/Uni-President_7-Eleven_Lions/7.jpg' },
        { id: 'L08', name: '潘傑楷', team: 'Lions', rarity: 'R', image: 'images/Uni-President_7-Eleven_Lions/8.jpg' },
        { id: 'L09', name: '陳韻文', team: 'Lions', rarity: 'R', image: 'images/Uni-President_7-Eleven_Lions/9.jpg' },
        { id: 'L10', name: '獅帝芬', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/10.jpg' },
        { id: 'L11', name: '黃竣彥', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/11.jpg' },
        { id: 'L12', name: '林易霆', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/12.jpg' },
        { id: 'L13', name: '田子杰', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/13.jpg' },
        { id: 'L14', name: '王鏡銘', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/14.jpg' },
        { id: 'L15', name: '劉予承', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/15.jpg' },
        { id: 'L16', name: '李其峰', team: 'Lions', rarity: 'N', image: 'images/Uni-President_7-Eleven_Lions/16.jpg' },
        
        // --- 樂天桃猿 (16) ---
        { id: 'M01', name: '林立', team: 'Monkeys', rarity: 'SSR', image: 'images/Rakuten_Monkeys/1.jpg' },
        { id: 'M02', name: '廖健富', team: 'Monkeys', rarity: 'SR', image: 'images/Rakuten_Monkeys/2.jpg' }, 
        { id: 'M03', name: '毛英傑', team: 'Monkeys', rarity: 'SR', image: 'images/Rakuten_Monkeys/3.jpg' },
        { id: 'M04', name: '陳晨威', team: 'Monkeys', rarity: 'SR', image: 'images/Rakuten_Monkeys/4.jpg' },
        { id: 'M05', name: '林泓育', team: 'Monkeys', rarity: 'R', image: 'images/Rakuten_Monkeys/5.jpg' },
        { id: 'M06', name: '梁家榮', team: 'Monkeys', rarity: 'R', image: 'images/Rakuten_Monkeys/6.jpg' },
        { id: 'M07', name: '朱承洋', team: 'Monkeys', rarity: 'R', image: 'images/Rakuten_Monkeys/7.jpg' },
        { id: 'M08', name: '陳冠宇', team: 'Monkeys', rarity: 'R', image: 'images/Rakuten_Monkeys/8.jpg' },
        { id: 'M09', name: '威能帝', team: 'Monkeys', rarity: 'R', image: 'images/Rakuten_Monkeys/9.jpg' },
        { id: 'M10', name: '林承飛', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/10.jpg' },
        { id: 'M11', name: '嚴宏鈞', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/11.jpg' },
        { id: 'M12', name: '成晉', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/12.jpg' },
        { id: 'M13', name: '邱鑫', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/13.jpg' },
        { id: 'M14', name: '陳柏豪', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/14.jpg' },
        { id: 'M15', name: '曾家輝', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/15.jpg' },
        { id: 'M16', name: '董順傑', team: 'Monkeys', rarity: 'N', image: 'images/Rakuten_Monkeys/16.jpg' },

        // --- 富邦悍將 (16) ---
        { id: 'G01', name: '范國宸', team: 'Guardians', rarity: 'SSR', image: 'images/Fubon_Guardians/1.jpg' },
        { id: 'G02', name: '戴培峰', team: 'Guardians', rarity: 'SR', image: 'images/Fubon_Guardians/2.jpg' },
        { id: 'G03', name: '申皓瑋', team: 'Guardians', rarity: 'SR', image: 'images/Fubon_Guardians/3.jpg' },
        { id: 'G04', name: '曾峻岳', team: 'Guardians', rarity: 'SR', image: 'images/Fubon_Guardians/4.jpg' },
        { id: 'G05', name: '王正棠', team: 'Guardians', rarity: 'R', image: 'images/Fubon_Guardians/5.jpg' },
        { id: 'G06', name: '李宗賢', team: 'Guardians', rarity: 'R', image: 'images/Fubon_Guardians/6.jpg' },
        { id: 'G07', name: '高國麟', team: 'Guardians', rarity: 'R', image: 'images/Fubon_Guardians/7.jpg' },
        { id: 'G08', name: '陳仕朋', team: 'Guardians', rarity: 'R', image: 'images/Fubon_Guardians/8.jpg' },
        { id: 'G09', name: '高捷', team: 'Guardians', rarity: 'R', image: 'images/Fubon_Guardians/9.jpg' },
        { id: 'G10', name: '池恩齊', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/10.jpg' },
        { id: 'G11', name: '林哲瑄', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/11.jpg' },
        { id: 'G12', name: '王苡丞', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/12.jpg' },
        { id: 'G13', name: '周佳樂', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/13.jpg' },
        { id: 'G14', name: '黃保羅', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/14.jpg' },
        { id: 'G15', name: '邦力多', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/15.jpg' },
        { id: 'G16', name: '石梓霖', team: 'Guardians', rarity: 'N', image: 'images/Fubon_Guardians/16.jpg' },

        // --- 味全龍 (16) ---
        { id: 'D01', name: '劉基鴻', team: 'Dragons', rarity: 'SSR', image: 'images/Wei_Chuan_Dragons/1.jpg' },
        { id: 'D02', name: '吉力吉撈．鞏冠', team: 'Dragons', rarity: 'SR', image: 'images/Wei_Chuan_Dragons/2.jpg' },
        { id: 'D03', name: '郭天信', team: 'Dragons', rarity: 'SR', image: 'images/Wei_Chuan_Dragons/3.jpg' },
        { id: 'D04', name: '王伯洋', team: 'Dragons', rarity: 'SR', image: 'images/Wei_Chuan_Dragons/4.jpg' },
        { id: 'D05', name: '李凱威', team: 'Dragons', rarity: 'R', image: 'images/Wei_Chuan_Dragons/5.jpg' },
        { id: 'D06', name: '拿莫．伊漾', team: 'Dragons', rarity: 'R', image: 'images/Wei_Chuan_Dragons/6.jpg' },
        { id: 'D07', name: '吳俊杰', team: 'Dragons', rarity: 'R', image: 'images/Wei_Chuan_Dragons/7.jpg' },
        { id: 'D08', name: '黃柏豪', team: 'Dragons', rarity: 'R', image: 'images/Wei_Chuan_Dragons/8.jpg' },
        { id: 'D09', name: '鋼龍', team: 'Dragons', rarity: 'R', image: 'images/Wei_Chuan_Dragons/9.jpg' },
        { id: 'D10', name: '張政禹', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/10.jpg' },
        { id: 'D11', name: '蔣少宏', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/11.jpg' },
        { id: 'D12', name: '趙璟榮', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/12.jpg' },
        { id: 'D13', name: '林孝程', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/13.jpg' },
        { id: 'D14', name: '陳冠偉', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/14.jpg' },
        { id: 'D15', name: '楊鈺翔', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/15.jpg' },
        { id: 'D16', name: '伍鐸', team: 'Dragons', rarity: 'N', image: 'images/Wei_Chuan_Dragons/16.jpg' },

        // --- 台鋼雄鷹 (16) ---
        { id: 'H01', name: '王柏融', team: 'Hawks', rarity: 'SSR', image: 'images/TSG_Hawks/1.jpg' },
        { id: 'H02', name: '曾子祐', team: 'Hawks', rarity: 'SR', image: 'images/TSG_Hawks/2.jpg' },
        { id: 'H03', name: '韋宏亮', team: 'Hawks', rarity: 'SR', image: 'images/TSG_Hawks/3.jpg' },
        { id: 'H04', name: '陳正毅', team: 'Hawks', rarity: 'SR', image: 'images/TSG_Hawks/4.jpg' },
        { id: 'H05', name: '葉保弟', team: 'Hawks', rarity: 'R', image: 'images/TSG_Hawks/5.jpg' },
        { id: 'H06', name: '杜家明', team: 'Hawks', rarity: 'R', image: 'images/TSG_Hawks/6.jpg' },
        { id: 'H07', name: '魔鷹', team: 'Hawks', rarity: 'R', image: 'images/TSG_Hawks/7.jpg' },
        { id: 'H08', name: '伍祐城', team: 'Hawks', rarity: 'R', image: 'images/TSG_Hawks/8.jpg' },
        { id: 'H09', name: '施子謙', team: 'Hawks', rarity: 'R', image: 'images/TSG_Hawks/9.jpg' },
        { id: 'H10', name: '郭永維', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/10.jpg' },
        { id: 'H11', name: '張肇元', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/11.jpg' },
        { id: 'H12', name: '紀慶然', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/12.jpg' },
        { id: 'H13', name: '許育銘', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/13.jpg' },
        { id: 'H14', name: '顏清浤', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/14.jpg' },
        { id: 'H15', name: '陳宇宏', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/15.jpg' },
        { id: 'H16', name: '廖奕安', team: 'Hawks', rarity: 'N', image: 'images/TSG_Hawks/16.jpg' }
    ];

    
    // --- B. 獲取 HTML 元素 ---
    const gachaView = document.getElementById('gacha-view');
    const collectionView = document.getElementById('collection-view');
    const showGachaBtn = document.getElementById('show-gacha-btn');
    const showCollectionBtn = document.getElementById('show-collection-btn');
    const tokenDisplay = document.getElementById('token-display');
    const drawButton = document.getElementById('draw-button');
    const draw10xButton = document.getElementById('draw-10x-button');
    const animationWrapper = document.getElementById('animation-wrapper');
    const collectionProgress = document.getElementById('collection-progress');
    const adminCodeInput = document.getElementById('admin-code');
    const adminSubmitButton = document.getElementById('admin-submit');
    const adminMessage = document.getElementById('admin-message');

    // 登入相關元素
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const btnLogin = document.getElementById('btn-login');
    const loginMessage = document.getElementById('login-message');
    const currentUserDisplay = document.getElementById('current-user-display');


    // --- C. 全域狀態變數 ---
    let currentUser = null; 
    let currentTokens = 0;
    let cardCollection = {}; 
    let redeemedCodes = []; 

    
    // --- 【雲端登入邏輯】 ---
    btnLogin.addEventListener('click', async () => {
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (username === "" || password === "") {
            loginMessage.innerText = "請輸入名字和密碼！";
            return;
        }

        // 鎖定按鈕，顯示連線中
        btnLogin.disabled = true;
        btnLogin.innerText = "🔍 正在翻找你的專屬卡冊...";
        loginMessage.style.color = "#333";
        loginMessage.innerText = "🏟️ 正在為你打開球場大門...";

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'login',
                    username: username,
                    password: password
                })
            });
            const result = await response.json();

            if (result.status === 'success') {
                // 登入成功，寫入資料
                currentUser = username;
                currentTokens = parseInt(result.tokens) || 0;
                cardCollection = JSON.parse(result.collection || "{}");
                redeemedCodes = JSON.parse(result.redeemedCodes || "[]");

                // 更新畫面
                currentUserDisplay.innerText = `玩家: ${username}`;
                updateTokensUI();
                displayCollection();

                // 切換畫面
                loginScreen.style.display = 'none';
                mainApp.style.display = 'block';
            } else {
                loginMessage.style.color = "red";
                loginMessage.innerText = result.message || "登入失敗！";
            }
        } catch (error) {
            loginMessage.style.color = "red";
            loginMessage.innerText = "🔌 找不到連線訊號，教練說請重新整理再試一次！";
            console.error(error);
        } finally {
            btnLogin.disabled = false;
            btnLogin.innerText = "進入遊戲";
        }
    });

    // --- 【雲端存檔邏輯】 ---
    async function saveDataToCloud() {
        if (!currentUser) return;
        
        currentUserDisplay.innerText = `玩家: ${currentUser} (⏳ 整理卡片中...)`;
        
        try {
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'save',
                    username: currentUser,
                    tokens: currentTokens,
                    collection: JSON.stringify(cardCollection),
                    redeemedCodes: JSON.stringify(redeemedCodes)
                })
            });
            currentUserDisplay.innerText = `玩家: ${currentUser}`;
        } catch (e) {
            console.error("雲端存檔失敗:", e);
            currentUserDisplay.innerText = `玩家: ${currentUser} (⚠️同步失敗)`;
        }
    }

    // --- 【全新加入：發送抽卡紀錄到雲端】 ---
    async function logGachaToCloud(drawType, cardsArray) {
        if (!currentUser) return;
        
        // 將抽到的卡片陣列轉換成一行文字，方便試算表閱讀
        // 例如："[SSR] 王威晨, [R] 詹子賢"
        const cardNamesString = cardsArray.map(card => `[${card.rarity}] ${card.name}`).join(', ');

        try {
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'log_gacha',
                    username: currentUser,
                    drawType: drawType,          // 單抽 or 十連抽
                    cards: cardNamesString,      // 抽到的內容
                    tokensLeft: currentTokens    // 剩下的代幣
                })
            });
            // 紀錄發送成功不影響畫面，所以默默完成就好
        } catch (e) {
            console.error("抽卡紀錄上傳失敗:", e);
        }
    }

    // 僅更新畫面數字，不負責存檔
    function updateTokensUI() {
        tokenDisplay.innerText = currentTokens;
    }


    // --- D. 顯示卡片收藏庫 ---
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
                            <div class="card-small-inner" title="${masterCard.name}">
                                <img src="${masterCard.image}" alt="${masterCard.name}">
                            </div>
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


    // --- E. 抽卡邏輯 ---
    const DRAW_COST = 10; 
    function performDraw() {
        const roll = Math.random(); 
        let chosenRarity;
        if (roll < 0.1) { chosenRarity = 'SSR'; } 
        else if (roll < 0.35) { chosenRarity = 'SR'; }
        else if (roll < 0.65) { chosenRarity = 'R'; } 
        else { chosenRarity = 'N'; } 

        const possibleCards = cardMasterList.filter(card => card.rarity === chosenRarity);
        const drawnCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
        return { ...drawnCard }; 
    }

    // --- F. 抽卡按鈕事件 ---
    function setButtonsDisabled(disabled) {
        drawButton.disabled = disabled;
        draw10xButton.disabled = disabled;
    }

    drawButton.addEventListener('click', () => {
        if (currentTokens < DRAW_COST) {
            alert("代幣不足！快去跟老師領取！");
            return;
        }
        
        currentTokens -= DRAW_COST;
        updateTokensUI();
        setButtonsDisabled(true); 
        animationWrapper.innerHTML = '<div class="card-back">抽卡中...</div>';

        setTimeout(() => {
            const drawnCard = performDraw(); 
            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}">
                    <img src="${drawnCard.image}" alt="${drawnCard.name}">
                </div>
            `;
            
            const currentQuantity = cardCollection[drawnCard.id] || 0;
            cardCollection[drawnCard.id] = currentQuantity + 1;
            displayCollection(); 
            
            // 存檔並上傳抽卡紀錄！
            saveDataToCloud();
            logGachaToCloud("單抽", [drawnCard]); // 【新增】
            
            setButtonsDisabled(false); 
        }, 2200); 
    });

    draw10xButton.addEventListener('click', () => {
        const TEN_DRAW_COST = DRAW_COST * 10;
        if (currentTokens < TEN_DRAW_COST) {
            alert(`十連抽需要 ${TEN_DRAW_COST} 枚代幣，您的代幣不足！`);
            return;
        }
        
        currentTokens -= TEN_DRAW_COST;
        updateTokensUI();
        setButtonsDisabled(true); 

        animationWrapper.innerHTML = '<div class="card-back" style="animation-duration: 2s;">連抽中...</div>';

        setTimeout(() => {
            let drawResults = []; 
            for (let i = 0; i < 10; i++) {
                const drawnCard = performDraw();
                drawResults.push(drawnCard); 
                
                const currentQuantity = cardCollection[drawnCard.id] || 0;
                cardCollection[drawnCard.id] = currentQuantity + 1;
            }
            
            animationWrapper.innerHTML = ""; 
            drawResults.forEach((card, index) => {
                const cardWrapper = document.createElement('div');
                cardWrapper.className = `card-small-wrapper reveal-${card.rarity}`; 
                cardWrapper.innerHTML = `
                    <div class="card-small-inner" title="${card.name}">
                        <img src="${card.image}" alt="${card.name}">
                    </div>
                `;
                cardWrapper.style.animationDelay = `${(index * 0.1) + 0.5}s`; 
                animationWrapper.appendChild(cardWrapper);
            });
            
            displayCollection(); 
            
            // 存檔並上傳抽卡紀錄！
            saveDataToCloud();
            logGachaToCloud("十連抽", drawResults); // 【新增】
            
            setButtonsDisabled(false); 
        }, 3000); 
    });


    // --- G. 老師控制台邏輯 ---
    const rewardCodeDatabase = {
        "1028DSAPDCIN": 50,
        "M1104ITXYKCT": 50,
        "CQ1111CVWO": 50,
        "ONL1118DJCEN": 50,
        "LSNL1125YCRW": 50,
        "NWIGC1202BUI": 50,
        "JRHJJK1209BW": 50,
        "JEYCHHO1216T": 50,
        "666666661223": 100,
    };

    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim().toUpperCase(); 
        adminMessage.style.color = "red"; 
        if (code === "") { adminMessage.innerText = "請輸入密碼！"; return; }
        
        if (code === "RESET_MY_TOKENS") { 
             currentTokens = 0;
             updateTokensUI();
             saveDataToCloud(); 
             adminMessage.innerText = "代幣已重置。";
             adminMessage.style.color = "green";
             adminCodeInput.value = ""; 
             return; 
        } 
        if (code === "CLEAR_MY_COLLECTION") { 
            cardCollection = {}; 
            displayCollection(); 
            saveDataToCloud(); 
            adminMessage.innerText = "卡片收藏已清空！";
            adminMessage.style.color = "green"; 
            adminCodeInput.value = ""; 
             return; 
        }
        if (code === "TEACHER_ADD_100") {
             currentTokens += 100;
             updateTokensUI();
             saveDataToCloud(); 
             adminMessage.innerText = "成功補充 100 枚代幣！(可重複)";
             adminMessage.style.color = "green";
             adminCodeInput.value = ""; 
             return; 
        }

        if (rewardCodeDatabase.hasOwnProperty(code)) {
            if (redeemedCodes.includes(code)) {
                adminMessage.innerText = "此獎勵密碼已經使用過了喔！";
            } else {
                const amount = rewardCodeDatabase[code]; 
                currentTokens += amount;
                updateTokensUI();
                redeemedCodes.push(code); 
                saveDataToCloud(); 
                
                adminMessage.innerText = `成功兌換 ${amount} 枚代幣！`;
                adminMessage.style.color = "green";
            }
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

