// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- A. 【最終版】卡片資料庫 (Master List) ---
    // 乾淨版，只包含 ID, 名稱, 隊伍, 稀有度, 圖片
    // ------------------------------------------------------------------

    const teams = { Brothers: '中信兄弟', Lions: '統一7-ELEVEn獅', Monkeys: '樂天桃猿', Guardians: '富邦悍將', Dragons: '味全龍', Hawks: '台鋼雄鷹' };

    const cardMasterList = [
        // --- 中信兄弟 (16) ---
        { id: 'B01', name: '王威晨', team: 'Brothers', rarity: 'SSR', image: 'bookshelf_bg.jpg' },
        { id: 'B02', name: '江坤宇', team: 'Brothers', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'B03', name: '陳子豪', team: 'Brothers', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'B04', name: '德保拉', team: 'Brothers', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'B05', name: '詹子賢', team: 'Brothers', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'B06', name: '許基宏', team: 'Brothers', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'B07', name: '岳東華', team: 'Brothers', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'B08', name: '呂彥青', team: 'Brothers', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'B09', name: '鄭浩均', team: 'Brothers', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'B10', name: '岳政華', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B11', name: '曾頌恩', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B12', name: '高宇杰', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B13', name: '王凱程', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B14', name: '吳俊偉', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B15', name: '猛登', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'B16', name: '艾士特', team: 'Brothers', rarity: 'N', image: 'bookshelf_bg.jpg' },

        // --- 統一 7-ELEVEn 獅 (16) ---
        { id: 'L01', name: '陳傑憲', team: 'Lions', rarity: 'SSR', image: '王威晨.png' },
        { id: 'L02', name: '蘇智傑', team: 'Lions', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'L03', name: '林安可', team: 'Lions', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'L04', name: '古林睿煬', team: 'Lions', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'L05', name: '陳鏞基', team: 'Lions', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'L06', name: '邱智呈', team: 'Lions', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'L07', name: '林靖凱', team: 'Lions', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'L08', name: '勝騎士', team: 'Lions', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'L09', name: '陳韻文', team: 'Lions', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'L10', name: '林益全', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L11', name: '潘威倫', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L12', name: '胡智爲', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L13', name: '劉予承', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L14', name: '林岱安', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L15', name: '施冠宇', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'L16', name: '裴瑞茲', team: 'Lions', rarity: 'N', image: 'bookshelf_bg.jpg' },
        
        // --- 樂天桃猿 (16) ---
        { id: 'M01', name: '林立', team: 'Monkeys', rarity: 'SSR', image: 'bookshelf_bg.jpg' },
        { id: 'M02', name: '廖健富', team: 'Monkeys', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'M03', name: '朱育賢', team: 'Monkeys', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'M04', name: '陳晨威', team: 'Monkeys', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'M05', name: '林泓育', team: 'Monkeys', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'M06', name: '梁家榮', team: 'Monkeys', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'M07', name: '黃子鵬', team: 'Monkeys', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'M08', name: '陳冠宇', team: 'Monkeys', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'M09', name: '威能帝', team: 'Monkeys', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'M10', name: '林承飛', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M11', name: '嚴宏鈞', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M12', name: '成晉', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M13', name: '邱丹', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M14', name: '曾仁和', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M15', name: '霸威斯', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'M16', name: '魔神樂', team: 'Monkeys', rarity: 'N', image: 'bookshelf_bg.jpg' },

        // --- 富邦悍將 (16) ---
        { id: 'G01', name: '范國宸', team: 'Guardians', rarity: 'SSR', image: 'bookshelf_bg.jpg' },
        { id: 'G02', name: '李宗賢', team: 'Guardians', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'G03', name: '申皓瑋', team: 'Guardians', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'G04', name: '曾峻岳', team: 'Guardians', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'G05', name: '王正棠', team: 'Guardians', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'G06', name: '戴培峰', team: 'Guardians', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'G07', name: '高國麟', team: 'Guardians', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'G08', name: '陳仕朋', team: 'Guardians', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'G09', name: '羅戈', team: 'Guardians', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'G10', name: '池恩齊', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G11', name: '林哲瑄', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G12', name: '王苡丞', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G13', name: '姚冠瑋', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G14', name: '江少慶', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G15', name: '富藍戈', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'G16', name: '布藍登', team: 'Guardians', rarity: 'N', image: 'bookshelf_bg.jpg' },

        // --- 味全龍 (16) ---
        { id: 'D01', name: '劉基鴻', team: 'Dragons', rarity: 'SSR', image: 'bookshelf_bg.jpg' },
        { id: 'D02', name: '吉力吉撈．鞏冠', team: 'Dragons', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'D03', name: '郭天信', team: 'Dragons', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'D04', name: '徐若熙', team: 'Dragons', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'D05', name: '李凱威', team: 'Dragons', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'D06', name: '王維中', team: 'Dragons', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'D07', name: '鋼龍', team: 'Dragons', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'D08', name: '拿莫．伊漾', team: 'Dragons', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'D09', name: '郭嚴文', team: 'Dragons', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'D10', name: '張政禹', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D11', name: '蔣少宏', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D12', name: '高孝儀', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D13', name: '林孝程', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D14', name: '陳冠偉', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D15', name: '王躍霖', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'D16', name: '伍鐸', team: 'Dragons', rarity: 'N', image: 'bookshelf_bg.jpg' },

        // --- 台鋼雄鷹 (16) ---
        { id: 'H01', name: '王柏融', team: 'Hawks', rarity: 'SSR', image: 'bookshelf_bg.jpg' },
        { id: 'H02', name: '曾子祐', team: 'Hawks', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'H03', name: '王溢正', team: 'Hawks', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'H04', name: '笠原祥太郎', team: 'Hawks', rarity: 'SR', image: 'bookshelf_bg.jpg' },
        { id: 'H05', name: '葉保弟', team: 'Hawks', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'H06', name: '杜家明', team: 'Hawks', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'H07', name: '魔鷹', team: 'Hawks', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'H08', name: '伍祐城', team: 'Hawks', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'H09', name: '施子謙', team: 'Hawks', rarity: 'R', image: 'bookshelf_bg.jpg' },
        { id: 'H10', name: '郭永維', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H11', name: '張肇元', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H12', name: '紀慶然', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H13', name: '洪瑋漢', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H14', name: '顏清浤', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H15', name: '陳宇宏', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' },
        { id: 'H16', name: '雷公', team: 'Hawks', rarity: 'N', image: 'bookshelf_bg.jpg' }
    ];

    
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
                <div class="card reveal-${drawnCard.rarity}">
                    <img src="${drawnCard.image}" alt="${drawnCard.name}">
                </div>
            `;
            
            const currentQuantity = cardCollection[drawnCard.id] || 0;
            cardCollection[drawnCard.id] = currentQuantity + 1;
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            displayCollection();
            drawButton.disabled = false;
        }, 2000); 
    });


    // --- G. 老師控制台（密技）的邏輯 ---
    // (這部分不變)
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
    const REDEEMED_CODES_KEY = 'redeemedRewardCodes_CPBL'; 
    let redeemedCodes = []; 
    const savedRedeemedCodes = localStorage.getItem(REDEEMED_CODES_KEY);
    if (savedRedeemedCodes) {
        redeemedCodes = JSON.parse(savedRedeemedCodes); 
    }
    function saveRedeemedCodes() {
        localStorage.setItem(REDEEMED_CODES_KEY, JSON.stringify(redeemedCodes));
    }
    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim().toUpperCase(); 
        adminMessage.style.color = "red"; 
        if (code === "") { adminMessage.innerText = "請輸入密碼！"; return; }
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
        if (rewardCodeDatabase.hasOwnProperty(code)) {
            if (redeemedCodes.includes(code)) {
                adminMessage.innerText = "此獎勵密碼已經使用過了喔！";
            } else {
                const amount = rewardCodeDatabase[code]; 
                updateTokens(currentTokens + amount);
                adminMessage.innerText = `成功兌換 ${amount} 枚代幣！`;
                adminMessage.style.color = "green";
                redeemedCodes.push(code); 
                saveRedeemedCodes(); 
            }
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

