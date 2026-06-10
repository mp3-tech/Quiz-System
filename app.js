/**
 * ==========================================================================
 * 網頁智慧複習系統 - 核心邏輯 JavaScript
 * ==========================================================================
 */

// 1. 全域變數與儲存 Key 定義
const STORAGE_KEY = 'web_review_questions_db';
const HISTORY_KEY = 'web_review_quiz_history';

// 預設考題：圖書館史（第一份：文字微調、第二份：觀念反轉、第三份：終極混亂）
const DEFAULT_QUESTIONS = [
    // =====================================================================
    // 圖書館史：第一份（文字微調型）
    // =====================================================================
    {
        id: 'lib_p1_tf_01',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】民國時期在日內瓦成立的中國國際圖書館，中途曾輾轉至烏拉圭，並於民國 80 年代最終落腳於國家圖書館。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n中國國際圖書館在民國時期創立於瑞士日內瓦，流轉至烏拉圭後，最終於民國 80 年代返回台灣安頓，並落腳於「國家圖書館」，而非台灣圖書館。'
    },
    {
        id: 'lib_p1_tf_02',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】圖書館專業的構成要素非常嚴謹，僅包含專業人才培育、知識體系、社會價值與倫理守則，並不包含任何學會組織。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n除了專業人才培育、知識體系、社會價值與倫理守則外，「學會組織」（如中華民國圖書館學會）也是構成圖書館專業不可或缺的重要核心要素。'
    },
    {
        id: 'lib_p1_tf_03',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】中華民國圖書館學會於民國 42 年在台設置，就其歷史性質而言，屬於恢復在大陸時期的既有組織。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n中華民國圖書館學會（原名中國圖書館學會）在台復會，在性質上屬於「恢復」大陸時期的組織與血統。'
    },
    {
        id: 'lib_p1_tf_04',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】中華民國圖書館學會創立之初，為了迅速推展會務、確立發展方向，當時即有選任第一任理事長。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n學會成立之初「並未設置理事長」，而是採集體領導的「理事會形式」來推動方向與會務。'
    },
    {
        id: 'lib_p1_tf_05',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】戰後中央圖書館遷台時，曾與故宮博物院等單位合併，復館時一開始先在植物園，後來才搬遷到霧峰北溝。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n地理遷徙順序顛倒了！中央圖書館遷台初期是先與故宮等單位合併落腳於「霧峰北溝」，之後才在台北「植物園」內借用台灣神社舊址復館。'
    },
    {
        id: 'lib_p1_tf_06',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】戰後政府原計畫在全台（北中南東）皆設立省立圖書館，但經過時代更迭，最終僅剩台北與台中的省立圖書館存活。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n戰後政府曾規劃在全台多處設立省立圖書館，但經過體制精簡與歷史演變，最終僅存台北與台中兩座。'
    },
    {
        id: 'lib_p1_tf_07',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】日治時期「臺灣總督府圖書館」的成立背景，最主要是依據 1923 年所制定的《公私立圖書館規則》。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n1923 年的《公私立圖書館規則》是用於規範常規公共圖書館。臺灣總督府圖書館屬於國立、國家級圖書館，它是依據總督府特別制定的「專屬館務規則」成立，非依據該公私立規則。'
    },
    {
        id: 'lib_p1_tf_08',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】大學圖書館與中小學圖書館雖然都位於校園環境中，但在圖書館學分類上，兩者屬於完全不同的類別。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n大學圖書館被歸類為「學術圖書館」，而中小學圖書館則歸類為「學校圖書館」，兩者在服務對象與功能上有本質上的不同。'
    },
    {
        id: 'lib_p1_tf_09',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】根據現行《大學法》的最新修正，大學圖書館館長已放寬限制，不再強制要求必須由圖書館專業教授或專家擔任。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n現階段的《大學法》早已將此限制修法拿掉，目前只要具備相關行政或學術人力資格者即可出任，不再硬性限制必須具備圖資學專業背景。'
    },
    {
        id: 'lib_p1_tf_10',
        category: '圖書館史-文字微調型',
        questionText: '【是非題】各級政府機關常常因為內部業務或研究需要而設立專屬圖書館，這類圖書館在類別上應歸屬於「學術圖書館」。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n政府機關（如外交部、經濟部等）為了特定核心業務而成立的圖書館，其專業分類應屬於「專門圖書館」，並非學術圖書館。'
    },
    {
        id: 'lib_p1_mc_01',
        category: '圖書館史-文字微調型',
        questionText: '民國時期在境外設立、且唯一具有官方或觀光性質的特殊圖書館為下列何者？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國立羅斯福圖書館' },
            { id: 'opt_b', text: 'B. 中國國際圖書館' },
            { id: 'opt_b', text: 'C. 中德學會圖書館' },
            { id: 'opt_d', text: 'D. 巴黎國際中國圖書館' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n中國國際圖書館是民國時期建立在境外（瑞士日內瓦）唯一具備觀光與官方地位的特殊文化機構。'
    },
    {
        id: 'lib_p1_mc_02',
        category: '圖書館史-文字微調型',
        questionText: '現今的「中華民國圖書館學會」，在大陸時期的前身組織名稱是什麼？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 中華圖書館協會' },
            { id: 'opt_b', text: 'B. 中華圖書協會' },
            { id: 'opt_c', text: 'C. 中國圖書館學會' },
            { id: 'opt_d', text: 'D. 中華民國圖書館協會' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n中華民國圖書館學會由大陸時期一路流傳過來，其最早在大陸創立時的組織名稱為「中華圖書館協會」。'
    },
    {
        id: 'lib_p1_mc_03',
        category: '圖書館史-文字微調型',
        questionText: '下列哪一項「是」中華民國圖書館學會成立的核心宗旨與目的？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 促進出版商與書店的圖書販售' },
            { id: 'opt_b', text: 'B. 壟斷圖書資訊教育市場' },
            { id: 'opt_c', text: 'C. 研究圖書館制度與增進社會教育工作' },
            { id: 'opt_d', text: 'D. 以上皆是' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n學會做為專業學術組織，核心任務包含研究體制、協助會員進修以及增進社會教育。促進圖書產品的「販售流通」並非其宗旨。'
    },
    {
        id: 'lib_p1_mc_04',
        category: '圖書館史-文字微調型',
        questionText: '現今位於中永和地區的「國立臺灣圖書館」，其在日治時期的機關前身為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 臺灣省立臺北圖書館' },
            { id: 'opt_b', text: 'B. 國家圖書館臺灣分館' },
            { id: 'opt_c', text: 'C. 臺灣總督府圖書館' },
            { id: 'opt_d', text: 'D. 臺北州立圖書館' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n國立臺灣圖書館（中永和四號公園內）具有悠久的血統，其最源頭的前身即為日治時期的最高國家級圖書館「臺灣總督府圖書館」。'
    },
    {
        id: 'lib_p1_mc_05',
        category: '圖書館史-文字微調型',
        questionText: '戰後臺灣各地方公共圖書館在發展與評鑑時，最主要是參照下列哪一項法規或標準？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 公共圖書館標準' },
            { id: 'opt_b', text: 'B. 圖書館法' },
            { id: 'opt_c', text: 'C. 公私立圖書館規則' },
            { id: 'opt_d', text: 'D. 圖書館法施行細則' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n戰後初期臺灣地方公共圖書館之營運與硬體設施規範，主要是依循內政部確立的「公共圖書館標準」來推展發展方向。'
    },
    {
        id: 'lib_p1_mc_06',
        category: '圖書館史-文字微調型',
        questionText: '知名歷史文人李敖在青年時期，曾經在哪一所學校的圖書館擔任過志工或職員？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 建國中學圖書館' },
            { id: 'opt_b', text: 'B. 成功高中圖書館' },
            { id: 'opt_c', text: 'C. 臺中一中圖書館' },
            { id: 'opt_d', text: 'D. 高雄中學圖書館' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n李敖於高中求學階段，曾在「臺中一中圖書館」裡廣泛閱讀並擔任圖書館助理與志工。'
    },
    {
        id: 'lib_p1_mc_07',
        category: '圖書館史-文字微調型',
        questionText: '戒嚴時期台灣實施資訊管制，當時知識青年若想閱讀、取得最新的國外第一手英文資訊與期刊，最主要的合法管道是去哪裡？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國家圖書館' },
            { id: 'opt_b', text: 'B. 美新處圖書館' },
            { id: 'opt_c', text: 'C. 中研院圖書館' },
            { id: 'opt_d', text: 'D. 中國國際圖書館' }
        ],
        correctOptionId: 'opt_b',
        explanation: ' = ' + '【正確答案：B】\n在戒嚴與思想控制時期，由美國官方設立的「美新處圖書館」（美國新聞處）成為了台灣學者與知識學子繞過封鎖、汲取國際前沿科技與第一手外文書刊最重要的庇護所。'
    },
    {
        id: 'lib_p1_mc_08',
        category: '圖書館史-文字微調型',
        questionText: '萬有文庫因購書即附分類號與目錄卡，一買就能直接成立圖書館，這種奇特現象在課堂上被老師稱之為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 媒體化現象' },
            { id: 'opt_b', text: 'B. 規格化現象' },
            { id: 'opt_c', text: 'C. 罐頭化現象' },
            { id: 'opt_d', text: 'D. 專業化現象' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n商務印書館印製的《萬有文庫》因高度標準化、買書隨附卡片及索書號，造成全台與全國各地「放一套書即可成立圖書館」的現象，老師特別將此命名為「罐頭化現象」。這個冷知識在一般 Google 上是搜尋不到的。'
    },
    {
        id: 'lib_p1_mc_09',
        category: '圖書館史-文字微調型',
        questionText: '武俠小說大師「金庸」在早年行跡中，曾經擔任過下列哪一個機構的館員？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國家圖書館' },
            { id: 'opt_b', text: 'B. 臺灣總督府圖書館' },
            { id: 'opt_c', text: 'C. 國立臺灣圖書館' },
            { id: 'opt_d', text: 'D. 中國國際圖書館' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n武俠大師金庸（查良鏞）早年在前往香港前，曾經在「國家圖書館」（當時的中央圖書館）內擔任低調的常規館員。'
    },
    {
        id: 'lib_p1_mc_10',
        category: '圖書館史-文字微調型',
        questionText: '課堂上老師提到，他在國立臺灣圖書館所辦理的個人借書證，被賦予了什麼特別的名稱？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 知識的入場券' },
            { id: 'opt_b', text: 'B. 南島的知識巡禮' },
            { id: 'opt_c', text: 'C. 戰後臺灣圖書館發展' },
            { id: 'opt_d', text: 'D. 圖書館通行證' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n老師特別提到，他在國立臺灣圖書館所申辦的借書證，給它取了一個非常獨特且具文藝感的名稱，叫做「知識的入場券」。'
    },

    // =====================================================================
    // 圖書館史：第二份（觀念反轉型）
    // =====================================================================
    {
        id: 'lib_p2_tf_01',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】中國國際圖書館在民國 80 年代最終落腳於臺灣圖書館，其最初是在日內瓦成立，中途曾遷往烏拉圭。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n反轉反思題：該圖書館最終並非落腳於臺灣圖書館，而是落腳落籍於「國家圖書館」。'
    },
    {
        id: 'lib_p2_tf_02',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】中華民國圖書館學會與專業人才、知識體系、社會價值、倫理守則等，共同並列為圖書館專業構成的關鍵要素。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n觀念釐清：圖書館學會本身作為核心專業團體，確實與專業人才、知識、社會倫理等項目共同構成其專業制度的支柱。'
    },
    {
        id: 'lib_p2_tf_03',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】民國 42 年在臺灣設置的「圖書資訊教育學會」，其本質是為了恢復大陸時期的舊有組織，藉此促進兩岸交流。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n反轉陷阱：用來恢復大陸時期血統組織的叫做「中華民國圖書館學會」；而「圖書資訊教育學會」則是為後來因應時代、為了彈性推動兩岸交流而新成立的全新學會。'
    },
    {
        id: 'lib_p2_tf_04',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】中華民國圖書館學會於創立初期，採取的是「理事會形式」來推動會務與決定發展方向，當時並未選出單一理事長。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n完全正確。初期沒有單一理事長，全權由理事會推展會務架構。'
    },
    {
        id: 'lib_p2_tf_05',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】戰後國家圖書館（中央圖書館）遷台初期，曾暫時與故宮博物院等單位合併，並首先在霧峰北溝落腳。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n歷史事實無誤。遷台第一站正是與故宮等國寶機構一起存放於台中霧峰北溝防空與隱密山區。'
    },
    {
        id: 'lib_p2_tf_06',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】戰後政府原本企圖在北、中、南、東四區都保留省立圖書館，但最後只有台北與台南成功存活下來。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n反轉陷阱：最後生存下來的省立圖書館只有「台北與台中」，台南並未存活保留。'
    },
    {
        id: 'lib_p2_tf_07',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】1923 年制定的《公私立圖書館規則》主要是用來規範一般「公共圖書館」的成立，而非國立的「臺灣總督府圖書館」。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n正確。臺灣總督府圖書館是依據其位階之專屬政府條例成立，而非依據 1923 年面向普通公私立大眾圖書館的法規。'
    },
    {
        id: 'lib_p2_tf_08',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】大學圖書館與中小學圖書館雖然都位於校園內，因為分別屬於「學術圖書館」與「學校圖書館」，所以類別不同。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n完全正確。雖然同在教育校園中，但大學圖書館被正式劃分為「學術圖書館」類別。'
    },
    {
        id: 'lib_p2_tf_09',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】依照現行的《大學法》規定，若非圖書館學專業的教授或專家，絕對依法不能被聘任為大學圖書館館長。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n反轉陷阱：現行《大學法》已經「放寬修掉」這項硬性限制，非法定必須由圖資系背景者才能當館長。'
    },
    {
        id: 'lib_p2_tf_10',
        category: '圖書館史-觀念反轉型',
        questionText: '【是非題】政府機關常為了特定業務所需成立圖書館，這種具備特定讀者與專業學科性質的圖書館，在類別上稱之為「專門圖書館」。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n概念明晰：政府內設業務單位圖書館均為標準的「專門圖書館」。'
    },
    {
        id: 'lib_p2_mc_01',
        category: '圖書館史-觀念反轉型',
        questionText: '關於民國時期「中國國際圖書館」的歷史流轉敘述，下列何者正確？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 成立於烏拉圭' },
            { id: 'opt_b', text: 'B. 境外唯一具官方/觀光性質' },
            { id: 'opt_c', text: 'C. 最後落腳台中' },
            { id: 'opt_d', text: 'D. 以上皆非' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n它是成立於日內瓦（非烏拉圭），中途輾轉搬去烏拉圭，最後在民國 80 年代落腳在台北的國家圖書館，具備境外唯一官方觀光性質。'
    },
    {
        id: 'lib_p2_mc_02',
        category: '圖書館史-觀念反轉型',
        questionText: '「中華圖書館協會」是台灣哪一個現存圖書館相關學會的「在大陸時期前身」？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 圖書資訊教育學會' },
            { id: 'opt_b', text: 'B. 中華民國圖書館學會' },
            { id: 'opt_c', text: 'C. 臺灣圖書館學會' },
            { id: 'opt_d', text: 'D. 中國圖書資訊學會' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n中華圖書館協會來到台灣之後復會，即成了現今著名的「中華民國圖書館學會」。'
    },
    {
        id: 'lib_p2_mc_03',
        category: '圖書館史-觀念反轉型',
        questionText: '老師提到圖書館學會有其核心任務，以下哪一項「不屬於」其成立的目的？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 增進社會教育工作' },
            { id: 'opt_b', text: 'B. 拓展圖書零售與販售通路' },
            { id: 'opt_c', text: 'C. 協助會員進修' },
            { id: 'opt_d', text: 'D. 研究圖書館制度' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n圖書館學會絕非商業盈利機構，因此不具備幫出版商「進行圖書市場販售與拓展通路」的核心責任。'
    },
    {
        id: 'lib_p2_mc_04',
        category: '圖書館史-觀念反轉型',
        questionText: '日治時期的「臺灣總督府圖書館」在戰後幾經更名與遷徙，現為下列哪一個圖書館？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國立臺灣圖書館' },
            { id: 'opt_b', text: 'B. 國家圖書館' },
            { id: 'opt_c', text: 'C. 臺灣省立臺北圖書館' },
            { id: 'opt_d', text: 'D. 國家圖書館臺灣分館' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n臺灣總督府圖書館戰後改組為省立臺北圖書館，後更名國立中央圖書館臺灣分館，現已正式定名為「國立臺灣圖書館」。'
    },
    {
        id: 'lib_p2_mc_05',
        category: '圖書館史-觀念反轉型',
        questionText: '戰後台灣地方公共圖書館的發展藍圖與設立依據，最主要是依循下列哪一項制度標準確立的？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 圖書館法施行細則' },
            { id: 'opt_b', text: 'B. 公私立圖書館規則' },
            { id: 'opt_c', text: 'C. 公共圖書館標準' },
            { id: 'opt_d', text: 'D. 臺灣省各縣市圖書館規則' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n戰後地方公共圖書館發展制度與法源建設，其核心基石為「公共圖書館標準」。'
    },
    {
        id: 'lib_p2_mc_06',
        category: '圖書館史-觀念反轉型',
        questionText: '課堂上提到，臺灣文壇奇才李敖曾在高中時期，於哪一個圖書館當過職員或志工？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 臺中一中圖書館' },
            { id: 'opt_b', text: 'B. 成功高中圖書館' },
            { id: 'opt_c', text: 'C. 建國中學圖書館' },
            { id: 'opt_d', text: 'D. 師大附中圖書館' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n歷史名人李敖年輕在台求學時，足跡深留於「臺中一中圖書館」。'
    },
    {
        id: 'lib_p2_mc_07',
        category: '圖書館史-觀念反轉型',
        questionText: '戒嚴時期的臺灣知識分子，若想跨越管制翻閱國外最新的期刊與第一手科技資料，最普遍且合法的管道是去哪裡？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 中研院圖書館' },
            { id: 'opt_b', text: 'B. 國家圖書館' },
            { id: 'opt_c', text: 'C. 美新處圖書館' },
            { id: 'opt_d', text: 'D. 台灣大學圖書館' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n美新處（美國新聞處）圖書館在戒嚴思想管制時代，是台灣學子探索西方第一手原文書籍與學術思想的關鍵綠洲。'
    },
    {
        id: 'lib_p2_mc_08',
        category: '圖書館史-觀念反轉型',
        questionText: '商務印書館所印製的《萬有文庫》，因為附帶索書號與目錄卡，造成當時全國圖書館數量難以精準統計的現象。這被稱之為什麼？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 罐頭化現象' },
            { id: 'opt_b', text: 'B. 媒體化現象' },
            { id: 'opt_c', text: 'C. 規格化現象' },
            { id: 'opt_d', text: 'D. 泡沫化現象' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n因為買一套《萬有文庫》即能在地方直接宣告開館，導致統計數據嚴重失真，此現象被特別定義為「罐頭化現象」。'
    },
    {
        id: 'lib_p2_mc_09',
        category: '圖書館史-觀念反轉型',
        questionText: '寫出《天龍八部》、《笑傲江湖》的著名文學家金庸，早年曾經在下列何處擔任過館員？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 臺灣總督府圖書館' },
            { id: 'opt_b', text: 'B. 國家圖書館' },
            { id: 'opt_c', text: 'C. 中研院歷史語言研究所' },
            { id: 'opt_d', text: 'D. 中國國際圖書館' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n金庸在去香港發展前，曾在國立中央圖書館（現中華民國國家圖書館）內擔任圖書館館員助理。'
    },
    {
        id: 'lib_p2_mc_10',
        category: '圖書館史-觀念反轉型',
        questionText: '老師在國立臺灣圖書館辦理的借書證名稱非常特別，下列何者才是正確的名稱？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 南島的知識巡禮' },
            { id: 'opt_b', text: 'B. 戰後臺灣圖書館發展' },
            { id: 'opt_c', text: 'C. 圖書館通行證' },
            { id: 'opt_d', text: 'D. 知識的入場券' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】\n老師擁有的那張特別借書證名字就叫做「知識的入場券」。'
    },

    // =====================================================================
    // 圖書館史：第三份（終極混亂型 - 1:1 交織編排）
    // =====================================================================
    {
        id: 'lib_p3_tf_01',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/原始】民國時期中國國際圖書館成立於日內瓦，的確它成立於日內瓦，然後輾轉到了烏拉圭，最後，在民國 80 年代落腳，就是在台灣圖書館。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n原始考題重現：注意它最終是落腳在「國家圖書館」，不是台灣圖書館。'
    },
    {
        id: 'lib_p3_tf_02',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/變形】中華民國圖書館學會與專業人才培育、知識體系、社會價值、倫理守則，共同並列為圖書館專業構成的關鍵要素。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n完全正確。專業學會是我國圖書館專業領域構成的五大核心基礎之一。'
    },
    {
        id: 'lib_p3_tf_03',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/原始】圖書資訊教育學會在民國 42 年設置在性質上並非成立，而是恢復大陸時期的組織，對還是錯。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n原始考點：性質上屬於「恢復大陸時期既有組織」的，應為「中華民國圖書館學會」，而非圖書資訊教育學會。'
    },
    {
        id: 'lib_p3_tf_04',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/變形】中華民國圖書館學會創立初期，是以「理事會」的形式推動會務方向，當時並未設置理事長一人負責領導。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n文字變形正確。創立初期採行的是民主式理事會制，並非一開始就設立個人理事長職位。'
    },
    {
        id: 'lib_p3_tf_05',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/原始】國家圖書館戰後遷台，一開始先落腳在這個霧峰的北溝，然後後面在這個植物園裡面，日治時期的台灣神社舊址復館。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n原始課程細節：國圖遷台第一步先去霧峰北溝山區與故宮文物儲放，之後遷入台北植物園內借用日治神社復館。'
    },
    {
        id: 'lib_p3_tf_06',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/變形】戰後政府原計畫在全台（北、中、南、東）設立省立圖書館，但最終演變下來，僅剩臺北與臺南兩座圖書館留存。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n混淆陷阱：最後留存的是台北與「台中」，而非臺南！'
    },
    {
        id: 'lib_p3_tf_07',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/原始】日治時期，臺灣總督府圖書館的成立是依據 1923 年所制定的公私立圖書館規則，對還是錯。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n原始核心：臺灣總督府圖書館是依照總督府本身的高階專屬法律條例設立，不是依據 1923 年普通的公私立規則。'
    },
    {
        id: 'lib_p3_tf_08',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/變形】大學圖書館屬於學術圖書館，中小學圖書館屬於學校圖書館，雖然兩者都在校園內，但在圖書館學的分類上是完全不同的類別。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：○ 對】\n完全正確。雖然同屬教學場所，但在圖書館專業分類上：大學屬於「學術」、中小學屬於「學校」。'
    },
    {
        id: 'lib_p3_tf_09',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/原始】現階段大學法明確規定，大學圖書館必須由圖書館專業教授或專家擔任館長，對還是錯。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n原始法規更迭：現行法已修訂放寬，不需要具備圖資系專家或教授背景即可出任館長。'
    },
    {
        id: 'lib_p3_tf_10',
        category: '圖書館史-終極混亂型',
        questionText: '【是非題/變形】各級政府機關常因內部業務或研究需要而設立專屬圖書館，此類圖書館在專業分類上應歸類為「學術圖書館」。',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. ○ 對' },
            { id: 'opt_b', text: 'B. ✗ 錯' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：✗ 錯】\n概念強化：機關單位的圖書館一律屬於「專門圖書館」，非學術圖書館。'
    },
    {
        id: 'lib_p3_mc_01',
        category: '圖書館史-終極混亂型',
        questionText: '【變形題】民國時期在境外設立、且唯一具有官方或觀光性質的特殊圖書館為下列何者？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國立中央圖書館' },
            { id: 'opt_b', text: 'B. 國立羅斯福圖書館' },
            { id: 'opt_c', text: 'C. 中國國際圖書館' },
            { id: 'opt_d', text: 'D. 中德學會圖書館' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n混亂編排下的境外傳奇機構為「中國國際圖書館」。'
    },
    {
        id: 'lib_p3_mc_02',
        category: '圖書館史-終極混亂型',
        questionText: '【原始題】中華民國圖書館學會於民國時期的前身為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 中華圖書館協會' },
            { id: 'opt_b', text: 'B. 中華圖書協會' },
            { id: 'opt_c', text: 'C. 中華民國圖書館協會' },
            { id: 'opt_d', text: 'D. 中國圖書館學會' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n原始考卷原題：前身組織正是「中華圖書館協會」。'
    },
    {
        id: 'lib_p3_mc_03',
        category: '圖書館史-終極混亂型',
        questionText: '【變形題】老師提到圖書館學會有其核心任務，以下哪一項「不屬於」其成立的目的？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 增進社會教育工作' },
            { id: 'opt_b', text: 'B. 拓展圖書零售與販售通路' },
            { id: 'opt_c', text: 'C. 協助會員進修' },
            { id: 'opt_d', text: 'D. 研究圖書館制度' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n學會是學術公益組織，絕不以「書籍販售或推廣通路零售」為成立宗旨。'
    },
    {
        id: 'lib_p3_mc_04',
        category: '圖書館史-終極混亂型',
        questionText: '【原始題】以下哪一個圖書館為國立臺灣圖書館的前身？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 臺灣省立臺北圖書館' },
            { id: 'opt_b', text: 'B. 臺灣總督府圖書館' },
            { id: 'opt_c', text: 'C. 國家圖書館臺灣分館' },
            { id: 'opt_d', text: 'D. 以上皆是' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n歷史起源題：最主要也最具代表性的起源前身是日治時期的「臺灣總督府圖書館」。'
    },
    {
        id: 'lib_p3_mc_05',
        category: '圖書館史-終極混亂型',
        questionText: '【變形題】戰後台灣地方公共圖書館的發展藍圖與設立依據，最主要是依循下列哪一項制度標準確立的？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 圖書館法' },
            { id: 'opt_b', text: 'B. 公私立圖書館規則' },
            { id: 'opt_c', text: 'C. 公共圖書館標準' },
            { id: 'opt_d', text: 'D. 圖書館法施行細則' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n戰後地方公共圖書館的考核與常規營運標準，是遵循內政部頒布的「公共圖書館標準」。'
    },
    {
        id: 'lib_p3_mc_06',
        category: '圖書館史-終極混亂型',
        questionText: '【原始題】課堂上老師提到李敖曾擔任哪一個圖書館志工（職員）？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 建國中學圖書館' },
            { id: 'opt_b', text: 'B. 臺中一中圖書館' },
            { id: 'opt_c', text: 'C. 成功高中圖書館' },
            { id: 'opt_d', text: 'D. 高雄中學圖書館' }
        ],
        correctOptionId: 'opt_b',
        explanation: '【正確答案：B】\n李敖大師高中時大放異彩、廣讀群書的地方即為「臺中一中圖書館」。'
    },
    {
        id: 'lib_p3_mc_07',
        category: '圖書館史-終極混亂型',
        questionText: '【變形題】戒嚴時期的臺灣知識分子，若想跨越管制翻閱國外最新的期刊與第一手科技資料，最普遍且合法的管道是去哪裡？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 中研院圖書館' },
            { id: 'opt_b', text: 'B. 國家圖書館' },
            { id: 'opt_c', text: 'C. 美新處圖書館' },
            { id: 'opt_d', text: 'D. 台灣大學圖書館' }
        ],
        correctOptionId: 'opt_c',
        explanation: '【正確答案：C】\n資訊封鎖年代的知識綠洲：美國政府辦理的「美新處圖書館」。'
    },
    {
        id: 'lib_p3_mc_08',
        category: '圖書館史-終極混亂型',
        questionText: '【原始題】民國時期圖書館發生媒體化（罐頭化）現象，造成此現象的人的書籍是哪一部？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 人人文庫' },
            { id: 'opt_b', text: 'B. 企業文庫' },
            { id: 'opt_c', text: 'C. 知識文庫' },
            { id: 'opt_d', text: 'D. 萬有文庫' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】\n原始考卷題目誤植為「媒體化」，依課程內容應為「罐頭化現象」，這套幫圖書館全套分類打包、買來就能原地開館的神書，正是商務印書館印製的《萬有文庫》。'
    },
    {
        id: 'lib_p3_mc_09',
        category: '圖書館史-終極混亂型',
        questionText: '【變形題】寫出《天龍八部》、《笑傲江湖》的著名文學家金庸，早年曾經在下列何處擔任過館員？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 國家圖書館' },
            { id: 'opt_b', text: 'B. 臺灣總督府圖書館' },
            { id: 'opt_c', text: 'C. 國立臺灣圖書館' },
            { id: 'opt_d', text: 'D. 中國國際圖書館' }
        ],
        correctOptionId: 'opt_a',
        explanation: '【正確答案：A】\n金庸在赴港成為報人與寫武俠小說前，曾低調在「國家圖書館」（原中央圖書館）辛勤工作。'
    },
    {
        id: 'lib_p3_mc_10',
        category: '圖書館史-終極混亂型',
        questionText: '【原始題】老師在國立臺灣圖書館所辦的借書證名稱為何？',
        image: null,
        options: [
            { id: 'opt_a', text: 'A. 圖書館借書證' },
            { id: 'opt_b', text: 'B. 戰後臺灣圖書館發展' },
            { id: 'opt_c', text: 'C. 南島的知識巡禮' },
            { id: 'opt_d', text: 'D. 知識的入場券' }
        ],
        correctOptionId: 'opt_d',
        explanation: '【正確答案：D】\n老師與這家圖書館最浪漫的相遇憑證就是——「知識的入場券」。'
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

    // 1. 寫入歷史記錄（含各分類統計，供雷達圖使用）
    const categoryStats = {};
    res.details.forEach(d => {
        const cat = d.question.category || '未分類';
        if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
        categoryStats[cat].total++;
        if (d.isCorrect) categoryStats[cat].correct++;
    });
    qManager.addHistoryRecord({
        category: document.querySelector('input[name="quiz-category"]:checked')?.value || 'all',
        total: res.total,
        correctCount: res.correctCount,
        incorrectCount: res.incorrectCount,
        score: res.score,
        timeSpent: res.timeSpent,
        mode: quizEngine.mode,
        categoryStats
    });

    // 1b. 自動將答錯的題目加入錯題本
    res.details.forEach(d => {
        if (!d.isCorrect && d.question?.id) {
            addToWrongBook(d.question.id);
        }
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

// ==========================================================================
// 8. AI 功能模組（API Key 管理、匯入、聊天、出題）
// ==========================================================================

// ── 8.0 供應商 / Key / Model 儲存常數 ─────────────────────────────────────
const AI_PROVIDER_KEY   = 'quiz_ai_provider';   // 'gemini' | 'anthropic'
const GEMINI_KEY_STORAGE  = 'quiz_gemini_api_key';
const GEMINI_MODEL_STORAGE = 'quiz_gemini_model';
const AI_KEY_STORAGE    = 'quiz_ai_api_key';    // Anthropic key（保持相容）
const AI_MODEL_STORAGE  = 'quiz_ai_model';      // Anthropic model

// ── 8.1 供應商切換 ──────────────────────────────────────────────────────────

function getAiProvider() {
    return localStorage.getItem(AI_PROVIDER_KEY) || 'gemini';
}

function switchAiProvider(provider) {
    localStorage.setItem(AI_PROVIDER_KEY, provider);
    const geminiBtn    = document.getElementById('provider-gemini-btn');
    const anthropicBtn = document.getElementById('provider-anthropic-btn');
    const geminiSet    = document.getElementById('settings-gemini');
    const anthropicSet = document.getElementById('settings-anthropic');

    const activeClass   = 'flex flex-col items-center p-4 rounded-2xl border-2 border-primary-500 bg-primary-50 transition space-y-2';
    const inactiveClass = 'flex flex-col items-center p-4 rounded-2xl border-2 border-slate-200 bg-white transition space-y-2 hover:border-slate-300';

    if (provider === 'gemini') {
        if (geminiBtn)    geminiBtn.className    = activeClass;
        if (anthropicBtn) anthropicBtn.className = inactiveClass;
        if (geminiSet)    geminiSet.classList.remove('hidden');
        if (anthropicSet) anthropicSet.classList.add('hidden');
    } else {
        if (anthropicBtn) anthropicBtn.className = activeClass;
        if (geminiBtn)    geminiBtn.className    = inactiveClass;
        if (anthropicSet) anthropicSet.classList.remove('hidden');
        if (geminiSet)    geminiSet.classList.add('hidden');
    }
}

// ── 8.2 API Key 管理 ────────────────────────────────────────────────────────

function loadAiSettings() {
    const provider = getAiProvider();

    // 載入 Gemini 設定
    const geminiKey   = localStorage.getItem(GEMINI_KEY_STORAGE) || '';
    const geminiModel = localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-2.0-flash';
    const geminiKeyEl   = document.getElementById('gemini-key-input');
    const geminiModelEl = document.getElementById('gemini-model-select');
    if (geminiKeyEl)   geminiKeyEl.value   = geminiKey;
    if (geminiModelEl) geminiModelEl.value = geminiModel;

    // 載入 Anthropic 設定
    const claudeKey   = localStorage.getItem(AI_KEY_STORAGE) || '';
    const claudeModel = localStorage.getItem(AI_MODEL_STORAGE) || 'claude-sonnet-4-6';
    const claudeKeyEl   = document.getElementById('api-key-input');
    const claudeModelEl = document.getElementById('ai-model-select');
    if (claudeKeyEl)   claudeKeyEl.value   = claudeKey;
    if (claudeModelEl) claudeModelEl.value = claudeModel;

    // 套用供應商切換 UI
    switchAiProvider(provider);
}

function getApiKey() {
    const provider = getAiProvider();
    return provider === 'gemini'
        ? localStorage.getItem(GEMINI_KEY_STORAGE) || ''
        : localStorage.getItem(AI_KEY_STORAGE) || '';
}

function getAiModel() {
    const provider = getAiProvider();
    return provider === 'gemini'
        ? localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-2.0-flash'
        : localStorage.getItem(AI_MODEL_STORAGE) || 'claude-sonnet-4-6';
}

function saveApiKey() {
    const provider = getAiProvider();
    if (provider === 'gemini') {
        const key   = document.getElementById('gemini-key-input')?.value.trim() || '';
        const model = document.getElementById('gemini-model-select')?.value || 'gemini-2.0-flash';
        if (!key) { showKeyStatus('請輸入 Gemini API Key！', false); return; }
        localStorage.setItem(GEMINI_KEY_STORAGE, key);
        localStorage.setItem(GEMINI_MODEL_STORAGE, model);
    } else {
        const key   = document.getElementById('api-key-input')?.value.trim() || '';
        const model = document.getElementById('ai-model-select')?.value || 'claude-sonnet-4-6';
        if (!key) { showKeyStatus('請輸入 Anthropic API Key！', false); return; }
        localStorage.setItem(AI_KEY_STORAGE, key);
        localStorage.setItem(AI_MODEL_STORAGE, model);
    }
    showKeyStatus('✅ 已儲存！', true);
}

function clearApiKey() {
    if (!confirm('確定要清除所有已儲存的 API Key 嗎？')) return;
    localStorage.removeItem(GEMINI_KEY_STORAGE);
    localStorage.removeItem(GEMINI_MODEL_STORAGE);
    localStorage.removeItem(AI_KEY_STORAGE);
    localStorage.removeItem(AI_MODEL_STORAGE);
    const geminiKeyEl = document.getElementById('gemini-key-input');
    const claudeKeyEl = document.getElementById('api-key-input');
    if (geminiKeyEl) geminiKeyEl.value = '';
    if (claudeKeyEl) claudeKeyEl.value = '';
    showKeyStatus('已清除所有 Key', false);
}

function toggleKeyVisibility(inputId) {
    const inp = document.getElementById(inputId);
    if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
}

// 保留舊函式名稱相容性
function toggleApiKeyVisibility() { toggleKeyVisibility('api-key-input'); }

function showKeyStatus(msg, ok) {
    const el = document.getElementById('api-key-status');
    if (!el) return;
    el.classList.remove('hidden',
        'bg-emerald-50', 'text-emerald-700', 'border-emerald-100',
        'bg-red-50',     'text-red-700',     'border-red-100');
    el.classList.add(
        ok ? 'bg-emerald-50' : 'bg-red-50',
        ok ? 'text-emerald-700' : 'text-red-700',
        ok ? 'border-emerald-100' : 'border-red-100',
        'border');
    el.innerText = msg;
    el.classList.remove('hidden');
}

async function testApiKey() {
    const key = getApiKey();
    if (!key) { showKeyStatus('請先輸入並儲存 API Key！', false); return; }
    showKeyStatus('🔄 測試中...', true);
    try {
        await callAI([{ role: 'user', content: '請回覆「連線成功」四個字' }], 20);
        showKeyStatus('✅ 連線成功！AI 功能已就緒 (' + getAiProvider().toUpperCase() + ')', true);
    } catch(e) {
        showKeyStatus('❌ 連線失敗：' + e.message, false);
    }
}

// ── 8.3 核心 AI 呼叫函式（Gemini + Anthropic 統一介面）──────────────────────

/**
 * 統一 AI 呼叫入口
 * messages 格式：[{ role: 'user'|'assistant', content: string | array }]
 * 自動根據 getAiProvider() 路由到對應 API
 */
async function callAI(messages, maxTokens = 2000, systemPrompt = '') {
    const provider = getAiProvider();
    if (provider === 'gemini') {
        return await callGemini(messages, maxTokens, systemPrompt);
    } else {
        return await callClaude(messages, maxTokens, systemPrompt);
    }
}

// Gemini API 呼叫
async function callGemini(messages, maxTokens = 2000, systemPrompt = '') {
    const key   = localStorage.getItem(GEMINI_KEY_STORAGE) || '';
    const model = localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-2.0-flash';
    if (!key) throw new Error('尚未設定 Gemini API Key，請先到「AI 設定」填入');

    // 將 messages 轉成 Gemini 格式
    const contents = messages.map(m => {
        // 支援圖片（Anthropic 格式 → Gemini 格式）
        if (Array.isArray(m.content)) {
            const parts = m.content.map(c => {
                if (c.type === 'text') return { text: c.text };
                if (c.type === 'image') return {
                    inline_data: { mime_type: c.source.media_type, data: c.source.data }
                };
                return { text: JSON.stringify(c) };
            });
            return { role: m.role === 'assistant' ? 'model' : 'user', parts };
        }
        return { role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] };
    });

    const body = {
        contents,
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
    };
    if (systemPrompt) {
        body.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.error?.message || `HTTP ${res.status}`;
        throw new Error(msg);
    }

    const data = await res.json();
    // 取出文字回覆
    return data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
}

// Anthropic Claude API 呼叫
async function callClaude(messages, maxTokens = 2000, systemPrompt = '') {
    const key   = localStorage.getItem(AI_KEY_STORAGE) || '';
    const model = localStorage.getItem(AI_MODEL_STORAGE) || 'claude-sonnet-4-6';
    if (!key) throw new Error('尚未設定 Anthropic API Key，請先到「AI 設定」填入');

    const body = { model, max_tokens: maxTokens, messages };
    if (systemPrompt) body.system = systemPrompt;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.content.map(c => c.text || '').join('');
}

// ── 8.3 AI 自動匯入題目 ────────────────────────────────────────────────────

let importImageBase64 = null;
let parsedImportQuestions = [];

function switchImportTab(tab) {
    const textArea  = document.getElementById('import-text-area');
    const imageArea = document.getElementById('import-image-area');
    const textBtn   = document.getElementById('import-tab-text');
    const imageBtn  = document.getElementById('import-tab-image');

    if (tab === 'text') {
        textArea.classList.remove('hidden');
        imageArea.classList.add('hidden');
        textBtn.className  = 'flex-1 py-2 rounded-xl text-sm font-bold bg-primary-500 text-white shadow transition';
        imageBtn.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 transition hover:bg-slate-200';
    } else {
        textArea.classList.add('hidden');
        imageArea.classList.remove('hidden');
        imageBtn.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-primary-500 text-white shadow transition';
        textBtn.className  = 'flex-1 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 transition hover:bg-slate-200';
    }
}

function clearImportImage() {
    importImageBase64 = null;
    document.getElementById('import-image-preview-box').classList.add('hidden');
    document.getElementById('import-image-file').value = '';
}

async function runAiImport() {
    if (!getApiKey()) { alert('請先到「AI 設定」設定 API Key！\n\n建議使用 Google Gemini（免費額度多）'); switchTab('ai-settings'); return; }

    const btn     = document.getElementById('ai-import-btn');
    const btnText = document.getElementById('ai-import-btn-text');
    btn.disabled  = true;
    btnText.innerText = '🔄 AI 解析中...';

    document.getElementById('import-result-box').classList.add('hidden');

    try {
        const isImageMode = !document.getElementById('import-image-area').classList.contains('hidden');
        const categoryHint = document.getElementById('import-category-input')?.value?.trim() || '';

        const systemPrompt = `你是一個考題解析專家。你的任務是將輸入的題目（文字或圖片）解析成JSON格式。
請嚴格輸出以下JSON陣列格式，不要有任何其他文字、不要有markdown代碼塊：
[
  {
    "category": "分類名稱",
    "questionText": "完整題目文字",
    "options": [
      {"id": "opt_a", "text": "A. 選項文字"},
      {"id": "opt_b", "text": "B. 選項文字"},
      {"id": "opt_c", "text": "C. 選項文字"},
      {"id": "opt_d", "text": "D. 選項文字"}
    ],
    "correctOptionId": "opt_b",
    "explanation": "詳細解析，說明為何此答案正確，並解釋相關知識點"
  }
]
注意：
- correctOptionId 必須對應正確答案的 id（opt_a/opt_b/opt_c/opt_d 等）
- 若題目沒有明確答案，請根據統計學知識判斷
- explanation 請用繁體中文撰寫詳細解析
- category 若輸入有指定則用指定的，否則請自行判斷（如：統計第六章）
${categoryHint ? `- 分類請使用：${categoryHint}` : ''}`;

        let messages;
        if (isImageMode && importImageBase64) {
            messages = [{
                role: 'user',
                content: [
                    { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: importImageBase64 } },
                    { type: 'text', text: '請將圖片中所有題目解析為JSON格式，嚴格按照指定格式輸出。' }
                ]
            }];
        } else {
            const text = document.getElementById('import-text-input').value.trim();
            if (!text) { alert('請先貼上題目文字！'); btn.disabled = false; btnText.innerText = 'AI 解析並匯入'; return; }
            messages = [{ role: 'user', content: `請將以下題目解析為JSON格式：\n\n${text}` }];
        }

        const raw = await callAI(messages, 4000, systemPrompt);

        // 嘗試解析 JSON
        let jsonStr = raw.trim();
        jsonStr = jsonStr.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
        const startIdx = jsonStr.indexOf('[');
        const endIdx   = jsonStr.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1) jsonStr = jsonStr.slice(startIdx, endIdx + 1);

        parsedImportQuestions = JSON.parse(jsonStr);
        renderImportPreview(parsedImportQuestions);

    } catch(e) {
        alert('解析失敗：' + e.message);
        console.error(e);
    }

    btn.disabled = false;
    btnText.innerText = 'AI 解析並匯入';
}

