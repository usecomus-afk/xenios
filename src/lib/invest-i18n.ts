import { PropertyListing, Language } from './types';

export interface LocalizedPropertyContent {
  title: string;
  district: string;
  propertyType: string;
  description: string;
  highlights: string[];
  citizenshipStatus: string;
  roiEstimate: string;
}

export const INVEST_DICTIONARY: Record<string, Record<string, LocalizedPropertyContent>> = {
  "invest-1": {
    tr: {
      title: "Cihangir Sanatçılar Sokağı Tarihi Panoramik Daire",
      district: "Cihangir, Beyoğlu / İstanbul",
      propertyType: "Tarihi Daire",
      description: "İstanbul’un en popüler kültür ve sanat semti Cihangir’de, Taksim ve Karaköy’e yürüme mesafesinde, uluslararası turistlere 12 ay boyunca kesintisiz yüksek Airbnb doluluğu sunan anahtar teslim tasarım daire.",
      highlights: ["Yüksek Tavan", "Tarihi Tuğla Duvarlar", "Kısmi Boğaz & Galata Manzarası", "Eşyalı Teslim"],
      citizenshipStatus: "İkamet İznine ve Yüksek Döviz Getirisine Uygun",
      roiEstimate: "Yıllık %9 - %11 Brüt Getiri (Airbnb / Günlük Kiralama)"
    },
    en: {
      title: "Cihangir Artists' Street Historic Panoramic Flat",
      district: "Cihangir, Beyoglu / Istanbul",
      propertyType: "Historic Flat",
      description: "Located in Istanbul's most vibrant culture and arts district Cihangir, walking distance to Taksim and Karakoy, offering turnkey designer living with 12-month high Airbnb occupancy for international travelers.",
      highlights: ["High Ceilings", "Historic Exposed Brick Walls", "Partial Bosphorus & Galata Views", "Fully Furnished"],
      citizenshipStatus: "Eligible for Residence Permit & High FX Rental Income",
      roiEstimate: "Annual 9% - 11% Gross ROI (Airbnb / Short-term Rental)"
    },
    ar: {
      title: "شقة تاريخية بانورامية في زقاق الفنانين بجيهانغير",
      district: "جيهانغير، بيوغلو / إسطنبول",
      propertyType: "شقة تاريخية",
      description: "تقع في أشهر أحياء الثقافة والفنون في جيهانغير، على مسافة قريبة سيراً على الأقدام من تقسيم وكاراكوي، وتوفر عائداً استثمارياً مرتفعاً ونسبة إشغال Airbnb عالية على مدار 12 شهراً.",
      highlights: ["سقوف عالية", "جدران قرميدية تاريخية", "إطلالة جزئية على البوسفور وبرج غالاتا", "تسليم مفروش بالكامل"],
      citizenshipStatus: "مناسبة للإقامة العقارية وعائدات إيجار عالية بالعملات الأجنبية",
      roiEstimate: "عائد سنوي إجمالي 9% - 11% (تأجير يومي / Airbnb)"
    },
    ru: {
      title: "Историческая панорамная квартира на Улице Художников в Джихангире",
      district: "Джихангир, Бейоглу / Стамбул",
      propertyType: "Историческая квартира",
      description: "Расположена в самом колоритном арт-квартале Джихангир, в пешей доступности от Таксима и Каракёя. Полностью меблированная дизайнерская квартира с круглогодичной высокой загрузкой на Airbnb.",
      highlights: ["Высокие потолки", "Историческая кирпичная кладка", "Вид на Босфор и Галату", "С мебелью под ключ"],
      citizenshipStatus: "Подходит для ВНЖ и получения валютного дохода",
      roiEstimate: "Годовая доходность 9% - 11% (Airbnb / посуточная аренда)"
    },
    de: {
      title: "Historische Panorama-Wohnung in der Cihangir Künstlergasse",
      district: "Cihangir, Beyoglu / Istanbul",
      propertyType: "Historische Wohnung",
      description: "Im lebendigsten Kultur- und Kunstviertel Cihangir, fußläufig zu Taksim und Karaköy. Eine schlüsselfertige Designer-Wohnung mit ganzjährig hoher Airbnb-Auslastung für internationale Reisende.",
      highlights: ["Hohe Decken", "Historische Ziegelwände", "Teilweiser Bosporus- & Galatablick", "Voll möbliert"],
      citizenshipStatus: "Geeignet für Aufenthaltserlaubnis & Devisen-Mieteinnahmen",
      roiEstimate: "Jährlich 9% - 11% Brutto-Rendite (Airbnb-Vermietung)"
    },
    fr: {
      title: "Appartement Historique Panoramique à Cihangir",
      district: "Cihangir, Beyoglu / Istanbul",
      propertyType: "Appartement Historique",
      description: "Au cœur du quartier bohème et artistique de Cihangir, à deux pas de Taksim et Karaköy. Un appartement design clé en main avec un taux d'occupation Airbnb exceptionnel sur 12 mois.",
      highlights: ["Hauteurs sous plafond", "Briques historiques apparentes", "Vue partielle Bosphore & Galata", "Meublé clé en main"],
      citizenshipStatus: "Éligible au permis de séjour et hauts revenus locatifs en devises",
      roiEstimate: "Rendement brut annuel de 9% à 11% (Location saisonnière Airbnb)"
    }
  },
  "invest-2": {
    tr: {
      title: "Maslak Sky Towers Akıllı Rezidans 2+1",
      district: "Maslak, Sarıyer / İstanbul",
      propertyType: "Lüks Rezidans",
      description: "Maslak iş ve finans merkezinin kalbinde yer alan, uluslararası expat ve kurumsal yöneticilere anında kiralanabilir, tapusu hazır ve doğrudan ailece Türk vatandaşlığı başvurusuna uygun rezidans.",
      highlights: ["Akıllı Ev Sistemi", "Metroya Direkt Bağlantı", "Orman Manzarası", "7/24 Concierge & Heliped"],
      citizenshipStatus: "Türk Vatandaşlığına %100 Uygun ($400k+ Barajı)",
      roiEstimate: "Yıllık %6,5 Net Dolar Bazlı Kurumsal Kiracı Getirisi"
    },
    en: {
      title: "Maslak Sky Towers Smart Residence 2+1",
      district: "Maslak, Sariyer / Istanbul",
      propertyType: "Luxury Residence",
      description: "Located in the core of Maslak's financial hub, easily rentable to multinational expats, title deed ready, fully compliant for Turkish Citizenship by Investment for the whole family.",
      highlights: ["Smart Home Automation", "Direct Metro Connection", "Belgrade Forest View", "24/7 Concierge & Helipad"],
      citizenshipStatus: "100% Eligible for Turkish Citizenship ($400k+ threshold)",
      roiEstimate: "Annual 6.5% Net USD Corporate Tenant Yield"
    },
    ar: {
      title: "أبراج مسلك سكاي تاورز ريزيدنس ذكي 2+1",
      district: "مسلك، ساريير / إسطنبول",
      propertyType: "ريزيدنس فاخر",
      description: "في قلب مركز المال والأعمال بمسلك، جاهز للتأجير للشركات الدولية، الطابو جاهز ومطابق بنسبة 100% للحصول على الجنسية التركية لجميع أفراد الأسرة.",
      highlights: ["نظام المنزل الذكي", "اتصال مباشر بالمترو", "إطلالة على غابات بلغراد", "كونسيرج 24/7 ومهبط طائرات"],
      citizenshipStatus: "مطابق بنسبة 100% للحصول على الجنسية التركية (حد 400 ألف دولار)",
      roiEstimate: "عائد إيجاري مؤسسي سنوي صافي 6.5% بالدولار"
    },
    ru: {
      title: "Maslak Sky Towers Смарт-Резиденция 2+1",
      district: "Маслак, Сарыер / Стамбул",
      propertyType: "Элитная резиденция",
      description: "В сердце делового центра Маслак. Готовый тапу, мгновенная аренда корпоративным экспатам, идеальный вариант для получения гражданства Турции на всю семью.",
      highlights: ["Система 'Умный дом'", "Прямой переход к метро", "Вид на Белградский лес", "Консьерж 24/7 и вертолетная площадка"],
      citizenshipStatus: "100% подходит под программу Гражданства Турции (от $400k)",
      roiEstimate: "6.5% годовых чистой доходности в USD от корпоративной аренды"
    },
    de: {
      title: "Maslak Sky Towers Smart Residence 2+1",
      district: "Maslak, Sariyer / Istanbul",
      propertyType: "Luxusresidenz",
      description: "Im Herzen des Finanzzentrums Maslak, sofort an internationale Fachkräfte vermietbar, Grundbuch bereit und 100% qualifiziert für die türkische Staatsbürgerschaft.",
      highlights: ["Smart-Home-System", "Direkte Metro-Anbindung", "Waldpanorama", "24/7 Concierge & Hubschrauberlandeplatz"],
      citizenshipStatus: "100% qualifiziert für die türkische Staatsbürgerschaft ($400k+)",
      roiEstimate: "Jährlich 6,5% Netto-Mietrendite in USD"
    },
    fr: {
      title: "Maslak Sky Towers Résidence Intelligente 2+1",
      district: "Maslak, Sariyer / Istanbul",
      propertyType: "Résidence de Luxe",
      description: "Au cœur du centre d'affaires de Maslak, immédiatement louable aux cadres internationaux, titre de propriété prêt et éligible à la citoyenneté turque par investissement.",
      highlights: ["Domotique intelligente", "Accès direct au métro", "Vue sur la forêt de Belgrade", "Conciergerie 24/7 & Héliport"],
      citizenshipStatus: "100% éligible à la nationalité turque (seuil de 400k$+)",
      roiEstimate: "Rendement locatif net de 6,5% par an en USD"
    }
  },
  "invest-3": {
    tr: {
      title: "Levent Sapphire Aksı Panoramik Şehir Teraslı Daire",
      district: "Büyükdere Caddesi, Levent / İstanbul",
      propertyType: "Premium Rezidans",
      description: "İstanbul’un kalbi Levent’te, modern mimarisi ve sunduğu lüks sosyal olanaklarla küresel yatırımcılara yüksek sermaye değer artışı ve döviz garantili kira getirisi vadeden prestij projesi.",
      highlights: ["Özel Teras Balkon", "AVM ve Finans Merkezlerine Komşu", "Kapalı Havuz & Spa", "Hukuki Danışmanlık Dahil"],
      citizenshipStatus: "Türk Vatandaşlığına Uygun / Hukuki Danışmanlık Dahil",
      roiEstimate: "Yıllık %7 Kurumsal Expat Kira Getirisi"
    },
    en: {
      title: "Levent Sapphire Axis Panoramic City Terrace Residence",
      district: "Buyukdere Avenue, Levent / Istanbul",
      propertyType: "Premium Residence",
      description: "Located on prestigious Buyukdere Avenue in Levent, combining modern architecture and supreme amenities with high capital appreciation and FX rental return.",
      highlights: ["Private Terrace Balcony", "Direct Access to Malls & CBD", "Indoor Pool & Spa", "Full Legal Citizenship Support"],
      citizenshipStatus: "Eligible for Turkish Citizenship / Full Legal Support Included",
      roiEstimate: "Annual 7% Corporate Expat Rental Yield"
    },
    ar: {
      title: "شقة بانورامية مع تراس على محور ليفنت وسفير",
      district: "شارع بويوك ديري، ليفنت / إسطنبول",
      propertyType: "ريزيدنس بريميوم",
      description: "في قلب منطقة ليفنت المرموقة، تجمع بين الهندسة المعمارية الحديثة والمرافق الفاخرة لتوفر زيادة عالية في رأس المال وعوائد إيجارية مجزية بالدولار.",
      highlights: ["تراس خاص فسيح", "بجوار مراكز التسوق ومراكز المال", "مسبح مغطى وسبا", "استشارات قانونية مجانية للجنسية"],
      citizenshipStatus: "مطابق للجنسية التركية / شاملة الاستشارات القانونية",
      roiEstimate: "عائد سنوي 7% من إيجار الشركات والمغتربين"
    },
    ru: {
      title: "Панорамная террасная квартира на оси Левент Сапфир",
      district: "Проспект Бююкдере, Левент / Стамбул",
      propertyType: "Премиум-резиденция",
      description: "В престижном деловом районе Левент. Современная архитектура, премиальная инфраструктура, высокая капитализация и валютная доходность.",
      highlights: ["Просторная приватная терраса", "Рядом с ТЦ и бизнес-центрами", "Крытый бассейн и SPA", "Юридическое сопровождение гражданства"],
      citizenshipStatus: "Подходит для Гражданства Турции / Юр. сопровождение включено",
      roiEstimate: "7% годовых от корпоративной аренды экспатам"
    },
    de: {
      title: "Levent Sapphire Achse Panorama-Terrassenwohnung",
      district: "Buyukdere Allee, Levent / Istanbul",
      propertyType: "Premium-Residenz",
      description: "Auf der prestigeträchtigen Büyükdere-Allee in Levent gelegen. Bietet modernen Luxus, erstklassige Annehmlichkeiten, hohe Wertsteigerung und Devisen-Mieteinnahmen.",
      highlights: ["Private Panoramaterrasse", "Direkt an Malls & Bankenzentren", "Hallenbad & Spa", "Inklusive Rechtsberatung für Staatsbürgerschaft"],
      citizenshipStatus: "Qualifiziert für türkische Staatsbürgerschaft",
      roiEstimate: "Jährlich 7% Corporate-Expat Mietrendite"
    },
    fr: {
      title: "Appartement Terrasse Panoramique Axe Levent Sapphire",
      district: "Avenue Buyukdere, Levent / Istanbul",
      propertyType: "Résidence Premium",
      description: "Situé sur la prestigieuse avenue Büyükdere à Levent, alliant architecture contemporaine et prestations haut de gamme avec une forte plus-value en capital.",
      highlights: ["Terrasse privative panoramique", "Accès direct aux centres commerciaux et banques", "Piscine couverte & Spa", "Accompagnement juridique citoyenneté inclus"],
      citizenshipStatus: "Éligible à la nationalité turque / Assistance juridique incluse",
      roiEstimate: "Rendement locatif annuel de 7% pour cadres expatriés"
    }
  },
  "invest-4": {
    tr: {
      title: "Bomonti Modern Studio Loft (Yüksek Amortisman)",
      district: "Bomonti, Şişli / İstanbul",
      propertyType: "Stüdyo Loft",
      description: "Nişantaşı ve Taksim’e komşu Bomonti’nin en hareketli caddesinde, yabancı dijital göçebelere ve turistlere orta/kısa dönem kiralamada bölgenin en çok talep gören kompakt loft dairesi.",
      highlights: ["Açık Konsept Loft Mimarisi", "Bomontiada'ya 3 dk Yürüme", "Yüksek Airbnb Doluluğu", "Anahtar Teslim"],
      citizenshipStatus: "İkamet İznine ve Yüksek Nakit Akışına Uygun",
      roiEstimate: "11 Yılda Kendini Amorti Eden Yüksek Airbnb Verimliliği"
    },
    en: {
      title: "Bomonti Modern Studio Loft (High Yield)",
      district: "Bomonti, Sisli / Istanbul",
      propertyType: "Studio Loft",
      description: "Neighboring Nisantasi and Taksim in dynamic Bomonti, this compact loft offers prime short/mid-term rental demand from digital nomads and tourists.",
      highlights: ["Open Concept Loft Design", "3 Min Walk to Bomontiada", "High Airbnb Occupancy", "Turnkey Ready"],
      citizenshipStatus: "Eligible for Residence Permit & High Cash Flow",
      roiEstimate: "11-Year Rapid Payback via Airbnb & Short-term Rental"
    },
    ar: {
      title: "استوديو لوفت عصري في بومونتي (عائد مرتفع)",
      district: "بومونتي، شيشلي / إسطنبول",
      propertyType: "استوديو لوفت",
      description: "بجوار نيشانتاشي وتقسيم في شارع بومونتي الحيوي، شقة لوفت مدمجة تشهد أعلى طلب للتأجير للرحالة الرقميين والسياح الأجانب.",
      highlights: ["تصميم لوفت مفتوح", "3 دقائق مشياً إلى بومونتيادا", "إشغال Airbnb مرتفع جداً", "جاهز للتسليم"],
      citizenshipStatus: "مناسبة للإقامة العقارية وتدفق نقدي قوي",
      roiEstimate: "استرداد قيمة الاستثمار خلال 11 عاماً عبر Airbnb"
    },
    ru: {
      title: "Современный студио-лофт в Бомонти (Быстрая окупаемость)",
      district: "Бомонти, Шишли / Стамбул",
      propertyType: "Студия Лофт",
      description: "Рядом с Нишанташи и Таксимом. Компактный лофт с высоким спросом на краткосрочную аренду среди цифровых кочевников и туристов со всего мира.",
      highlights: ["Открытая планировка Loft", "3 мин пешком до Bomontiada", "Высокая загрузка на Airbnb", "Готов к проживанию"],
      citizenshipStatus: "Подходит для ВНЖ и активного денежного потока",
      roiEstimate: "Окупаемость за 11 лет за счет высокого Airbnb дохода"
    },
    de: {
      title: "Bomonti Modernes Studio Loft (Hohe Rendite)",
      district: "Bomonti, Sisli / Istanbul",
      propertyType: "Studio Loft",
      description: "In Nachbarschaft zu Nişantaşı und Taksim. Ein gefragtes kompaktes Loft mit Spitzen-Mieteinnahmen durch digitale Nomaden und Touristen.",
      highlights: ["Offenes Loft-Design", "3 Min zu Fuß zur Bomontiada", "Hohe Airbnb-Auslastung", "Schlüsselfertig"],
      citizenshipStatus: "Geeignet für Aufenthaltserlaubnis & stabilen Cashflow",
      roiEstimate: "Amortisation in nur 11 Jahren via Airbnb"
    },
    fr: {
      title: "Studio Loft Moderne à Bomonti (Forte Rentabilité)",
      district: "Bomonti, Sisli / Istanbul",
      propertyType: "Studio Loft",
      description: "Voisin de Nisantasi et Taksim, ce loft compact et design bénéficie d'une forte demande de location court/moyen séjour auprès des nomades digitaux et touristes.",
      highlights: ["Design loft à aire ouverte", "À 3 min à pied de Bomontiada", "Taux d'occupation Airbnb élevé", "Clé en main"],
      citizenshipStatus: "Éligible au titre de séjour et flux de trésorerie élevé",
      roiEstimate: "Amortissement rapide en 11 ans grâce à Airbnb"
    }
  },
  "invest-5": {
    tr: {
      title: "Galata Kulesi Manzaralı İkonik Çatı Dubleksi",
      district: "Galata / Karaköy, Beyoğlu / İstanbul",
      propertyType: "Çatı Dubleksi",
      description: "Galata Kulesi’ne sadece 150 metre mesafede yer alan, aslına sadık kalınarak restore edilmiş tarihi binada, her penceresinden İstanbul tarihi fışkıran eşsiz bir lifestyle yatırımı.",
      highlights: ["Galata Kulesi ve Haliç Manzaralı Teras", "Asansörlü Tarihi Taş Bina", "Şömineli Salon", "Özgün Mimari"],
      citizenshipStatus: "Değerleme Raporu Hazır / İkamete Uygun",
      roiEstimate: "Yıllık %10 Dolar Bazlı Turistik Kısa Dönem Hasılatı"
    },
    en: {
      title: "Galata Tower View Iconic Rooftop Duplex",
      district: "Galata / Karakoy, Beyoglu / Istanbul",
      propertyType: "Rooftop Duplex",
      description: "Just 150 meters from Galata Tower in a meticulously restored historical stone building, an iconic lifestyle trophy asset showcasing panoramic Golden Horn & Galata vistas.",
      highlights: ["Rooftop Terrace with Galata Tower & Golden Horn Views", "Restored Historic Stone Building with Elevator", "Fireplace in Living Room", "Authentic Heritage Architecture"],
      citizenshipStatus: "Valuation Report Ready / Residence Permit Eligible",
      roiEstimate: "Annual 10% USD Short-term Tourism Yield"
    },
    ar: {
      title: "دوبلكس روف أيقوني بإطلالة على برج غالاتا",
      district: "غالاتا / كاراكوي، بيوغلو / إسطنبول",
      propertyType: "دوبلكس روف",
      description: "على بعد 150 متراً فقط من برج غالاتا في مبنى حجري تاريخي تم ترميمه بعناية، عقار استثنائي ينبض بتاريخ إسطنبول العريق وإطلالة على القرن الذهبي.",
      highlights: ["تراس بإطلالة على برج غالاتا والقرن الذهبي", "مبنى حجري تاريخي مع مصعد", "مدفأة في غرفة المعيشة", "عمارة تراثية أصيلة"],
      citizenshipStatus: "تقرير التقييم العقاري جاهز / مؤهل للإقامة",
      roiEstimate: "عائد سياحي سنوي 10% بالدولار عبر التأجير الفندقي"
    },
    ru: {
      title: "Культовый видовой пентхаус с панорамой на Башню Галата",
      district: "Галата / Каракёй, Бейоглу / Стамбул",
      propertyType: "Крышный дуплекс",
      description: "Всего в 150 метрах от башни Галата в отреставрированном историческом особняке. Уникальный трофейный объект с террасой и видом на Золотой Рог.",
      highlights: ["Терраса с видом на Галату и Золотой Рог", "Исторический каменный дом с лифтом", "Камин в гостиной", "Аутентичная архитектура"],
      citizenshipStatus: "Оценочный отчет готов / Подходит для ВНЖ",
      roiEstimate: "10% годовых в USD от туристической аренды"
    },
    de: {
      title: "Ikonisches Dach-Maisonette mit Galataturm-Blick",
      district: "Galata / Karakoy, Beyoglu / Istanbul",
      propertyType: "Dach-Maisonette",
      description: "Nur 150 Meter vom Galataturm entfernt in einem restaurierten Steingebäude. Ein Lifestyle-Investment der Extraklasse mit Panoramaterrasse über das Goldene Horn.",
      highlights: ["Dachterrasse mit Galata- & Goldenes Horn-Blick", "Historisches Steingebäude mit Aufzug", "Kamin im Wohnzimmer", "Authentische Baukunst"],
      citizenshipStatus: "Gutachten bereit / Geeignet für Aufenthaltserlaubnis",
      roiEstimate: "Jährlich 10% Tourismus-Mietrendite in USD"
    },
    fr: {
      title: "Duplex d'Exception avec Vue sur la Tour de Galata",
      district: "Galata / Karakoy, Beyoglu / Istanbul",
      propertyType: "Duplex avec Terrasse",
      description: "À seulement 150 m de la tour de Galata dans un immeuble en pierre historique restauré. Une opportunité patrimoniale rare avec terrasse panoramique sur la Corne d'Or.",
      highlights: ["Terrasse sur le toit avec vue Tour de Galata & Corne d'Or", "Immeuble historique avec ascenseur", "Cheminée dans le salon", "Architecture d'époque authentique"],
      citizenshipStatus: "Rapport d'évaluation prêt / Éligible au permis de séjour",
      roiEstimate: "Rendement locatif touristique annuel de 10% en USD"
    }
  },
  "invest-6": {
    tr: {
      title: "Bebek Sahilinde Panoramik Boğaz Çatı Katı (Penthouse)",
      district: "Bebek Sahil Şeridi, Beşiktaş / İstanbul",
      propertyType: "Boğaz Penthouse",
      description: "İstanbul’un en lüks sahil semti Bebek’te, Boğaz’ın maviliklerini ayaklarınızın altına seren, hem oturum hem de küresel ölçekte değer saklama aracı niteliğinde nadir bir penthouse.",
      highlights: ["180 Derece Kesintisiz Boğaz Manzarası", "60 m² Ön Teras", "Özel Otopark", "İtalyan Mutfak"],
      citizenshipStatus: "Vatandaşlık + VIP Konsiyerj Hizmeti Dahil",
      roiEstimate: "Aylık $7.500+ Yabancı Elçilik / Expat Kira Değeri"
    },
    en: {
      title: "Bebek Waterfront Panoramic Bosphorus Penthouse",
      district: "Bebek Coastal Line, Besiktas / Istanbul",
      propertyType: "Bosphorus Penthouse",
      description: "In Istanbul's ultra-prime coastal enclave Bebek, laying the deep blues of the Bosphorus beneath your feet. An elite trophy penthouse serving as a premier global store of value.",
      highlights: ["180-Degree Unobstructed Bosphorus Views", "60 m² Frontline Panorama Terrace", "Private Parking", "Custom Italian Designer Kitchen"],
      citizenshipStatus: "Citizenship Fast-Track + VIP Concierge Package Included",
      roiEstimate: "Monthly $7,500+ Embassy / Expat Rental Valuation"
    },
    ar: {
      title: "بنتهاوس بانورامي على كورنيش بيبك بإطلالة ساحرة على البوسفور",
      district: "كورنيش بيبك، بشكطاش / إسطنبول",
      propertyType: "بنتهاوس البوسفور",
      description: "في أرقى أحياء إسطنبول الساحلية في بيبك، بنتهاوس استثنائي بإطلالة ساحرة لا تنقطع على مياه البوسفور، يعد تحفة عقارية لحفظ وتنمية الثروة.",
      highlights: ["إطلالة 180 درجة مباشرة على البوسفور", "تراس أمامي بمساحة 60 م²", "موقف سيارات خاص", "مطبخ إيطالي فاخر"],
      citizenshipStatus: "شامل الجنسية التركية + باقة كونسيرج VIP",
      roiEstimate: "أكثر من 7,500$ شهرياً من تأجير السفارات والدبلوماسيين"
    },
    ru: {
      title: "Панорамный пентхаус на набережной Бебек с видом на Босфор",
      district: "Набережная Бебек, Бешикташ / Стамбул",
      propertyType: "Пентхаус на Босфоре",
      description: "В самом фешенебельном приморском районе Бебек. 180-градусный вид на Босфор, премиальная трофейная недвижимость мирового класса.",
      highlights: ["180-градусный прямой вид на Босфор", "Фронтальная терраса 60 м²", "Личный паркинг", "Итальянская дизайнерская кухня"],
      citizenshipStatus: "Гражданство + VIP-консьерж сервис включены",
      roiEstimate: "От $7,500 в месяц от аренды дипломатам и топ-менеджерам"
    },
    de: {
      title: "Bebek Waterfront Panorama-Penthouse am Bosporus",
      district: "Bebek Küste, Besiktas / Istanbul",
      propertyType: "Bosporus Penthouse",
      description: "Im exklusivsten Küstenbezirk Bebek. Ein seltenes Luxus-Penthouse mit unverbautem 180-Grad-Blick auf den Bosporus als erstklassiger Wertspeicher.",
      highlights: ["180-Grad unverbauter Bosporusblick", "60 m² Panorama-Frontterrasse", "Privater Stellplatz", "Italienische Designerküche"],
      citizenshipStatus: "Staatsbürgerschaft + VIP-Concierge-Paket inklusive",
      roiEstimate: "Monatlich $7.500+ Botschafts- / Expat-Mietwert"
    },
    fr: {
      title: "Penthouse Panoramique sur le Front de Mer de Bebek",
      district: "Front de mer de Bebek, Besiktas / Istanbul",
      propertyType: "Penthouse Bosphore",
      description: "Dans le quartier le plus prestigieux d'Istanbul à Bebek. Un penthouse d'exception offrant une vue à 180 degrés sur le Bosphore, parfait actif de prestige.",
      highlights: ["Vue panoramique imprenable à 180° sur le Bosphore", "Terrasse frontale de 60 m²", "Parking privé", "Cuisine italienne sur mesure"],
      citizenshipStatus: "Citoyenneté accélérée + Service Concierge VIP inclus",
      roiEstimate: "Valeur locative de 7 500$+ / mois (Ambassades / Cadres)"
    }
  },
  "invest-7": {
    tr: {
      title: "Başakşehir Vadisi Bahçeli Aile Rezidansı 3+1",
      district: "Başakşehir / İstanbul",
      propertyType: "Aile Rezidansı",
      description: "Körfez turistlerinin İstanbul'daki en gözde yaşam merkezinde, geniş yeşil peyzaj alanı, çocuk oyun parkları ve zengin sosyal donatılarıyla konforlu bir yazlık ve yatırım seçeneği.",
      highlights: ["Şehir Hastanesine 5 dk", "Millet Bahçesi Yanı", "Bay/Bayan Ayrı Sosyal Tesisler", "7/24 Güvenlik"],
      citizenshipStatus: "Türk İkamet İzni & Aile Yaşamına Tam Uyumlu",
      roiEstimate: "Yıllık %6 Stabil Uzun Dönem Aile Kiracısı"
    },
    en: {
      title: "Basaksehir Valley Garden Family Residence 3+1",
      district: "Basaksehir / Istanbul",
      propertyType: "Family Residence",
      description: "Located in the Gulf travelers' top residential hub in Istanbul, offering vast green landscaping, kids playgrounds and comprehensive family-friendly social amenities.",
      highlights: ["5 Min to City Hospital", "Adjacent to National Garden", "Separate Men/Women Social Facilities", "24/7 Gated Security"],
      citizenshipStatus: "Fully Compliant with Residence Permit & Family Living",
      roiEstimate: "Annual 6% Stable Long-term Family Rental Yield"
    },
    ar: {
      title: "شقة عائلية 3+1 مع حديقة في وادي باشاك شهير",
      district: "باشاك شهير / إسطنبول",
      propertyType: "ريزيدنس عائلي",
      description: "في أكثر أحياء إسطنبول تفضيلاً للعائلات الخليجية، تتميز بمسطحات خضراء واسعة وملاعب أطفال ومرافق اجتماعية منفصلة مريحة جداً.",
      highlights: ["5 دقائق من المدينة الطبية", "بجوار حديقة الشعب", "مرافق اجتماعية منفصلة للرجال والنساء", "أمن وحراسة 24/7"],
      citizenshipStatus: "مطابقة تماماً للإقامة العقارية والعيش العائلي",
      roiEstimate: "عائد إيجاري عائلي طويل الأمد ومستقر بنسبة 6% سنوياً"
    },
    ru: {
      title: "Семейная резиденция 3+1 с садом в Башакшехире",
      district: "Башакшехир / Стамбул",
      propertyType: "Семейная резиденция",
      description: "В самом популярном семейном районе с развитой инфраструктурой. Зеленая территория, детские площадки, идеальный комфорт для жизни и стабильной аренды.",
      highlights: ["5 мин до Городской Больницы", "Рядом с парком Миллет", "Раздельные СПА зоны", "Охрана 24/7"],
      citizenshipStatus: "Подходит под ВНЖ и семейное проживание",
      roiEstimate: "6% годовых стабильного дохода от семейной аренды"
    },
    de: {
      title: "Başakşehir Valley Garten-Familienresidenz 3+1",
      district: "Basaksehir / Istanbul",
      propertyType: "Familienresidenz",
      description: "Im beliebtesten Familienwohnpark mit großzügigen Grünanlagen, Spielplätzen und getrennten Wellnessbereichen. Perfekt für Langzeit- und Feriengäste.",
      highlights: ["5 Min zum Klinikum", "Direkt am Stadtpark", "Getrennte Social Clubs", "24/7 Sicherheitsdienst"],
      citizenshipStatus: "Ideal für Familienaufenthalt & Dauerwohnsitz",
      roiEstimate: "Jährlich 6% stabile Langzeit-Mietrendite"
    },
    fr: {
      title: "Résidence Familiale 3+1 avec Jardin à Basaksehir",
      district: "Basaksehir / Istanbul",
      propertyType: "Résidence Familiale",
      description: "Au cœur du secteur résidentiel privilégié par les familles internationales, offrant de grands espaces verts paysagers, parcs pour enfants et équipements haut de gamme.",
      highlights: ["À 5 min du Centre Hospitalier", "Bordant le Grand Parc National", "Installations sportives séparées", "Sécurité gardiennée 24/7"],
      citizenshipStatus: "Entièrement conforme pour titre de séjour familial",
      roiEstimate: "Rendement locatif stable de 6% par an"
    }
  },
  "invest-8": {
    tr: {
      title: "West Marina Kıyı Villaları Özel Müstakil Bahçeli",
      district: "Yakuplu Marina, Beylikdüzü / İstanbul",
      propertyType: "Marina Villası",
      description: "İstanbul’un en büyük uluslararası yat marinasına sıfır konumda, deniz havası ve sayfiye huzurunu şehir konforuyla birleştiren müstakil lüks bahçeli marina villası.",
      highlights: ["Özel Yüzme Havuzu", "Yat Bağlama İskelesine 200m", "Deniz Manzaralı Teras", "Akıllı Güvenlik"],
      citizenshipStatus: "Türk Vatandaşlığına %100 Uygun",
      roiEstimate: "Yıllık %8 Dolar Bazlı Lüks Sezonluk Getiri"
    },
    en: {
      title: "West Marina Waterfront Villas with Private Garden",
      district: "Yakuplu Marina, Beylikduzu / Istanbul",
      propertyType: "Marina Villa",
      description: "Frontline to Istanbul's largest international mega-yacht marina, offering private gardens, swimming pools and coastal serenity paired with modern luxury.",
      highlights: ["Private Swimming Pool", "200m to Yacht Berths & Promenade", "Panoramic Sea View Terrace", "Smart Security Automation"],
      citizenshipStatus: "100% Eligible for Turkish Citizenship",
      roiEstimate: "Annual 8% USD Luxury Seasonal & Long-term Yield"
    },
    ar: {
      title: "فلل ويست مارينا الساحلية مع حديقة ومسبح خاص",
      district: "ياكوبلو مارينا، بيليك دوزو / إسطنبول",
      propertyType: "فيلا مارينا",
      description: "مباشرة على أكبر مارينا لليخوت في إسطنبول، توفر خصوصية تامة مع حديقة ومسبح خاص وإطلالة خلابة على البحر ومطاعم المارينا الفاخرة.",
      highlights: ["مسبح خاص بالفيلا", "على بعد 200 متر من رصيف اليخوت", "تراس بإطلالة بحرية بانورامية", "أنظمة أمن ذكية"],
      citizenshipStatus: "مطابقة تماماً للحصول على الجنسية التركية",
      roiEstimate: "عائد سنوي 8% بالدولار من التأجير السياحي والموسمي"
    },
    ru: {
      title: "Прибрежные виллы West Marina с собственным садом и бассейном",
      district: "Якуплу Марина, Бейликдюзю / Стамбул",
      propertyType: "Вилла у марины",
      description: "На первой линии от крупнейшей международной яхтенной марины. Приватный сад, собственный бассейн, морской бриз и статусная загородная жизнь.",
      highlights: ["Приватный плавательный бассейн", "200 м до стоянки яхт и набережной", "Терраса с видом на море", "Умная система безопасности"],
      citizenshipStatus: "100% подходит под Гражданство Турции",
      roiEstimate: "8% годовых в USD от премиальной аренды"
    },
    de: {
      title: "West Marina Küstenvillen mit Privatem Garten",
      district: "Yakuplu Marina, Beylikduzu / Istanbul",
      propertyType: "Marina-Villa",
      description: "Direkt an Istanbuls größter internationaler Yachtmarina gelegen. Private Gärten, eigener Pool und erstklassiges maritimes Flair mit höchstem Komfort.",
      highlights: ["Privater Swimmingpool", "200m zu Yachtanlegern & Flaniermeile", "Meerblick-Terrasse", "Smart Security"],
      citizenshipStatus: "100% qualifiziert für die türkische Staatsbürgerschaft",
      roiEstimate: "Jährlich 8% Luxus-Mietrendite in USD"
    },
    fr: {
      title: "Villas Front de Mer West Marina avec Jardin Privé",
      district: "Marina Yakuplu, Beylikduzu / Istanbul",
      propertyType: "Villa Marina",
      description: "En première ligne de la plus grande marina de plaisance d'Istanbul, offrant piscine privée, jardin paysager et vue panoramique sur la mer de Marmara.",
      highlights: ["Piscine privée", "À 200m des pontons de yachts et restaurants", "Terrasse avec vue mer panoramique", "Domotique et sécurité 24/7"],
      citizenshipStatus: "100% éligible pour la citoyenneté turque",
      roiEstimate: "Rendement locatif saisonnier de 8% par an en USD"
    }
  },
  "invest-9": {
    tr: {
      title: "Kağıthane Kentsel Dönüşüm Premium Suites 1+1",
      district: "Cendere Vadisi, Kağıthane / İstanbul",
      propertyType: "Modern Daire",
      description: "İstanbul Havalimanı metro hattının merkezinde hızla değer kazanan Cendere aksında, geliştirici tarafından 3 yıl döviz bazlı kira garantisi sunulan sıfır riskli yatırım dairesi.",
      highlights: ["Havalimanı Metrosuna 3 dk", "Vadi İstanbul AVM Yanı", "3 Yıl Döviz Kira Garantisi", "Yüksek Prim Potansiyeli"],
      citizenshipStatus: "Yüksek Prim & Kira Garantili",
      roiEstimate: "3 Yıl %7 USD Sabit Kira Garantisi"
    },
    en: {
      title: "Kagithane Urban Renewal Premium Suites 1+1",
      district: "Cendere Valley, Kagithane / Istanbul",
      propertyType: "Modern Suite",
      description: "Positioned directly on the booming Cendere Valley next to the Istanbul Airport Metro Line, offering a 3-year developer rental guarantee in USD.",
      highlights: ["3 Min to Airport Metro Line", "Beside Vadi Istanbul Mall", "3-Year USD Rental Guarantee", "High Capital Growth"],
      citizenshipStatus: "High Capital Appreciation & Guaranteed Rental",
      roiEstimate: "3-Year Fixed 7% USD Developer Rental Guarantee"
    },
    ar: {
      title: "أجنحة بريميوم 1+1 في وادي كاغتهانة (مع ضمان إيجار)",
      district: "وادي جندري، كاغتهانة / إسطنبول",
      propertyType: "شقة عصرية",
      description: "تقع على محور وادي جندري الصاعد بجوار خط مترو مطار إسطنبول، وتوفر ضمان إيجار بالدولار لمدة 3 سنوات من المطور العقاري مباشرة.",
      highlights: ["3 دقائق إلى مترو المطار", "بجوار مول وادي إسطنبول", "ضمان إيجار 3 سنوات بالدولار", "ارتفاع سنوي عالي للقيمة"],
      citizenshipStatus: "نمو رأسمالي عالي مع ضمان إيجار مضمون",
      roiEstimate: "ضمان إيجار بالدولار 7% سنوياً لمدة 3 سنوات"
    },
    ru: {
      title: "Премиум-сьюты 1+1 в долине Кягытхане с гарантией аренды",
      district: "Долина Джендере, Кягытхане / Стамбул",
      propertyType: "Современная квартира",
      description: "Рядом с линией метро в аэропорт Стамбула и ТЦ Vadi Istanbul. Доступна программа гарантированной валютной аренды на 3 года от застройщика.",
      highlights: ["3 мин до ветки метро в Аэропорт", "Рядом с ТЦ Vadi Istanbul", "3 года гарантии аренды в USD", "Высокий рост цены"],
      citizenshipStatus: "Высокий потенциал роста + арендная гарантия",
      roiEstimate: "7% годовых фиксированной аренды в USD на 3 года"
    },
    de: {
      title: "Kagithane Premium Suites 1+1 mit Mietgarantie",
      district: "Cendere Tal, Kagithane / Istanbul",
      propertyType: "Moderne Suite",
      description: "Direkt an der Flughafen-Metrolinie im aufstrebenden Cendere-Tal neben der Vadi Istanbul Mall. 3 Jahre Devisen-Mietgarantie vom Bauträger.",
      highlights: ["3 Min zur Flughafen-Metro", "Direkt an der Vadi Istanbul Mall", "3 Jahre USD Mietgarantie", "Hohe Wertsteigerung"],
      citizenshipStatus: "Hohe Wertsteigerung & garantierte Miete",
      roiEstimate: "Fest garantierte 7% USD Mietrendite für 3 Jahre"
    },
    fr: {
      title: "Suites Premium 1+1 à Kagithane avec Garantie Locative",
      district: "Vallée de Cendere, Kagithane / Istanbul",
      propertyType: "Suite Contemporaine",
      description: "Idéalement situé sur l'axe en plein essor de Cendere à côté du métro Aéroport et du centre Vadi Istanbul, avec garantie locative de 3 ans en USD.",
      highlights: ["À 3 min du métro direct Aéroport", "À côté du Mall Vadi Istanbul", "Garantie locative 3 ans en USD", "Forte plus-value"],
      citizenshipStatus: "Forte appréciation du capital & loyers garantis",
      roiEstimate: "7% par an garanti en USD pendant 3 ans par le promoteur"
    }
  },
  "invest-10": {
    tr: {
      title: "Kartal Sahilinde Adalar Manzaralı Teras Rezidans",
      district: "Sahil Yolu, Kartal / İstanbul (Anadolu Yakası)",
      propertyType: "Sahil Rezidansı",
      description: "Anadolu Yakası sahil kordonunda, Marmara Denizi ve Adalar manzarasına hakim, Marmaray ile Tarihi Yarımada'ya 25 dakikada ulaşım sağlayan çağdaş sahil rezidansı.",
      highlights: ["Panoramik Prens Adaları Manzarası", "Marmaray İstasyonuna 400m", "Açık/Kapalı Havuz", "Geniş Balkon"],
      citizenshipStatus: "İkamet İznine ve Yaşama Uygun",
      roiEstimate: "Yıllık %7,5 Net Kira Getirisi"
    },
    en: {
      title: "Kartal Coastal Princes' Islands View Terrace Residence",
      district: "Coastal Road, Kartal / Istanbul (Asian Side)",
      propertyType: "Coastal Residence",
      description: "Positioned on the Asian coastal promenade overlooking the Princes' Islands and Marmara Sea, connecting to Sultanahmet in 25 minutes via Marmaray commuter rail.",
      highlights: ["Panoramic Princes' Islands Sea View", "400m to Marmaray Rail Station", "Indoor/Outdoor Pools", "Spacious Balcony"],
      citizenshipStatus: "Residence Permit & Family Living Ready",
      roiEstimate: "Annual 7.5% Net Rental Yield"
    },
    ar: {
      title: "ريزيدنس ساحلي مع تراس بإطلالة على جزر الأميرات في كارتال",
      district: "طريق الساحل، كارتال / إسطنبول (الجانب الآسيوي)",
      propertyType: "ريزيدنس ساحلي",
      description: "على كورنيش الجانب الآسيوي بإطلالة ساحرة ومباشرة على جزر الأميرات وبحر مرمرة، ويبعد 25 دقيقة فقط عن شبه الجزيرة التاريخية عبر قطار مرمراي.",
      highlights: ["إطلالة بانورامية على جزر الأميرات", "400 متر من محطة مرمراي", "مسابح داخلية وخارجية", "شرفة واسعة"],
      citizenshipStatus: "مناسبة للإقامة العقارية والعيش الفاخر",
      roiEstimate: "عائد إيجاري صافي 7.5% سنوياً"
    },
    ru: {
      title: "Прибрежная террасная резиденция в Картале с видом на Принцевы острова",
      district: "Набережная Картал, Азиатская сторона / Стамбул",
      propertyType: "Прибрежная резиденция",
      description: "На азиатской набережной с панорамным видом на Мраморное море и Принцевы острова. 25 минут до Султанахмета на скоростном поезде Мармарай.",
      highlights: ["Панорамный вид на Принцевы острова", "400 м до станции Мармарай", "Открытый и закрытый бассейны", "Просторная терраса"],
      citizenshipStatus: "Подходит для ВНЖ и комфортной жизни",
      roiEstimate: "7.5% годовых чистой доходности"
    },
    de: {
      title: "Kartal Küstenresidenz mit Prinzeninseln-Panoramablick",
      district: "Küste Kartal / Istanbul (Asiatische Seite)",
      propertyType: "Küstenresidenz",
      description: "An der malerischen asiatischen Küstenpromenade mit direktem Blick auf das Marmarameer und die Prinzeninseln. Nur 25 Min. mit Marmaray zur Altstadt.",
      highlights: ["Panoramablick auf die Prinzeninseln", "400m zum Marmaray-Bahnhof", "Innen- & Außenpools", "Großer Sonnenbalkon"],
      citizenshipStatus: "Geeignet für Aufenthaltserlaubnis & Wohnen",
      roiEstimate: "Jährlich 7,5% Netto-Mietrendite"
    },
    fr: {
      title: "Résidence Cotière avec Terrasse et Vue Îles des Princes à Kartal",
      district: "Front de Mer Kartal / Istanbul (Rive Asiatique)",
      propertyType: "Résidence Vue Mer",
      description: "Sur la promenade maritime de la rive asiatique avec vue imprenable sur les îles des Princes et accès à Sultanahmet en 25 minutes via le train Marmaray.",
      highlights: ["Vue panoramique sur les îles des Princes", "À 400m de la gare Marmaray", "Piscines intérieure et extérieure", "Grand balcon terrasse"],
      citizenshipStatus: "Éligible au permis de séjour et idéal pour habiter",
      roiEstimate: "Rendement locatif net de 7,5% par an"
    }
  },
  "invest-11": {
    tr: {
      title: "Yeniköy Yalı Dairesi (Tarihi Boğaz Dokusu)",
      district: "Yeniköy Sahil Yolu, Sarıyer / İstanbul",
      propertyType: "Boğaz Yalı Dairesi",
      description: "Boğaz’ın en seçkin semti Yeniköy’de, dünyada eşi benzeri bulunmayan tarihi sahil hattında, özel rıhtımıyla İstanbul Boğazı’nın mavi sularına uyanabileceğiniz nadir bir yalı dairesi.",
      highlights: ["Özel Rıhtım & Tekne Yanaşma", "Tarihi Tescilli Yalı Mimarisi", "Yüksek Tavan & Ahşap İşçilik", "VIP Boğaz Yaşamı"],
      citizenshipStatus: "Türk Vatandaşlığı + Prestij Miras Portföyü",
      roiEstimate: "Aylık $12.000+ Diplomatik / Expat Kira Değeri"
    },
    en: {
      title: "Yenikoy Historic Bosphorus Waterfront Yali Apartment",
      district: "Yenikoy Coastal Road, Sariyer / Istanbul",
      propertyType: "Bosphorus Waterfront Mansion",
      description: "Located in the elite enclave of Yenikoy on the iconic Bosphorus frontline with private dock access, a rare heritage trophy residence directly over the shimmering sea.",
      highlights: ["Private Dock & Boat Mooring Access", "Registered Historic Yali Heritage", "High Ceilings & Craft Woodwork", "Elite Bosphorus Lifestyle"],
      citizenshipStatus: "Turkish Citizenship Fast-Track + Trophy Heritage Asset",
      roiEstimate: "Monthly $12,000+ Diplomatic / Ultra-Prime Rental Valuation"
    },
    ar: {
      title: "شقة يالي تاريخية على مياه البوسفور مباشرة في ينيكوي",
      district: "طريق ساحل ينيكوي، ساريير / إسطنبول",
      propertyType: "قصر يالي على البوسفور",
      description: "في أرقى أحياء البوسفور في ينيكوي، عقار تاريخي فريد برصيف خاص لرسو القوارب على مياه مضيق البوسفور الزرقاء مباشرة.",
      highlights: ["رصيف خاص لرسو اليخوت", "عمارة عثمانية تاريخية مسجلة", "سقوف مرتفعة وزخارف خشبية فاخرة", "حياة النخبة على البوسفور"],
      citizenshipStatus: "شامل الجنسية التركية + أصل تراثي نادر",
      roiEstimate: "أكثر من 12,000$ شهرياً من تأجير السفارات والدبلوماسيين"
    },
    ru: {
      title: "Исторический особняк-ялы на первой линии Босфора в Еникёй",
      district: "Набережная Еникёй, Сарыер / Стамбул",
      propertyType: "Ялы на Босфоре",
      description: "В самом престижном районе Еникёй. Собственный причал для катера, аутентичные деревянные интерьеры, бесценный исторический объект культурного наследия.",
      highlights: ["Собственный причал для яхты", "Охраняемый памятник архитектуры", "Высокие потолки и резное дерево", "Элитный статус"],
      citizenshipStatus: "Гражданство Турции + Трофейный премиальный актив",
      roiEstimate: "От $12,000 в месяц от дипломатической аренды"
    },
    de: {
      title: "Yeniköy Historisches Yali-Apartment am Bosporus",
      district: "Yenikoy Küstenstraße, Sariyer / Istanbul",
      propertyType: "Bosporus-Yali",
      description: "Im feinsten Viertel Yeniköy direkt am Bosporusufer mit privatem Bootsanleger. Ein seltenes historisches Erbe von Weltklasse.",
      highlights: ["Privater Bootsanleger & Steg", "Denkmalgeschütztes historisches Yali", "Hohe Decken & Holzkunst", "Exklusiver Bosporus-Lifestyle"],
      citizenshipStatus: "Türkische Staatsbürgerschaft + Trophäen-Immobilie",
      roiEstimate: "Monatlich $12.000+ Expat- & Botschaftsmiete"
    },
    fr: {
      title: "Appartement de Yali Historique Front de Mer à Yenikoy",
      district: "Route côtière de Yenikoy, Sariyer / Istanbul",
      propertyType: "Yali sur le Bosphore",
      description: "Situé dans le quartier le plus exclusif de Yeniköy, sur la ligne historique du Bosphore avec ponton privé, un joyau patrimonial rare au bord de l'eau.",
      highlights: ["Ponton d'amarrage privé pour bateau", "Architecture Yali d'époque classée", "Hauts plafonds et boiseries d'art", "Cadre de vie Bosphore d'élite"],
      citizenshipStatus: "Citoyenneté turque + Actif d'exception patrimonial",
      roiEstimate: "Valeur locative de 12 000$+ / mois (Corps diplomatique)"
    }
  },
  "invest-12": {
    tr: {
      title: "Nişantaşı Abdi İpekçi Caddesi Designer Flat",
      district: "Abdi İpekçi Cad., Nişantaşı / İstanbul",
      propertyType: "Lüks Tasarım Daire",
      description: "Türkiye’nin lüks moda ve gastronomi kalbi Abdi İpekçi Caddesi üzerinde, ünlü mimarlar tarafından tasarlanmış, yabancı medikal turistlere ve lüks gezginlere hitap eden prestijli daire.",
      highlights: ["Hermes & Chanel Mağazalarına 50m", "Özel Asansörlü Giriş", "Tasarım Mobilyalar", "Amerikan Hastanesi Yanı"],
      citizenshipStatus: "Türk Vatandaşlığına & Yüksek Kira Çarpanına Uygun",
      roiEstimate: "Yıllık %8,5 Dolar Bazlı Medikal Turizm Kirası"
    },
    en: {
      title: "Nisantasi Abdi Ipekci Avenue Designer Flat",
      district: "Abdi Ipekci Ave., Nisantasi / Istanbul",
      propertyType: "Luxury Designer Flat",
      description: "On Turkey's most prestigious luxury fashion promenade Abdi Ipekci Avenue in Nisantasi, bespoke-designed by top architects for high-net-worth medical and leisure travelers.",
      highlights: ["50m to Chanel & Hermes Flagships", "Private Elevator Access", "Designer Italian Furnishings", "Beside American Hospital"],
      citizenshipStatus: "Eligible for Turkish Citizenship & High Yield",
      roiEstimate: "Annual 8.5% USD Premium Medical Tourism Rental Yield"
    },
    ar: {
      title: "شقة مصممة فاخرة في شارع عبدي إيبكتشي بنيشانتاشي",
      district: "شارع عبدي إيبكتشي، نيشانتاشي / إسطنبول",
      propertyType: "شقة فاخرة مصممة",
      description: "في قلب الموضة والأزياء الراقية بشارع عبدي إيبكتشي، شقة بتصميم معماري فريد تستقطب كبار زوار السياحة العلاجية والترفيهية الفاخرة.",
      highlights: ["50 متراً من متاجر شانيل وهيرميس", "مصعد خاص مباشر للشقة", "أثاث إيطالي فاخر", "بجوار المستشفى الأمريكي"],
      citizenshipStatus: "مطابقة للحصول على الجنسية التركية وعوائد إيجار ممتازة",
      roiEstimate: "عائد سنوي 8.5% بالدولار من سياحة النخبة والعلاج"
    },
    ru: {
      title: "Дизайнерская квартира на улице Абди Ипекчи в Нишанташи",
      district: "Улица Абди Ипекчи, Нишанташи / Стамбул",
      propertyType: "Дизайнерские апартаменты",
      description: "На самой престижной модной улице Турции рядом с бутиками Chanel и Louis Vuitton. Авторский дизайн, высокий доход от медицинского и VIP туризма.",
      highlights: ["50 м от бутиков Chanel и Hermes", "Личный лифт в квартиру", "Итальянская дизайнерская мебель", "Рядом с Американским госпиталем"],
      citizenshipStatus: "Подходит для Гражданства Турции и премиального дохода",
      roiEstimate: "8.5% годовых в USD от медицинской и люкс-аренды"
    },
    de: {
      title: "Nişantaşı Abdi İpekçi Allee Designer-Wohnung",
      district: "Abdi Ipekci Allee, Nisantasi / Istanbul",
      propertyType: "Designer-Wohnung",
      description: "Auf der renommiertesten Luxus-Einkaufsmeile der Türkei. Von Star-Architekten gestaltet, ideal für wohlhabende Reisende und Medizintouristen.",
      highlights: ["50m zu Chanel & Hermes Boutiquen", "Privater Aufzugzugang", "Italienische Designermöbel", "Nahe Amerikanischem Krankenhaus"],
      citizenshipStatus: "Qualifiziert für türkische Staatsbürgerschaft",
      roiEstimate: "Jährlich 8,5% USD Rendite via Luxus- & Medizintourismus"
    },
    fr: {
      title: "Appartement Designer sur l'Avenue Abdi Ipekci à Nisantasi",
      district: "Avenue Abdi Ipekci, Nisantasi / Istanbul",
      propertyType: "Appartement de Créateur",
      description: "Sur la célèbre avenue du luxe et de la haute couture Abdi Ipekçi à Nisantasi, conçu par des architectes de renom pour une clientèle VIP.",
      highlights: ["À 50m des boutiques Chanel et Hermès", "Ascenseur privatif direct", "Ameublement italien sur mesure", "À deux pas de l'Hôpital Américain"],
      citizenshipStatus: "Éligible à la nationalité turque et forte rentabilité",
      roiEstimate: "Rendement annuel de 8,5% en USD (Tourisme médical VIP)"
    }
  },
  "invest-13": {
    tr: {
      title: "Kandilli Boğaz Tepelerinde Tarihi Osmanlı Köşkü",
      district: "Kandilli, Üsküdar / İstanbul",
      propertyType: "Tarihi Köşk",
      description: "Kandilli’nin yemyeşil sırtlarında Boğaz’ı tepeden kucaklayan, asırlık çınar ağaçları arasında gizlenmiş, Sotheby’s kalitesiyle listelenen tescilli tarihi Osmanlı mirası köşk.",
      highlights: ["Özel Bahçe & Müştemilat", "Panoramik Boğaz & Köprü Manzarası", "Tescilli Tarihi Eser", "Müstakil Otopark"],
      citizenshipStatus: "Vatandaşlık + Miras Değeri",
      roiEstimate: "Tarihi Değer Artışı & Lüks Etkinlik Kirası"
    },
    en: {
      title: "Kandilli Bosphorus Hills Historic Ottoman Mansion",
      district: "Kandilli, Uskudar / Istanbul",
      propertyType: "Historic Mansion",
      description: "Nestled on the lush green hills of Kandilli commanding panoramic Bosphorus views, hidden among century-old plane trees, an iconic registered Ottoman heritage mansion.",
      highlights: ["Private Gated Grounds & Guest House", "Panoramic Bosphorus & Bridge Vistas", "Officially Registered Heritage Asset", "Private Parking"],
      citizenshipStatus: "Citizenship by Investment + Timeless Heritage",
      roiEstimate: "High Capital Appreciation & Elite Event Leasing"
    },
    ar: {
      title: "قصر عثماني تاريخي على تلال قنديللي المطلة على البوسفور",
      district: "قنديللي، أوسكودار / إسطنبول",
      propertyType: "قصر تاريخي",
      description: "يقع على تلال قنديللي الخضراء بإطلالة ساحرة من الأعلى على مضيق وجسور البوسفور، قصر عثماني أثري مسجل محاط بأشجار الدلب المعمرة.",
      highlights: ["حديقة واسعة مع ملحق للضيوف", "إطلالة بانورامية على البوسفور والجسور", "عقار أثري تاريخي مسجل", "موقف سيارات خاص"],
      citizenshipStatus: "شامل الجنسية التركية + قيمة تراثية لا تقدر بثمن",
      roiEstimate: "نمو رأسمالي استثنائي وإيجارات للمناسبات والإنتاج الفاخر"
    },
    ru: {
      title: "Исторический османский особняк на холмах Кандилли",
      district: "Кандилли, Ускюдар / Стамбул",
      propertyType: "Исторический особняк",
      description: "На живописных холмах Кандилли с потрясающим видом на Босфор и мосты. Охраняемый памятник османской архитектуры среди вековых деревьев.",
      highlights: ["Приватный парк и гостевой дом", "Панорамный вид на Босфор и мосты", "Официально зарегистрированный памятник", "Личный паркинг"],
      citizenshipStatus: "Гражданство Турции + Бесценное культурное наследие",
      roiEstimate: "Высокий прирост стоимости и премиальная аренда"
    },
    de: {
      title: "Kandilli Bosporus-Hügel Historisches Osmanisches Herrenhaus",
      district: "Kandilli, Uskudar / Istanbul",
      propertyType: "Historisches Herrenhaus",
      description: "Auf den grünen Hügeln von Kandilli mit majestätischem Blick auf den Bosporus. Ein denkmalgeschütztes osmanisches Erbe unter uralten Platanen.",
      highlights: ["Privatpark & Gästehaus", "Panoramablick auf Bosporus & Brücken", "Denkmalgeschütztes Prachtobjekt", "Eigener Parkplatz"],
      citizenshipStatus: "Türkische Staatsbürgerschaft + Historisches Erbe",
      roiEstimate: "Hohe Wertsteigerung & exklusive Event-Vermietung"
    },
    fr: {
      title: "Manoir Ottoman Historique sur les Collines de Kandilli",
      district: "Kandilli, Uskudar / Istanbul",
      propertyType: "Manoir Historique",
      description: "Perché sur les collines verdoyantes de Kandilli avec vue dominante sur le Bosphore et les ponts, un manoir d'époque ottomane classé au patrimoine historique.",
      highlights: ["Parc privé et dépendance d'invités", "Vue panoramique sur le Bosphore et les ponts", "Monuments historiques classés", "Parking privatif"],
      citizenshipStatus: "Citoyenneté turque + Héritage d'exception",
      roiEstimate: "Forte plus-value patrimoniale & location événementielle VIP"
    }
  },
  "invest-14": {
    tr: {
      title: "Sultanahmet Butik Otel Dönüşümüne Uygun Tarihi Ahşap Konak",
      district: "Sultanahmet / Cankurtaran, Fatih / İstanbul",
      propertyType: "Tarihi Ahşap Konak",
      description: "Dünyanın en çok turist çeken noktası Sultanahmet'te, doğrudan 8 odalı lüks butik otel veya gurme restorana çevrilebilecek, eşsiz lokasyona sahip tescilli Osmanlı konağı.",
      highlights: ["Ayasofya ve Sultanahmet Camii'ne 300m", "8 Oda Butik Otel Projesi Hazır", "Deniz Manzaralı Teras", "Turizm Ruhsatı Alınabilir"],
      citizenshipStatus: "Ticari Turizm Yatırımı & Vatandaşlık",
      roiEstimate: "Yıllık %12 - %15 Yüksek Otel İşletme Geliri"
    },
    en: {
      title: "Sultanahmet Historic Wooden Mansion for Boutique Hotel Conversion",
      district: "Sultanahmet / Cankurtaran, Fatih / Istanbul",
      propertyType: "Historic Wooden Mansion",
      description: "In the world's most visited tourism epicenter Sultanahmet, an officially registered historic Ottoman mansion ready to operate as an 8-room luxury boutique hotel or gourmet restaurant.",
      highlights: ["300m to Hagia Sophia & Blue Mosque", "Ready 8-Room Boutique Hotel Architectural Project", "Sea View Rooftop Terrace", "Commercial Tourism License Eligible"],
      citizenshipStatus: "Commercial Tourism Asset & Citizenship Ready",
      roiEstimate: "Annual 12% - 15% High Boutique Hotel Operating Yield"
    },
    ar: {
      title: "قصر خشبي تاريخي في السلطان أحمد جاهز للتحويل لفندق بوتيك",
      district: "السلطان أحمد / جانكورتاران، الفاتح / إسطنبول",
      propertyType: "قصر خشبي تاريخي",
      description: "في قلب السياحة العالمية في السلطان أحمد، قصر عثماني تاريخي مميز بموقع لا يعوض، جاهز للتشغيل كفندق بوتيك فاخر من 8 غرف أو مطعم راقٍ.",
      highlights: ["300 متر من آيا صوفيا والمسجد الأزرق", "مشروع معماري جاهز لفندق بوتيك 8 غرف", "تراس بإطلالة على بحر مرمرة", "مؤهل للحصول على رخصة سياحية تجارية"],
      citizenshipStatus: "استثمار سياحي تجاري + الجنسية التركية",
      roiEstimate: "عائد تشغيل فندقي سنوي مرتفع بنسبة 12% - 15%"
    },
    ru: {
      title: "Исторический деревянный особняк в Султанахмете под бутик-отель",
      district: "Султанахмет / Джангуртаран, Фатих / Стамбул",
      propertyType: "Исторический особняк",
      description: "В эпицентре мирового туризма в 300 м от Айя-Софии. Готовый проект под 8-комнатный люксовый бутик-отель с панорамной террасой на море.",
      highlights: ["300 м до Айя-Софии и Голубой мечети", "Готовый проект бутик-отеля на 8 номеров", "Терраса с видом на море", "Право коммерческой лицензии"],
      citizenshipStatus: "Коммерческий туристический актив + Гражданство",
      roiEstimate: "12% - 15% годовых гостиничной доходности"
    },
    de: {
      title: "Sultanahmet Historisches Holz-Herrenhaus für Boutique-Hotel",
      district: "Sultanahmet, Fatih / Istanbul",
      propertyType: "Historisches Holz-Herrenhaus",
      description: "Im weltberühmten Tourismuszentrum Sultanahmet, nur 300 m von der Hagia Sophia entfernt. Bereit für den Betrieb als exklusives 8-Zimmer-Boutique-Hotel.",
      highlights: ["300m zur Hagia Sophia & Blauen Moschee", "Fertiges 8-Zimmer Boutique-Hotel Projekt", "Meerblick-Dachterrasse", "Gewerbliche Tourismuslizenz möglich"],
      citizenshipStatus: "Gewerbliche Investition & Staatsbürgerschaft",
      roiEstimate: "Jährlich 12% - 15% Hotel-Betriebsrendite"
    },
    fr: {
      title: "Manoir Historique en Bois à Sultanahmet pour Hôtel Boutique",
      district: "Sultanahmet / Cankurtaran, Fatih / Istanbul",
      propertyType: "Manoir en Bois Historique",
      description: "Au cœur touristique de Sultanahmet à 300m de Sainte-Sophie, un manoir ottoman classé idéal pour exploitation en hôtel boutique 8 chambres ou restaurant gastronomique.",
      highlights: ["À 300m de Sainte-Sophie et de la Mosquée Bleue", "Projet architectural prêt pour hôtel boutique 8 clés", "Terrasse avec vue mer", "Licence touristique commerciale éligible"],
      citizenshipStatus: "Investissement touristique commercial & Citoyenneté",
      roiEstimate: "Rendement d'exploitation hôtelière de 12% à 15% par an"
    }
  },
  "invest-15": {
    tr: {
      title: "Moda Sahilinde Deniz Manzaralı 2+1 Airbnb Dairesi",
      district: "Moda, Kadıköy / İstanbul",
      propertyType: "Sahil Dairesi",
      description: "Kadıköy Moda’nın en nezih sokağında, kafe ve restoranların merkezinde, yabancı turistlerin İstanbul’un Asya yakasını keşfederken konaklamayı en çok tercih ettiği Airbnb hazır daire.",
      highlights: ["Moda İskelesi ve Sahile 2 dk", "Ferah Deniz Manzarası", "Tasarım Mobilyalı & Eşyalı", "Yüksek Turist Puanı"],
      citizenshipStatus: "İkamet İzni & Yüksek Airbnb Geliri",
      roiEstimate: "Yıllık %9,5 Dolar Bazlı Airbnb Getirisi"
    },
    en: {
      title: "Moda Waterfront Sea View 2+1 Airbnb Ready Flat",
      district: "Moda, Kadikoy / Istanbul",
      propertyType: "Waterfront Flat",
      description: "On Moda's premier tranquil avenue in Kadikoy, surrounded by artisanal cafes, this turnkey furnished flat is a top-rated destination for international visitors on the Asian side.",
      highlights: ["2 Min Walk to Moda Pier & Shoreline", "Panoramic Marmara Sea Views", "Designer Furnished Turnkey", "Top Airbnb Superhost Potential"],
      citizenshipStatus: "Residence Permit Eligible & High Short-term Yield",
      roiEstimate: "Annual 9.5% USD Airbnb Cash Flow"
    },
    ar: {
      title: "شقة 2+1 جاهزة للتأجير Airbnb بإطلالة بحرية في مودة كاديكوي",
      district: "مودة، كاديكوي / إسطنبول",
      propertyType: "شقة ساحلية",
      description: "في أرقى شوارع حي مودة بكاديكوي على الجانب الآسيوي، وسط المقاهي العصرية، شقة مفروشة بالكامل تشهد طلباً سياحياً دولياً متواصلاً طوال العام.",
      highlights: ["دقيقتان مشياً إلى رصيف مودة والساحل", "إطلالة بحرية خلابة", "مفروشة بأثاث عصري أنيق", "تقييمات سياحية ممتازة"],
      citizenshipStatus: "مؤهلة للإقامة وعائدات Airbnb مرتفعة بالدولار",
      roiEstimate: "عائد سنوي 9.5% بالدولار عبر التأجير اليومي"
    },
    ru: {
      title: "Видовая квартира 2+1 под Airbnb на набережной Мода в Кадыкёе",
      district: "Мода, Кадыкёй / Стамбул",
      propertyType: "Приморская квартира",
      description: "В самом богемном и престижном районе азиатской части. 2 минуты до набережной Мода, дизайнерский ремонт, идеальный готовый бизнес на Airbnb.",
      highlights: ["2 мин пешком до пирса Мода", "Открытый вид на море", "Дизайнерская мебель", "Высокий рейтинг у туристов"],
      citizenshipStatus: "Подходит для ВНЖ и высокого арендного дохода",
      roiEstimate: "9.5% годовых в USD от посуточной аренды"
    },
    de: {
      title: "Moda Waterfront 2+1 Airbnb-Wohnung mit Meerblick",
      district: "Moda, Kadikoy / Istanbul",
      propertyType: "Küstenwohnung",
      description: "In der besten Straße von Kadıköy Moda, umgeben von Designer-Cafés. Voll möbliert und bei internationalen Städtereisenden sehr begehrt.",
      highlights: ["2 Min zum Moda-Pier & Uferpromenade", "Herrlicher Meerblick", "Schlüsselfertig möbliert", "Hohe Gästebewertungen"],
      citizenshipStatus: "Aufenthaltserlaubnis & Top-Mieteinnahmen",
      roiEstimate: "Jährlich 9,5% USD Airbnb-Rendite"
    },
    fr: {
      title: "Appartement 2+1 Prêt pour Airbnb avec Vue Mer à Moda Kadikoy",
      district: "Moda, Kadikoy / Istanbul",
      propertyType: "Appartement Côtier",
      description: "Dans la rue la plus prisée du quartier bohème de Moda à Kadikoy, meublé design clé en main, très recherché par les voyageurs internationaux sur la rive asiatique.",
      highlights: ["À 2 min de l'embarcadère de Moda et du front de mer", "Superbe vue mer", "Meublé haut de gamme", "Excellent potentiel Superhost Airbnb"],
      citizenshipStatus: "Éligible permis de séjour & hauts revenus Airbnb",
      roiEstimate: "Rendement locatif annuel de 9,5% en USD"
    }
  },
  "invest-16": {
    tr: {
      title: "Topkapı Suriçi Panorama Rezidans (Vatandaşlık Paketi)",
      district: "Topkapı, Zeytinburnu / Fatih Sınırı / İstanbul",
      propertyType: "Şehir Rezidansı",
      description: "Tarihi Yarımada surlarının yanı başında, merkezi ulaşım hatlarına sıfır konumda, hazır kiracılı ve anında vatandaşlık başvuru dosyası teslim edilen güvenli yatırım mülkü.",
      highlights: ["Tramvay ve Metrobüse 1 dk", "Tarihi Surlara Komşu", "Hazır Kurumsal Kiracılı", "Tapu ve Vatandaşlık Dosyası Hazır"],
      citizenshipStatus: "Türk Vatandaşlığına %100 Uygun ($400k+ Barajı)",
      roiEstimate: "Yıllık %6,8 Dolar Bazlı Net Getiri"
    },
    en: {
      title: "Topkapi Historic Walls Panorama Residence (Citizenship Package)",
      district: "Topkapi, Zeytinburnu / Fatih Border / Istanbul",
      propertyType: "City Residence",
      description: "Right next to the ancient Byzantine city walls and major transit lines, offering an immediate corporate tenant and turnkey Turkish Citizenship application processing.",
      highlights: ["1 Min Walk to Tram & Metrobus Lines", "Facing Historic City Walls", "Tenanted by Corporate Expat", "Title Deed & Citizenship Files Ready"],
      citizenshipStatus: "100% Eligible for Turkish Citizenship ($400k+)",
      roiEstimate: "Annual 6.8% Net USD Rental Yield"
    },
    ar: {
      title: "ريزيدنس بانوراما أسوار توبكابي (باقة الجنسية التركية)",
      district: "توبكابي، زيتون بورنو / الفاتح / إسطنبول",
      propertyType: "ريزيدنس حضري",
      description: "بجوار أسوار إسطنبول التاريخية ومحطات المواصلات المركزية مباشرة، مؤجر لشركة دولية والطابو وملف الجنسية جاهزان للتسليم الفوري.",
      highlights: ["دقيقة واحدة من محطة الترام والمتروبوس", "مطل على الأسوار التاريخية", "مؤجر مع عائد فوري", "ملف الجنسية والطابو جاهز فوراً"],
      citizenshipStatus: "مطابق 100% للحصول على الجنسية التركية (400 ألف دولار+)",
      roiEstimate: "عائد صافي سنوي 6.8% بالدولار"
    },
    ru: {
      title: "Панорамная резиденция у стен Топкапы (Пакет Гражданство)",
      district: "Топкапы, Зейтинбурну / Фатих / Стамбул",
      propertyType: "Городская резиденция",
      description: "У стен древнего города и центральных транспортных узлов. Готовый арендатор, чистый тапу, 100% гарантия оформления гражданства Турции.",
      highlights: ["1 мин до трамвая и Метробуса", "Рядом с историческими стенами", "Сдан надежному арендатору", "Документы на гражданство готовы"],
      citizenshipStatus: "100% подходит для Гражданства Турции (от $400k)",
      roiEstimate: "6.8% годовых чистой валютной доходности"
    },
    de: {
      title: "Topkapi Panorama-Residenz an den Historischen Mauern",
      district: "Topkapi, Zeytinburnu / Fatih / Istanbul",
      propertyType: "Stadt-Residenz",
      description: "Direkt an den historischen Stadtmauern und den Hauptverkehrsknotenpunkten gelegen. Mit festem Mieter und vollständigem Staatsbürgerschaftspaket.",
      highlights: ["1 Min zur Straßenbahn & Metrobus", "Direkt an den historischen Mauern", "Vermietet an Firmenkunden", "Grundbuch & Staatsbürgerschaftsakte bereit"],
      citizenshipStatus: "100% qualifiziert für türkische Staatsbürgerschaft ($400k+)",
      roiEstimate: "Jährlich 6,8% Netto-Rendite in USD"
    },
    fr: {
      title: "Résidence Panorama Remparts de Topkapi (Pack Citoyenneté)",
      district: "Topkapi, Zeytinburnu / Fatih / Istanbul",
      propertyType: "Résidence Urbaine",
      description: "Aux portes des remparts historiques et des grands axes de transport, avec locataire en place et dossier de nationalité turque clé en main.",
      highlights: ["À 1 min du tramway et du Metrobus", "Face aux remparts historiques", "Locataire corporate en place", "Titre de propriété et dossier citoyenneté prêts"],
      citizenshipStatus: "100% éligible à la citoyenneté turque (seuil de 400k$+)",
      roiEstimate: "Rendement net annuel de 6,8% en USD"
    }
  },
  "invest-17": {
    tr: {
      title: "Arnavutköy Tarihi Rum Evi (Boğaz Manzaralı Bahçe)",
      district: "Arnavutköy Sahil Arkası, Beşiktaş / İstanbul",
      propertyType: "Tarihi Rum Evi",
      description: "Arnavutköy’ün Arnavut kaldırımlı masalsı sokaklarında, geleneksel ahşap cumbalı mimarisi ve huzur dolu iç bahçesiyle İstanbul ruhunu en saf haliyle sunan tescilli Rum evi.",
      highlights: ["Tarihi Ahşap Cumba", "Boğaz Manzaralı Özel Teras", "Avlu & İç Bahçe", "Balık Restoranlarına 100m"],
      citizenshipStatus: "Türk Vatandaşlığına & Kültür Mirasına Uygun",
      roiEstimate: "Yıllık %8 Dolar Bazlı Turistik Kiralama"
    },
    en: {
      title: "Arnavutkoy Historic Ottoman Greek House with Bosphorus Garden",
      district: "Arnavutkoy Coastal Enclave, Besiktas / Istanbul",
      propertyType: "Heritage Townhouse",
      description: "Nestled on the cobblestone lanes of Arnavutkoy with bay windows and a tranquil private courtyard garden, showcasing authentic Bosphorus heritage.",
      highlights: ["Traditional Wooden Bay Windows (Cumba)", "Private Terrace with Bosphorus Views", "Tranquil Courtyard Garden", "100m to Famous Seafood Promenade"],
      citizenshipStatus: "Eligible for Turkish Citizenship & Heritage Asset",
      roiEstimate: "Annual 8% USD Premium Cultural Tourism Rental"
    },
    ar: {
      title: "بيت رومي تاريخي مع حديقة بإطلالة على البوسفور في أرناؤوط كوي",
      district: "أرناؤوط كوي، بشكطاش / إسطنبول",
      propertyType: "منزل تاريخي عريق",
      description: "في أزقة أرناؤوط كوي المرصوفة بالحصى، منزل تراثي مسجل بالهندسة الخشبية العثمانية والرومية التقليدية وحديقة خاصة هادئة مطلة على البوسفور.",
      highlights: ["شرفات خشبية تقليدية (جومبا)", "تراس خاص بإطلالة على البوسفور", "فناء وحديقة داخلية هادئة", "100 متر من كورنيش ومطاعم الأسماك الشهيرة"],
      citizenshipStatus: "مطابق للحصول على الجنسية التركية وقيمة تراثية نادرة",
      roiEstimate: "عائد سنوي 8% بالدولار من التأجير السياحي الراقي"
    },
    ru: {
      title: "Исторический дом в Арнавуткёй с садом и видом на Босфор",
      district: "Арнавуткёй, Бешикташ / Стамбул",
      propertyType: "Исторический таунхаус",
      description: "На мощеных улочках Арнавуткёй с деревянными эркерами и уютным внутренним садом. Воплощение подлинного очарования старого Стамбула.",
      highlights: ["Традиционные деревянные эркеры", "Приватная терраса с видом на Босфор", "Уютный внутренний дворик-сад", "100 м до знаменитых рыбных ресторанов"],
      citizenshipStatus: "Подходит для Гражданства Турции и сохранения капитала",
      roiEstimate: "8% годовых в USD от премиальной аренды"
    },
    de: {
      title: "Arnavutköy Historisches Stadthaus mit Bosporus-Garten",
      district: "Arnavutkoy, Besiktas / Istanbul",
      propertyType: "Historisches Stadthaus",
      description: "In den charmanten Kopfsteinpflastergassen von Arnavutköy mit traditionellen Holzerkern und grünem Innenhofgarten direkt am Bosporus.",
      highlights: ["Traditionelle Holzerker (Cumba)", "Private Terrasse mit Bosporusblick", "Ruhiger Innenhofgarten", "100m zu den feinsten Fischrestaurants"],
      citizenshipStatus: "Qualifiziert für türkische Staatsbürgerschaft",
      roiEstimate: "Jährlich 8% Rendite via Luxus-Kulturtourismus"
    },
    fr: {
      title: "Maison Historique d'Arnavutkoy avec Jardin Vue Bosphore",
      district: "Arnavutkoy, Besiktas / Istanbul",
      propertyType: "Maison de Ville Historique",
      description: "Dans les ruelles pavées pittoresques d'Arnavutköy avec ses oriels en bois traditionnels et sa cour-jardin arborée avec vue sur le Bosphore.",
      highlights: ["Oriels en bois traditionnels (Cumba)", "Terrasse privée avec vue Bosphore", "Cour intérieure et jardin arboré", "À 100m des célèbres restaurants de poissons"],
      citizenshipStatus: "Éligible à la citoyenneté turque & patrimoine d'exception",
      roiEstimate: "Rendement annuel de 8% en USD (Tourisme culturel haut de gamme)"
    }
  },
  "invest-18": {
    tr: {
      title: "Çukurcuma Antikacılar Sokağı Teraslı Triplex Loft",
      district: "Çukurcuma, Beyoğlu / İstanbul",
      propertyType: "Triplex Loft",
      description: "Çukurcuma antikacılarının ve tasarım kafelerinin tam kalbinde, geniş terasından Tarihi Yarımada kubbelerini izleyebileceğiniz, eşsiz endüstriyel-vintage dekorasyonlu triplex loft.",
      highlights: ["Tarihi Yarımada Kubbeleri Manzarası", "Özel Jakuzili Teras", "Endüstriyel Tuğla & Çelik Mimari", "Masumiyet Müzesi Yanı"],
      citizenshipStatus: "İkamet İzni & Prestijli Tasarım Mülkü",
      roiEstimate: "Yıllık %10,5 Dolar Bazlı Airbnb VIP Geliri"
    },
    en: {
      title: "Cukurcuma Antiques District Rooftop Triplex Loft",
      district: "Cukurcuma, Beyoglu / Istanbul",
      propertyType: "Triplex Loft",
      description: "In the artisan heart of Cukurcuma amidst vintage boutiques, this triplex loft boasts a private rooftop jacuzzi terrace gazing at the domes of the Old City.",
      highlights: ["Historic Peninsula & Old City Dome Views", "Private Rooftop Jacuzzi Terrace", "Industrial Exposed Brick & Steel Design", "Beside Museum of Innocence"],
      citizenshipStatus: "Residence Permit Eligible & Trophy Design Asset",
      roiEstimate: "Annual 10.5% USD VIP Airbnb Cash Flow"
    },
    ar: {
      title: "تريبلكس لوفت مع تراس في زقاق الأنتيكات بتشوكور جمعة",
      district: "تشوكور جمعة، بيوغلو / إسطنبول",
      propertyType: "تريبلكس لوفت",
      description: "في قلب حي تشوكور جمعة للمقتنيات القديمة والمقاهي الفنية، تريبلكس لوفت بتصميم صناعي عتيق وتراس خاص مع جاكوزي يطل على قباب شبه الجزيرة التاريخية.",
      highlights: ["إطلالة على قباب شبه الجزيرة التاريخية", "تراس خاص مع جاكوزي", "تصميم صناعي فاخر من القرميد والصلب", "بجوار متحف البراءة"],
      citizenshipStatus: "مؤهل للإقامة العقارية وعقار بتصميم فني نادر",
      roiEstimate: "عائد سنوي 10.5% بالدولار عبر تأجير VIP على Airbnb"
    },
    ru: {
      title: "Триплекс-лофт с джакузи на крыше на улице Антикваров Чукурджума",
      district: "Чукурджума, Бейоглу / Стамбул",
      propertyType: "Триплекс Лофт",
      description: "В богемном антикварном квартале Чукурджума. Дизайнерский триплекс в стиле индастриал с террасой, джакузи и панорамой на купола Султанахмета.",
      highlights: ["Вид на купола Исторического полуострова", "Терраса с приватным джакузи", "Стиль лофт: кирпич и металл", "Рядом с Музеем Невинности"],
      citizenshipStatus: "Подходит для ВНЖ и получения премиального дохода",
      roiEstimate: "10.5% годовых в USD от сдачи VIP туристам"
    },
    de: {
      title: "Çukurcuma Antiquitätenviertel Triplex-Loft mit Dachterrasse",
      district: "Cukurcuma, Beyoglu / Istanbul",
      propertyType: "Triplex Loft",
      description: "Im charmanten Antiquitätenviertel Çukurcuma. Ein dreistöckiges Designer-Loft im Industrial-Stil mit Whirlpool-Dachterrasse und Blick auf die Altstadtkuppeln.",
      highlights: ["Blick auf die Kuppeln der historischen Halbinsel", "Dachterrasse mit privatem Whirlpool", "Industrieller Ziegel- & Stahldesign", "Direkt am Museum der Unschuld"],
      citizenshipStatus: "Geeignet für Aufenthaltserlaubnis",
      roiEstimate: "Jährlich 10,5% USD Airbnb-VIP-Rendite"
    },
    fr: {
      title: "Triplex Loft d'Artiste avec Terrasse à Cukurcuma",
      district: "Cukurcuma, Beyoglu / Istanbul",
      propertyType: "Triplex Loft",
      description: "Au cœur des antiquaires et cafés de créateurs de Çukurcuma, un triplex loft industriel et vintage avec terrasse jacuzzi surplombant les dômes de la péninsule historique.",
      highlights: ["Vue panoramique sur les dômes de la vieille ville", "Terrasse avec jacuzzi privatif", "Architecture industrielle briques et acier", "À côté du Musée de l'Innocence"],
      citizenshipStatus: "Éligible titre de séjour & bien d'exception design",
      roiEstimate: "Rendement locatif annuel de 10,5% en USD (Location VIP Airbnb)"
    }
  },
  "invest-19": {
    tr: {
      title: "Bakırköy Sahil Kordonunda Deniz Manzaralı 3+1 Rezidans",
      district: "Ataköy / Bakırköy Sahil, İstanbul",
      propertyType: "Lüks Sahil Rezidansı",
      description: "Rusça konuşan turist ve yatırımcıların en çok tercih ettiği Bakırköy-Ataköy sahil kordonunda, geniş yaşam alanları ve birinci sınıf malzeme kalitesiyle donatılmış deniz manzaralı aile konutu.",
      highlights: ["Kesintisiz Deniz Manzarası", "Ataköy Marinaya 5 dk", "Geniş Balkon & Ebeveyn Banyosu", "Kapalı Otopark"],
      citizenshipStatus: "Türk Vatandaşlığına Tam Uygun ($400k+ Barajı)",
      roiEstimate: "Yıllık %6,5 Dolar Bazlı Uzun Dönem Kiracı"
    },
    en: {
      title: "Bakirkoy Waterfront Promenade Sea View 3+1 Residence",
      district: "Atakoy / Bakirkoy Waterfront, Istanbul",
      propertyType: "Luxury Coastal Residence",
      description: "On the prestigious Atakoy-Bakirkoy coastal promenade, offering panoramic Marmara Sea vistas, expansive living layouts and top-tier construction quality.",
      highlights: ["Unobstructed Panoramic Sea Views", "5 Min to Atakoy Marina", "Spacious Balcony & Master En-Suite", "Covered Underground Parking"],
      citizenshipStatus: "100% Eligible for Turkish Citizenship ($400k+)",
      roiEstimate: "Annual 6.5% Net USD Long-term Family Rental"
    },
    ar: {
      title: "ريزيدنس 3+1 بإطلالة بحرية على كورنيش باكركوي وأتاكوي",
      district: "أتاكوي / باكركوي، إسطنبول",
      propertyType: "ريزيدنس ساحلي فاخر",
      description: "على كورنيش أتاكوي وباكركوي الساحلي الفاخر، شقة عائلية واسعة بإطلالة بحرية بانورامية لا تنقطع وتشطيبات عالية الجودة.",
      highlights: ["إطلالة بحرية بانورامية مفتوحة", "5 دقائق من مارينا أتاكوي", "شرفة واسعة وغرفة ماستر", "موقف سيارات مغطى"],
      citizenshipStatus: "مطابقة 100% للحصول على الجنسية التركية (400 ألف دولار+)",
      roiEstimate: "عائد إيجاري عائلي سنوي 6.5% بالدولار"
    },
    ru: {
      title: "Элитная видовая резиденция 3+1 на набережной Бакыркёй / Атакёй",
      district: "Набережная Атакёй / Бакыркёй, Стамбул",
      propertyType: "Элитная приморская резиденция",
      description: "На престижной набережной Атакёй-Бакыркёй. Панорамный вид на Мраморное море, просторная планировка, близость к марине и премиальный комфорт.",
      highlights: ["Прямой панорамный вид на море", "5 мин до марины Атакёй", "Большой балкон и мастер-спальня", "Подземный паркинг"],
      citizenshipStatus: "100% подходит для Гражданства Турции (от $400k)",
      roiEstimate: "6.5% годовых стабильного дохода в USD"
    },
    de: {
      title: "Bakırköy Strandpromenade Meerblick 3+1 Residenz",
      district: "Atakoy / Bakirkoy Küste, Istanbul",
      propertyType: "Luxus-Küstenresidenz",
      description: "An der exklusiven Küstenpromenade von Ataköy-Bakırköy mit freiem Blick auf das Marmarameer, großzügigen Grundrissen und bester Bauqualität.",
      highlights: ["Unverbauter Panorama-Meerblick", "5 Min zur Ataköy Marina", "Großer Balkon & Master-Bad", "Tiefgarage"],
      citizenshipStatus: "100% qualifiziert für türkische Staatsbürgerschaft ($400k+)",
      roiEstimate: "Jährlich 6,5% Netto-Mietrendite in USD"
    },
    fr: {
      title: "Résidence de Luxe 3+1 Vue Mer Front de Mer Bakirkoy / Atakoy",
      district: "Front de Mer Atakoy / Bakirkoy, Istanbul",
      propertyType: "Résidence Côtière de Luxe",
      description: "Sur la prestigieuse promenade maritime d'Ataköy-Bakırköy, avec vue imprenable sur la mer de Marmara, grands volumes et prestations haut de gamme.",
      highlights: ["Vue mer panoramique dégagée", "À 5 min de la Marina d'Ataköy", "Grand balcon et suite parentale", "Parking souterrain sécurisé"],
      citizenshipStatus: "100% éligible pour la citoyenneté turque (seuil de 400k$+)",
      roiEstimate: "Rendement locatif annuel de 6,5% en USD"
    }
  },
  "invest-20": {
    tr: {
      title: "Maltepe Dragos Tepesi Adalar Manzaralı Akıllı Daire",
      district: "Dragos, Maltepe / İstanbul (Anadolu Yakası)",
      propertyType: "Akıllı Daire",
      description: "Dragos’un huzurlu atmosferinde, deniz manzarası ve modern site olanaklarını bütçe dostu fiyatla sunan, yabancı yatırımcılar için yüksek kira çarpanına sahip anahtar teslim modern daire.",
      highlights: ["Adalar ve Deniz Manzarası", "Geniş Sosyal Tesis ve Havuz", "Akıllı Ev Altyapısı", "Sahil Parkına Yürüme Mesafesi"],
      citizenshipStatus: "İkamet İzni & Yüksek Prim Potansiyeli",
      roiEstimate: "Yıllık %8 Dolar Bazlı Kira Getirisi"
    },
    en: {
      title: "Maltepe Dragos Hill Princes' Islands View Smart Residence",
      district: "Dragos, Maltepe / Istanbul (Asian Side)",
      propertyType: "Smart Residence",
      description: "In the peaceful hills of Dragos, offering panoramic Princes' Islands views, comprehensive community amenities and strong rental cash flow at an attractive price point.",
      highlights: ["Panoramic Islands & Sea Views", "Large Swimming Pool & Social Complex", "Smart Home Automation", "Walking Distance to Coastal Parks"],
      citizenshipStatus: "Residence Permit Eligible & High Capital Growth",
      roiEstimate: "Annual 8% Net USD Rental Cash Flow"
    },
    ar: {
      title: "شقة ذكية على تلة دراغوس بمالتبه بإطلالة على جزر الأميرات",
      district: "دراغوس، مالتبه / إسطنبول (الجانب الآسيوي)",
      propertyType: "شقة ذكية",
      description: "في أجواء دراغوس الهادئة والراقية، تجمع بين الإطلالة البحرية على جزر الأميرات والخدمات المتكاملة بسعر استثماري جذاب وعائد إيجاري ممتاز.",
      highlights: ["إطلالة ساحرة على جزر الأميرات والبحر", "مجمع متكامل مع مسابح ونادٍ صحي", "تقنيات المنزل الذكي", "مسافة قصيرة سيراً إلى حدائق الساحل"],
      citizenshipStatus: "مؤهلة للإقامة العقارية ونمو سنوي مرتفع للقيمة",
      roiEstimate: "عائد إيجاري صافي 8% سنوياً بالدولار"
    },
    ru: {
      title: "Смарт-квартира на холме Драгос с панорамой Принцевых островов",
      district: "Драгос, Мальтепе / Стамбул (Азиатская сторона)",
      propertyType: "Смарт-квартира",
      description: "В престижном тихом районе Драгос. Панорамный вид на Принцевы острова, богатая инфраструктура комплекса, высокая арендная доходность.",
      highlights: ["Вид на море и Принцевы острова", "Бассейн и фитнес-клуб в комплексе", "Система 'Умный дом'", "Пешком до приморского парка"],
      citizenshipStatus: "Подходит под ВНЖ и быструю капитализацию",
      roiEstimate: "8% годовых чистого дохода в USD"
    },
    de: {
      title: "Maltepe Dragos Hügel Smart-Apartment mit Inselblick",
      district: "Dragos, Maltepe / Istanbul (Asiatische Seite)",
      propertyType: "Smart-Apartment",
      description: "Auf den ruhigen Hügeln von Dragos mit Panoramablick auf die Prinzeninseln. Moderne Anlage mit Pools und hoher Mietnachfrage zu attraktivem Preis.",
      highlights: ["Insel- und Meerblick", "Großer Pool & Club-Einrichtungen", "Smart-Home-Technologie", "Fußläufig zum Küstenpark"],
      citizenshipStatus: "Geeignet für Aufenthaltserlaubnis",
      roiEstimate: "Jährlich 8% Netto-Mietrendite in USD"
    },
    fr: {
      title: "Appartement Connecté sur la Colline de Dragos avec Vue Îles",
      district: "Dragos, Maltepe / Istanbul (Rive Asiatique)",
      propertyType: "Appartement Connecté",
      description: "Sur les hauteurs paisibles de Dragos, offrant une vue panoramique sur les îles des Princes, des prestations de résidence modernes et une forte rentabilité.",
      highlights: ["Vue panoramique sur les îles et la mer", "Grand complexe aquatique et fitness", "Domotique intelligente", "À quelques pas des parcs du littoral"],
      citizenshipStatus: "Éligible permis de séjour & forte appréciation",
      roiEstimate: "Rendement locatif net de 8% par an en USD"
    }
  }
};

