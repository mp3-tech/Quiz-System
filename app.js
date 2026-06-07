/**
 * ==========================================================================
 * 網頁智慧複習系統 - 核心邏輯 JavaScript
 * ==========================================================================
 */

// 1. 全域變數與儲存 Key 定義
const STORAGE_KEY = 'web_review_questions_db';
const HISTORY_KEY = 'web_review_quiz_history';

// 預設考題：統計學第六章、第八章、第十章
const DEFAULT_QUESTIONS = [

    // =====================================================================
    // 統計第六章：抽樣方法與抽樣分配
    // =====================================================================
    {
        id: 'q_ch6_01',
        category: '統計第六章',
        questionText: '下列哪一個不是隨機樣本的必要條件？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 樣本要抽自相同母體' },
            { id: 'opt_b', text: 'B. 樣本間要相互獨立' },
            { id: 'opt_c', text: 'C. 要採隨機抽樣進行抽樣' },
            { id: 'opt_d', text: 'D. 母體一定要常態母體' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】\n隨機抽樣的三個必要條件：\n①樣本來自同一母體\n②樣本彼此獨立（每次抽樣不影響下次）\n③採用隨機／機率方式抽樣\n\n母體是否為常態分配，只影響樣本平均數的抽樣分配形狀，並非隨機樣本的必要條件。即使母體非常態，只要樣本數夠大（中央極限定理），樣本平均數仍會近似常態分配。'
    },
    {
        id: 'q_ch6_02',
        category: '統計第六章',
        questionText: '高雄市政府想要瞭解市民對防治登革熱績效的看法，根據統計高雄市現有 38 個區共 891 個里，隨機由 38 個區中隨機各抽取 3 個里，共 114 個里進行普查，試問這是何種抽樣方法？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 簡單隨機抽樣' },
            { id: 'opt_b', text: 'B. 分層抽樣' },
            { id: 'opt_c', text: 'C. 系統抽樣' },
            { id: 'opt_d', text: 'D. 集群抽樣' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】集群抽樣（Cluster Sampling）\n\n步驟說明：\n①先將母體分成若干「群（cluster）」→ 38 個區\n②從群中隨機抽取幾群 → 各區隨機抽 3 個里\n③對抽中的群進行普查 → 114 個里全部普查\n\n與分層抽樣的區別：分層抽樣是在每層中抽取部分個體；集群抽樣則是抽取整個群後對群內全部成員普查。'
    },
    {
        id: 'q_ch6_03',
        category: '統計第六章',
        questionText: '教育部對某五專觀光學系進行系所評鑑，須訪談該系的學生，該系共有 250 位同學，評鑑委員欲抽取 10 位同學進行訪談，請系上助理將同學由 1 號編到 250 號，並以 25 位同學為一組，共分為 A～J 等 10 組，評鑑委員由 A 組隨機抽取一個號碼後，請系上助理將此號碼依序加上 25 後，抽取訪談同學的編號，試問這是何種抽樣方法？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 簡單隨機抽樣' },
            { id: 'opt_b', text: 'B. 分層抽樣' },
            { id: 'opt_c', text: 'C. 系統抽樣' },
            { id: 'opt_d', text: 'D. 集群抽樣' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】系統抽樣（Systematic Sampling）\n\n步驟說明：\n①將 250 人編號 1～250\n②計算抽樣間距 k = 250 ÷ 10 = 25\n③在第一組（1～25）中隨機抽取一個起始號碼\n④之後每隔 25 號抽取一位，共抽 10 人\n\n特徵：「先編號，每隔 k 個抽 1 位」即為系統抽樣的標誌。'
    },
    {
        id: 'q_ch6_04',
        category: '統計第六章',
        questionText: '某校欲瞭解大學生對「反送中」的看法，在校園看到同學就問，試問這是何種抽樣方法？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 便利抽樣' },
            { id: 'opt_b', text: 'B. 立意抽樣' },
            { id: 'opt_c', text: 'C. 配額抽樣' },
            { id: 'opt_d', text: 'D. 滾雪球抽樣' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】便利抽樣（Convenience Sampling）\n\n說明：依照便利性（看到同學就問）進行抽樣，屬於非機率抽樣方法，樣本代表性較低。\n\n各非機率抽樣比較：\n• 便利抽樣：依方便性取樣，最省時省力\n• 立意抽樣：研究者依判斷選取具代表性的對象\n• 配額抽樣：依母體特徵比例設定配額後取樣\n• 滾雪球抽樣：由受訪者介紹其他受訪者，適合特殊族群'
    },
    {
        id: 'q_ch6_05',
        category: '統計第六章',
        questionText: '抽樣分配指的是哪一個數的機率分配？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 母體平均數' },
            { id: 'opt_b', text: 'B. 樣本平均數' },
            { id: 'opt_c', text: 'C. 母體變異數' },
            { id: 'opt_d', text: 'D. 母體比例' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n\n抽樣分配（Sampling Distribution）是統計量（Statistic）的機率分配。\n\n統計量是由母體中抽出之隨機樣本所計算出的數值（如樣本平均數 X̄、樣本比例 p̂ 等）。\n\n母體參數（μ、σ²、P）是固定的常數，不是隨機變數，因此沒有機率分配。\n只有統計量（如樣本平均數 X̄）會因每次抽取的樣本不同而改變，才具有抽樣分配。'
    },
    {
        id: 'q_ch6_06',
        category: '統計第六章',
        questionText: '依據中央極限定理，當下列哪一個條件成立時，任何統計量的機率分配都會近似常態分配？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 樣本數夠大' },
            { id: 'opt_b', text: 'B. 樣本平均數夠大' },
            { id: 'opt_c', text: 'C. 樣本標準差夠大' },
            { id: 'opt_d', text: 'D. 樣本變異數夠大' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n\n中央極限定理（Central Limit Theorem）：\n無論母體分配的形狀為何，當樣本數 n 越大（通常 n ≥ 30），樣本平均數 X̄ 的抽樣分配會趨近於常態分配。\n\n公式：X̄ ~ N(μ, σ²/n)\n\n關鍵：是「樣本數夠大」，而非樣本平均數、標準差或變異數夠大。'
    },
    {
        id: 'q_ch6_07_1',
        category: '統計第六章',
        questionText: '【民宿題組 (1)】一優質民宿內有四間不同等級的房間，房價分別為1,000、2,000、2,000 與 4,000 元，每天提供兩間出租，令 X 表示今年暑假出租房間的房價，令 X̄ = (X₁ + X₂)/2 表每天每間房間的平均價格。\n\n試求 X̄ 抽樣分配中，①（X̄ = 1500 時的機率分子）對應的 X̄ 值為何？\n\n（提示：四間房 ABCD，A=1000、B=2000、C=2000、D=4000，每次出租兩間）',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1000' },
            { id: 'opt_b', text: 'B. 1500' },
            { id: 'opt_c', text: 'C. 2000' },
            { id: 'opt_d', text: 'D. 4000' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】X̄ = 1500\n\n每天出租兩間，所有可能組合（C(4,2)=6種）：\n• AB：(1000+2000)/2 = 1500　→ f(x̄) = 2/6（AB、AC）\n• AC：(1000+2000)/2 = 1500\n• AD：(1000+4000)/2 = 2500　→ f(x̄) = 1/6\n• BC：(2000+2000)/2 = 2000　→ f(x̄) = 1/6\n• BD：(2000+4000)/2 = 3000　→ f(x̄) = 2/6（BD、CD）\n• CD：(2000+4000)/2 = 3000\n\n抽樣分配表：\nx̄ = 1500：f(x̄) = 2/6\nx̄ = 2000（此題①）：f(x̄) 見下題\nx̄ = 2500：f(x̄) = 1/6\nx̄ = 3000：f(x̄) = 2/6\n\n①所填的 x̄ 值為 1500（第一欄位）'
    },
    {
        id: 'q_ch6_07_2',
        category: '統計第六章',
        questionText: '【民宿題組 (2)】承上題，抽樣分配表中②（x̄ = 2000 欄位的機率分子）為何？\n\n（x̄ = 2500 的 f(x̄) = 1/6 已知）',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1000' },
            { id: 'opt_b', text: 'B. 1500' },
            { id: 'opt_c', text: 'C. 2000' },
            { id: 'opt_d', text: 'D. 4000' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】X̄ = 2000\n\n六種組合分析：\n• AB → (1000+2000)/2 = 1500\n• AC → (1000+2000)/2 = 1500\n• AD → (1000+4000)/2 = 2500 ✓（題目已知 f=1/6）\n• BC → (2000+2000)/2 = 2000 ✓\n• BD → (2000+4000)/2 = 3000\n• CD → (2000+4000)/2 = 3000\n\n②的 x̄ 值（第二欄位）= 2000\nf(2000) = 1/6（只有 BC 這一種組合）'
    },
    {
        id: 'q_ch6_07_3',
        category: '統計第六章',
        questionText: '【民宿題組 (3)】承上題，抽樣分配表中③（x̄ = 2500 的機率）為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1/6' },
            { id: 'opt_b', text: 'B. 2/6' },
            { id: 'opt_c', text: 'C. 3/6' },
            { id: 'opt_d', text: 'D. 4/6' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】f(2500) = 1/6\n\n六種組合中，x̄ = 2500 只有一種：\n• AD：(1000+4000)/2 = 2500\n\n因此 f(2500) = 1/6\n\n完整抽樣分配：\n• f(1500) = 2/6（AB、AC）\n• f(2000) = 1/6（BC）\n• f(2500) = 1/6（AD）\n• f(3000) = 2/6（BD、CD）\n• 合計 = 6/6 = 1 ✓'
    },
    {
        id: 'q_ch6_07_4',
        category: '統計第六章',
        questionText: '【民宿題組 (4)】承上題，抽樣分配表中④（合計欄位的 f(x̄) 值）為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. -1' },
            { id: 'opt_b', text: 'B. 0' },
            { id: 'opt_c', text: 'C. 1' },
            { id: 'opt_d', text: 'D. 2' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】合計 = 1\n\n機率分配的基本性質：所有可能值的機率總和必須等於 1。\n\n驗算：\n2/6 + 1/6 + 1/6 + 2/6 = 6/6 = 1 ✓\n\n因此 ④ = 1'
    },

    // =====================================================================
    // 統計第八章：假設檢定
    // =====================================================================
    {
        id: 'q_ch8_01',
        category: '統計第八章',
        questionText: '考慮檢定的假設為 H₀: μ ≤ 21　H₁: μ ≥ 21，此檢定類型為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 左尾檢定' },
            { id: 'opt_b', text: 'B. 右尾檢定' },
            { id: 'opt_c', text: 'C. 雙尾檢定' },
            { id: 'opt_d', text: 'D. 以上皆是' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】右尾檢定\n\n判斷方法（看 H₁ 的符號）：\n• H₁ 含「<」→ 左尾檢定（拒絕域在左方）\n• H₁ 含「>」→ 右尾檢定（拒絕域在右方）\n• H₁ 含「≠」→ 雙尾檢定（拒絕域在兩側）\n\n本題 H₁: μ ≥ 21，等同於 H₁: μ > 21，拒絕域落在右尾，故為右尾檢定。'
    },
    {
        id: 'q_ch8_02',
        category: '統計第八章',
        questionText: '考慮檢定的假設為 H₀: μ = 21　H₁: μ ≠ 21，則拒絕域應該是下列哪個圖形（兩側都有陰影區域）？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 左尾單側（左側陰影）' },
            { id: 'opt_b', text: 'B. 右尾單側（右側陰影）' },
            { id: 'opt_c', text: 'C. 雙尾（兩側皆有陰影）' },
            { id: 'opt_d', text: 'D. 以上皆是' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】雙尾檢定 → 拒絕域在兩側\n\nH₁: μ ≠ 21 表示「μ 不等於 21」，即 μ 可能大於或小於 21，因此拒絕域分布在常態分配的兩側尾部。\n\n顯著水準 α 平分為兩側，各為 α/2。\n例如 α = 0.05 時，拒絕域為 |Z| ≥ Z₀.₀₂₅ = 1.96'
    },
    {
        id: 'q_ch8_03',
        category: '統計第八章',
        questionText: '考慮檢定的假設為 H₀: μ ≤ 21　H₁: μ ≥ 21，如果母體的平均數 μ = 23，則可能會發生哪一種誤差？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 型 I 誤差' },
            { id: 'opt_b', text: 'B. 型 II 誤差' },
            { id: 'opt_c', text: 'C. 型 I 與型 II 誤差都會發生' },
            { id: 'opt_d', text: 'D. 型 I 與型 II 誤差都不會發生' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】型 II 誤差\n\n分析：μ = 23 > 21，代表 H₀（μ ≤ 21）實際上是「錯的」。\n\n決策矩陣：\n　　　　　　　H₀真實狀況\n　　　　　H₀對　　H₀錯\n拒絕H₀　型I誤差　正確決策\n不拒絕H₀　正確　　型II誤差\n\n當 H₀ 是錯的：\n• 拒絕 H₀ → 正確決策\n• 不拒絕 H₀ → 型 II 誤差（漏判）\n\n因此可能發生型 II 誤差（無法發生型 I 誤差，因為型 I 誤差前提是 H₀ 為真）。'
    },
    {
        id: 'q_ch8_04',
        category: '統計第八章',
        questionText: '下列對型 I 誤差的描述，何者正確？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 接受了錯的虛無假設 H₀' },
            { id: 'opt_b', text: 'B. 拒絕了對的虛無假設 H₀' },
            { id: 'opt_c', text: 'C. 接受了對的虛無假設 H₀' },
            { id: 'opt_d', text: 'D. 拒絕了錯的虛無假設 H₀' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】拒絕了對的虛無假設 H₀\n\n型 I 誤差（Type I Error / α 誤差）：\n→ H₀ 實際上是「對的」，但統計決策卻「拒絕 H₀」\n→ 又稱「棄真誤差」（冤枉了無辜者）\n→ 發生機率 = 顯著水準 α\n\n型 II 誤差（Type II Error / β 誤差）：\n→ H₀ 實際上是「錯的」，但統計決策卻「不拒絕 H₀」\n→ 又稱「取偽誤差」（放走了罪犯）\n→ 發生機率 = β'
    },
    {
        id: 'q_ch8_05',
        category: '統計第八章',
        questionText: '如果一假設檢定的統計決策為拒絕虛無假設，則這個決策會？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 犯型 I 誤差' },
            { id: 'opt_b', text: 'B. 犯型 II 誤差' },
            { id: 'opt_c', text: 'C. 同時犯型 I 與型 II 誤差' },
            { id: 'opt_d', text: 'D. 都不會犯錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】可能犯型 I 誤差\n\n當統計決策為「拒絕 H₀」時：\n• H₀ 是對的，卻拒絕 H₀ → 型 I 誤差（可能發生）\n• H₀ 是錯的，拒絕 H₀ → 正確決策（也可能是此情況）\n\n注意：「拒絕 H₀」這個決策只可能犯型 I 誤差，不可能犯型 II 誤差（型 II 誤差只在「不拒絕 H₀」時才可能發生）。'
    },
    {
        id: 'q_ch8_06',
        category: '統計第八章',
        questionText: '中央氣象局於 2019 年 7 月 17 日早上 11:30 發布丹娜絲颱風的陸上颱風警報，對於是否要不要放颱風假經常是困擾各縣市市長的問題，有一假設如下：\n\nH₀：放颱風假　vs.　H₁：不放颱風假\n\n試問「該放假而沒放假」會犯何種錯誤？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 型 I 誤差' },
            { id: 'opt_b', text: 'B. 型 II 誤差' },
            { id: 'opt_c', text: 'C. 同時犯型 I 與型 II 誤差' },
            { id: 'opt_d', text: 'D. 都不會犯錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】型 I 誤差\n\n情境分析：\n• H₀：放颱風假（代表「該放假」是正確的）\n• 「該放假而沒放假」= H₀ 是對的，但決策是「不放假」= 拒絕 H₀\n\n對照決策矩陣：\n→ H₀ 是對的 + 拒絕 H₀ = 型 I 誤差\n\n生活化理解：颱風確實很強（該放假），但市長決定不放假 → 冤枉了正確假設 → 型 I 誤差（棄真）'
    },
    {
        id: 'q_ch8_07_1',
        category: '統計第八章',
        questionText: '【旅客停留天數題組 (1)】根據統計資料指出，2019 年來台旅客平均停留 6.39 天。為瞭解 2020 年是否有改變，在機場隨機抽取 144 位旅客，得平均停留天數 6.1 天，標準差 1.2 天（α = 0.05）。\n\n建立假設：H₀: μ = ①，H₁: μ ≠ ②\n\n請問 ① 與 ② 各為多少？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ① = 6.1，② = 6.1' },
            { id: 'opt_b', text: 'B. ① = 6.39，② = 6.1' },
            { id: 'opt_c', text: 'C. ① = 6.39，② = 6.39' },
            { id: 'opt_d', text: 'D. ① = 6.1，② = 6.39' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】① = 6.39，② = 6.39\n\n假設建立原則：\n• H₀（虛無假設）：假設現狀不變，即 2020 年平均停留天數與 2019 年相同 → μ = 6.39\n• H₁（對立假設）：假設有改變（雙尾）→ μ ≠ 6.39\n\n注意：虛無假設使用歷史數據（6.39），而非樣本數據（6.1）。樣本數據是用來計算檢定統計量的，不能填入假設中。'
    },
    {
        id: 'q_ch8_07_2',
        category: '統計第八章',
        questionText: '【旅客停留天數題組 (2)】承上題，計算 Z 檢定統計量：\n\nZ = (X̄ - μ₀) / (S/√n) = (6.1 - ①) / (1.2/√144) = ②\n\n請問 ① = ? ② = ?',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ① = 6.1，② = 2.9' },
            { id: 'opt_b', text: 'B. ① = 6.39，② = 2.9' },
            { id: 'opt_c', text: 'C. ① = 6.39，② = -2.9' },
            { id: 'opt_d', text: 'D. ① = 6.1，② = -2.9' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】① = 6.39，② = -2.9\n\n計算過程：\nn = 144，X̄ = 6.1，S = 1.2，μ₀ = 6.39\n\nZ = (6.1 - 6.39) / (1.2/√144)\n  = -0.29 / (1.2/12)\n  = -0.29 / 0.1\n  = -2.9\n\n① 填入的是 H₀ 的參數值 μ₀ = 6.39\n② 計算結果 Z = -2.9\n\n|Z| = |-2.9| = 2.9 ≥ 1.96（Z₀.₀₂₅），落入拒絕域。'
    },
    {
        id: 'q_ch8_07_3',
        category: '統計第八章',
        questionText: '【旅客停留天數題組 (3)】承上題，雙尾檢定拒絕域為 R = {|Z| ≥ Z₀.₀₂₅ = 1.96}，計算得 Z = -2.9，統計決策為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. Reject H₀（拒絕虛無假設）' },
            { id: 'opt_b', text: 'B. Do Not Reject H₀（不拒絕虛無假設）' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】Reject H₀\n\n判斷依據：\n|Z| = |-2.9| = 2.9 ≥ 1.96\n→ 檢定統計量落入拒絕域\n→ 統計決策：Reject H₀\n\n注意：我們比較的是 |Z| 的絕對值與臨界值 1.96，因為雙尾檢定兩側都是拒絕域。'
    },
    {
        id: 'q_ch8_07_4',
        category: '統計第八章',
        questionText: '【旅客停留天數題組 (4)】承上題，在顯著水準 α = 0.05 下，根據樣本資料，今年來台旅客在台平均停留天數與去年____顯著差異。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 存在' },
            { id: 'opt_b', text: 'B. 不存在' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】存在顯著差異\n\n結論撰寫格式：\n在顯著水準 α = 0.05 下，根據樣本資料，我們有充分的證據來證明，今年來台旅客在台平均停留天數與去年「存在」顯著差異。\n\n邏輯：因為 Reject H₀（H₀ 表示無差異），所以結論是「有差異存在」。\n\n記憶技巧：\n• 拒絕 H₀ → 支持 H₁ → H₁ 說有差異 → 結論：有差異\n• 不拒絕 H₀ → H₀ 說無差異 → 結論：無差異（或證據不足）'
    },

    // =====================================================================
    // 統計第十章：卡方檢定
    // =====================================================================
    {
        id: 'q_ch10_01',
        category: '統計第十章',
        questionText: '有一位心理醫師要研究「不同性別（男、女）與是否有睡眠困擾（有、沒有）之間的關係」，請問他要採用何種統計方法？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 卡方檢定' },
            { id: 'opt_b', text: 'B. 變異數分析' },
            { id: 'opt_c', text: 'C. 迴歸分析' },
            { id: 'opt_d', text: 'D. 以上皆可' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】卡方檢定（獨立性檢定）\n\n判斷方法：\n• 性別（男/女）→ 類別變數\n• 睡眠困擾（有/沒有）→ 類別變數\n\n兩個類別變數間的關係 → 卡方獨立性檢定（Chi-Square Test of Independence）\n\n統計方法選擇口訣：\n• 兩類別變數關係 → 卡方獨立性檢定\n• 類別 vs 數值 → 變異數分析（ANOVA）\n• 兩數值變數關係 → 迴歸分析或相關分析'
    },
    {
        id: 'q_ch10_02',
        category: '統計第十章',
        questionText: '有一位米其林餐廳的管理階層想要知道「消費者的消費金額（元）與職業是否有關係」，請問他要採用何種統計方法？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 卡方檢定' },
            { id: 'opt_b', text: 'B. 變異數分析' },
            { id: 'opt_c', text: 'C. 迴歸分析' },
            { id: 'opt_d', text: 'D. 以上皆可' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】變異數分析（ANOVA）\n\n判斷方法：\n• 消費金額（元）→ 連續數值變數\n• 職業 → 類別變數（多個組別）\n\n一個數值變數 + 一個多組類別變數 → 單因子變異數分析（One-Way ANOVA）\n\n目的：檢定不同職業群體的平均消費金額是否有顯著差異。'
    },
    {
        id: 'q_ch10_03',
        category: '統計第十章',
        questionText: '卡方檢定屬於何種類型的檢定？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 左尾檢定' },
            { id: 'opt_b', text: 'B. 右尾檢定' },
            { id: 'opt_c', text: 'C. 雙尾檢定' },
            { id: 'opt_d', text: 'D. 以上皆可' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】右尾檢定\n\n原因：\n卡方統計量 χ² = Σ[(O - E)² / E]，因為分子是平方，χ² 值恆為非負數（≥ 0）。\n\n• 當觀察值與期望值差異越大 → χ² 越大 → 拒絕 H₀\n• 因此拒絕域永遠在右尾（χ² 值越大越可疑）\n\n卡方分配的特性：不對稱，偏右，只有右尾拒絕域。'
    },
    {
        id: 'q_ch10_04',
        category: '統計第十章',
        questionText: '適合度檢定要檢定的參數為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 平均數' },
            { id: 'opt_b', text: 'B. 變異數' },
            { id: 'opt_c', text: 'C. 標準差' },
            { id: 'opt_d', text: 'D. 比例' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】比例\n\n適合度檢定（Goodness-of-Fit Test）：\n→ 檢定各類別的觀察次數分配是否符合某個理論機率分配\n→ 本質上是在檢定各類別的「比例（機率）」\n\n例如：檢定骰子是否公平 → H₀: P₁ = P₂ = ... = P₆ = 1/6\n\n與獨立性檢定的區別：\n• 適合度檢定：一個類別變數 vs 理論分配\n• 獨立性檢定：兩個類別變數之間的關聯性'
    },
    {
        id: 'q_ch10_05',
        category: '統計第十章',
        questionText: '何種類型的資料可以使用卡方檢定來進行分析？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 類別資料' },
            { id: 'opt_b', text: 'B. 連續資料' },
            { id: 'opt_c', text: 'C. 離散資料' },
            { id: 'opt_d', text: 'D. 以上均可' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】類別資料\n\n卡方檢定專門用於分析「類別資料（Categorical Data）」的次數分配。\n\n適用情境：\n• 適合度檢定：單一類別變數的分配是否符合理論\n• 獨立性檢定：兩個類別變數是否相互獨立\n\n注意：若資料是連續或離散的數值資料，需先分組轉換為類別資料，才能使用卡方檢定。'
    },
    {
        id: 'q_ch10_06',
        category: '統計第十章',
        questionText: '卡方檢定中，每個格子內的期望次數至少要多少以上才是有效的檢定？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 2' },
            { id: 'opt_b', text: 'B. 3' },
            { id: 'opt_c', text: 'C. 4' },
            { id: 'opt_d', text: 'D. 5' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】每格期望次數 ≥ 5\n\n卡方檢定的基本假設：每個格子（cell）的期望次數（Expected Count）必須 ≥ 5。\n\n若不滿足此條件：\n• 卡方近似效果差\n• 需合併相鄰類別，或改用 Fisher精確檢定（Fisher\'s Exact Test）\n\n期望次數計算公式：\nE = （該列合計 × 該行合計）/ 總合計'
    },
    {
        id: 'q_ch10_07_1',
        category: '統計第十章',
        questionText: '【台北通勤題組 (1)】為了解台北市市民每天通勤交通工具的分配狀況，調查 1,200 個樣本，得：捷運 512、公車 99、計程車 43、機車 292、自用小客車 215、其他 39。\n\n若要檢定市民通勤交通工具是否有差異，每個格子應該發生的機率為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1/3' },
            { id: 'opt_b', text: 'B. 1/4' },
            { id: 'opt_c', text: 'C. 1/5' },
            { id: 'opt_d', text: 'D. 1/6' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】1/6\n\n在「無差異」的虛無假設下，每種交通工具被選擇的機率應相等。\n\n共有 6 種交通工具（捷運、公車、計程車、機車、自用小客車、其他）\n\n→ H₀: P₁ = P₂ = P₃ = P₄ = P₅ = P₆ = 1/6\n\n這是適合度檢定的基本設定。'
    },
    {
        id: 'q_ch10_07_2',
        category: '統計第十章',
        questionText: '【台北通勤題組 (2)】承上題，若要檢定市民通勤交通工具是否有差異，每個格子應發生的期望次數為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 100' },
            { id: 'opt_b', text: 'B. 200' },
            { id: 'opt_c', text: 'C. 300' },
            { id: 'opt_d', text: 'D. 400' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】每格期望次數 = 200\n\n計算公式：期望次數 = 理論機率 × 總樣本數\n\nE = (1/6) × 1200 = 200\n\n驗算：6 格 × 200 = 1200（等於總樣本數）✓'
    },
    {
        id: 'q_ch10_07_3',
        category: '統計第十章',
        questionText: '【台北通勤題組 (3)】承上題，若要檢定市民通勤交通工具是否有差異，則檢定的自由度為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 3' },
            { id: 'opt_b', text: 'B. 4' },
            { id: 'opt_c', text: 'C. 5' },
            { id: 'opt_d', text: 'D. 6' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】自由度 = 5\n\n適合度檢定自由度公式：df = k - 1（k = 類別數）\n\ndf = 6 - 1 = 5\n\n記憶方式：有 6 格，知道前 5 格的數量，最後 1 格就自動決定了（因為總和固定），所以自由度 = 6 - 1 = 5。'
    },
    {
        id: 'q_ch10_08',
        category: '統計第十章',
        questionText: '一獨立性檢定的列聯表中共有 3 列 4 行，試問其自由度為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 3' },
            { id: 'opt_b', text: 'B. 6' },
            { id: 'opt_c', text: 'C. 9' },
            { id: 'opt_d', text: 'D. 12' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】自由度 = 6\n\n獨立性檢定自由度公式：df = (r-1)(c-1)\n其中 r = 列數（rows），c = 行數（columns）\n\ndf = (3-1)(4-1) = 2 × 3 = 6\n\n與適合度檢定自由度的區別：\n• 適合度檢定：df = k - 1\n• 獨立性檢定：df = (r-1)(c-1)'
    },
    {
        id: 'q_ch10_09_1',
        category: '統計第十章',
        questionText: '【觀光局旅客目的題組 (1)】觀光局指出外國旅客來台目的比例為觀光:商務:探親 = 8:1:1。在機場對 1,000 位旅客調查，觀察次數：觀光 780、業務 120、探視 100；期望次數：觀光 800、業務 100、探視 100。（α = 0.05）\n\n建立假設，自由度 df = ?',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1' },
            { id: 'opt_b', text: 'B. 2' },
            { id: 'opt_c', text: 'C. 3' },
            { id: 'opt_d', text: 'D. 9' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】df = 2\n\n假設設定：\nH₀: P₁ = 0.8, P₂ = 0.1, P₃ = 0.1（符合 8:1:1）\nH₁: H₀ 為錯\n顯著水準 α = 0.05\n\n自由度計算（適合度檢定）：\ndf = k - 1 = 3 - 1 = 2（共 3 種目的類別）\n\n拒絕域：R = {χ² ≥ χ²₀.₀₅(2) = 5.991}'
    },
    {
        id: 'q_ch10_09_2',
        category: '統計第十章',
        questionText: '【觀光局旅客目的題組 (2)】承上題，χ² = 4.5，小於臨界值 5.991，統計決策為？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. Reject H₀（拒絕虛無假設）' },
            { id: 'opt_b', text: 'B. Do Not Reject H₀（不拒絕虛無假設）' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】Do Not Reject H₀\n\n判斷：\nχ² = 4.5 < χ²₀.₀₅(2) = 5.991\n→ 未落入拒絕域\n→ 統計決策：Do Not Reject H₀\n\n結論：在顯著水準 α = 0.05 下，顯示歷年探親比例很可能就是 8:1:1，代表觀光局的說法很可能是對的。（○）'
    },
    {
        id: 'q_ch10_09_3',
        category: '統計第十章',
        questionText: '【觀光局旅客目的題組 (4)】承上題，在顯著水準 α = 0.05 下，根據結果，結論為下列何者正確？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○（顯示歷年探親比例很可能就是 8:1:1，觀光局說法很可能是對的）' },
            { id: 'opt_b', text: 'B. ✗（有足夠證據推翻觀光局說法）' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】○\n\n邏輯推演：\n• 統計決策：Do Not Reject H₀\n• H₀ 代表：旅客目的比例符合 8:1:1\n• 不拒絕 H₀ → 沒有足夠證據推翻 8:1:1 的說法\n• 結論：觀光局的說法很可能是對的 ✓\n\n注意：「不拒絕 H₀」不等於「H₀ 一定正確」，只是「證據不足以推翻 H₀」。'
    },
    {
        id: 'q_ch10_10_1',
        category: '統計第十章',
        questionText: '【反送中學歷題組 (1)】2019 年進行 1,000 位樣本的民意調查（學歷 vs 對反送中的看法）：\n高中以下：贊成 140、反對 60（合計 200）\n大專大學：贊成 460、反對 40（合計 500）\n研究所以上：贊成 250、反對 50（合計 300）\n\n拒絕域為 R = {χ² ≥ χ²₀.₀₅(df) = 5.991}，df（自由度）= ？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 1' },
            { id: 'opt_b', text: 'B. 2' },
            { id: 'opt_c', text: 'C. 5' },
            { id: 'opt_d', text: 'D. 6' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】df = 2\n\n此為獨立性檢定（兩個類別變數：學歷 × 看法）\n\n列聯表大小：3 列（高中以下、大專大學、研究所以上）× 2 行（贊成、反對）\n\ndf = (r-1)(c-1) = (3-1)(2-1) = 2 × 1 = 2\n\n拒絕域：R = {χ² ≥ χ²₀.₀₅(2) = 5.991}'
    },
    {
        id: 'q_ch10_10_2',
        category: '統計第十章',
        questionText: '【反送中學歷題組 (2)】承上題，χ² = 55.1634，大於臨界值 5.991，統計決策為？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. Do Not Reject H₀（不拒絕虛無假設）' },
            { id: 'opt_b', text: 'B. Reject H₀（拒絕虛無假設）' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】Reject H₀\n\n判斷：\nχ² = 55.1634 > χ²₀.₀₅(2) = 5.991\n→ 落入拒絕域\n→ 統計決策：Reject H₀\n\n這個 χ² 值非常大（遠超臨界值），表示觀察值與期望值差異極為顯著。'
    },
    {
        id: 'q_ch10_10_3',
        category: '統計第十章',
        questionText: '【反送中學歷題組 (3)】承上題，Reject H₀，結論為「民眾對反送中的看法，跟學歷____」，下列何者正確？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○（跟學歷有關）' },
            { id: 'opt_b', text: 'B. ✗（跟學歷無關）' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】✗ ← 題目結論敘述有誤！\n\n重要澄清：\n• H₀：民眾對反送中的看法跟學歷「無關」\n• H₁：民眾對反送中的看法跟學歷「有關」\n• 統計決策：Reject H₀\n• → 正確結論應該是：跟學歷「有關」\n\n本題考的是：題目中給出的結論敘述「跟學歷無關」是對（○）還是錯（✗）？\n→ 因為我們拒絕 H₀，代表「有關」，所以「無關」的敘述是錯的 → 答案選 B（✗）'
    }
];

// ==========================================================================
// 2. 考題管理類別 (QuestionManager)
// ==========================================================================
class QuestionManager {
    constructor() {
        this.questions = [];
        this.history = [];
        this.loadFromStorage();
    }

    // 載入 localStorage 資料
    loadFromStorage() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                this.questions = JSON.parse(data);
            } else {
                this.questions = [...DEFAULT_QUESTIONS];
                this.saveToStorage();
            }
        } catch (e) {
            console.error('載入考題庫失敗：', e);
            this.questions = [...DEFAULT_QUESTIONS];
        }

        try {
            const histData = localStorage.getItem(HISTORY_KEY);
            this.history = histData ? JSON.parse(histData) : [];
        } catch (e) {
            console.error('載入歷史記錄失敗：', e);
            this.history = [];
        }
    }

    // 儲存資料到 localStorage
    saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.questions));
        } catch (e) {
            alert('儲存失敗！可能是因為上傳的圖片過大，超出了瀏覽器的 localStorage 額度。建議使用更小的圖片！');
            console.error(e);
        }
    }

    saveHistory() {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
        } catch (e) {
            console.error(e);
        }
    }

    // 取得所有題目
    getAll() {
        return this.questions;
    }

    // 取得單一題目
    getById(id) {
        return this.questions.find(q => q.id === id);
    }

    // 新增或更新題目
    saveQuestion(qData) {
        if (qData.id) {
            // 更新
            const idx = this.questions.findIndex(q => q.id === qData.id);
            if (idx !== -1) {
                this.questions[idx] = { ...this.questions[idx], ...qData };
            }
        } else {
            // 新建
            qData.id = 'q_' + Date.now();
            this.questions.unshift(qData); // 新增在最前面
        }
        this.saveToStorage();
        return qData;
    }

    // 刪除題目
    deleteQuestion(id) {
        this.questions = this.questions.filter(q => q.id !== id);
        this.saveToStorage();
    }

    // 取得所有考題分類
    getCategories() {
        const cats = this.questions.map(q => q.category.trim()).filter(Boolean);
        return [...new Set(cats)];
    }

    // 新增測驗歷史記錄
    addHistoryRecord(record) {
        record.id = 'hist_' + Date.now();
        record.date = new Date().toLocaleString('zh-TW', { hour12: false });
        this.history.unshift(record);
        if (this.history.length > 30) this.history.pop(); // 最多存 30 筆
        this.saveHistory();
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }
}