function renderImportPreview(questions) {
    const box  = document.getElementById('import-result-box');
    const list = document.getElementById('import-result-list');

    list.innerHTML = questions.map((q, i) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-xs bg-primary-50 text-primary-600 border border-primary-100 px-2.5 py-0.5 rounded-full font-bold">題目 ${i+1}</span>
                <span class="text-xs text-slate-400 font-semibold">${q.category || '未分類'}</span>
            </div>
            <p class="font-bold text-slate-800 text-sm leading-relaxed">${q.questionText}</p>
            <div class="space-y-1.5">
                ${(q.options || []).map(o => `
                    <div class="flex items-center space-x-2 text-sm ${o.id === q.correctOptionId ? 'text-emerald-700 font-bold' : 'text-slate-500'}">
                        <span class="w-4 h-4 rounded-full flex-shrink-0 ${o.id === q.correctOptionId ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'} flex items-center justify-center text-[10px]">${o.id === q.correctOptionId ? '✓' : '·'}</span>
                        <span>${o.text}</span>
                    </div>`).join('')}
            </div>
            ${q.explanation ? `<div class="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed"><span class="font-bold text-slate-700">💡 解析：</span>${q.explanation.slice(0, 150)}${q.explanation.length > 150 ? '...' : ''}</div>` : ''}
        </div>
    `).join('');

    box.classList.remove('hidden');
}

function confirmImportAll() {
    if (!parsedImportQuestions.length) return;
    parsedImportQuestions.forEach(q => {
        qManager.saveQuestion({
            category:        q.category || '未分類',
            questionText:    q.questionText,
            options:         q.options,
            correctOptionId: q.correctOptionId,
            explanation:     q.explanation || '',
            image:           null
        });
    });
    alert(`✅ 已成功加入 ${parsedImportQuestions.length} 道題目到題庫！`);
    parsedImportQuestions = [];
    document.getElementById('import-result-box').classList.add('hidden');
    document.getElementById('import-text-input').value = '';
    clearImportImage();
    switchTab('questions');
}

// ── 8.4 AI 解題聊天助理 ────────────────────────────────────────────────────

let chatHistory = [];
const CHAT_SYSTEM = `你是一位親切的統計學家教 AI，專門幫助學生理解統計學概念。
你的風格：
- 使用繁體中文回答
- 解釋要清楚，多用例子
- 適時使用公式（用文字表示，如 X̄、μ、σ）
- 如果學生貼上題目，先給答案再詳細解析
- 使用表情符號讓回答更生動 📊`;

function appendChatMessage(role, text, isStreaming = false) {
    const container = document.getElementById('chat-messages');
    const isUser = role === 'user';

    const div = document.createElement('div');
    div.className = `flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`;
    div.innerHTML = `
        <div class="w-8 h-8 rounded-full ${isUser ? 'bg-slate-200' : 'bg-primary-500'} flex items-center justify-center flex-shrink-0 text-xs font-bold ${isUser ? 'text-slate-600' : 'text-white'}">
            ${isUser ? '我' : 'AI'}
        </div>
        <div class="${isUser ? 'bg-primary-50 rounded-2xl rounded-tr-none' : 'bg-slate-50 rounded-2xl rounded-tl-none'} px-4 py-3 max-w-[85%]">
            <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap" id="${isStreaming ? 'streaming-msg' : ''}">${text}</p>
        </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text  = input.value.trim();
    if (!text) return;
    if (!getApiKey()) { alert('請先到「AI 設定」設定 API Key！\n\n建議使用 Google Gemini（免費額度多）'); switchTab('ai-settings'); return; }

    input.value = '';
    appendChatMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    const btn = document.getElementById('chat-send-btn');
    btn.disabled = true;

    const thinkingDiv = appendChatMessage('assistant', '思考中...', true);

    try {
        const reply = await callAI([...chatHistory], 1500, CHAT_SYSTEM);
        thinkingDiv.remove();
        appendChatMessage('assistant', reply);
        chatHistory.push({ role: 'assistant', content: reply });
        // 保留最近 20 條對話（避免 token 過多）
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
    } catch(e) {
        thinkingDiv.remove();
        appendChatMessage('assistant', '❌ 發生錯誤：' + e.message);
    }

    btn.disabled = false;
}

function sendQuickMessage(text) {
    document.getElementById('chat-input').value = text;
    sendChatMessage();
}

// ── 8.5 AI 智慧出題 ────────────────────────────────────────────────────────

let generatedQuestions = [];

async function runAiGenerate() {
    if (!getApiKey()) { alert('請先到「AI 設定」設定 API Key！\n\n建議使用 Google Gemini（免費額度多）'); switchTab('ai-settings'); return; }

    const btn     = document.getElementById('ai-gen-btn');
    const btnText = document.getElementById('ai-gen-btn-text');
    btn.disabled  = true;
    btnText.innerText = '🔄 AI 出題中...';
    document.getElementById('gen-result-box').classList.add('hidden');

    try {
        const cat         = document.getElementById('gen-category-select').value;
        const count       = document.getElementById('gen-count-select').value;
        const instruction = document.getElementById('gen-instruction-input').value.trim();

        // 取得現有題庫作為知識基礎
        const allQ = qManager.getAll();
        const refQ = cat === 'all' ? allQ : allQ.filter(q => q.category === cat);
        const knowledgeSample = refQ.slice(0, 15).map(q =>
            `題目：${q.questionText}\n正確答案：${q.options?.find(o => o.id === q.correctOptionId)?.text || ''}`
        ).join('\n---\n');

        const systemPrompt = `你是一位出色的統計學出題老師。根據提供的知識範圍，出全新的練習題。
請嚴格輸出以下JSON陣列格式，不要有任何其他文字、不要有markdown代碼塊：
[
  {
    "category": "分類名稱",
    "questionText": "完整題目文字（不要與原題目相同，要是全新的）",
    "options": [
      {"id": "opt_a", "text": "A. 選項"},
      {"id": "opt_b", "text": "B. 選項"},
      {"id": "opt_c", "text": "C. 選項"},
      {"id": "opt_d", "text": "D. 選項"}
    ],
    "correctOptionId": "opt_x",
    "explanation": "詳細解析"
  }
]`;

        const userMsg = `根據以下知識範圍，出 ${count} 道全新的選擇題：
${instruction ? `出題要求：${instruction}` : ''}
分類：${cat === 'all' ? '全部統計學範圍' : cat}

參考知識範圍（僅供參考，請出全新題目，不要重複）：
${knowledgeSample || '統計學基本概念'}`;

        const raw = await callAI([{ role: 'user', content: userMsg }], 4000, systemPrompt);

        let jsonStr = raw.trim()
            .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
        const si = jsonStr.indexOf('['), ei = jsonStr.lastIndexOf(']');
        if (si !== -1 && ei !== -1) jsonStr = jsonStr.slice(si, ei + 1);

        generatedQuestions = JSON.parse(jsonStr);
        renderGeneratedQuestions(generatedQuestions);

    } catch(e) {
        alert('出題失敗：' + e.message);
        console.error(e);
    }

    btn.disabled = false;
    btnText.innerText = 'AI 開始出題';
}

function renderGeneratedQuestions(questions) {
    const box  = document.getElementById('gen-result-box');
    const list = document.getElementById('gen-result-list');

    list.innerHTML = questions.map((q, i) => `
        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3" id="gen-q-${i}">
            <div class="flex items-center justify-between">
                <span class="text-xs bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-0.5 rounded-full font-bold">✨ AI 新題 ${i+1}</span>
                <span class="text-xs text-slate-400 font-semibold">${q.category || ''}</span>
            </div>
            <p class="font-bold text-slate-800 text-sm leading-relaxed">${q.questionText}</p>
            <div class="space-y-2" id="gen-opts-${i}">
                ${(q.options || []).map(o => `
                    <button onclick="selectGenOption(${i}, '${o.id}')"
                        data-opt="${o.id}"
                        class="gen-opt-btn w-full text-left text-sm px-4 py-2.5 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 text-slate-700 transition font-medium">
                        ${o.text}
                    </button>`).join('')}
            </div>
            <div id="gen-feedback-${i}" class="hidden p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed"></div>
        </div>
    `).join('');

    box.classList.remove('hidden');
}

function selectGenOption(qIdx, selectedOptId) {
    const q = generatedQuestions[qIdx];
    if (!q) return;

    const btns = document.querySelectorAll(`#gen-opts-${qIdx} .gen-opt-btn`);
    btns.forEach(btn => {
        const bOpt = btn.getAttribute('data-opt');
        if (bOpt === q.correctOptionId) {
            btn.className = 'gen-opt-btn w-full text-left text-sm px-4 py-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-800 font-bold transition';
        } else if (bOpt === selectedOptId) {
            btn.className = 'gen-opt-btn w-full text-left text-sm px-4 py-2.5 rounded-xl border-2 border-red-400 bg-red-50 text-red-800 font-bold transition';
        } else {
            btn.className = 'gen-opt-btn w-full text-left text-sm px-4 py-2.5 rounded-xl border border-slate-100 text-slate-300 transition opacity-60';
        }
        btn.disabled = true;
    });

    const fb = document.getElementById(`gen-feedback-${qIdx}`);
    const isCorrect = selectedOptId === q.correctOptionId;
    fb.innerHTML = `<span class="font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}">${isCorrect ? '✅ 答對了！' : '❌ 答錯了'}</span>　${q.explanation || ''}`;
    fb.classList.remove('hidden');
}

function confirmGenerateAll() {
    if (!generatedQuestions.length) return;
    generatedQuestions.forEach(q => {
        qManager.saveQuestion({
            category:        q.category || '未分類',
            questionText:    q.questionText,
            options:         q.options,
            correctOptionId: q.correctOptionId,
            explanation:     q.explanation || '',
            image:           null
        });
    });
    alert(`✅ 已成功加入 ${generatedQuestions.length} 道 AI 生成題目到題庫！`);
    generatedQuestions = [];
    document.getElementById('gen-result-box').classList.add('hidden');
    switchTab('questions');
}

// ── 8.6 初始化 AI 相關 UI 事件 ────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // 載入已儲存的 API Key
    loadAiSettings();

    // 圖片上傳（AI 匯入）
    const importDropzone = document.getElementById('import-image-dropzone');
    const importFileInput = document.getElementById('import-image-file');

    if (importDropzone) {
        importDropzone.addEventListener('click', () => importFileInput.click());
        importDropzone.addEventListener('dragover', e => { e.preventDefault(); importDropzone.classList.add('border-primary-400'); });
        importDropzone.addEventListener('dragleave', () => importDropzone.classList.remove('border-primary-400'));
        importDropzone.addEventListener('drop', e => {
            e.preventDefault();
            importDropzone.classList.remove('border-primary-400');
            if (e.dataTransfer.files[0]) handleImportImage(e.dataTransfer.files[0]);
        });
    }

    if (importFileInput) {
        importFileInput.addEventListener('change', e => {
            if (e.target.files[0]) handleImportImage(e.target.files[0]);
        });
    }

    // 聊天輸入框 Enter 送出（Shift+Enter 換行）
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
        });
    }

    // 匯入頁分類下拉選單填入
    const importCatSel = document.getElementById('import-category-input');
    if (importCatSel) {
        qManager.getCategories().forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.text = c;
            importCatSel.appendChild(opt);
        });
    }
});

