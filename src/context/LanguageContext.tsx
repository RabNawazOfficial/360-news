import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LanguageCode = 'en' | 'hi' | 'fr' | 'ar' | 'zh' | 'ja' | 'ko';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {}, // English keys are default
  hi: {
    "Feed": "फ़ीड",
    "Trending": "ट्रेंडिंग",
    "Bookmarks": "बुकमार्क",
    "Categories": "श्रेणियाँ",
    "World": "विश्व",
    "Politics": "राजनीति",
    "Technology": "प्रौद्योगिकी",
    "Business": "व्यापार",
    "Science": "विज्ञान",
    "Health": "स्वास्थ्य",
    "Sports": "खेल",
    "World News": "अंतरराष्ट्रीय समाचार",
    "Fact Checked": "तथ्य जाँचे गए",
    "Trust Score": "विश्वसनीयता स्कोर",
    "Facts": "तथ्य",
    "Progressive View": "प्रगतिशील दृष्टिकोण",
    "Conservative View": "रूढ़िवादी दृष्टिकोण",
    "Source Headline Comparison": "स्रोत सुर्खी तुलना",
    "Story Timeline": "कहानी की समयरेखा",
    "AI Metadata Analysis": "एआई मेटाडेटा विश्लेषण",
    "AI Confidence Score": "एआई आत्मविश्वास स्कोर",
    "Bias Deviation": "पूर्वाग्रह विचलन",
    "Source Diversity Score": "स्रोत विविधता स्कोर",
    "Saved for Later": "बाद के लिए सहेजें",
    "AI Recommendations": "एआई सिफारिशें",
    "Daily Bias Meter": "दैनिक पूर्वाग्रह मीटर",
    "Perfect Balance": "सही संतुलन",
    "Trending Topics": "ट्रेंडिंग विषय",
    "Fact Check Center": "तथ्य जाँच केंद्र",
    "Search news and viewpoints...": "समाचार और दृष्टिकोण खोजें...",
    "Search news, facts, perspectives...": "समाचार, तथ्य, दृष्टिकोण खोजें...",
    "Filter by Category": "श्रेणी के अनुसार फ़िल्टर करें",
    "All News": "सभी समाचार",
    "Recent Searches": "हाल की खोजें",
    "Trending Right Now": "अभी ट्रेंडिंग में",
    "Search Results": "खोज परिणाम",
    "All Categories": "सभी श्रेणियां",
    "Home": "होम",
    "Category": "श्रेणी",
    "Factual Base Analysis": "तथ्यात्मक आधार विश्लेषण",
    "Left-Leaning Media Framing": "वामपंथी मीडिया फ्रेमिंग",
    "Right-Leaning Media Framing": "दक्षिणपंथी मीडिया फ्रेमिंग",
    "Compare framing & trust rankings": "फ्रेमिंग और विश्वसनीयता रैंकिंग की तुलना करें",
    "Chronological sequence of events": "घटनाओं का कालानुक्रमिक क्रम",
    "Accuracy score based on cross-referenced sources.": "क्रॉस-रेफरेंस किए गए स्रोतों के आधार पर सटीकता स्कोर।",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "कच्ची रिपोर्टिंग में पाए गए व्यक्तिगत विचारों की भाषा का प्रतिशत। कम होना बेहतर है।",
    "Scored on the variety of global news networks aggregated.": "एकत्रित किए गए वैश्विक समाचार नेटवर्कों की विविधता पर आधारित स्कोर।",
    "No stories match your criteria": "आपकी आवश्यकताओं से मेल खाने वाली कोई कहानी नहीं मिली",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "360 News का पता लगाने के लिए अपने खोज फ़िल्टर साफ़ करने, श्रेणियों को बदलने या बुकमार्क बदलने का प्रयास करें।",
    "Reset All Filters": "सभी फ़िल्टर रीसेट करें",
    "Factual • Balanced • Swift": "तथ्यात्मक • संतुलित • तीव्र",
    "No bookmarks saved yet.": "अभी तक कोई बुकमार्क सहेजा नहीं गया है।",
    "You read perspective A and B equally today. Keep it up!": "आपने आज दृष्टिकोण A और B को समान रूप से पढ़ा। इसे जारी रखें!",
    "Esc": "Esc",
    "Fact Check": "तथ्य जाँच",
    "Link Copied!": "लिंक कॉपी हो गया!"
  },
  fr: {
    "Feed": "Fil d'actualité",
    "Trending": "Tendances",
    "Bookmarks": "Signets",
    "Categories": "Catégories",
    "World": "Monde",
    "Politics": "Politique",
    "Technology": "Technologie",
    "Business": "Affaires",
    "Science": "Science",
    "Health": "Santé",
    "Sports": "Sports",
    "World News": "Actualités Mondiales",
    "Fact Checked": "Faits Vérifiés",
    "Trust Score": "Score de confiance",
    "Facts": "Faits",
    "Progressive View": "Vue progressiste",
    "Conservative View": "Vue conservatrice",
    "Source Headline Comparison": "Comparaison des titres des sources",
    "Story Timeline": "Chronologie de l'histoire",
    "AI Metadata Analysis": "Analyse des métadonnées IA",
    "AI Confidence Score": "Score de confiance de l'IA",
    "Bias Deviation": "Déviation de biais",
    "Source Diversity Score": "Score de diversité des sources",
    "Saved for Later": "Enregistré pour plus tard",
    "AI Recommendations": "Recommandations de l'IA",
    "Daily Bias Meter": "Biaisomètre quotidien",
    "Perfect Balance": "Équilibre parfait",
    "Trending Topics": "Sujets tendance",
    "Fact Check Center": "Centre de vérification",
    "Search news and viewpoints...": "Rechercher des actualités et points de vue...",
    "Search news, facts, perspectives...": "Rechercher des actualités, faits, perspectives...",
    "Filter by Category": "Filtrer par catégorie",
    "All News": "Toutes les actualités",
    "Recent Searches": "Recherches récentes",
    "Trending Right Now": "Tendances actuelles",
    "Search Results": "Résultats de recherche",
    "All Categories": "Toutes les catégories",
    "Home": "Accueil",
    "Category": "Catégorie",
    "Factual Base Analysis": "Analyse factuelle de base",
    "Left-Leaning Media Framing": "Cadrage des médias orientés à gauche",
    "Right-Leaning Media Framing": "Cadrage des médias orientés à droite",
    "Compare framing & trust rankings": "Comparer le cadrage et les classements de confiance",
    "Chronological sequence of events": "Séquence chronologique des événements",
    "Accuracy score based on cross-referenced sources.": "Score de précision basé sur des sources croisées.",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "Pourcentage de langage subjectif détecté dans les reportages bruts. Plus bas signifie plus neutre.",
    "Scored on the variety of global news networks aggregated.": "Évalué sur la variété des réseaux d'information mondiaux agrégés.",
    "No stories match your criteria": "Aucun article ne correspond à vos critères",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "Essayez d'effacer vos filtres de recherche, de changer de catégorie ou de signets pour explorer 360 News.",
    "Reset All Filters": "Réinitialiser tous les filtres",
    "Factual • Balanced • Swift": "Factuel • Équilibré • Rapide",
    "No bookmarks saved yet.": "Aucun signet enregistré pour le moment.",
    "You read perspective A and B equally today. Keep it up!": "Vous avez lu les perspectives A et B équitablement aujourd'hui. Continuez comme ça !",
    "Esc": "Échap",
    "Fact Check": "Vérification des faits",
    "Link Copied!": "Lien copié !"
  },
  ar: {
    "Feed": "الخلاصة",
    "Trending": "الشائع",
    "Bookmarks": "الإشارات المرجعية",
    "Categories": "الفئات",
    "World": "العالم",
    "Politics": "السياسة",
    "Technology": "التكنولوجيا",
    "Business": "الأعمال",
    "Science": "العلوم",
    "Health": "الصحة",
    "Sports": "الرياضة",
    "World News": "أخبار العالم",
    "Fact Checked": "تم التحقق من الحقائق",
    "Trust Score": "درجة الثقة",
    "Facts": "الحقائق",
    "Progressive View": "وجهة نظر تقدمية",
    "Conservative View": "وجهة نظر محافظة",
    "Source Headline Comparison": "مقارنة عناوين المصادر",
    "Story Timeline": "الجدول الزمني للقصة",
    "AI Metadata Analysis": "تحليل البيانات الوصفية بالذكاء الاصطناعي",
    "AI Confidence Score": "درجة ثقة الذكاء الاصطناعي",
    "Bias Deviation": "الانحراف والانحياز",
    "Source Diversity Score": "درجة تنوع المصادر",
    "Saved for Later": "محفوظة لاحقاً",
    "AI Recommendations": "توصيات الذكاء الاصطناعي",
    "Daily Bias Meter": "مقياس الانحياز اليومي",
    "Perfect Balance": "توازن مثالي",
    "Trending Topics": "المواضيع الشائعة",
    "Fact Check Center": "مركز التحقق من الحقائق",
    "Search news and viewpoints...": "البحث عن الأخبار ووجهات النظر...",
    "Search news, facts, perspectives...": "البحث عن الأخبار والحقائق ووجهات النظر...",
    "Filter by Category": "تصفية حسب الفئة",
    "All News": "كل الأخبار",
    "Recent Searches": "عمليات البحث الأخيرة",
    "Trending Right Now": "شائع الآن",
    "Search Results": "نتائج البحث",
    "All Categories": "جميع الفئات",
    "Home": "الرئيسية",
    "Category": "الفئة",
    "Factual Base Analysis": "تحليل القاعدة الفكرية القائم على الحقائق",
    "Left-Leaning Media Framing": "تأطير إعلامي يساري الهوى",
    "Right-Leaning Media Framing": "تأطير إعلامي يميني الهوى",
    "Compare framing & trust rankings": "مقارنة التأطير وتصنيفات الثقة",
    "Chronological sequence of events": "التسلسل الزمني للأحداث",
    "Accuracy score based on cross-referenced sources.": "درجة الدقة بناءً على المصادر المرجعية المتقاطعة.",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "نسبة اللغة التي تحمل رأياً شخصياً والمكتشفة في التقارير الخام. الأقل يعني أكثر موضوعية.",
    "Scored on the variety of global news networks aggregated.": "يتم احتساب الدرجة بناءً على تنوع شبكات الأخبار العالمية المجمعة.",
    "No stories match your criteria": "لا توجد قصص تطابق معاييرك",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "حاول مسح فلاتر البحث أو تغيير الفئات أو الإشارات المرجعية لاستكشاف أخبار 360.",
    "Reset All Filters": "إعادة ضبط جميع الفلاتر",
    "Factual • Balanced • Swift": "واقعي • متوازن • سريع",
    "No bookmarks saved yet.": "لم يتم حفظ أي إشارات مرجعية بعد.",
    "You read perspective A and B equally today. Keep it up!": "لقد قرأت وجهتي النظر أ و ب بالتساوي اليوم. استمر في ذلك!",
    "Esc": "خروج",
    "Fact Check": "التحقق من الحقائق",
    "Link Copied!": "تم نسخ الرابط!"
  },
  zh: {
    "Feed": "动态",
    "Trending": "热门",
    "Bookmarks": "书签",
    "Categories": "分类",
    "World": "国际",
    "Politics": "政治",
    "Technology": "科技",
    "Business": "商业",
    "Science": "科学",
    "Health": "健康",
    "Sports": "体育",
    "World News": "世界新闻",
    "Fact Checked": "事实已核实",
    "Trust Score": "信任度得分",
    "Facts": "事实",
    "Progressive View": "进步派观点",
    "Conservative View": "保守派观点",
    "Source Headline Comparison": "媒体标题对比",
    "Story Timeline": "故事时间线",
    "AI Metadata Analysis": "AI元数据分析",
    "AI Confidence Score": "AI置信度得分",
    "Bias Deviation": "偏差值",
    "Source Diversity Score": "来源多样性得分",
    "Saved for Later": "稍后阅读",
    "AI Recommendations": "AI推荐",
    "Daily Bias Meter": "每日偏差度量",
    "Perfect Balance": "完美平衡",
    "Trending Topics": "热门话题",
    "Fact Check Center": "事实核查中心",
    "Search news and viewpoints...": "搜索新闻和观点...",
    "Search news, facts, perspectives...": "搜索新闻、事实和视角...",
    "Filter by Category": "按分类筛选",
    "All News": "全部新闻",
    "Recent Searches": "最近搜索",
    "Trending Right Now": "当前热门",
    "Search Results": "搜索结果",
    "All Categories": "所有分类",
    "Home": "主页",
    "Category": "分类",
    "Factual Base Analysis": "事实基础分析",
    "Left-Leaning Media Framing": "左翼媒体叙事",
    "Right-Leaning Media Framing": "保守派媒体叙事",
    "Compare framing & trust rankings": "对比媒体立场与信任等级",
    "Chronological sequence of events": "事件发生时间顺序",
    "Accuracy score based on cross-referenced sources.": "基于交叉验证来源的准确度得分。",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "原始报道中检测到的主观表达语言百分比。数值越低越客观。",
    "Scored on the variety of global news networks aggregated.": "基于汇总的全球新闻网络多样性评分。",
    "No stories match your criteria": "没有符合您标准的故事",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "尝试清除您的搜索过滤器、更改分类或书签来探索 360 News。",
    "Reset All Filters": "重置所有过滤器",
    "Factual • Balanced • Swift": "事实 • 平衡 • 高效",
    "No bookmarks saved yet.": "暂无已保存的书签。",
    "You read perspective A and B equally today. Keep it up!": "您今天平衡地阅读了A视角和B视角，请继续保持！",
    "Esc": "Esc",
    "Fact Check": "事实核查",
    "Link Copied!": "链接已复制！"
  },
  ja: {
    "Feed": "フィード",
    "Trending": "トレンド",
    "Bookmarks": "ブックマーク",
    "Categories": "カテゴリー",
    "World": "世界",
    "Politics": "政治",
    "Technology": "テクノロジー",
    "Business": "ビジネス",
    "Science": "科学",
    "Health": "健康",
    "Sports": "スポーツ",
    "World News": "国際ニュース",
    "Fact Checked": "ファクトチェック済み",
    "Trust Score": "信頼度スコア",
    "Facts": "事実",
    "Progressive View": "革新的視点",
    "Conservative View": "保守的視点",
    "Source Headline Comparison": "情報源見出し比較",
    "Story Timeline": "ストーリータイムライン",
    "AI Metadata Analysis": "AIメタデータ分析",
    "AI Confidence Score": "AI信頼度スコア",
    "Bias Deviation": "バイアス偏差",
    "Source Diversity Score": "情報源多様性スコア",
    "Saved for Later": "後で読む",
    "AI Recommendations": "AI推奨記事",
    "Daily Bias Meter": "デイリーバイアスメーター",
    "Perfect Balance": "完璧なバランス",
    "Trending Topics": "トレンドトピック",
    "Fact Check Center": "ファクトチェックセンター",
    "Search news and viewpoints...": "ニュースや見解を検索...",
    "Search news, facts, perspectives...": "ニュース、事実、視点を検索...",
    "Filter by Category": "カテゴリーで絞り込む",
    "All News": "すべてのニュース",
    "Recent Searches": "最近の検索履歴",
    "Trending Right Now": "今トレンドの検索",
    "Search Results": "検索結果",
    "All Categories": "すべてのカテゴリー",
    "Home": "ホーム",
    "Category": "カテゴリー",
    "Factual Base Analysis": "事実に基づく基本分析",
    "Left-Leaning Media Framing": "リベラル寄りメディアの報道枠組み",
    "Right-Leaning Media Framing": "保守寄りメディアの報道枠組み",
    "Compare framing & trust rankings": "報道枠組みと信頼度ランキングの比較",
    "Chronological sequence of events": "出来事の時系列順序",
    "Accuracy score based on cross-referenced sources.": "相互参照された情報源に基づく正確性スコア。",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "生の報道で検出された主観的表現の割合。低いほど中立。",
    "Scored on the variety of global news networks aggregated.": "集約されたグローバルニュースネットワークの多様性に基づくスコア。",
    "No stories match your criteria": "条件に一致するストーリーが見つかりません",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "360 Newsを探索するには、検索フィルターのクリア、カテゴリーやブックマークの変更をお試しください。",
    "Reset All Filters": "すべてのフィルターをリセット",
    "Factual • Balanced • Swift": "事実 • バランス • 迅速",
    "No bookmarks saved yet.": "保存されたブックマークはまだありません。",
    "You read perspective A and B equally today. Keep it up!": "本日、あなたはAとBの見解を均等に読みました。その調子です！",
    "Esc": "Esc",
    "Fact Check": "事実確認",
    "Link Copied!": "リンクをコピーしました！"
  },
  ko: {
    "Feed": "피드",
    "Trending": "트렌딩",
    "Bookmarks": "북마크",
    "Categories": "카테고리",
    "World": "세계",
    "Politics": "정치",
    "Technology": "기술",
    "Business": "비즈니스",
    "Science": "과학",
    "Health": "건강",
    "Sports": "스포츠",
    "World News": "세계 뉴스",
    "Fact Checked": "팩트 체크 완료",
    "Trust Score": "신뢰도 점수",
    "Facts": "팩트",
    "Progressive View": "진보적 관점",
    "Conservative View": "보수적 관점",
    "Source Headline Comparison": "출처 헤드라인 비교",
    "Story Timeline": "스토리 타임라인",
    "AI Metadata Analysis": "AI 메타데이터 분석",
    "AI Confidence Score": "AI 신뢰도 점수",
    "Bias Deviation": "편향 편차",
    "Source Diversity Score": "출처 다양성 점수",
    "Saved for Later": "나중에 볼 보관함",
    "AI Recommendations": "AI 추천",
    "Daily Bias Meter": "일일 편향 지표",
    "Perfect Balance": "완벽한 균형",
    "Trending Topics": "인기 주제",
    "Fact Check Center": "팩트 체크 센터",
    "Search news and viewpoints...": "뉴스 및 관점 검색...",
    "Search news, facts, perspectives...": "뉴스, 팩트, 관점 검색...",
    "Filter by Category": "카테고리별 필터",
    "All News": "모든 뉴스",
    "Recent Searches": "최근 검색어",
    "Trending Right Now": "현재 실시간 트렌드",
    "Search Results": "검색 결과",
    "All Categories": "모든 카테고리",
    "Home": "홈",
    "Category": "카테고리",
    "Factual Base Analysis": "팩트 기반 분석",
    "Left-Leaning Media Framing": "진보 성향 미디어 프레임",
    "Right-Leaning Media Framing": "보수 성향 미디어 프레임",
    "Compare framing & trust rankings": "프레임 및 신뢰도 순위 비교",
    "Chronological sequence of events": "사건의 시간순 흐름",
    "Accuracy score based on cross-referenced sources.": "교차 검증된 출처 기준 정확도 점수.",
    "Percentage of opinionated language detected in raw reporting. Lower is cleaner.": "보도 내용에서 감지된 의견 개입 언어 비율. 낮을수록 중립적입니다.",
    "Scored on the variety of global news networks aggregated.": "통합된 글로벌 뉴스 네트워크의 다양성에 따른 점수.",
    "No stories match your criteria": "조건에 맞는 스토리가 없습니다",
    "Try clearing your search filters, changing categories, or bookmarks to explore 360 News.": "360 News를 더 둘러보려면 검색 필터를 지우거나 카테고리 또는 북마크를 변경해 보세요.",
    "Reset All Filters": "모든 필터 초기화",
    "Factual • Balanced • Swift": "팩트 • 균형 • 신속",
    "No bookmarks saved yet.": "저장된 북마크가 없습니다.",
    "You read perspective A and B equally today. Keep it up!": "오늘 A와 B 관점을 균형 있게 읽으셨습니다. 계속 유지해 보세요!",
    "Esc": "Esc",
    "Fact Check": "팩트 체크",
    "Link Copied!": "링크가 복사되었습니다!"
  }
};

const getHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  translateText: (text: string, targetLang: LanguageCode) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  // Sync dir and lang attributes on html element
  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    if (language === 'ar') {
      html.dir = 'rtl';
    } else {
      html.dir = 'ltr';
    }
  }, [language]);

  // Synchronous dictionary translations
  const t = useCallback((key: string): string => {
    if (language === 'en') return key;
    return translations[language]?.[key] || key;
  }, [language]);

  // Asynchronous API translations for dynamic text
  const translateText = useCallback(async (text: string, targetLang: LanguageCode): Promise<string> => {
    if (targetLang === 'en' || !text.trim()) return text;

    const textHash = getHash(text);
    const cacheKey = `tr_${targetLang}_${textHash}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;

    try {
      // Map 'zh' code to Google Translate's preferred code 'zh-CN'
      const googleLang = targetLang === 'zh' ? 'zh-CN' : targetLang;
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Translation failed");
      
      const data = await res.json();
      if (data && data[0]) {
        const translatedText = data[0].map((segment: any) => segment[0] || '').join('');
        if (translatedText) {
          localStorage.setItem(cacheKey, translatedText);
          return translatedText;
        }
      }
      return text;
    } catch (err) {
      console.warn("Failed to fetch translation from API, returning original text:", err);
      return text;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