const qManager = new QuestionManager();

// ==========================================================================
// 3. 測驗控制引擎 (QuizEngine)
// ==========================================================================
class QuizEngine {
    constructor() {
        this.activeQuestions = [];
        this.shuffledOptionsMap = {}; // 紀錄每題被打亂後的選項順序，以維持選項狀態
        this.currentIndex = 0;
        this.selectedAnswers = []; // 格式：{ qId, selectedOptId, isCorrect }
        this.startTime = null;
        this.timerInterval = null;
        this.timeSpentSeconds = 0;
        this.mode = 'immediate'; // immediate (即時) 或 exam (考試)
        this.shuffleOpts = true;
    }

    // 初始化並啟動測驗
    init(category, limit, shuffleQs, shuffleOpts, mode) {
        this.mode = mode;
        this.shuffleOpts = shuffleOpts;
        this.currentIndex = 0;
        this.selectedAnswers = [];
        this.timeSpentSeconds = 0;
        this.shuffledOptionsMap = {};

        // 1. 篩選分類
        let filtered = qManager.getAll();
        if (category && category !== 'all') {
            filtered = filtered.filter(q => q.category === category);
        }

        if (filtered.length === 0) {
            alert('該分類下目前無題目，無法開始測驗！');
            return false;
        }

        // 2. 題目隨機排序（題組整體可打亂，但題組內順序固定）
        if (shuffleQs) {
            // 2a. 分類：獨立題 vs 題組（id 末尾符合 _數字 的為題組子題）
            const groupMap = {};
            const standalones = [];

            filtered.forEach(q => {
                const m = q.id.match(/^(.+)_(\d+)$/);
                if (m) {
                    const key = m[1];
                    if (!groupMap[key]) groupMap[key] = [];
                    groupMap[key].push(q);
                } else {
                    standalones.push(q);
                }
            });

            // 2b. 題組內部依序號排序，確保 _1 < _2 < _3
            Object.values(groupMap).forEach(group => {
                group.sort((a, b) => {
                    const na = parseInt(a.id.match(/_(\d+)$/)[1], 10);
                    const nb = parseInt(b.id.match(/_(\d+)$/)[1], 10);
                    return na - nb;
                });
            });

            // 2c. 將獨立題與題組視為同等「單元」後打亂
            const units = [
                ...standalones.map(q => [q]),
                ...Object.values(groupMap)
            ];
            const shuffledUnits = this.shuffleArray(units);

            // 2d. 展開成最終題目陣列
            this.activeQuestions = shuffledUnits.flat();
        } else {
            this.activeQuestions = [...filtered];
        }

        // 3. 數量限制
        if (limit && limit !== 'all') {
            const num = parseInt(limit, 10);
            this.activeQuestions = this.activeQuestions.slice(0, num);
        }

        // 4. 對每道題目產生專屬的選項順序
        this.activeQuestions.forEach(q => {
            if (this.shuffleOpts) {
                this.shuffledOptionsMap[q.id] = this.shuffleArray(q.options);
            } else {
                this.shuffledOptionsMap[q.id] = [...q.options];
            }
        });

        // 5. 啟動計時器
        this.startTime = Date.now();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timeSpentSeconds++;
            document.getElementById('quiz-time-tracker').innerText = `時間 ${this.formatTime(this.timeSpentSeconds)}`;
        }, 1000);

        return true;
    }

    // Fisher-Yates 隨機打亂演算法
    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // 時間格式化 (00:00)
    formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    getCurrentQuestion() {
        return this.activeQuestions[this.currentIndex];
    }

    getShuffledOptions(qId) {
        return this.shuffledOptionsMap[qId] || [];
    }

    // 處理玩家選擇答案
    answer(selectedOptId) {
        const q = this.getCurrentQuestion();
        const isCorrect = (selectedOptId === q.correctOptionId);

        // 紀錄答案
        this.selectedAnswers[this.currentIndex] = {
            qId: q.id,
            selectedOptId: selectedOptId,
            isCorrect: isCorrect
        };

        return isCorrect;
    }

    next() {
        if (this.currentIndex < this.activeQuestions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // 結算與取得成果
    getResults() {
        this.stopTimer();
        const total = this.activeQuestions.length;
        const correctCount = this.selectedAnswers.filter(a => a?.isCorrect).length;
        const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

        return {
            total: total,
            correctCount: correctCount,
            incorrectCount: total - correctCount,
            score: score,
            timeSpent: this.formatTime(this.timeSpentSeconds),
            timeSpentSeconds: this.timeSpentSeconds,
            details: this.activeQuestions.map((q, idx) => {
                const ans = this.selectedAnswers[idx];
                return {
                    question: q,
                    selectedOptionId: ans ? ans.selectedOptId : null,
                    isCorrect: ans ? ans.isCorrect : false,
                    shuffledOptions: this.getShuffledOptions(q.id)
                };
            })
        };
    }
}

const quizEngine = new QuizEngine();

// ==========================================================================
// 4. 圖片壓縮工具與 Base64 處理
// ==========================================================================
function compressAndConvertImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                // 1. 建立 Canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 2. 設定限制的最大寬高 (為了在 LocalStorage 中省空間)
                const MAX_WIDTH = 700;
                const MAX_HEIGHT = 700;
                let width = img.width;
                let height = img.height;

                // 3. 等比例縮放
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // 4. 將圖片繪製至畫布
                ctx.drawImage(img, 0, 0, width, height);

                // 5. 壓縮並輸出為 JPEG Base64
                // 品質設為 0.7 即可獲得極佳的清晰度與極小的檔案大小 (通常在 30-70KB)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedBase64);
            };
            img.onerror = function (err) {
                reject(err);
            };
        };
        reader.onerror = function (err) {
            reject(err);
        };
    });
}