// switchTab 擴充：進入 AI 頁面時更新下拉選單
const _origSwitchTab = switchTab;
// Monkey-patch switchTab to also handle AI tabs
const switchTabOrig = switchTab;
window.switchTab = function(tabId) {
    switchTabOrig(tabId);
    if (tabId === 'ai-generate') {
        const sel = document.getElementById('gen-category-select');
        if (sel) {
            sel.innerHTML = '<option value="all">根據全部題庫</option>';
            qManager.getCategories().forEach(c => {
                const opt = document.createElement('option');
                opt.value = c; opt.text = c;
                sel.appendChild(opt);
            });
        }
    }
    if (tabId === 'ai-import') {
        const sel = document.getElementById('import-category-input');
        if (sel) {
            sel.innerHTML = '<option value="">自動偵測分類</option>';
            qManager.getCategories().forEach(c => {
                const opt = document.createElement('option');
                opt.value = c; opt.text = c;
                sel.appendChild(opt);
            });
        }
    }
    if (tabId === 'ai-settings') {
        loadAiSettings();
    }
};

function handleImportImage(file) {
    if (!file.type.startsWith('image/')) { alert('請選擇圖片檔案！'); return; }
    const reader = new FileReader();
    reader.onload = e => {
        const base64Full = e.target.result;
        importImageBase64 = base64Full.split(',')[1];
        const preview = document.getElementById('import-image-preview');
        preview.src = base64Full;
        document.getElementById('import-image-preview-box').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

// ==========================================================================
// 9. 知識解析瀏覽
// ==========================================================================

let knowledgeActiveCat = 'all';

function renderKnowledge() {
    const search = (document.getElementById('knowledge-search')?.value || '').toLowerCase();
    const all = qManager.getAll();
    const cats = ['all', ...qManager.getCategories()];

    // 分類 tabs
    const tabsEl = document.getElementById('knowledge-category-tabs');
    if (tabsEl) {
        tabsEl.innerHTML = cats.map(c => `
            <button onclick="setKnowledgeCat('${c}')"
                class="px-4 py-1.5 rounded-full text-xs font-bold border transition
                ${knowledgeActiveCat === c ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'}">
                ${c === 'all' ? '📚 全部' : c}
            </button>`).join('');
    }

    const filtered = all.filter(q => {
        const matchCat = knowledgeActiveCat === 'all' || q.category === knowledgeActiveCat;
        const matchSearch = !search ||
            q.questionText.toLowerCase().includes(search) ||
            (q.explanation || '').toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    const listEl = document.getElementById('knowledge-list');
    if (!listEl) return;

    if (!filtered.length) {
        listEl.innerHTML = `<div class="text-center py-16 text-slate-400">
            <svg class="w-12 h-12 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p>找不到相關內容</p></div>`;
        return;
    }

    // Group by category
    const groups = {};
    filtered.forEach(q => {
        const cat = q.category || '未分類';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(q);
    });

    listEl.innerHTML = Object.entries(groups).map(([cat, qs]) => `
        <div class="space-y-3">
            <h3 class="font-extrabold text-slate-700 flex items-center space-x-2">
                <span class="w-1.5 h-6 bg-primary-500 rounded-full block"></span>
                <span>${cat}</span>
                <span class="text-xs font-normal text-slate-400">${qs.length} 題</span>
            </h3>
            ${qs.map(q => `
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <button onclick="toggleKnowledge('k-${q.id}')" class="w-full text-left px-5 py-4 flex items-start justify-between hover:bg-slate-50 transition">
                        <p class="font-semibold text-slate-800 text-sm leading-relaxed pr-4">${q.questionText}</p>
                        <svg class="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform" id="icon-k-${q.id}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div id="k-${q.id}" class="hidden border-t border-slate-100 px-5 py-4 space-y-3 bg-slate-50">
                        <div class="space-y-1.5">
                            ${(q.options || []).map(o => `
                                <div class="flex items-center space-x-2 text-sm ${o.id === q.correctOptionId ? 'text-emerald-700 font-bold' : 'text-slate-500'}">
                                    <span class="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${o.id === q.correctOptionId ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}">${o.id === q.correctOptionId ? '✓' : '·'}</span>
                                    <span>${o.text}</span>
                                </div>`).join('')}
                        </div>
                        ${q.explanation ? `
                        <div class="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                            <p class="font-bold text-slate-700 mb-2">💡 詳細解析</p>
                            ${q.explanation}
                        </div>` : ''}
                    </div>
                </div>`).join('')}
        </div>`).join('');
}

function setKnowledgeCat(cat) {
    knowledgeActiveCat = cat;
    renderKnowledge();
}

function toggleKnowledge(id) {
    const el = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    if (!el) return;
    el.classList.toggle('hidden');
    if (icon) icon.style.transform = el.classList.contains('hidden') ? '' : 'rotate(180deg)';
}

// ==========================================================================
// 10. 錯題本
// ==========================================================================

const WRONG_BOOK_KEY = 'quiz_wrong_book';

function getWrongBook() {
    try { return JSON.parse(localStorage.getItem(WRONG_BOOK_KEY)) || {}; } catch { return {}; }
}

function addToWrongBook(questionId) {
    const wb = getWrongBook();
    wb[questionId] = (wb[questionId] || 0) + 1;
    localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(wb));
}

function removeFromWrongBook(questionId) {
    const wb = getWrongBook();
    delete wb[questionId];
    localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(wb));
}

function renderWrongBook() {
    const wb = getWrongBook();
    const allQ = qManager.getAll();
    const wrongQs = allQ.filter(q => wb[q.id]);

    // Stats
    const statsEl = document.getElementById('wrong-book-stats');
    const byCategory = {};
    wrongQs.forEach(q => {
        const cat = q.category || '未分類';
        byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    if (statsEl) {
        statsEl.innerHTML = Object.entries(byCategory).map(([cat, count]) => `
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span class="text-sm font-bold text-slate-700">${cat}</span>
                <span class="text-2xl font-extrabold text-red-500">${count}</span>
            </div>`).join('') || `<div class="col-span-3 text-center text-slate-400 py-4 text-sm">目前沒有錯題！繼續加油 🎉</div>`;
    }

    const listEl = document.getElementById('wrong-book-list');
    if (!listEl) return;

    if (!wrongQs.length) {
        listEl.innerHTML = `<div class="text-center py-16 text-slate-400">
            <svg class="w-16 h-16 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="font-bold text-slate-500">錯題本是空的</p>
            <p class="text-sm mt-1">去做題目，錯題會自動收集到這裡</p></div>`;
        return;
    }

    listEl.innerHTML = wrongQs.map(q => `
        <div class="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 flex items-start justify-between">
                <div class="flex-1 pr-4">
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full font-bold">答錯 ${wb[q.id]} 次</span>
                        <span class="text-xs text-slate-400">${q.category || ''}</span>
                    </div>
                    <p class="font-semibold text-slate-800 text-sm leading-relaxed">${q.questionText}</p>
                </div>
                <button onclick="removeFromWrongBook('${q.id}'); renderWrongBook();" class="flex-shrink-0 text-slate-300 hover:text-red-400 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="border-t border-slate-100 px-5 py-3 bg-slate-50 space-y-1.5">
                ${(q.options || []).map(o => `
                    <div class="flex items-center space-x-2 text-xs ${o.id === q.correctOptionId ? 'text-emerald-700 font-bold' : 'text-slate-400'}">
                        <span class="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${o.id === q.correctOptionId ? 'bg-emerald-100' : 'bg-slate-200'}">${o.id === q.correctOptionId ? '✓' : '·'}</span>
                        <span>${o.text}</span>
                    </div>`).join('')}
                ${q.explanation ? `<p class="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200 leading-relaxed">💡 ${q.explanation.slice(0, 120)}${q.explanation.length > 120 ? '...' : ''}</p>` : ''}
            </div>
        </div>`).join('');
}

function clearWrongBook() {
    if (!confirm('確定清除所有錯題記錄？')) return;
    localStorage.removeItem(WRONG_BOOK_KEY);
    renderWrongBook();
}

function startWrongBookQuiz() {
    const wb = getWrongBook();
    const wrongIds = Object.keys(wb);
    if (!wrongIds.length) { alert('錯題本是空的，先去做題目吧！'); return; }
    // Override active questions in quiz engine with wrong questions
    const wrongQs = qManager.getAll().filter(q => wrongIds.includes(q.id));
    quizEngine.activeQuestions = wrongQs;
    quizEngine.currentIndex = 0;
    quizEngine.answers = {};
    quizEngine.startTime = Date.now();
    switchTab('quiz-active');
    renderActiveQuestion();
}

// ==========================================================================
// 11. 網頁解答器
// ==========================================================================

let solverImageBase64 = null;

function switchSolverTab(tab) {
    const textArea  = document.getElementById('solver-text-area');
    const imageArea = document.getElementById('solver-image-area');
    const textBtn   = document.getElementById('solver-tab-text');
    const imageBtn  = document.getElementById('solver-tab-image');
    if (tab === 'text') {
        textArea.classList.remove('hidden'); imageArea.classList.add('hidden');
        textBtn.className  = 'flex-1 py-2 rounded-xl text-sm font-bold bg-primary-500 text-white shadow';
        imageBtn.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 hover:bg-slate-200';
    } else {
        textArea.classList.add('hidden'); imageArea.classList.remove('hidden');
        imageBtn.className = 'flex-1 py-2 rounded-xl text-sm font-bold bg-primary-500 text-white shadow';
        textBtn.className  = 'flex-1 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 hover:bg-slate-200';
    }
}

function clearSolverImage() {
    solverImageBase64 = null;
    document.getElementById('solver-image-preview-box').classList.add('hidden');
    document.getElementById('solver-image-file').value = '';
}

async function runSolver() {
    if (!getApiKey()) { alert('請先到「AI 設定」設定 API Key！\n\n建議使用 Google Gemini（免費額度多）'); switchTab('ai-settings'); return; }
    const btn = document.getElementById('solver-btn');
    const btnText = document.getElementById('solver-btn-text');
    btn.disabled = true; btnText.innerText = '解題中...';
    document.getElementById('solver-result').classList.add('hidden');

    const subject = document.getElementById('solver-subject').value;
    const isImageMode = !document.getElementById('solver-image-area').classList.contains('hidden');

    const systemPrompt = `你是一位頂尖的${subject || '學科'}解題老師。
解題要求：
1. 先清楚寫出「題目分析」
2. 列出「解題步驟」（逐步說明，帶公式）
3. 給出「最終答案」並加框強調
4. 最後補充「相關知識點」
請用繁體中文，條理清晰，讓學生一看就懂。`;

    try {
        let messages;
        if (isImageMode && solverImageBase64) {
            messages = [{ role: 'user', content: [
                { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: solverImageBase64 } },
                { type: 'text', text: '請解答圖片中的題目，詳細說明解題步驟。' }
            ]}];
        } else {
            const text = document.getElementById('solver-input').value.trim();
            if (!text) { alert('請輸入題目！'); btn.disabled = false; btnText.innerText = '解題'; return; }
            messages = [{ role: 'user', content: `請解答以下題目：\n\n${text}` }];
        }

        const answer = await callAI(messages, 2000, systemPrompt);
        document.getElementById('solver-answer').innerText = answer;
        document.getElementById('solver-result').classList.remove('hidden');
        // 暫存供存入筆記用
        window._lastSolverAnswer = answer;
        window._lastSolverQ = isImageMode ? '[圖片題目]' : document.getElementById('solver-input').value.slice(0, 80);
    } catch(e) {
        alert('解題失敗：' + e.message);
    }

    btn.disabled = false; btnText.innerText = '解題';
}

function addSolverToNotes() {
    const title = '解答：' + (window._lastSolverQ || '題目');
    const content = window._lastSolverAnswer || '';
    openNoteEditor(title, content, '解題記錄');
    switchTab('notes');
}

// 解答器圖片初始化（在 DOMContentLoaded 後呼叫）
function initSolverImageUpload() {
    const dropzone = document.getElementById('solver-dropzone');
    const fileInput = document.getElementById('solver-image-file');
    if (!dropzone || !fileInput) return;
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('border-primary-400'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-primary-400'));
    dropzone.addEventListener('drop', e => {
        e.preventDefault(); dropzone.classList.remove('border-primary-400');
        if (e.dataTransfer.files[0]) handleSolverImage(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', e => { if (e.target.files[0]) handleSolverImage(e.target.files[0]); });
}

function handleSolverImage(file) {
    const reader = new FileReader();
    reader.onload = e => {
        solverImageBase64 = e.target.result.split(',')[1];
        document.getElementById('solver-image-preview').src = e.target.result;
        document.getElementById('solver-image-preview-box').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

// ==========================================================================
// 12. 學習成效分析（雷達圖 + 趨勢圖 + 匯出）
// ==========================================================================

function renderStats() {
    const history = qManager.history;
    const wb = getWrongBook();
    const allQ = qManager.getAll();

    // 總覽數字
    const totalDone = history.reduce((s, h) => s + (h.total || 0), 0);
    const avgScore  = history.length ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / history.length) : 0;
    const wrongCount = Object.keys(wb).length;
    const streak = calcStreak(history);

    document.getElementById('stats-total-done').innerText  = totalDone;
    document.getElementById('stats-avg-score').innerText   = avgScore + '%';
    document.getElementById('stats-wrong-count').innerText = wrongCount;
    document.getElementById('stats-streak').innerText      = streak;

    // 各分類正確率
    const catStats = {};
    history.forEach(h => {
        if (!h.categoryStats) return;
        Object.entries(h.categoryStats).forEach(([cat, s]) => {
            if (!catStats[cat]) catStats[cat] = { correct: 0, total: 0 };
            catStats[cat].correct += s.correct || 0;
            catStats[cat].total   += s.total   || 0;
        });
    });

    const barsEl = document.getElementById('stats-category-bars');
    if (barsEl) {
        if (!Object.keys(catStats).length) {
            barsEl.innerHTML = '<p class="text-sm text-slate-400 text-center py-8">尚無測驗記錄</p>';
        } else {
            barsEl.innerHTML = Object.entries(catStats).map(([cat, s]) => {
                const pct = s.total ? Math.round(s.correct / s.total * 100) : 0;
                const color = pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500';
                return `
                <div class="space-y-1">
                    <div class="flex justify-between text-xs font-semibold text-slate-600">
                        <span>${cat}</span><span>${pct}% (${s.correct}/${s.total})</span>
                    </div>
                    <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div class="${color} h-full rounded-full transition-all duration-700" style="width:${pct}%"></div>
                    </div>
                </div>`;
            }).join('');
        }
    }

    drawRadarChart(catStats);
    drawTrendChart(history);
}

function calcStreak(history) {
    if (!history.length) return 0;
    const days = [...new Set(history.map(h => h.date ? h.date.split(' ')[0] : ''))].filter(Boolean).sort().reverse();
    let streak = 0;
    const today = new Date().toLocaleDateString('zh-TW');
    for (let i = 0; i < days.length; i++) {
        const d = new Date(days[i]);
        const expected = new Date(); expected.setDate(expected.getDate() - i);
        if (Math.abs(d - expected) < 86400000) streak++;
        else break;
    }
    return streak;
}

function drawRadarChart(catStats) {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, r = Math.min(W, H) * 0.38;

    ctx.clearRect(0, 0, W, H);
    const cats = Object.keys(catStats);
    if (!cats.length) {
        ctx.fillStyle = '#94a3b8'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('尚無測驗資料', cx, cy); return;
    }

    const n = cats.length;
    const angleStep = (2 * Math.PI) / n;

    // Draw grid
    for (let level = 1; level <= 5; level++) {
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = cx + r * (level / 5) * Math.cos(angle);
            const y = cy + r * (level / 5) * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
        // Labels
        const lx = cx + (r + 24) * Math.cos(angle);
        const ly = cy + (r + 24) * Math.sin(angle);
        ctx.fillStyle = '#475569'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        const shortCat = cats[i].replace('統計第', 'Ch').replace('章', '');
        ctx.fillText(shortCat, lx, ly + 4);
    }

    // Draw data polygon
    ctx.beginPath();
    cats.forEach((cat, i) => {
        const s = catStats[cat];
        const pct = s.total ? s.correct / s.total : 0;
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * pct * Math.cos(angle);
        const y = cy + r * pct * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(14,165,233,0.2)'; ctx.fill();
    ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2; ctx.stroke();
}

function drawTrendChart(history) {
    const canvas = document.getElementById('trend-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const data = history.slice(-10).map(h => ({ score: h.score || 0, label: h.date ? h.date.split(' ')[0].slice(5) : '' }));
    if (data.length < 2) {
        ctx.fillStyle = '#94a3b8'; ctx.font = '14px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('至少需要 2 次測驗記錄', W/2, H/2); return;
    }

    const pad = { t: 20, b: 40, l: 40, r: 20 };
    const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
    const xStep = gW / (data.length - 1);

    // Grid lines
    [0, 25, 50, 75, 100].forEach(v => {
        const y = pad.t + gH * (1 - v / 100);
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + gW, y);
        ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(v + '%', pad.l - 5, y + 4);
    });

    // Line
    ctx.beginPath();
    data.forEach((d, i) => {
        const x = pad.l + i * xStep;
        const y = pad.t + gH * (1 - d.score / 100);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#0ea5e9'; ctx.lineWidth = 2.5; ctx.stroke();

    // Fill under line
    ctx.beginPath();
    data.forEach((d, i) => {
        const x = pad.l + i * xStep;
        const y = pad.t + gH * (1 - d.score / 100);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.l + (data.length - 1) * xStep, pad.t + gH);
    ctx.lineTo(pad.l, pad.t + gH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(14,165,233,0.1)'; ctx.fill();

    // Points + labels
    data.forEach((d, i) => {
        const x = pad.l + i * xStep;
        const y = pad.t + gH * (1 - d.score / 100);
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#0ea5e9'; ctx.fill();
        ctx.fillStyle = '#334155'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(d.score + '%', x, y - 10);
        ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif';
        ctx.fillText(d.label, x, pad.t + gH + 18);
    });
}

function exportPDF() {
    const printWin = window.open('', '_blank');
    const history = qManager.history;
    const wb = getWrongBook();
    const allQ = qManager.getAll();
    const wrongQs = allQ.filter(q => wb[q.id]);
    const avgScore = history.length ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / history.length) : 0;

    printWin.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>學習成效報告</title>
<style>body{font-family:sans-serif;padding:40px;color:#1e293b;} h1{color:#0284c7;} h2{color:#334155;border-bottom:2px solid #e2e8f0;padding-bottom:8px;} table{width:100%;border-collapse:collapse;} td,th{border:1px solid #e2e8f0;padding:8px;text-align:left;font-size:13px;} th{background:#f8fafc;} .score{font-size:2em;font-weight:900;color:#0284c7;}</style>
</head><body>
<h1>📊 學習成效報告</h1>
<p>生成時間：${new Date().toLocaleString('zh-TW')}</p>
<div class="score">平均分數：${avgScore}%</div>
<h2>測驗歷史（最近 10 次）</h2>
<table><tr><th>日期</th><th>分類</th><th>分數</th><th>錯題數</th><th>耗時</th></tr>
${history.slice(-10).map(h => `<tr><td>${h.date}</td><td>${h.category}</td><td>${h.score}%</td><td>${h.incorrectCount}</td><td>${h.timeSpent}</td></tr>`).join('')}
</table>
<h2>錯題清單（${wrongQs.length} 題）</h2>
${wrongQs.map((q, i) => `<p><b>${i+1}. ${q.questionText}</b><br><small>✓ ${q.options?.find(o => o.id === q.correctOptionId)?.text || ''}</small></p>`).join('')}
</body></html>`);
    printWin.document.close();
    printWin.print();
}

function exportMarkdown() {
    const history = qManager.history;
    const wb = getWrongBook();
    const allQ = qManager.getAll();
    const wrongQs = allQ.filter(q => wb[q.id]);
    const avgScore = history.length ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / history.length) : 0;

    let md = `# 📊 學習成效報告\n\n生成時間：${new Date().toLocaleString('zh-TW')}\n\n## 總覽\n\n- 平均分數：**${avgScore}%**\n- 測驗次數：${history.length}\n- 錯題累積：${Object.keys(wb).length} 題\n\n## 測驗歷史\n\n| 日期 | 分類 | 分數 | 錯題 |\n|------|------|------|------|\n`;
    history.slice(-20).forEach(h => { md += `| ${h.date} | ${h.category} | ${h.score}% | ${h.incorrectCount} |\n`; });
    md += `\n## 錯題清單\n\n`;
    wrongQs.forEach((q, i) => {
        const ans = q.options?.find(o => o.id === q.correctOptionId)?.text || '';
        md += `### ${i+1}. ${q.questionText}\n\n**正確答案：** ${ans}\n\n${q.explanation ? `> ${q.explanation.slice(0, 200)}\n\n` : ''}`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `學習成效報告_${new Date().toLocaleDateString('zh-TW').replace(/\//g, '-')}.md`;
    a.click();
}

// ==========================================================================
// 13. 學習筆記
// ==========================================================================

const NOTES_KEY = 'quiz_notes';
let editingNoteId = null;

function getNotes() {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || []; } catch { return []; }
}
function saveNotes(notes) { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }

function openNoteEditor(title = '', content = '', tag = '') {
    document.getElementById('note-title-input').value   = title;
    document.getElementById('note-content-input').value = content;
    const tagSel = document.getElementById('note-tag-input');
    if (tag && tagSel) {
        // Add tag option if not exist
        if (![...tagSel.options].some(o => o.value === tag)) {
            const opt = document.createElement('option'); opt.value = tag; opt.text = tag;
            tagSel.appendChild(opt);
        }
        tagSel.value = tag;
    }
    editingNoteId = null;
    document.getElementById('note-editor').classList.remove('hidden');
    document.getElementById('note-title-input').focus();
}

function closeNoteEditor() {
    document.getElementById('note-editor').classList.add('hidden');
    editingNoteId = null;
}

function saveNote() {
    const title   = document.getElementById('note-title-input').value.trim();
    const content = document.getElementById('note-content-input').value.trim();
    const tag     = document.getElementById('note-tag-input').value;
    if (!title && !content) { alert('請輸入筆記內容！'); return; }

    const notes = getNotes();
    if (editingNoteId) {
        const idx = notes.findIndex(n => n.id === editingNoteId);
        if (idx !== -1) { notes[idx] = { ...notes[idx], title, content, tag, updatedAt: new Date().toLocaleString('zh-TW') }; }
    } else {
        notes.unshift({ id: 'note_' + Date.now(), title: title || '無標題', content, tag, createdAt: new Date().toLocaleString('zh-TW'), updatedAt: new Date().toLocaleString('zh-TW') });
    }
    saveNotes(notes);
    closeNoteEditor();
    renderNotes();
}

function editNote(id) {
    const note = getNotes().find(n => n.id === id);
    if (!note) return;
    editingNoteId = id;
    document.getElementById('note-title-input').value   = note.title;
    document.getElementById('note-content-input').value = note.content;
    const tagSel = document.getElementById('note-tag-input');
    if (tagSel) tagSel.value = note.tag || '';
    document.getElementById('note-editor').classList.remove('hidden');
    document.getElementById('note-title-input').focus();
}

function deleteNote(id) {
    if (!confirm('確定刪除此筆記？')) return;
    saveNotes(getNotes().filter(n => n.id !== id));
    renderNotes();
}

function renderNotes() {
    const search = (document.getElementById('notes-search')?.value || '').toLowerCase();
    const filterTag = document.getElementById('notes-filter-tag')?.value || '';
    const notes = getNotes();

    // Update tag dropdowns
    const allTags = [...new Set(notes.map(n => n.tag).filter(Boolean))];
    ['note-tag-input', 'notes-filter-tag'].forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const curVal = sel.value;
        const isFilter = selId === 'notes-filter-tag';
        sel.innerHTML = isFilter ? '<option value="">全部標籤</option>' : '<option value="">無標籤</option>';
        allTags.forEach(t => {
            const opt = document.createElement('option'); opt.value = t; opt.text = t;
            sel.appendChild(opt);
        });
        sel.value = curVal;
    });

    const filtered = notes.filter(n => {
        const matchSearch = !search || n.title.toLowerCase().includes(search) || n.content.toLowerCase().includes(search);
        const matchTag = !filterTag || n.tag === filterTag;
        return matchSearch && matchTag;
    });

    const listEl = document.getElementById('notes-list');
    if (!listEl) return;

    if (!filtered.length) {
        listEl.innerHTML = `<div class="text-center py-16 text-slate-400">
            <svg class="w-12 h-12 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <p>${notes.length ? '找不到符合的筆記' : '還沒有任何筆記，新增第一則吧！'}</p></div>`;
        return;
    }

    listEl.innerHTML = filtered.map(n => `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="px-5 py-4 flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                        <h4 class="font-bold text-slate-800 text-sm">${n.title}</h4>
                        ${n.tag ? `<span class="text-[10px] bg-primary-50 text-primary-600 border border-primary-100 px-2 py-0.5 rounded-full font-bold">${n.tag}</span>` : ''}
                    </div>
                    <p class="text-xs text-slate-400">${n.updatedAt}</p>
                </div>
                <div class="flex items-center space-x-1 flex-shrink-0">
                    <button onclick="editNote('${n.id}')" class="p-2 text-slate-400 hover:text-primary-500 transition rounded-lg hover:bg-primary-50">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onclick="deleteNote('${n.id}')" class="p-2 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-red-50">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>
            <div class="border-t border-slate-100 px-5 py-3 bg-slate-50">
                <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">${n.content.slice(0, 300)}${n.content.length > 300 ? '...' : ''}</p>
            </div>
        </div>`).join('');
}

function exportNotesMarkdown() {
    const notes = getNotes();
    if (!notes.length) { alert('沒有任何筆記！'); return; }
    let md = `# 📝 學習筆記\n\n匯出時間：${new Date().toLocaleString('zh-TW')}\n\n---\n\n`;
    notes.forEach(n => {
        md += `## ${n.title}\n`;
        if (n.tag) md += `**標籤：** ${n.tag}  \n`;
        md += `**更新：** ${n.updatedAt}\n\n${n.content}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `學習筆記_${new Date().toLocaleDateString('zh-TW').replace(/\//g, '-')}.md`;
    a.click();
}

// ==========================================================================
// 14. 整合：作答結果加入錯題本 + switchTab 擴充
// ==========================================================================

// 擴充 switchTab：進入新頁面時初始化
const _aiSwitchTab = window.switchTab;
window.switchTab = function(tabId) {
    _aiSwitchTab(tabId);
    if (tabId === 'knowledge')   renderKnowledge();
    if (tabId === 'wrong-book')  renderWrongBook();
    if (tabId === 'stats')       renderStats();
    if (tabId === 'notes')       renderNotes();
};

// 擴充 DOMContentLoaded：初始化新功能
document.addEventListener('DOMContentLoaded', () => {
    initSolverImageUpload();
});
