import { Language } from './types';

export const translations = {
  tr: {
    appTitle: "Xenios",
    appSubtitle: "İstanbul Dijital Misafir Rehberi & Concierge",
    welcome: "Hoş Geldiniz",
    room: "Oda",
    wifiTitle: "Otel Wi-Fi Bilgileri",
    wifiNetwork: "Ağ",
    wifiPassword: "Şifre",
    wifiCopy: "Kopyala",
    wifiCopied: "Şifre Kopyalandı!",
    reception: "Resepsiyon",
    breakfast: "Kahvaltı",
    checkout: "Çıkış Saati",
    myRequests: "Taleplerim",
    activeRequests: "Oda Taleplerim & İstek Durumu",
    noActiveRequests: "Henüz bekleyen bir talep bulunmuyor.",
    loginRegister: "Giriş Yap / Kaydol",
    myAccount: "Hesabım",
    guestSession: "Misafir Oturumu",
    hotelManager: "Otel Yöneticisi",
    logout: "Çıkış Yap",
    hotelCardDetails: "Otel Bilgileri & İletişim",
    address: "Adres",
    phone: "Telefon",
    website: "Web Sitesi",
    receptionExt: "Resepsiyon Dahili",
    
    // Tabs
    tabs: {
      services: "Otel",
      experiences: "Deneyimler",
      categories: "Kategoriler",
      aiGuide: "comusAI",
      practical: "Rehber",
      invest: "Invest",
      requests: "Taleplerim"
    },

    // In-Room Services Banner
    catalogBadge: "İstanbul Deneyimleri Kataloğu",
    catalogTitle: "Boğaz Turları, Seçkin Restoranlar, Hamamlar & VIP Deneyimler",
    catalogDesc: "İstanbul'un 72 seçkin ve doğrulanmış işletme ve restoran ilanını inceleyin; otelinizden ayrılmadan güvenle yerinizi ayırtın.",
    exploreCatalogBtn: "Kataloğu Keşfet (72 İlan) →",
    
    servicesTitle: "Otel İçi Hizmetler",
    servicesSubtitle: "Odanızdan tek tıkla talep oluşturun, kat hizmetleri ve resepsiyon anında yönlendirilsin.",
    services: {
      breakfast: "Kahvaltı Talebi",
      dnd: "Rahatsız Etmeyin",
      cleaning: "Oda Temizliği",
      towels: "Temiz Havlu",
      linens: "Çarşaf & Nevresim",
      pillows: "Ekstra Yastık",
      toiletries: "Banyo Bukleti",
      hygiene: "Hijyen & Bakım Seti",
      roomservice: "Oda Servisi",
      minibar: "Mini Bar Dolumu",
      safe: "Kasa & Güvenlik",
      technical: "Teknik Destek",
      laundry: "Çamaşırhane & Ütü",
      lateCheckout: "Geç Çıkış Talebi",
      extendStay: "Konaklama Uzatma",
      taxi: "Taksi Çağır",
      hotelInfo: "Otel Rehberi & Bilgi"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "Deneyim & Hizmet Kategorileri",
    categoriesSubtitle: "12 özel kategoride TÜRSAB onaylı seçkin turlar, biletler, lezzetler ve yatırım fırsatları.",
    listingsCount: "İlan",
    inspectListings: "İlanları İncele",
    categoriesList: {
      invest: { title: "İstanbul'da Yatırım", desc: "Vatandaşlığa uygun lüks rezidanslar, tarihi yalılar & Airbnb mülkleri" },
      restaurants: { title: "Önerdiğimiz Restoranlar", desc: "Michelin yıldızlı şefler, tarihi lezzetler & Boğaz manzaralı teraslar" },
      bosphorus: { title: "Boğaz Turları & Yat", desc: "Akşam yemekli turlar, özel yat kiralama & Adalar rotaları" },
      history: { title: "Tarih & Müzeler", desc: "Ayasofya, Topkapı Sarayı, Yerebatan & Arkeoloji Müzeleri" },
      gastronomy: { title: "Gastronomi & Gurme", desc: "Sokak lezzetleri, Türk kahvesi atölyesi & Boğaz meyhaneleri" },
      photo: { title: "Fotoğraf & Kostüm", desc: "Uçuşan elbise çekimi & otantik Osmanlı kaftan çekimleri" },
      adventure: { title: "Macera & Doğa", desc: "Orman içi zipline, ip parkuru & kano safarileri" },
      hamam: { title: "Türk Hamamı & Spa", desc: "Tarihi Kılıç Ali Paşa, Hürrem Sultan & VIP köpük masajı" },
      shopping: { title: "Alışveriş & Çarşılar", desc: "Kapalıçarşı, Mısır Çarşısı & el dokuma halı rehberi" },
      art: { title: "Sanat & Semazen", desc: "Mevlevi Sema ayini, ebru & mozaik lamba yapımı" },
      culture: { title: "Kültürel Miras", desc: "Fener-Balat, Musevi Sinagogları & Süryani mirası" },
      transfer: { title: "Özel VIP Transfer", desc: "Havalimanı karşılama, şoförlü lüks Mercedes Vito" }
    },

    // Experiences Catalog
    experiencesTitle: "İstanbul Hizmet & Deneyim Kataloğu",
    experiencesSubtitle: "13 özel kategoride TÜRSAB lisanslı ve seçkin İstanbul turları, biletler ve aktiviteler.",
    allCategories: "Tüm Kategoriler",
    searchPlaceholder: "Deneyim, tur veya etkinlik ara...",
    bookNow: "Rezervasyon Yap",
    buyNow: "Hemen Satın Al",
    reserveTable: "Masa Rezerve Et",
    details: "Detaylar",
    price: "Fiyat",
    priceLevel: "Fiyat / Seviye",
    specialties: "Öne Çıkan Lezzetler",
    duration: "Süre",
    location: "Konum",
    rating: "Puan",
    tursabCertified: "TÜRSAB Lisanslı İlan",
    freeCancellation: "Ücretsiz İptal Garantisi",
    instantConfirmation: "Anında Onay",
    
    // Transit Modal
    transitTitle: "Otelden Ulaşım Seçenekleri",
    transitSubtitle: "Otelinizden deneyim noktasına en hızlı ve güvenli ulaşım yolları.",
    taxiOption: "Sarı Taksi (Tahmini Ücret & Süre)",
    vipOption: "VIP Mercedes Vito Transfer",
    transitOption: "Toplu Taşıma (Tramvay / Metro / Vapur)",
    openInGoogleMaps: "Google Haritalar'da Aç",
    
    // Virtual POS Modal
    posTitle: "Güvenli Sanal POS Ödeme Masası",
    posSubtitle: "256-Bit SSL ve 3D Secure güvencesiyle anında rezervasyon satın alımı.",
    posCardHolder: "Kart Üzerindeki İsim",
    posCardNumber: "Kart Numarası",
    posExpiry: "Son Kullanma (AA/YY)",
    posCvv: "CVV",
    posPayButton: "Güvenli Öde",
    posSuccess: "Ödeme Başarıyla Alındı!",
    posSmsNotice: "İlan sahibine SMS ve E-posta ile onay linki iletildi. Onaylandığında Google Takvim senkronizasyon linkiniz açılacaktır.",
    addToCalendar: "Google Takvime Ekle",
    pendingApproval: "İlan Sahibi Onayı Bekleniyor...",
    approved: "Rezervasyon Onaylandı!",

    // Restaurant Reservation Modal
    restaurantModalTitle: "Masa Rezervasyonu",
    restaurantModalSubtitle: "Önceden yerinizi ayırtın, sıra beklemeden şefin özel ikramlarıyla ağırlanın.",
    guestCount: "Kişi Sayısı",
    date: "Tarih",
    time: "Saat",
    specialRequests: "Özel İstekler / Notunuz (Örn: Boğaz manzaralı masa, doğum günü)",
    confirmReservation: "Masa Rezervasyonunu Onayla",

    // comusAI Concierge
    aiTitle: "comusAI - Kişisel İstanbul Rehberiniz",
    aiSubtitle: "Zevklerinize, bütçenize ve rotanıza göre 7/24 Google Gemini destekli canlı asistan.",
    aiPlaceholder: "İstanbul hakkında ne bilmek istersiniz? (Örn: En iyi Boğaz kahvaltısı nerede?)",
    aiSend: "Gönder",
    knowMeBtn: "Beni Tanı",
    myPreferencesBtn: "Tercihlerim",
    knowMeChip: "✨ Beni Tanı (Kişisel Öneriler)",

    // Practical Info & Ombudsman
    practicalTitle: "İstanbul Pratik Bilgiler & Misafir Kalkanı",
    practicalSubtitle: "İstanbul seyahatinizi kolaylaştıracak resmi bilet, kart, güvenlik kalkanı ve acil bilgiler.",
    istanbulkartTitle: "İstanbulkart (Toplu Taşıma Kartı)",
    istanbulkartDesc: "Tüm metro, tramvay, metrobüs ve vapurlarda geçerlidir. Online bakiye yükleme ve mobil dijital kartınızı edinin.",
    istanbulkartLink: "İstanbulkart Resmi Sayfası / Online Yükleme",
    muzekartTitle: "MüzeKart & Resmi Biletler",
    muzekartDesc: "Kültür ve Turizm Bakanlığı'na bağlı saray, müze ve ören yerlerine sıra beklemeden hızlı geçiş yapın.",
    muzekartLink: "muze.gov.tr Resmi Bilet ve Kart Satın Al",
    emergencyTitle: "Önemli İletişim & Acil Numaralar",

    // Invest in Istanbul
    investTitle: "Invest & Live in Istanbul",
    investSubtitle: "Vatandaşlığa uygun lüks rezidanslar, tarihi yalılar ve yüksek kira getirili portföyler.",
    allPersonas: "Tüm Portföy",
    citizenshipFilter: "Vatandaşlık ($400k+)",
    airbnbFilter: "Airbnb & Kısa Dönem",
    luxuryFilter: "Lüks Boğaz & Prestij",
    bookDiscoveryTour: "VIP Keşif Randevusu Al",
    citizenshipEligible: "Vatandaşlığa Uygun",
    viewPropertyDetails: "Mülkü İncele",
    contactAgency: "Danışman ile Görüş",
    priceRange: "Fiyat",
    size: "Alan",
    bedrooms: "Oda Sayısı",

    // Requests Status
    liveRequests: "Canlı Oda Talepleri",
    noRequests: "Henüz bekleyen bir talep bulunmuyor.",
    requestStatus: {
      pending: "Bekliyor",
      in_progress: "İşlemde",
      completed: "Tamamlandı",
      cancelled: "İptal Edildi"
    }
  },

  en: {
    appTitle: "Xenios",
    appSubtitle: "Istanbul Digital Guest Directory & Concierge",
    welcome: "Welcome",
    room: "Room",
    wifiTitle: "Hotel Wi-Fi Credentials",
    wifiNetwork: "Network",
    wifiPassword: "Password",
    wifiCopy: "Copy",
    wifiCopied: "Password Copied!",
    reception: "Reception",
    breakfast: "Breakfast",
    checkout: "Check-out Time",
    myRequests: "My Requests",
    activeRequests: "In-Room Requests & Live Status",
    noActiveRequests: "No pending requests at the moment.",
    loginRegister: "Sign In / Register",
    myAccount: "My Account",
    guestSession: "Guest Session",
    hotelManager: "Hotel Manager",
    logout: "Sign Out",
    hotelCardDetails: "Hotel Details & Contact",
    address: "Address",
    phone: "Phone",
    website: "Website",
    receptionExt: "Reception Ext.",

    // Tabs
    tabs: {
      services: "Hotel",
      experiences: "Experiences",
      categories: "Categories",
      aiGuide: "comusAI",
      practical: "Guide",
      invest: "Invest",
      requests: "My Requests"
    },

    // In-Room Services Banner
    catalogBadge: "Istanbul Experiences Catalog",
    catalogTitle: "Bosphorus Cruises, Fine Dining, Turkish Baths & VIP Tours",
    catalogDesc: "Explore 72 verified premier tours and fine dining spots; reserve seamlessly from your room without leaving your hotel.",
    exploreCatalogBtn: "Explore Catalog (72 Listings) →",

    servicesTitle: "In-Room Hotel Services",
    servicesSubtitle: "Make 1-tap requests from your room directly dispatched to housekeeping and reception.",
    services: {
      breakfast: "Breakfast Request",
      dnd: "Do Not Disturb",
      cleaning: "Room Cleaning",
      towels: "Fresh Towels",
      linens: "Bedsheet Change",
      pillows: "Extra Pillow",
      toiletries: "Bathroom Amenities",
      hygiene: "Hygiene Care Kit",
      roomservice: "Room Service Menu",
      minibar: "Minibar Refill",
      safe: "Safe & Security",
      technical: "Maintenance Support",
      laundry: "Laundry & Ironing",
      lateCheckout: "Late Check-out Request",
      extendStay: "Extend Stay",
      taxi: "Call a Taxi",
      hotelInfo: "Hotel Guide & Info"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "Experience & Service Categories",
    categoriesSubtitle: "12 curated categories of TÜRSAB-certified tours, tickets, culinary delights, and real estate.",
    listingsCount: "Listings",
    inspectListings: "Browse Listings",
    categoriesList: {
      invest: { title: "Invest in Istanbul", desc: "Citizenship-eligible luxury residences, waterfront mansions & Airbnb properties" },
      restaurants: { title: "Recommended Restaurants", desc: "Michelin-starred chefs, historic gastronomy & Bosphorus view terraces" },
      bosphorus: { title: "Bosphorus & Yacht Cruises", desc: "Dinner cruises, private yacht charters & Princes' Islands itineraries" },
      history: { title: "History & Museums", desc: "Hagia Sophia, Topkapi Palace, Basilica Cistern & Archaeology Museums" },
      gastronomy: { title: "Gastronomy & Food Tours", desc: "Street food trails, Turkish coffee workshops & Bosphorus taverns" },
      photo: { title: "Photography & Costumes", desc: "Flying dress photo sessions & authentic Ottoman kaftan shoots" },
      adventure: { title: "Adventure & Nature", desc: "Forest zipline, high-rope obstacle courses & canoeing safaris" },
      hamam: { title: "Turkish Bath & Spa", desc: "Historic Kilic Ali Pasa, Hurrem Sultan & VIP foam massages" },
      shopping: { title: "Shopping & Bazaars", desc: "Grand Bazaar, Spice Market & handmade Turkish carpet guides" },
      art: { title: "Art & Whirling Dervishes", desc: "Mevlevi Sema ceremonies, water marbling (Ebru) & mosaic lamp making" },
      culture: { title: "Cultural Heritage", desc: "Fener-Balat, Jewish Synagogues & Syriac heritage trails" },
      transfer: { title: "Private VIP Transfer", desc: "Airport meet & greet with private chauffeured luxury Mercedes Vito" }
    },

    // Experiences Catalog
    experiencesTitle: "Istanbul Curated Experiences & Tours",
    experiencesSubtitle: "13 categories of TÜRSAB-certified premier tours, tickets, and activities.",
    allCategories: "All Categories",
    searchPlaceholder: "Search experience, tour, or activity...",
    bookNow: "Book Now",
    buyNow: "Purchase Now",
    reserveTable: "Reserve Table",
    details: "Details",
    price: "Price",
    priceLevel: "Price / Level",
    specialties: "Signature Specialties",
    duration: "Duration",
    location: "Location",
    rating: "Rating",
    tursabCertified: "TÜRSAB Licensed Listing",
    freeCancellation: "Free Cancellation Guarantee",
    instantConfirmation: "Instant Confirmation",

    // Transit Modal
    transitTitle: "Transit Options from Hotel",
    transitSubtitle: "Fastest and most convenient ways to reach your experience destination.",
    taxiOption: "Yellow Taxi (Est. Fare & Duration)",
    vipOption: "VIP Mercedes Vito Transfer",
    transitOption: "Public Transit (Tram / Metro / Ferry)",
    openInGoogleMaps: "Open in Google Maps",

    // Virtual POS Modal
    posTitle: "Secure Virtual POS Payment",
    posSubtitle: "Instant booking purchase with 256-Bit SSL and 3D Secure guarantee.",
    posCardHolder: "Cardholder Name",
    posCardNumber: "Card Number",
    posExpiry: "Expires (MM/YY)",
    posCvv: "CVV",
    posPayButton: "Pay Securely",
    posSuccess: "Payment Successful!",
    posSmsNotice: "SMS and Email approval request sent to provider. Once approved, your 1-click Google Calendar sync will be ready.",
    addToCalendar: "Add to Google Calendar",
    pendingApproval: "Waiting for Provider Approval...",
    approved: "Booking Confirmed!",

    // Restaurant Reservation Modal
    restaurantModalTitle: "Table Reservation",
    restaurantModalSubtitle: "Reserve your table in advance and enjoy priority seating with chef's compliments.",
    guestCount: "Guests",
    date: "Date",
    time: "Time",
    specialRequests: "Special Requests / Notes (e.g. Bosphorus view table, birthday)",
    confirmReservation: "Confirm Table Reservation",

    // comusAI Concierge
    aiTitle: "comusAI - Personal Istanbul Concierge",
    aiSubtitle: "24/7 Google Gemini-powered guide tailored to your tastes, budget, and route.",
    aiPlaceholder: "Ask anything about Istanbul... (e.g. Best sunset rooftop near Galata?)",
    aiSend: "Send",
    knowMeBtn: "Get to Know Me",
    myPreferencesBtn: "My Preferences",
    knowMeChip: "✨ Get to Know Me (Personalized Tips)",

    // Practical Info & Ombudsman
    practicalTitle: "Istanbul Practical Guides & Guest Shield",
    practicalSubtitle: "Essential transit cards, museum passes, tourist rights ombudsman, and emergency contacts.",
    istanbulkartTitle: "Istanbulkart (Public Transit Card)",
    istanbulkartDesc: "Valid across all metro, tram, Marmaray, and ferries. Top up online and get digital QR card.",
    istanbulkartLink: "Official Istanbulkart Online Portal",
    muzekartTitle: "Museum Pass & Official Tickets",
    muzekartDesc: "Skip ticket queues at top historic museums, palaces, and heritage sites with official pass.",
    muzekartLink: "muze.gov.tr Official Museum Tickets",
    emergencyTitle: "Essential Contacts & Emergency",

    // Invest in Istanbul
    investTitle: "Invest & Live in Istanbul",
    investSubtitle: "Citizenship-eligible luxury residences, historical mansions, and high-yield properties.",
    allPersonas: "All Portfolio",
    citizenshipFilter: "Citizenship ($400k+)",
    airbnbFilter: "Airbnb & Short Term",
    luxuryFilter: "Luxury Bosphorus & Prestige",
    bookDiscoveryTour: "Book VIP Discovery Tour",
    citizenshipEligible: "Citizenship Eligible",
    viewPropertyDetails: "View Property",
    contactAgency: "Contact Consultant",
    priceRange: "Price",
    size: "Area",
    bedrooms: "Bedrooms",

    // Requests Status
    liveRequests: "Live In-Room Requests",
    noRequests: "No pending requests at the moment.",
    requestStatus: {
      pending: "Pending",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled"
    }
  },

  ar: {
    appTitle: "زينيوس",
    appSubtitle: "دليل النزلاء والكونسيرج الرقمي في إسطنبول",
    welcome: "أهلاً وسهلاً",
    room: "غرفة",
    wifiTitle: "بيانات الواي فاي في الفندق",
    wifiNetwork: "الشبكة",
    wifiPassword: "كلمة المرور",
    wifiCopy: "نسخ",
    wifiCopied: "تم نسخ كلمة المرور!",
    reception: "الاستقبال",
    breakfast: "الإفطار",
    checkout: "وقت تسجيل المغادرة",
    myRequests: "طلباتي",
    activeRequests: "طلبات الغرفة والحالة المباشرة",
    noActiveRequests: "لا توجد طلبات معلقة حالياً.",
    loginRegister: "تسجيل الدخول / إنشاء حساب",
    myAccount: "حسابي",
    guestSession: "جلسة النزيل",
    hotelManager: "مدير الفندق",
    logout: "تسجيل الخروج",
    hotelCardDetails: "معلومات الفندق والتواصل",
    address: "العنوان",
    phone: "الهاتف",
    website: "الموقع الإلكتروني",
    receptionExt: "تحويلة الاستقبال",

    // Tabs
    tabs: {
      services: "الفندق",
      experiences: "التجارب",
      categories: "الفئات",
      aiGuide: "comusAI",
      practical: "الدليل",
      invest: "استثمار",
      requests: "طلباتي"
    },

    // In-Room Services Banner
    catalogBadge: "كتالوج تجارب إسطنبول",
    catalogTitle: "جولات البوسفور، المطاعم الفاخرة، الحمامات وتجارب VIP",
    catalogDesc: "استكشف 72 تجربة ومطعماً معتمداً في إسطنبول؛ احجز بكل سهولة وأمان مباشرة من غرفتك.",
    exploreCatalogBtn: "استكشف الكتالوج (72 إعلاناً) ←",

    servicesTitle: "خدمات الغرفة الفندقية",
    servicesSubtitle: "اطلب بضغطة واحدة من غرفتك لتصل مباشرة إلى الاستقبال وخدمة الغرف.",
    services: {
      breakfast: "طلب إفطار",
      dnd: "عدم الإزعاج",
      cleaning: "تنظيف الغرفة",
      towels: "مناشف نظيفة",
      linens: "تغيير الشراشف",
      pillows: "وسادة إضافية",
      toiletries: "مستلزمات الحمام",
      hygiene: "طقم العناية والنظافة",
      roomservice: "خدمة الغرف",
      minibar: "تعبئة الميني بار",
      safe: "الخزنة والأمان",
      technical: "الدعم الفني والصيانة",
      laundry: "الغسيل والكي",
      lateCheckout: "طلب خروج متأخر",
      extendStay: "تمديد الإقامة",
      taxi: "طلب تاكسي",
      hotelInfo: "دليل الفندق والمعلومات"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "فئات التجارب والخدمات",
    categoriesSubtitle: "12 فئة مميزة من أرقى الجولات والرحلات المرخصة والفرص الاستثمارية في إسطنبول.",
    listingsCount: "إعلان",
    inspectListings: "استعراض الإعلانات",
    categoriesList: {
      invest: { title: "الاستثمار في إسطنبول", desc: "شقق فاخرة مؤهلة للجنسية التركية، قصور تاريخية وعقارات Airbnb" },
      restaurants: { title: "المطاعم الموصى بها", desc: "طهاة حائزون على نجوم ميشلان، أكلات تاريخية وإطلالات ساحرة على البوسفور" },
      bosphorus: { title: "جولات البوسفور واليخوت", desc: "رحلات عشاء بحرية، تأجير يخوت خاصة وجولات جزر الأميرات" },
      history: { title: "التاريخ والمتاحف", desc: "آيا صوفيا، قصر توبكابي، صهريج البازيليك والمتاحف الأثرية" },
      gastronomy: { title: "تذوق الأطعمة والمأكولات", desc: "جولات أطعمة الشوارع، ورش عمل القهوة التركية والمطاعم التقليدية" },
      photo: { title: "التصوير والأزياء العثمانية", desc: "جلسات تصوير الفساتين الطائرة والأزياء العثمانية الأصيلة" },
      adventure: { title: "المغامرة والطبيعة", desc: "تلفريك الغابات، مسارات الحبال وجولات التجديف" },
      hamam: { title: "الحمام التركي والسبا", desc: "حمام قليج علي باشا، خرم سلطان ومساج الرغوة الملكي" },
      shopping: { title: "التسوق والأسواق التاريخية", desc: "البازار الكبير، سوق التوابل وسجاد اليد التركي الفاخر" },
      art: { title: "الفنون ورقصة الدراويش", desc: "عروض رقصة الدراويش المولوية، فن الإيبرو وصناعة مصابيح الفسيفساء" },
      culture: { title: "التراث الثقافي", desc: "أحياء فنر وبلاط، الكنائس القديمة والمعالم التراثية" },
      transfer: { title: "خدمة التوصيل VIP الخاصة", desc: "استقبال خاص من المطار بسيارات مرسيدس فيتو الفاخرة مع سائق" }
    },

    // Experiences Catalog
    experiencesTitle: "كتالوج تجارب وجولات إسطنبول",
    experiencesSubtitle: "13 فئة مميزة من أرقى الجولات والرحلات المرخصة في إسطنبول.",
    allCategories: "جميع الفئات",
    searchPlaceholder: "ابحث عن جولة أو تجربة أو نشاط...",
    bookNow: "احجز الآن",
    buyNow: "شراء فوري",
    reserveTable: "حجز طاولة",
    details: "التفاصيل",
    price: "السعر",
    priceLevel: "السعر / الفئة",
    specialties: "الأطباق المميزة",
    duration: "المدة",
    location: "الموقع",
    rating: "التقييم",
    tursabCertified: "مرخص من TÜRSAB",
    freeCancellation: "ضمان إلغاء مجاني",
    instantConfirmation: "تأكيد فوري",

    // Transit Modal
    transitTitle: "خيارات المواصلات من الفندق",
    transitSubtitle: "أسرع وأسهل الطرق للوصول إلى وجهتك.",
    taxiOption: "تاكسي أصفر (التكلفة والوقت التقديري)",
    vipOption: "توصيل VIP خاص بمرسيدس فيتو",
    transitOption: "المواصلات العامة (الترام / المترو / العبارات)",
    openInGoogleMaps: "فتح في خرائط Google",

    // Virtual POS Modal
    posTitle: "الدفع الآمن بنقاط البيع الافتراضية",
    posSubtitle: "دفع آمن مع تشفير 256-Bit وحماية 3D Secure.",
    posCardHolder: "اسم حامل البطاقة",
    posCardNumber: "رقم البطاقة",
    posExpiry: "تاريخ الانتهاء (شهر/سنة)",
    posCvv: "رمز الأمان CVV",
    posPayButton: "إتمام الدفع الآمن",
    posSuccess: "تم الدفع بنجاح!",
    posSmsNotice: "تم إرسال رابط التأكيد لمزود الخدمة عبر الرسائل والبريد.",
    addToCalendar: "إضافة إلى تقويم Google",
    pendingApproval: "في انتظار تأكيد مزود الخدمة...",
    approved: "تم تأكيد الحجز!",

    // Restaurant Reservation Modal
    restaurantModalTitle: "حجز طاولة مطعم",
    restaurantModalSubtitle: "احجز طاولتك مسبقاً وتجنب الانتظار مع ترحيب خاص من الشيف.",
    guestCount: "عدد الأشخاص",
    date: "التاريخ",
    time: "الوقت",
    specialRequests: "طلبات خاصة / ملاحظات (مثل طاولة بإطلالة على البوسفور)",
    confirmReservation: "تأكيد حجز الطاولة",

    // comusAI Concierge
    aiTitle: "comusAI - مرشدك الشخصي في إسطنبول",
    aiSubtitle: "مساعد ذكي يعمل بـ Google Gemini على مدار الساعة.",
    aiPlaceholder: "اسأل أي شيء عن إسطنبول... (مثلاً: أفضل مطعم على البوسفور؟)",
    aiSend: "إرسال",
    knowMeBtn: "تعرف عليّ",
    myPreferencesBtn: "تفضيلاتي",
    knowMeChip: "✨ تعرف عليّ (اقتراحات مخصصة)",

    // Practical Info & Ombudsman
    practicalTitle: "دليل إسطنبول ودرع حماية النزلاء",
    practicalSubtitle: "بطاقات المواصلات، تذاكر المتاحف الرسمية، ديوان المظالم السياحي وأرقام الطوارئ.",
    istanbulkartTitle: "إسطنبول كارت (بطاقة المواصلات)",
    istanbulkartDesc: "صالحة في جميع المترو والترام والسفن.",
    istanbulkartLink: "بوابة إسطنبول كارت الرسمية",
    muzekartTitle: "بطاقة المتاحف والتذاكر الرسمية",
    muzekartDesc: "تجاوز طوابير الانتظار في المعالم التاريخية.",
    muzekartLink: "موقع تذاكر المتاحف الرسمي",
    emergencyTitle: "أرقام الطوارئ والتواصل المهم",

    // Invest in Istanbul
    investTitle: "الاستثمار والعيش في إسطنبول",
    investSubtitle: "عقارات فاخرة مؤهلة للجنسية التركية وفرص استثمارية ذات عائد إيجاري مرتفع.",
    allPersonas: "جميع العقارات",
    citizenshipFilter: "الجنسية التركية ($400k+)",
    airbnbFilter: "تأجير Airbnb قصير المدى",
    luxuryFilter: "قصور البوسفور الفاخرة",
    bookDiscoveryTour: "حجز جولة استكشافية VIP",
    citizenshipEligible: "مؤهل للجنسية التركية",
    viewPropertyDetails: "معاينة العقار",
    contactAgency: "تواصل مع المستشار",
    priceRange: "السعر",
    size: "المساحة",
    bedrooms: "عدد الغرف",

    // Requests Status
    liveRequests: "الطلبات الحية للغرف",
    noRequests: "لا توجد طلبات معلقة حالياً.",
    requestStatus: {
      pending: "قيد الانتظار",
      in_progress: "قيد التنفيذ",
      completed: "مكتمل",
      cancelled: "ملغى"
    }
  },

  ru: {
    appTitle: "Xenios",
    appSubtitle: "Цифровой гид и консьерж для гостей Стамбула",
    welcome: "Добро пожаловать",
    room: "Номер",
    wifiTitle: "Данные Wi-Fi отеля",
    wifiNetwork: "Сеть",
    wifiPassword: "Пароль",
    wifiCopy: "Скопировать",
    wifiCopied: "Пароль скопирован!",
    reception: "Ресепшн",
    breakfast: "Завтрак",
    checkout: "Время выезда",
    myRequests: "Мои запросы",
    activeRequests: "Запросы в номер и статус",
    noActiveRequests: "Нет активных запросов.",
    loginRegister: "Вход / Регистрация",
    myAccount: "Мой аккаунт",
    guestSession: "Сессия гостя",
    hotelManager: "Управляющий отелем",
    logout: "Выйти",
    hotelCardDetails: "Инфо об отеле и контакты",
    address: "Адрес",
    phone: "Телефон",
    website: "Веб-сайт",
    receptionExt: "Добавочный ресепшн",

    // Tabs
    tabs: {
      services: "Отель",
      experiences: "Впечатления",
      categories: "Категории",
      aiGuide: "comusAI",
      practical: "Гид",
      invest: "Инвест",
      requests: "Мои запросы"
    },

    // In-Room Services Banner
    catalogBadge: "Каталог впечатлений Стамбула",
    catalogTitle: "Круизы по Босфору, рестораны, хаммамы и VIP впечатления",
    catalogDesc: "72 проверенных тура и изысканных ресторана; бронируйте безопасно прямо из вашего номера.",
    exploreCatalogBtn: "Открыть каталог (72 предложения) →",

    servicesTitle: "Услуги в номере",
    servicesSubtitle: "Заказывайте услуги в 1 клик с мгновенной отправкой в службу обслуживания.",
    services: {
      breakfast: "Заказ завтрака",
      dnd: "Не беспокоить",
      cleaning: "Уборка номера",
      towels: "Чистые полотенца",
      linens: "Смена белья",
      pillows: "Дополнительная подушка",
      toiletries: "Банные принадлежности",
      hygiene: "Гигиенический набор",
      roomservice: "Меню рум-сервиса",
      minibar: "Пополнение мини-бара",
      safe: "Сейф и безопасность",
      technical: "Техническая помощь",
      laundry: "Прачечная и глажка",
      lateCheckout: "Поздний выезд",
      extendStay: "Продлить проживание",
      taxi: "Вызов такси",
      hotelInfo: "Гид и инфо об отеле"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "Категории впечатлений и услуг",
    categoriesSubtitle: "12 эксклюзивных категорий лицензированных туров, ресторанов и недвижимости.",
    listingsCount: "Предложений",
    inspectListings: "Смотреть список",
    categoriesList: {
      invest: { title: "Инвестиции в Стамбуле", desc: "Элитное жилье под гражданство Турции, особняки на Босфоре и доходная аренда" },
      restaurants: { title: "Рекомендованные рестораны", desc: "Шефы Мишлен, историческая кухня и террасы с видом на Босфор" },
      bosphorus: { title: "Круизы по Босфору и яхты", desc: "Ужины на яхтах, аренда частных судов и прогулки на Принцевы острова" },
      history: { title: "История и музеи", desc: "Айя-София, дворец Топкапы, Цистерна Базилика и музеи" },
      gastronomy: { title: "Гастрономия и гурме", desc: "Уличная еда, мастер-классы турецкого кофе и таверны" },
      photo: { title: "Фотосессии и костюмы", desc: "Съемки в летящих платьях и османских кафтанах" },
      adventure: { title: "Приключения и природа", desc: "Зиплайн в лесу, веревочные парки и сплавы на каноэ" },
      hamam: { title: "Турецкий хаммам и спа", desc: "Хаммам Кылыч Али Паша, Хюррем Султан и пенный массаж" },
      shopping: { title: "Шопинг и базары", desc: "Гранд Базар, Египетский рынок и ковры ручной работы" },
      art: { title: "Искусство и дервиши", desc: "Шоу кружащихся дервишей, эбру и мозаичные лампы" },
      culture: { title: "Культурное наследие", desc: "Районы Фенер-Балат, старинные синагоги и церкви" },
      transfer: { title: "VIP трансфер", desc: "Встреча в аэропорту на роскошном Mercedes Vito с водителем" }
    },

    // Experiences Catalog
    experiencesTitle: "Каталог экскурсий и впечатлений Стамбула",
    experiencesSubtitle: "13 эксклюзивных категорий лицензированных туров и билетов.",
    allCategories: "Все категории",
    searchPlaceholder: "Поиск экскурсий и билетов...",
    bookNow: "Забронировать",
    buyNow: "Купить сейчас",
    reserveTable: "Забронировать стол",
    details: "Детали",
    price: "Цена",
    priceLevel: "Уровень цен",
    specialties: "Фирменные блюда",
    duration: "Длительность",
    location: "Локация",
    rating: "Рейтинг",
    tursabCertified: "Лицензия TÜRSAB",
    freeCancellation: "Бесплатная отмена",
    instantConfirmation: "Мгновенное подтверждение",

    // Transit Modal
    transitTitle: "Варианты проезда от отеля",
    transitSubtitle: "Самые быстрые и удобные способы добраться до места.",
    taxiOption: "Желтое такси (Оценка стоимости и времени)",
    vipOption: "VIP трансфер Mercedes Vito",
    transitOption: "Общественный транспорт (Трамвай / Метро / Паром)",
    openInGoogleMaps: "Открыть в Google Maps",

    // Virtual POS Modal
    posTitle: "Безопасная оплата картой",
    posSubtitle: "Мгновенная оплата с гарантией 256-Bit SSL и 3D Secure.",
    posCardHolder: "Имя владельца карты",
    posCardNumber: "Номер карты",
    posExpiry: "Срок действия (ММ/ГГ)",
    posCvv: "Код CVV",
    posPayButton: "Оплатить безопасно",
    posSuccess: "Оплата успешно прошла!",
    posSmsNotice: "Организатору отправлено SMS/Email уведомление для подтверждения.",
    addToCalendar: "Добавить в Google Календарь",
    pendingApproval: "Ожидание подтверждения организатора...",
    approved: "Бронирование подтверждено!",

    // Restaurant Reservation Modal
    restaurantModalTitle: "Бронирование столика",
    restaurantModalSubtitle: "Забронируйте столик заранее без очереди с комплиментом от шефа.",
    guestCount: "Количество гостей",
    date: "Дата",
    time: "Время",
    specialRequests: "Пожелания (напр. столик у окна с видом на Босфор)",
    confirmReservation: "Подтвердить бронирование",

    // comusAI Concierge
    aiTitle: "comusAI - Персональный гид по Стамбулу",
    aiSubtitle: "Умный ассистент 24/7 на базе Google Gemini.",
    aiPlaceholder: "Спросите о лучших местах Стамбула...",
    aiSend: "Отправить",
    knowMeBtn: "Узнать меня",
    myPreferencesBtn: "Мои предпочтения",
    knowMeChip: "✨ Узнать меня (Персональные советы)",

    // Practical Info & Ombudsman
    practicalTitle: "Полезная информация и защита гостей",
    practicalSubtitle: "Транспортные карты, музейные пропуска, защита прав туристов и телефоны служб.",
    istanbulkartTitle: "Istanbulkart (Транспортная карта)",
    istanbulkartDesc: "Действует на всем транспорте города.",
    istanbulkartLink: "Официальный портал Istanbulkart",
    muzekartTitle: "Музейная карта и билеты",
    muzekartDesc: "Вход без очередей в главные музеи и дворцы.",
    muzekartLink: "Официальный сайт muze.gov.tr",
    emergencyTitle: "Важные контакты и экстренные службы",

    // Invest in Istanbul
    investTitle: "Инвестиции и жизнь в Стамбуле",
    investSubtitle: "Элитная недвижимость под гражданство Турции и высокий доход от аренды.",
    allPersonas: "Все объекты",
    citizenshipFilter: "Гражданство ($400k+)",
    airbnbFilter: "Airbnb и аренда",
    luxuryFilter: "Престиж и Босфор",
    bookDiscoveryTour: "Записаться на VIP тур",
    citizenshipEligible: "Подходит под гражданство",
    viewPropertyDetails: "Посмотреть объект",
    contactAgency: "Связаться с брокером",
    priceRange: "Цена",
    size: "Площадь",
    bedrooms: "Спальни",

    // Requests Status
    liveRequests: "Запросы гостей в реальном времени",
    noRequests: "Нет активных запросов.",
    requestStatus: {
      pending: "В ожидании",
      in_progress: "В работе",
      completed: "Выполнено",
      cancelled: "Отменено"
    }
  },

  de: {
    appTitle: "Xenios",
    appSubtitle: "Digitaler Gästeführer & Concierge für Istanbul",
    welcome: "Willkommen",
    room: "Zimmer",
    wifiTitle: "Hotel-WLAN-Zugang",
    wifiNetwork: "Netzwerk",
    wifiPassword: "Passwort",
    wifiCopy: "Kopieren",
    wifiCopied: "Passwort kopiert!",
    reception: "Rezeption",
    breakfast: "Frühstück",
    checkout: "Check-out Zeit",
    myRequests: "Meine Anfragen",
    activeRequests: "Zimmeranfragen & Live-Status",
    noActiveRequests: "Zurzeit keine offenen Anfragen.",
    loginRegister: "Anmelden / Registrieren",
    myAccount: "Mein Konto",
    guestSession: "Gastesitzung",
    hotelManager: "Hotelmanager",
    logout: "Abmelden",
    hotelCardDetails: "Hoteldetails & Kontakt",
    address: "Adresse",
    phone: "Telefon",
    website: "Webseite",
    receptionExt: "Rezeption Durchwahl",

    // Tabs
    tabs: {
      services: "Hotel",
      experiences: "Erlebnisse",
      categories: "Kategorien",
      aiGuide: "comusAI",
      practical: "Führer",
      invest: "Investieren",
      requests: "Meine Anfragen"
    },

    // In-Room Services Banner
    catalogBadge: "Istanbul Erlebniskatalog",
    catalogTitle: "Bosporus-Touren, gehobene Restaurants, Hamams & VIP-Erlebnisse",
    catalogDesc: "72 handverlesene Touren und Spitzenrestaurants; reservieren Sie sicher und bequem aus Ihrem Zimmer.",
    exploreCatalogBtn: "Katalog entdecken (72 Angebote) →",

    servicesTitle: "Zimmerservice & Hoteldienste",
    servicesSubtitle: "1-Klick-Anfragen direkt an Housekeeping und Rezeption.",
    services: {
      breakfast: "Frühstücksanfrage",
      dnd: "Bitte nicht stören",
      cleaning: "Zimmerreinigung",
      towels: "Frische Handtücher",
      linens: "Bettwäschewechsel",
      pillows: "Extra Kissen",
      toiletries: "Pflegeartikel",
      hygiene: "Hygieneset",
      roomservice: "Zimmerservice-Menü",
      minibar: "Minibar auffüllen",
      safe: "Safe & Sicherheit",
      technical: "Technischer Service",
      laundry: "Wäsche & Bügeln",
      lateCheckout: "Später Check-out",
      extendStay: "Aufenthalt verlängern",
      taxi: "Taxi rufen",
      hotelInfo: "Hotelinformationen"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "Erlebnis- & Servicekategorien",
    categoriesSubtitle: "12 geprüfte Kategorien mit TÜRSAB-zertifizierten Touren, Gastronomie und Immobilien.",
    listingsCount: "Angebote",
    inspectListings: "Angebote ansehen",
    categoriesList: {
      invest: { title: "Investieren in Istanbul", desc: "Luxusresidenzen für Staatsbürgerschaft, historische Villen & Airbnb-Immobilien" },
      restaurants: { title: "Empfohlene Restaurants", desc: "Michelin-Sterne-Köche, historische Spezialitäten & Bosporus-Terrassen" },
      bosphorus: { title: "Bosporus & Yacht-Touren", desc: "Dinner-Kreuzfahrten, private Yachtmiete & Prinzeninseln-Touren" },
      history: { title: "Geschichte & Museen", desc: "Hagia Sophia, Topkapi-Palast, Basilika-Zisterne & Museen" },
      gastronomy: { title: "Gastronomie & Kulinarik", desc: "Street Food Touren, Türkischer Kaffee Workshop & Tavernen" },
      photo: { title: "Fotografie & Kostüme", desc: "Fliegende Kleider Shootings & osmanische Kaftan-Fotos" },
      adventure: { title: "Abenteuer & Natur", desc: "Wald-Zipline, Hochseilgärten & Kanu-Safaris" },
      hamam: { title: "Türkisches Bad & Spa", desc: "Historisches Kilic Ali Pasa, Hurrem Sultan & VIP-Schaummassage" },
      shopping: { title: "Shopping & Basare", desc: "Großer Basar, Gewürzbasar & handgewebte Teppiche" },
      art: { title: "Kunst & Derwische", desc: "Mevlevi Sema-Zeremonie, Ebru-Marmorkunst & Mosaiklampen" },
      culture: { title: "Kulturerbe", desc: "Fener-Balat, jüdische Synagogen & syrisch-orthodoxes Erbe" },
      transfer: { title: "Privater VIP-Transfer", desc: "Flughafen-Abholung mit privatem Mercedes Vito & Chauffeur" }
    },

    // Experiences Catalog
    experiencesTitle: "Istanbul Erlebnisse & Touren",
    experiencesSubtitle: "13 handverlesene Kategorien für Aktivitäten in Istanbul.",
    allCategories: "Alle Kategorien",
    searchPlaceholder: "Touren oder Erlebnisse suchen...",
    bookNow: "Jetzt buchen",
    buyNow: "Jetzt kaufen",
    reserveTable: "Tisch reservieren",
    details: "Details",
    price: "Preis",
    priceLevel: "Preisstufe",
    specialties: "Spezialitäten",
    duration: "Dauer",
    location: "Ort",
    rating: "Bewertung",
    tursabCertified: "TÜRSAB-lizenziert",
    freeCancellation: "Kostenlose Stornierung",
    instantConfirmation: "Sofortige Bestätigung",

    // Transit Modal
    transitTitle: "Transportoptionen vom Hotel",
    transitSubtitle: "Die schnellsten und bequemsten Wege zu Ihrem Zielort.",
    taxiOption: "Gelbes Taxi (Geschätzte Kosten & Dauer)",
    vipOption: "VIP Mercedes Vito Transfer",
    transitOption: "Öffentliche Verkehrsmittel (Tram / Metro / Fähre)",
    openInGoogleMaps: "In Google Maps öffnen",

    // Virtual POS Modal
    posTitle: "Sichere Online-Zahlung",
    posSubtitle: "Direkte Buchung mit 256-Bit SSL und 3D Secure Schutz.",
    posCardHolder: "Karteninhaber",
    posCardNumber: "Kartennummer",
    posExpiry: "Gültig bis (MM/JJ)",
    posCvv: "CVV",
    posPayButton: "Sicher bezahlen",
    posSuccess: "Zahlung erfolgreich!",
    posSmsNotice: "Bestätigungslink per SMS/E-Mail an Veranstalter gesendet.",
    addToCalendar: "Zu Google Kalender hinzufügen",
    pendingApproval: "Warte auf Bestätigung...",
    approved: "Buchung bestätigt!",

    // Restaurant Reservation Modal
    restaurantModalTitle: "Tischreservierung",
    restaurantModalSubtitle: "Reservieren Sie Ihren Tisch im Voraus und genießen Sie bevorzugten Service.",
    guestCount: "Personen",
    date: "Datum",
    time: "Uhrzeit",
    specialRequests: "Besondere Wünsche / Notizen (z.B. Tisch mit Bosporusblick)",
    confirmReservation: "Tischreservierung bestätigen",

    // comusAI Concierge
    aiTitle: "comusAI - Ihr persönlicher Istanbul-Guide",
    aiSubtitle: "24/7 Google Gemini KI-Concierge.",
    aiPlaceholder: "Fragen Sie nach den besten Tipps für Istanbul...",
    aiSend: "Senden",
    knowMeBtn: "Lerne mich kennen",
    myPreferencesBtn: "Meine Vorlieben",
    knowMeChip: "✨ Lerne mich kennen (Persönliche Tipps)",

    // Practical Info & Ombudsman
    practicalTitle: "Praktische Infos & Gästeschutz",
    practicalSubtitle: "Fahrkarten, Museumspässe, Tourismus-Ombudsmann und Notfallnummern.",
    istanbulkartTitle: "Istanbulkart (ÖPNV-Karte)",
    istanbulkartDesc: "Gültig für alle U-Bahnen, Straßenbahnen und Fähren.",
    istanbulkartLink: "Offizielles Istanbulkart-Portal",
    muzekartTitle: "Museumspass & Offizielle Tickets",
    muzekartDesc: "Keine Warteschlangen an historischen Monumenten.",
    muzekartLink: "muze.gov.tr Offizielle Tickets",
    emergencyTitle: "Wichtige Notfallkontakte",

    // Invest in Istanbul
    investTitle: "Investieren & Leben in Istanbul",
    investSubtitle: "Luxusimmobilien für Staatsbürgerschaft und hohe Mieteinnahmen.",
    allPersonas: "Gesamtes Portfolio",
    citizenshipFilter: "Staatsbürgerschaft ($400k+)",
    airbnbFilter: "Airbnb & Kurzzeitmiete",
    luxuryFilter: "Luxus Bosporus & Prestige",
    bookDiscoveryTour: "VIP-Besichtigung buchen",
    citizenshipEligible: "Staatsbürgerschaftsfähig",
    viewPropertyDetails: "Immobilie ansehen",
    contactAgency: "Berater kontaktieren",
    priceRange: "Preis",
    size: "Fläche",
    bedrooms: "Zimmer",

    // Requests Status
    liveRequests: "Live-Zimmeranfragen",
    noRequests: "Zurzeit keine offenen Anfragen.",
    requestStatus: {
      pending: "Ausstehend",
      in_progress: "In Bearbeitung",
      completed: "Erledigt",
      cancelled: "Storniert"
    }
  },

  fr: {
    appTitle: "Xenios",
    appSubtitle: "Guide Numérique & Concierge pour Istanbul",
    welcome: "Bienvenue",
    room: "Chambre",
    wifiTitle: "Identifiants Wi-Fi de l'hôtel",
    wifiNetwork: "Réseau",
    wifiPassword: "Mot de passe",
    wifiCopy: "Copier",
    wifiCopied: "Mot de passe copié !",
    reception: "Réception",
    breakfast: "Petit déjeuner",
    checkout: "Heure de départ",
    myRequests: "Mes Demandes",
    activeRequests: "Demandes en chambre & Statut",
    noActiveRequests: "Aucune demande en attente.",
    loginRegister: "Se connecter / S'inscrire",
    myAccount: "Mon Compte",
    guestSession: "Session Invité",
    hotelManager: "Directeur de l'hôtel",
    logout: "Déconnexion",
    hotelCardDetails: "Infos Hôtel & Contact",
    address: "Adresse",
    phone: "Téléphone",
    website: "Site Web",
    receptionExt: "Poste Réception",

    // Tabs
    tabs: {
      services: "Hôtel",
      experiences: "Expériences",
      categories: "Catégories",
      aiGuide: "comusAI",
      practical: "Guide",
      invest: "Investir",
      requests: "Mes Demandes"
    },

    // In-Room Services Banner
    catalogBadge: "Catalogue d'Expériences d'Istanbul",
    catalogTitle: "Croisières sur le Bosphore, Gastronomie, Hammams et Expériences VIP",
    catalogDesc: "72 activités et tables vérifiées ; réservez en toute sécurité depuis votre chambre d'hôtel.",
    exploreCatalogBtn: "Explorer le catalogue (72 offres) →",

    servicesTitle: "Services en Chambre",
    servicesSubtitle: "Demandes en 1 clic transmises directement à la réception.",
    services: {
      breakfast: "Demande de petit déjeuner",
      dnd: "Ne pas déranger",
      cleaning: "Nettoyage de chambre",
      towels: "Serviettes propres",
      linens: "Changement de draps",
      pillows: "Oreiller supplémentaire",
      toiletries: "Produits de bain",
      hygiene: "Kit d'hygiène",
      roomservice: "Menu Service d'étage",
      minibar: "Recharge Mini-bar",
      safe: "Coffre-fort & Sécurité",
      technical: "Assistance technique",
      laundry: "Blanchisserie & Repassage",
      lateCheckout: "Départ tardif",
      extendStay: "Prolonger le séjour",
      taxi: "Appeler un taxi",
      hotelInfo: "Guide de l'hôtel"
    },

    // Category Showcase (12 Categories)
    categoriesTitle: "Catégories d'Expériences & Services",
    categoriesSubtitle: "12 catégories sélectionnées d'activités certifiées TÜRSAB, gastronomie et immobilier.",
    listingsCount: "Offres",
    inspectListings: "Voir les offres",
    categoriesList: {
      invest: { title: "Investir à Istanbul", desc: "Résidences de luxe pour la citoyenneté, manoirs historiques et biens Airbnb" },
      restaurants: { title: "Restaurants Recommandés", desc: "Chefs étoilés Michelin, saveurs historiques et terrasses avec vue sur le Bosphore" },
      bosphorus: { title: "Croisières sur le Bosphore & Yachts", desc: "Dîners-croisières, location de yachts privés et îles des Princes" },
      history: { title: "Histoire & Musées", desc: "Sainte-Sophie, Palais de Topkapi, Citerne Basilique et musées" },
      gastronomy: { title: "Gastronomie & Gourmandise", desc: "Street food, ateliers de café turc et tavernes du Bosphore" },
      photo: { title: "Photographie & Costumes", desc: "Séances photo en robe volante et costumes ottomans authentiques" },
      adventure: { title: "Aventure & Nature", desc: "Tyrolienne en forêt, parcours d'accrobranche et canoë" },
      hamam: { title: "Bain Turc & Spa", desc: "Kilic Ali Pasa historique, Hurrem Sultan et massage à la mousse VIP" },
      shopping: { title: "Shopping & Bazars", desc: "Grand Bazar, Bazar Égyptien et tapis tissés à la main" },
      art: { title: "Art & Derviches Tourneurs", desc: "Cérémonie des derviches tourneurs, art Ebru et lampes en mosaïque" },
      culture: { title: "Patrimoine Culturel", desc: "Fener-Balat, synagogues historiques et patrimoine syriaque" },
      transfer: { title: "Transfert VIP Privé", desc: "Accueil à l'aéroport avec chauffeur privé en Mercedes Vito de luxe" }
    },

    // Experiences Catalog
    experiencesTitle: "Expériences & Visites à Istanbul",
    experiencesSubtitle: "13 catégories sélectionnées d'activités certifiées.",
    allCategories: "Toutes les catégories",
    searchPlaceholder: "Rechercher une visite ou activité...",
    bookNow: "Réserver",
    buyNow: "Acheter maintenant",
    reserveTable: "Réserver une table",
    details: "Détails",
    price: "Prix",
    priceLevel: "Niveau de prix",
    specialties: "Spécialités",
    duration: "Durée",
    location: "Lieu",
    rating: "Note",
    tursabCertified: "Certifié TÜRSAB",
    freeCancellation: "Annulation gratuite",
    instantConfirmation: "Confirmation instantanée",

    // Transit Modal
    transitTitle: "Options de transport depuis l'hôtel",
    transitSubtitle: "Les moyens les plus rapides et pratiques pour rejoindre votre destination.",
    taxiOption: "Taxi jaune (Estimation prix et durée)",
    vipOption: "Transfert VIP Mercedes Vito",
    transitOption: "Transports en commun (Tramway / Métro / Ferry)",
    openInGoogleMaps: "Ouvrir dans Google Maps",

    // Virtual POS Modal
    posTitle: "Paiement Sécurisé en Ligne",
    posSubtitle: "Réservation immédiate avec cryptage 256-Bit SSL et garantie 3D Secure.",
    posCardHolder: "Nom du titulaire",
    posCardNumber: "Numéro de carte",
    posExpiry: "Date d'expiration (MM/AA)",
    posCvv: "CVV",
    posPayButton: "Payer en toute sécurité",
    posSuccess: "Paiement réussi !",
    posSmsNotice: "Demande de confirmation envoyée au prestataire par SMS et e-mail.",
    addToCalendar: "Ajouter à Google Agenda",
    pendingApproval: "En attente de confirmation...",
    approved: "Réservation confirmée !",

    // Restaurant Reservation Modal
    restaurantModalTitle: "Réservation de table",
    restaurantModalSubtitle: "Réservez votre table à l'avance et profitez d'un accueil privilégié.",
    guestCount: "Personnes",
    date: "Date",
    time: "Heure",
    specialRequests: "Demandes particulières (ex. table avec vue sur le Bosphore)",
    confirmReservation: "Confirmer la réservation",

    // comusAI Concierge
    aiTitle: "comusAI - Votre Concierge Personnel",
    aiSubtitle: "Assistant intelligent propulsé par Google Gemini 24/7.",
    aiPlaceholder: "Posez votre question sur Istanbul...",
    aiSend: "Envoyer",
    knowMeBtn: "Apprenez à me connaître",
    myPreferencesBtn: "Mes Préférences",
    knowMeChip: "✨ Apprenez à me connaître (Conseils sur mesure)",

    // Practical Info & Ombudsman
    practicalTitle: "Informations Pratiques & Protection des Invités",
    practicalSubtitle: "Cartes de transport, pass musées, médiateur des droits des touristes et urgences.",
    istanbulkartTitle: "Istanbulkart (Carte de transport)",
    istanbulkartDesc: "Valable sur métros, trams et ferries.",
    istanbulkartLink: "Portail Officiel Istanbulkart",
    muzekartTitle: "Pass Musées & Billets Officiels",
    muzekartDesc: "Accès coupe-file aux monuments historiques.",
    muzekartLink: "muze.gov.tr Billetterie Officielle",
    emergencyTitle: "Numéros d'urgence et contacts",

    // Invest in Istanbul
    investTitle: "Investir & Vivre à Istanbul",
    investSubtitle: "Immobilier de prestige éligible à la citoyenneté et rendement locatif élevé.",
    allPersonas: "Tout le portfolio",
    citizenshipFilter: "Citoyenneté ($400k+)",
    airbnbFilter: "Airbnb & Courte durée",
    luxuryFilter: "Luxe Bosphore & Prestige",
    bookDiscoveryTour: "Réserver une visite VIP",
    citizenshipEligible: "Éligible à la citoyenneté",
    viewPropertyDetails: "Voir le bien",
    contactAgency: "Contacter un conseiller",
    priceRange: "Prix",
    size: "Surface",
    bedrooms: "Chambres",

    // Requests Status
    liveRequests: "Demandes en direct des chambres",
    noRequests: "Aucune demande en attente.",
    requestStatus: {
      pending: "En attente",
      in_progress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé"
    }
  }
};

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'tr';
  const navLang = (navigator.language || '').toLowerCase();
  if (navLang.startsWith('tr')) return 'tr';
  if (navLang.startsWith('ar')) return 'ar';
  if (navLang.startsWith('ru')) return 'ru';
  if (navLang.startsWith('de')) return 'de';
  if (navLang.startsWith('fr')) return 'fr';
  return 'en';
}

export function getT(lang: Language) {
  return translations[lang] || translations.en;
}