// ==========================================================================
// 5. UI 畫面控制與視圖綁定
// ==========================================================================

// 頁面切換機制
function switchTab(tabId) {
    // 隱藏所有視圖
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

    // 顯示目標視圖
    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) targetSection.classList.remove('hidden');

    // 更新導覽選單 active 狀態
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active-tab');
        } else {
            btn.classList.remove('active-tab');
        }
    });

    // 手機版自動收合側邊選單
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('hidden');
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');

    // 每次進入該畫面，執行對應初始化
    if (tabId === 'dashboard') {
        renderDashboard();
    } else if (tabId === 'questions') {
        renderQuestionsList();
    } else if (tabId === 'quiz-setup') {
        renderQuizSetup();
    }
}

// 初始化日期
function initDate() {
    const d = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    document.getElementById('current-date').innerText = d.toLocaleDateString('zh-TW', options);
}

// ==========================================================================
// 5.1 首頁儀表板渲染
// ==========================================================================
function renderDashboard() {
    const qs = qManager.getAll();
    const totalQ = qs.length;
    const cats = qManager.getCategories().length;
    const imgQ = qs.filter(q => q.image).length;
    const historyCount = qManager.history.length;

    // 渲染統計數字
    document.getElementById('stat-total-q').innerText = totalQ;
    document.getElementById('stat-categories').innerText = cats;
    document.getElementById('stat-image-q').innerText = imgQ;
    document.getElementById('stat-quiz-count').innerText = historyCount;

    // 歷史記錄列表
    const historyList = document.getElementById('dashboard-history-list');
    const clearBtn = document.getElementById('clear-history-btn');

    if (qManager.history.length === 0) {
        historyList.innerHTML = `
            <svg class="w-12 h-12 text-slate-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-xs text-slate-400">目前暫無測驗記錄，趕快去測驗一波吧！</span>
        `;
        clearBtn.classList.add('hidden');
        historyList.className = "flex-1 space-y-3 overflow-y-auto max-h-[300px] pr-1 text-sm text-slate-500 flex flex-col justify-center items-center py-8";
    } else {
        clearBtn.classList.remove('hidden');
        historyList.className = "flex-1 space-y-3 overflow-y-auto max-h-[300px] pr-1 text-sm text-slate-500 w-full";
        historyList.innerHTML = qManager.history.map(hist => {
            const scoreColor = hist.score >= 80 ? 'text-emerald-500 font-bold' : hist.score >= 60 ? 'text-amber-500 font-bold' : 'text-red-500 font-bold';
            return `
                <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                    <div class="space-y-1">
                        <div class="flex items-center space-x-2">
                            <span class="font-bold text-slate-700">${hist.category === 'all' ? '綜合全部分類' : hist.category}</span>
                            <span class="text-[10px] bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-500">${hist.mode === 'immediate' ? '即時' : '模擬'}</span>
                        </div>
                        <p class="text-[11px] text-slate-400">${hist.date}</p>
                    </div>
                    <div class="text-right">
                        <span class="${scoreColor} text-base">${hist.score}%</span>
                        <p class="text-[10px] text-slate-400 mt-0.5">錯 ${hist.incorrectCount}/${hist.total} 題 • ${hist.timeSpent}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ==========================================================================
// 5.2 考題庫管理頁面渲染
// ==========================================================================
let currentQEditing = null; // 紀錄正在編輯中的考題物件

function renderQuestionsList() {
    const grid = document.getElementById('questions-grid');
    const emptyBox = document.getElementById('questions-empty');
    const searchVal = document.getElementById('search-q-input').value.toLowerCase().trim();
    const filterCat = document.getElementById('filter-category-select').value;
    const filterImg = document.getElementById('filter-image-select').value;

    let list = qManager.getAll();

    // 1. 分類過濾
    if (filterCat) {
        list = list.filter(q => q.category === filterCat);
    }

    // 2. 圖片過濾
    if (filterImg === 'with-image') {
        list = list.filter(q => q.image);
    } else if (filterImg === 'no-image') {
        list = list.filter(q => !q.image);
    }

    // 3. 關鍵字搜尋
    if (searchVal) {
        list = list.filter(q =>
            q.questionText.toLowerCase().includes(searchVal) ||
            q.category.toLowerCase().includes(searchVal) ||
            q.options.some(o => o.text.toLowerCase().includes(searchVal)) ||
            (q.explanation && q.explanation.toLowerCase().includes(searchVal))
        );
    }

    // 4. 動態生成下拉選單分類（僅在首次或題庫更新時）
    const catSelect = document.getElementById('filter-category-select');
    const savedCat = catSelect.value;
    const cats = qManager.getCategories();
    catSelect.innerHTML = '<option value="">全部分類</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
    catSelect.value = savedCat;

    if (list.length === 0) {
        grid.classList.add('hidden');
        emptyBox.classList.remove('hidden');
        if (searchVal || filterCat || filterImg) {
            emptyBox.innerHTML = `
                <div class="text-center p-8">
                    <p class="text-slate-400 text-sm">找不到符合搜尋條件的考題...</p>
                    <button onclick="clearFilters()" class="text-primary-500 font-bold text-xs mt-2 underline">清除搜尋與篩選條件</button>
                </div>
            `;
        }
    } else {
        grid.classList.remove('hidden');
        emptyBox.classList.add('hidden');

        grid.innerHTML = list.map(q => {
            const hasImg = q.image ? true : false;
            return `
                <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm q-card-hover flex flex-col justify-between relative overflow-hidden">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="bg-primary-50 text-primary-500 border border-primary-100 px-2.5 py-0.5 rounded-full text-xs font-bold">${q.category}</span>
                            ${hasImg ? `
                                <span class="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z"></path></svg>
                                    <span>有圖片</span>
                                </span>
                            ` : ''}
                        </div>

                        <h3 class="font-bold text-slate-800 text-sm line-clamp-3 leading-relaxed">${q.questionText}</h3>

                        ${hasImg ? `
                            <div class="w-full bg-slate-50 border border-slate-100 rounded-lg h-24 overflow-hidden flex justify-center items-center">
                                <img src="${q.image}" alt="題目圖檔" class="h-full w-auto object-contain p-1">
                            </div>
                        ` : ''}

                        <!-- 簡化版選項清單 -->
                        <div class="space-y-1 pt-1">
                            ${q.options.map(o => {
                                const isCorrect = o.id === q.correctOptionId;
                                return `
                                    <div class="flex items-center space-x-2 text-xs py-0.5">
                                        <span class="w-4 h-4 rounded-full flex items-center justify-center ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'} font-bold">
                                            ${isCorrect ? '✓' : '•'}
                                        </span>
                                        <span class="${isCorrect ? 'text-emerald-600 font-bold' : 'text-slate-500'} truncate">${o.text}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- 卡片底部動作鈕 -->
                    <div class="flex items-center justify-end space-x-2 pt-4 mt-4 border-t border-slate-100">
                        <button onclick="editQuestion('${q.id}')" class="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-semibold transition">編輯</button>
                        <button onclick="deleteQuestion('${q.id}')" class="text-xs bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg text-red-600 font-semibold transition">刪除</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// 清除所有篩選
function clearFilters() {
    document.getElementById('search-q-input').value = '';
    document.getElementById('filter-category-select').value = '';
    document.getElementById('filter-image-select').value = '';
    renderQuestionsList();
}

// 刪除題目
function deleteQuestion(id) {
    if (confirm('您確定要永久刪除這道題目嗎？此動作無法復原。')) {
        qManager.deleteQuestion(id);
        renderQuestionsList();
    }
}

// ==========================================================================
// 5.3 考題新增/編輯彈跳視窗 Modal 控制
// ==========================================================================
const modal = document.getElementById('question-modal');
const modalCard = document.getElementById('question-modal-card');
const formOptionsList = document.getElementById('modal-options-list');

// 開啟新增 Modal
function openModal(editingQId = null) {
    // 1. 初始化欄位
    document.getElementById('question-form').reset();
    document.getElementById('form-q-id').value = '';
    document.getElementById('modal-title').innerText = '新增複習考題';
    document.getElementById('modal-image-preview').classList.add('hidden');
    document.getElementById('preview-placeholder').classList.remove('hidden');
    document.getElementById('remove-preview-btn').classList.add('hidden');
    formOptionsList.innerHTML = '';
    currentQEditing = null;

    // 分類自動完成 datalist
    const dl = document.getElementById('category-datalist');
    dl.innerHTML = qManager.getCategories().map(c => `<option value="${c}"></option>`).join('');

    if (editingQId) {
        // 編輯模式
        const q = qManager.getById(editingQId);
        if (q) {
            currentQEditing = q;
            document.getElementById('form-q-id').value = q.id;
            document.getElementById('modal-title').innerText = '編輯複習考題';
            document.getElementById('form-category').value = q.category;
            document.getElementById('form-question-text').value = q.questionText;
            document.getElementById('form-explanation').value = q.explanation || '';

            // 處理圖片預覽
            if (q.image) {
                const preview = document.getElementById('modal-image-preview');
                preview.src = q.image;
                preview.classList.remove('hidden');
                document.getElementById('preview-placeholder').classList.add('hidden');
                document.getElementById('remove-preview-btn').classList.remove('hidden');
            }

            // 載入選項
            q.options.forEach((o, index) => {
                addOptionRow(o.text, o.id === q.correctOptionId, o.id);
            });
        }
    } else {
        // 新建模式：預設給 4 個空選項
        for (let i = 0; i < 4; i++) {
            addOptionRow('', i === 0);
        }
    }

    // 顯示 Modal (動畫效果)
    modal.classList.remove('hidden');
    setTimeout(() => {
        modalCard.classList.remove('scale-95', 'opacity-0');
        modalCard.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// 關閉 Modal
function closeModal() {
    modalCard.classList.remove('scale-100', 'opacity-100');
    modalCard.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

// 編輯按鈕觸發
function editQuestion(id) {
    openModal(id);
}

// 動態新增選項行
function addOptionRow(text = '', isCorrect = false, customId = null) {
    const optionRowsCount = formOptionsList.children.length;
    if (optionRowsCount >= 8) {
        alert('為維護排版美觀與答題體驗，一個題目最多只能設定 8 個選項喔！');
        return;
    }

    const optId = customId || 'opt_' + optionRowsCount + '_' + Date.now();
    const row = document.createElement('div');
    row.className = 'flex items-center space-x-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100';
    row.setAttribute('data-id', optId);

    row.innerHTML = `
        <!-- 設為正確按鈕 -->
        <label class="flex items-center justify-center cursor-pointer p-1">
            <input type="radio" name="modal-correct-opt" value="${optId}" ${isCorrect ? 'checked' : ''} required class="h-5 w-5 text-primary-500 border-slate-300 focus:ring-primary-500">
        </label>
        <!-- 文字輸入 -->
        <input type="text" value="${text.replace(/"/g, '&quot;')}" required placeholder="輸入選項內容..." class="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
        <!-- 刪除此選項 -->
        <button type="button" class="delete-opt-row-btn p-1.5 text-slate-400 hover:text-red-500 transition">
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
    `;

    // 刪除按鈕綁定
    row.querySelector('.delete-opt-row-btn').addEventListener('click', () => {
        if (formOptionsList.children.length <= 2) {
            alert('一個考題最少必須設定 2 個選項！');
            return;
        }

        // 如果刪除的是被選中正確的，將第一個設為正確
        const radio = row.querySelector('input[type="radio"]');
        const wasChecked = radio.checked;

        row.remove();

        if (wasChecked && formOptionsList.children.length > 0) {
            formOptionsList.children[0].querySelector('input[type="radio"]').checked = true;
        }
    });

    formOptionsList.appendChild(row);
}

// 圖片處理邏輯
function handleImageFileSelected(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert('請選取有效的圖片檔案！');
        return;
    }

    // 顯示載入中預覽狀態
    document.getElementById('preview-placeholder').innerText = '圖片壓縮中...';

    compressAndConvertImage(file).then(base64Str => {
        const previewImg = document.getElementById('modal-image-preview');
        previewImg.src = base64Str;
        previewImg.classList.remove('hidden');
        document.getElementById('preview-placeholder').classList.add('hidden');
        document.getElementById('remove-preview-btn').classList.remove('hidden');
        // 清除網址輸入框
        document.getElementById('form-image-url').value = '';
    }).catch(err => {
        alert('圖片讀取壓縮失敗，請換一張試看看！');
        document.getElementById('preview-placeholder').innerText = '暫無圖片預覽';
        console.error(err);
    });
}

// 移除預覽圖片
function removePreviewImage() {
    const previewImg = document.getElementById('modal-image-preview');
    previewImg.src = '';
    previewImg.classList.add('hidden');
    document.getElementById('preview-placeholder').innerText = '暫無圖片預覽';
    document.getElementById('preview-placeholder').classList.remove('hidden');
    document.getElementById('remove-preview-btn').classList.add('hidden');
    document.getElementById('form-image-file').value = '';
    document.getElementById('form-image-url').value = '';
}

// ==========================================================================
// 5.4 測驗設定與測驗進行中 UI 綁定
// ==========================================================================
let quizLimit = '10'; // 預設 10 題

function renderQuizSetup() {
    const container = document.getElementById('quiz-category-container');
    const cats = qManager.getCategories();

    // 渲染分類卡片單選鈕
    let html = `
        <label class="border-2 border-primary-500/30 bg-primary-50/10 p-4 rounded-xl cursor-pointer text-center flex flex-col items-center justify-center space-y-1 transition text-slate-700" id="quiz-cat-label-all">
            <input type="radio" name="quiz-category" value="all" checked class="hidden">
            <span class="font-bold text-sm">所有綜合分類</span>
            <span class="text-[10px] text-slate-400">共 ${qManager.getAll().length} 題</span>
        </label>
    `;

    cats.forEach(c => {
        const count = qManager.getAll().filter(q => q.category === c).length;
        html += `
            <label class="border border-slate-200 hover:border-slate-300 p-4 rounded-xl cursor-pointer text-center flex flex-col items-center justify-center space-y-1 bg-slate-50/50 transition text-slate-600" id="quiz-cat-label-${c}">
                <input type="radio" name="quiz-category" value="${c}" class="hidden">
                <span class="font-bold text-sm truncate max-w-full">${c}</span>
                <span class="text-[10px] text-slate-400">共 ${count} 題</span>
            </label>
        `;
    });

    container.innerHTML = html;

    // 綁定點擊變色邏輯
    const labels = container.querySelectorAll('label');
    labels.forEach(lbl => {
        const radio = lbl.querySelector('input');
        radio.addEventListener('change', () => {
            labels.forEach(l => {
                l.className = "border border-slate-200 hover:border-slate-300 p-4 rounded-xl cursor-pointer text-center flex flex-col items-center justify-center space-y-1 bg-slate-50/50 transition text-slate-600";
            });
            if (radio.checked) {
                lbl.className = "border-2 border-primary-500 bg-primary-50/20 p-4 rounded-xl cursor-pointer text-center flex flex-col items-center justify-center space-y-1 transition text-slate-800 shadow-sm";
            }
        });
    });
}

// 啟動測驗
function startQuiz() {
    const cat = document.querySelector('input[name="quiz-category"]:checked')?.value || 'all';
    const limit = quizLimit;
    const shuffleQs = document.getElementById('setup-shuffle-questions').checked;
    const shuffleOpts = document.getElementById('setup-shuffle-options').checked;
    const mode = document.querySelector('input[name="setup-mode"]:checked')?.value || 'immediate';

    const success = quizEngine.init(cat, limit, shuffleQs, shuffleOpts, mode);
    if (success) {
        // 切換到測驗中畫面
        switchTab('quiz-playing');
        renderActiveQuestion();
    }
}

// 渲染當前進行中的題目
function renderActiveQuestion() {
    const q = quizEngine.getCurrentQuestion();
    if (!q) return;

    // 1. 進度與資訊更新
    const totalQ = quizEngine.activeQuestions.length;
    const curIdx = quizEngine.currentIndex;
    document.getElementById('quiz-progress-text').innerText = `第 ${curIdx + 1} / ${totalQ} 題`;
    document.getElementById('quiz-progress-bar').style.width = `${((curIdx + 1) / totalQ) * 100}%`;
    document.getElementById('quiz-category-badge').innerText = q.category;

    // 按鈕文字改為「下一題」或「看結果」
    const nextBtnText = document.getElementById('quiz-next-btn-text');
    if (curIdx === totalQ - 1) {
        nextBtnText.innerText = '完成並看成果';
    } else {
        nextBtnText.innerText = '下一題';
    }

    // 2. 考題文字
    document.getElementById('quiz-question-text').innerText = q.questionText;

    // 3. 處理圖片顯示
    const imgContainer = document.getElementById('quiz-image-container');
    const quizImg = document.getElementById('quiz-question-image');
    if (q.image) {
        quizImg.src = q.image;
        imgContainer.classList.remove('hidden');
    } else {
        quizImg.src = '';
        imgContainer.classList.add('hidden');
    }

    // 4. 重設答題解析框與下一題按鈕
    document.getElementById('quiz-feedback-box').classList.add('hidden');
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.disabled = true;

    // 5. 渲染打亂後的選項
    const optionsContainer = document.getElementById('quiz-options-container');
    const options = quizEngine.getShuffledOptions(q.id);

    optionsContainer.innerHTML = options.map((opt, idx) => {
        const letter = String.fromCharCode(65 + idx); // A, B, C, D...
        return `
            <button type="button" data-opt-id="${opt.id}" class="quiz-opt-btn option-btn-anim w-full text-left p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between group">
                <div class="flex items-center space-x-3 pr-2">
                    <span class="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-primary-50 text-slate-500 group-hover:text-primary-600 font-bold text-xs flex items-center justify-center flex-shrink-0 transition">
                        ${letter}
                    </span>
                    <span class="text-sm md:text-base leading-snug">${opt.text}</span>
                </div>
                <div class="opt-status-icon flex-shrink-0 w-6 h-6 rounded-full hidden items-center justify-center text-white font-bold text-xs"></div>
            </button>
        `;
    }).join('');

    // 6. 綁定選項點選事件
    const optButtons = optionsContainer.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (quizEngine.selectedAnswers[quizEngine.currentIndex] !== undefined) {
                // 已回答過此題
                return;
            }

            const optId = btn.getAttribute('data-opt-id');
            const isCorrect = quizEngine.answer(optId);

            // 啟用下一題按鈕
            nextBtn.disabled = false;

            if (quizEngine.mode === 'immediate') {
                // 「即時回饋模式」之點擊回饋：
                optButtons.forEach(b => {
                    const bId = b.getAttribute('data-opt-id');
                    const bIcon = b.querySelector('.opt-status-icon');

                    if (bId === q.correctOptionId) {
                        // 正確答案亮綠色
                        b.className = "quiz-opt-btn w-full text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold flex items-center justify-between";
                        bIcon.className = "opt-status-icon flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs";
                        bIcon.innerHTML = "✓";
                    } else if (bId === optId) {
                        // 使用者點選的錯誤答案亮紅色
                        b.className = "quiz-opt-btn w-full text-left p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-800 font-bold flex items-center justify-between";
                        bIcon.className = "opt-status-icon flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs";
                        bIcon.innerHTML = "✗";
                    } else {
                        // 其他選項淡化
                        b.className = "quiz-opt-btn w-full text-left p-4 rounded-xl border border-slate-100 text-slate-300 flex items-center justify-between opacity-60";
                    }
                });

                // 展開詳盡解析框
                const feedbackBox = document.getElementById('quiz-feedback-box');
                const feedbackIcon = document.getElementById('feedback-icon-container');
                const feedbackStatus = document.getElementById('feedback-status-text');
                const explanationText = document.getElementById('quiz-explanation-text');

                feedbackBox.classList.remove('hidden');
                explanationText.innerText = q.explanation || '本題無詳細解析。';

                if (isCorrect) {
                    feedbackBox.className = "mt-6 p-5 rounded-xl border border-emerald-100 bg-emerald-50/30";
                    feedbackIcon.innerHTML = `<svg class="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`;
                    feedbackStatus.className = "text-emerald-700 font-extrabold";
                    feedbackStatus.innerText = "答對了！恭喜！";
                } else {
                    feedbackBox.className = "mt-6 p-5 rounded-xl border border-red-100 bg-red-50/30";
                    feedbackIcon.innerHTML = `<svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;
                    feedbackStatus.className = "text-red-700 font-extrabold";
                    feedbackStatus.innerText = "答錯囉，加油！";
                }
            } else {
                // 「實戰模擬考模式」：僅高亮點選項目，不公布解答
                optButtons.forEach(b => {
                    const bId = b.getAttribute('data-opt-id');
                    if (bId === optId) {
                        b.className = "quiz-opt-btn w-full text-left p-4 rounded-xl border-2 border-primary-500 bg-primary-50/25 text-primary-800 font-bold flex items-center justify-between shadow-sm";
                    } else {
                        b.className = "quiz-opt-btn w-full text-left p-4 rounded-xl border border-slate-100 text-slate-400 flex items-center justify-between opacity-60";
                    }
                });
            }
        });
    });
}

// 結束測驗，渲染結果
function finishQuiz() {
    const res = quizEngine.getResults();

    // 1. 寫入歷史記錄
    qManager.addHistoryRecord({
        category: document.querySelector('input[name="quiz-category"]:checked')?.value || 'all',
        total: res.total,
        correctCount: res.correctCount,
        incorrectCount: res.incorrectCount,
        score: res.score,
        timeSpent: res.timeSpent,
        mode: quizEngine.mode
    });

    // 2. 切換畫面
    switchTab('quiz-result');

    // 3. 計分大圓環進度條動畫
    // 圓周 = 2 * PI * r = 2 * 3.14159 * 56 = 351.8
    const circle = document.getElementById('result-score-circle');
    const scoreText = document.getElementById('result-score-text');
    const offset = 351.8 - (res.score / 100) * 351.8;

    // 重設動畫
    circle.style.strokeDashoffset = "351.8";
    setTimeout(() => {
        circle.style.strokeDashoffset = offset.toString();
        scoreText.innerText = `${res.score}%`;
    }, 150);

    // 4. 動態顯示激勵用語
    const evalTitle = document.getElementById('result-eval-title');
    const evalDesc = document.getElementById('result-eval-desc');

    if (res.score === 100) {
        evalTitle.innerText = "🎉 完美大師！狂賀滿分！";
        evalDesc.innerText = "太不可思議了！您已經對此部分內容百分百掌握，快去挑戰其他分類吧！";
        // 滿分狂撒櫻花五彩拉炮
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 85, origin: { y: 0.6 } });
        }
    } else if (res.score >= 80) {
        evalTitle.innerText = "🌟 優秀卓越！掌握度極高！";
        evalDesc.innerText = "這是一個非常亮眼的成績！只有零星觀念需要加強，繼續維持！";
        if (typeof confetti === 'function') {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
    } else if (res.score >= 60) {
        evalTitle.innerText = "👍 通過挑戰，再接再厲！";
        evalDesc.innerText = "您的表現符合標準，但仍有不少進步空間！細看下方的錯題檢討能幫助您加速進步。";
    } else {
        evalTitle.innerText = "💪 革命尚未成功，加油！";
        evalDesc.innerText = "不用灰心，複習系統就是為了讓我們從錯誤中學習的。踏實讀完下方的錯題解析，下次一定大躍進！";
    }

    // 5. 填寫統計數據
    document.getElementById('result-stat-total').innerText = `${res.total} 題`;
    document.getElementById('result-stat-correct').innerText = `${res.correctCount} 題`;
    document.getElementById('result-stat-incorrect').innerText = `${res.incorrectCount} 題`;
    document.getElementById('result-stat-time').innerText = res.timeSpent;

    // 6. 渲染錯題檢討清單
    const wrongSection = document.getElementById('result-wrong-review-section');
    const wrongList = document.getElementById('result-wrong-list');
    const wrongAnswers = res.details.filter(d => !d.isCorrect);

    if (wrongAnswers.length === 0) {
        wrongSection.classList.add('hidden');
    } else {
        wrongSection.classList.remove('hidden');
        wrongList.innerHTML = wrongAnswers.map((item, index) => {
            const q = item.question;
            const hasImg = q.image ? true : false;

            // 找出正確選項文字與使用者點選的選項文字
            const correctOpt = q.options.find(o => o.id === q.correctOptionId)?.text || '';
            const userOpt = q.options.find(o => o.id === item.selectedOptionId)?.text || '未答題';

            return `
                <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="bg-red-50 text-red-600 border border-red-100 px-2.5 py-0.5 rounded-full text-xs font-bold">錯題 ${index + 1}</span>
                        <span class="text-xs text-slate-400 font-semibold">${q.category}</span>
                    </div>

                    <h4 class="font-bold text-slate-800 text-sm leading-relaxed">${q.questionText}</h4>

                    ${hasImg ? `
                        <div class="max-w-xs bg-slate-50 border border-slate-100 rounded-lg p-2 max-h-40 overflow-hidden flex justify-center items-center">
                            <img src="${q.image}" alt="錯題圖片" class="max-h-36 object-contain rounded">
                        </div>
                    ` : ''}

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm pt-1">
                        <div class="p-3 bg-red-50 border border-red-100 text-red-800 rounded-xl flex items-start space-x-2">
                            <span class="text-red-500 font-extrabold">您的選擇：</span>
                            <span class="font-medium leading-relaxed">${userOpt}</span>
                        </div>
                        <div class="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-start space-x-2">
                            <span class="text-emerald-500 font-extrabold">正確答案：</span>
                            <span class="font-bold leading-relaxed">${correctOpt}</span>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5 text-xs leading-relaxed">
                        <span class="font-bold text-slate-700 block">💡 知識檢討解析：</span>
                        <p class="text-slate-600">${q.explanation || '本題無詳細解析。'}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ==========================================================================
// 6. 題庫匯出與匯入功能
// ==========================================================================

// 一鍵匯出題庫為 JSON 檔案
function exportDatabase() {
    const qs = qManager.getAll();
    if (qs.length === 0) {
        alert('題庫目前沒有任何考題，無需匯出！');
        return;
    }

    try {
        const jsonStr = JSON.stringify(qs, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `智慧複習系統-題庫備份-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();

        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    } catch (e) {
        alert('匯出失敗，可能含有過大圖片 Base64，請嘗試縮減圖片或改用外鏈！');
        console.error(e);
    }
}

// 匯入 JSON 題庫
function handleDatabaseImport(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        try {
            const importedQs = JSON.parse(e.target.result);

            // 基本資料結構檢驗
            if (!Array.isArray(importedQs)) {
                throw new Error('匯入的資料格式不符，頂層應為陣列！');
            }

            // 檢查每道題目的必填欄位
            const isValid = importedQs.every(q =>
                q.id && q.category && q.questionText && Array.isArray(q.options) && q.correctOptionId
            );

            if (!isValid) {
                throw new Error('部分考題遺失關鍵欄位（ID、分類、題目敘述、選項、或正確答案 ID）');
            }

            if (confirm(`確認匯入？這將會覆蓋您目前的考題庫，共匯入 ${importedQs.length} 題。`)) {
                qManager.questions = importedQs;
                qManager.saveToStorage();
                alert('題庫匯入成功！已更新本地快取！');
                clearFilters(); // 清除搜尋並重刷列表
            }
        } catch (err) {
            alert(`匯入失敗，錯誤原因：${err.message}`);
            console.error(err);
        }
        // 清空 file input
        document.getElementById('import-db-file').value = '';
    };
    reader.onerror = function () {
        alert('讀取檔案失敗！');
    };
}

// ==========================================================================
// 7. 全域事件監聽與系統初始化
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化日期與首頁資料
    initDate();
    switchTab('dashboard');

    // 2. 側邊導覽點擊事件
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 手機版漢堡選單開關
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mobileIcon = document.getElementById('mobile-menu-icon');

    mobileBtn.addEventListener('click', () => {
        const isHidden = sidebar.classList.contains('hidden');
        if (isHidden) {
            sidebar.classList.remove('hidden');
            setTimeout(() => {
                sidebar.classList.remove('-translate-x-full');
                sidebar.classList.add('translate-x-0');
            }, 10);
            mobileIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // 換成 X 圖標
        } else {
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('-translate-x-full');
            setTimeout(() => sidebar.classList.add('hidden'), 300);
            mobileIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // 換回三條線
        }
    });

    // 3. 搜尋與篩選事件
    document.getElementById('search-q-input').addEventListener('input', renderQuestionsList);
    document.getElementById('filter-category-select').addEventListener('change', renderQuestionsList);
    document.getElementById('filter-image-select').addEventListener('change', renderQuestionsList);

    // 4. 新增題目按鈕綁定 (Modal)
    document.getElementById('add-question-btn').addEventListener('click', () => openModal());
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    document.getElementById('form-add-option-btn').addEventListener('click', () => addOptionRow());

    // 5. 處理圖片檔案上傳事件
    const fileInput = document.getElementById('form-image-file');
    const dragArea = document.getElementById('image-drag-area');

    // 點擊上傳
    dragArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleImageFileSelected(e.target.files[0]));

    // 拖曳上傳
    dragArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragArea.classList.add('dragover');
    });
    dragArea.addEventListener('dragleave', () => dragArea.classList.remove('dragover'));
    dragArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleImageFileSelected(e.dataTransfer.files[0]);
        }
    });

    // 外部圖片網址輸入預覽
    document.getElementById('form-image-url').addEventListener('input', (e) => {
        const url = e.target.value.trim();
        const previewImg = document.getElementById('modal-image-preview');
        const placeholder = document.getElementById('preview-placeholder');
        const removeBtn = document.getElementById('remove-preview-btn');

        if (url) {
            previewImg.src = url;
            previewImg.classList.remove('hidden');
            placeholder.classList.add('hidden');
            removeBtn.classList.remove('hidden');
            // 清理本機 file input
            fileInput.value = '';
        } else {
            removePreviewImage();
        }
    });

    // 移除圖片預覽
    document.getElementById('remove-preview-btn').addEventListener('click', removePreviewImage);

    // 6. 儲存題目表單 submit
    document.getElementById('question-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // 收集選項
        const optionRows = formOptionsList.children;
        const options = [];
        let correctOptId = null;

        for (let row of optionRows) {
            const optId = row.getAttribute('data-id');
            const text = row.querySelector('input[type="text"]').value.trim();
            const radio = row.querySelector('input[type="radio"]');

            if (!text) {
                alert('選項內容不能為空！');
                return;
            }

            options.push({ id: optId, text: text });
            if (radio.checked) {
                correctOptId = optId;
            }
        }

        if (!correctOptId) {
            alert('請至少勾選一個選項作為正確答案！');
            return;
        }

        // 收集圖片
        let image = null;
        const previewImg = document.getElementById('modal-image-preview');
        if (!previewImg.classList.contains('hidden') && previewImg.src) {
            image = previewImg.src;
        }

        const qData = {
            category: document.getElementById('form-category').value.trim(),
            questionText: document.getElementById('form-question-text').value.trim(),
            options: options,
            correctOptionId: correctOptId,
            image: image,
            explanation: document.getElementById('form-explanation').value.trim()
        };

        const id = document.getElementById('form-q-id').value;
        if (id) qData.id = id;

        // 儲存
        qManager.saveQuestion(qData);
        closeModal();
        renderQuestionsList();
    });

    // 7. 題數限制選擇按鈕綁定
    document.querySelectorAll('.limit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.limit-btn').forEach(b => b.classList.remove('active-limit'));
            btn.classList.add('active-limit');
            quizLimit = btn.getAttribute('data-limit');
        });
    });

    // 8. 測驗相關動作與控制事件
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

    // 下一題按鈕
    document.getElementById('quiz-next-btn').addEventListener('click', () => {
        const hasNext = quizEngine.next();
        if (hasNext) {
            renderActiveQuestion();
        } else {
            // 已無下一題，結算成果
            finishQuiz();
        }
    });

    // 中途結束按鈕
    document.getElementById('quiz-quit-btn').addEventListener('click', () => {
        if (confirm('您確定要中途放棄這次測驗嗎？這不會被記入歷史紀錄中喔。')) {
            quizEngine.stopTimer();
            switchTab('quiz-setup');
        }
    });

    // 9. 清除歷史紀錄
    document.getElementById('clear-history-btn').addEventListener('click', () => {
        if (confirm('您確定要清除所有的複習測驗歷史記錄嗎？')) {
            qManager.clearHistory();
            renderDashboard();
        }
    });

    // 10. 匯出題庫與匯入題庫事件
    document.getElementById('export-db-btn').addEventListener('click', exportDatabase);
    document.getElementById('import-db-file').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleDatabaseImport(e.target.files[0]);
        }
    });
});