export function getLocalizedProperty(prop: PropertyListing, lang: Language): LocalizedPropertyContent {
  const dict = INVEST_DICTIONARY[prop.id];
  if (dict && dict[lang]) {
    return dict[lang];
  }
  if (dict && dict.en) {
    return dict.en;
  }
  return {
    title: prop.title,
    district: prop.district,
    propertyType: prop.propertyType || "Rezidans",
    description: prop.description,
    highlights: prop.highlights || [],
    citizenshipStatus: (prop as any).citizenshipStatus || "Uygun",
    roiEstimate: (prop as any).roiEstimate || "Yüksek Getiri"
  };
}

export const INVEST_MODAL_I18N: Record<Language, any> = {
  tr: {
    close: "Kapat",
    tourTitle: "VIP Keşif Turu Rezervasyonu",
    fullName: "Ad Soyad",
    fullNamePlaceholder: "Adınız ve soyadınız",
    phone: "Telefon / WhatsApp",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "Tercih Edilen Tarih / Saat",
    vehicle: "Transfer Aracı",
    spokenLanguage: "Rehber Dil Tercihi",
    notes: "Yatırım Amacı / Notlar",
    notesPlaceholder: "Vatandaşlık, kira getirisi, oturum veya özel talepleriniz...",
    bookTourBtn: "Keşif Turu Randevusu Oluştur",
    tourSuccess: "Keşif Turu Talebiniz Alındı!",
    tourSuccessDesc: "VIP transfer aracınız otelinizden sizi alacaktır.",
    citizenship: "Vatandaşlık Durumu",
    roi: "Tahmini Getiri (ROI)",
    specs: "Mülk Özellikleri",
    agency: "Geliştirici & Danışman",
    bedrooms: "Yatak Odası",
    grossArea: "Brüt Alan",
    priceRange: "Fiyat",
    backToListings: "İlanlara Dön"
  },
  en: {
    close: "Close",
    tourTitle: "VIP Discovery Tour Booking",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    phone: "Phone / WhatsApp",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "Preferred Date & Time",
    vehicle: "Transfer Vehicle",
    spokenLanguage: "Guide Language Preference",
    notes: "Investment Goal / Special Notes",
    notesPlaceholder: "Citizenship, rental ROI, lifestyle relocation...",
    bookTourBtn: "Schedule VIP Discovery Tour",
    tourSuccess: "Discovery Tour Request Received!",
    tourSuccessDesc: "Your chauffeured VIP transfer will pick you up from the hotel.",
    citizenship: "Citizenship Status",
    roi: "Estimated ROI",
    specs: "Property Details",
    agency: "Developer & Agency",
    bedrooms: "Bedrooms",
    grossArea: "Gross Area",
    priceRange: "Price",
    backToListings: "Back to Listings"
  },
  ar: {
    close: "إغلاق",
    tourTitle: "حجز جولة المعاينة العقارية VIP",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "اسمك الكامل",
    phone: "الهاتف / واتساب",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "التاريخ والوقت المفضل",
    vehicle: "سيارة التوصيل",
    spokenLanguage: "لغة المرشد العقاري",
    notes: "الهدف الاستثماري وملاحظات خاصة",
    notesPlaceholder: "الجنسية التركية، عائد الإيجار، السكن العائلي...",
    bookTourBtn: "تأكيد موعد الجولة العقارية VIP",
    tourSuccess: "تم استلام طلب الجولة بنجاح!",
    tourSuccessDesc: "سيتم نقلك بسيارة VIP خاصة من الفندق مباشرة.",
    citizenship: "أهلية الجنسية",
    roi: "العائد الاستثماري المتوقع",
    specs: "مواصفات العقار",
    agency: "المطور والوسيط المعتمد",
    bedrooms: "غرف النوم",
    grossArea: "المساحة الإجمالية",
    priceRange: "السعر",
    backToListings: "العودة للعقارات"
  },
  ru: {
    close: "Закрыть",
    tourTitle: "Бронирование VIP Инвест-Тура",
    fullName: "Полное имя",
    fullNamePlaceholder: "Ваше имя и фамилия",
    phone: "Телефон / WhatsApp",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "Желаемая дата и время",
    vehicle: "Трансферный автомобиль",
    spokenLanguage: "Язык гида-консультанта",
    notes: "Цель инвестиций / Пожелания",
    notesPlaceholder: "Гражданство, арендный доход, переезд...",
    bookTourBtn: "Забронировать VIP Инвест-Тур",
    tourSuccess: "Заявка на тур успешно принята!",
    tourSuccessDesc: "VIP трансфер заберет вас прямо из отеля.",
    citizenship: "Статус гражданства",
    roi: "Ожидаемая доходность (ROI)",
    specs: "Характеристики объекта",
    agency: "Девелопер и агентство",
    bedrooms: "Спальни",
    grossArea: "Площадь",
    priceRange: "Цена",
    backToListings: "Назад к списку"
  },
  de: {
    close: "Schließen",
    tourTitle: "VIP Besichtigungstour Buchen",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Ihr vollständiger Name",
    phone: "Telefon / WhatsApp",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "Wunschtermin & Uhrzeit",
    vehicle: "Transferfahrzeug",
    spokenLanguage: "Sprache des Beraters",
    notes: "Investitionsziel / Notizen",
    notesPlaceholder: "Staatsbürgerschaft, Mietrendite, Eigennutzung...",
    bookTourBtn: "VIP Besichtigungstermin vereinbaren",
    tourSuccess: "Besichtigungsanfrage erfolgreich gesendet!",
    tourSuccessDesc: "Ihr VIP-Shuttle holt Sie direkt vom Hotel ab.",
    citizenship: "Staatsbürgerschafts-Status",
    roi: "Geschätzte Rendite (ROI)",
    specs: "Immobiliendetails",
    agency: "Bauträger & Agentur",
    bedrooms: "Schlafzimmer",
    grossArea: "Gesamtfläche",
    priceRange: "Preis",
    backToListings: "Zurück zur Übersicht"
  },
  fr: {
    close: "Fermer",
    tourTitle: "Réservation Visite VIP Découverte",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom et prénom",
    phone: "Téléphone / WhatsApp",
    phonePlaceholder: "+90 5XX XXX XX XX",
    preferredDate: "Date et heure souhaitées",
    vehicle: "Véhicule de transfert",
    spokenLanguage: "Langue du conseiller",
    notes: "Objectif d'investissement / Notes",
    notesPlaceholder: "Citoyenneté, rendement locatif, résidence...",
    bookTourBtn: "Confirmer la Visite VIP",
    tourSuccess: "Demande de visite bien reçue !",
    tourSuccessDesc: "Votre chauffeur VIP viendra vous chercher directement à l'hôtel.",
    citizenship: "Éligibilité citoyenneté",
    roi: "Rendement estimé (ROI)",
    specs: "Caractéristiques du bien",
    agency: "Promoteur & Agence",
    bedrooms: "Chambres",
    grossArea: "Superficie",
    priceRange: "Prix",
    backToListings: "Retour aux annonces"
  }
};
