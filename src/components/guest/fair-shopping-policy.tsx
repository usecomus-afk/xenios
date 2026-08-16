"use client";

import { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Send, 
  Building2, 
  Car, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Shield,
  ArrowRight,
  Landmark,
  Hospital,
  PhoneCall,
  MapPin,
  HeartHandshake,
  FileSpreadsheet,
  BadgeAlert,
  UserX,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export function FairShoppingPolicy() {
  const [activeSection, setActiveSection] = useState<'policy' | 'shield'>('policy');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTrap, setOpenTrap] = useState<number | null>(null);

  const faqs = [
    {
      q: "Xenios'a şikayet edersem, işletme beni bulabilir mi?",
      a: "Hayır. Xenios'un adillik politikasında turist kimliği %100 korunur. İşletme sadece 'Bir misafir x sorununu bildirdi' bilgisini öğrenir. Adınız, telefonunuz veya e-postanız asla işletmeyle paylaşılmaz."
    },
    {
      q: "7 gün sonra işletme cevap vermezse ne oluyor?",
      a: "İşletmenin sessiz kalması kabul edilmez. 7 gün sonunda işletme doğrudan 'Alışveriş Rehberi & Uyarı Panosu'nda kamuya açık olarak yayınlanır ve resmi kurumlara (CİMER/Ticaret Bakanlığı/TUDES) ihbar edilir."
    },
    {
      q: "İşletme uyarı sayfasından nasıl çıkarılır?",
      a: "Yazılı başvuru yaparak Xenios ile resmi temas kurması gerekir. Mağdur misafirin zararını telafi ettiğini belgelerse uyarı kaldırılabilir. Ancak tekrar şikayet gelirse kalıcı kara listeye alınır."
    },
    {
      q: "Sahte veya asılsız şikayet yaparsam ne olur?",
      a: "Xenios tüm başvuruları fiş, fatura, konum ve makbuzlarla inceler. Kanıtı olmayan şikayetler reddedilir. Sahte bildirimde bulunan hesaplar sistemden sınırlandırılır."
    },
    {
      q: "Xenios'ta ilanı olmayan bir esnaftan dolandırıldıysam?",
      a: "Fark etmez. Xenios'un misyonu gereği, o işletme de kanıtlar doğrultusunda Alışveriş Rehberi'nde uyarılır ve resmi kurumlara ihbarda bulunulur."
    },
    {
      q: "Taksi dolandırıcılığı için ne yapmalıyım?",
      a: "Taksi plakasını ve fişi sisteme yükleyin. Xenios bu durumu İBB-TUDES sistemi üzerinden online resmi ihbar kaydına geçirir ve şoför hakkında cezai işlem başlatılmasını sağlar."
    },
    {
      q: "Şikayet açtıktan ne kadar süre sonra sonuç alırım?",
      a: "Ortalama 10-14 gün. (Araştırma 1-2 gün + işletmenin cevap süresi 7 gün + kamuya açıklanma ve resmi ihbar süreci)."
    }
  ];

  const shieldTopics = [
    {
      id: 1,
      title: "Sokak Tuzakları & Ayakkabı Boyacısı Hilesi",
      problem: "Yanınıza arkadaşça yaklaşıp 'özel bir bar' teklif edenler, fırçasını bilerek düşüren ayakkabı boyacıları veya sahte Osmanlı antikası satıcıları.",
      risk: "Gece kulüplerinde tartışmak fiziksel saldırıya veya fahiş hesap gaspına dönüşebilir. Sahte antika satın almak havalimanında tarihi eser kaçakçılığı şüphesiyle gözaltına yol açabilir.",
      action: "Fırça düşerse yürümeye devam edin. Yabancılardan gelen bar davetlerini kabul etmeyin. Dolandırıldıysanız tartışmayın, fiş alın ve doğrudan Turizm Polisine gidin.",
      law: "TCK madde 157-158 dolandırıcılık suçunu düzenler. Sahte tarihi eser satmak dolandırıcılık, gerçeğini izinsiz satmak kaçakçılıktır."
    },
    {
      id: 2,
      title: "Sarı Taksi Dolandırıcılıkları (Tırnakçılık & Taksimetre)",
      problem: "Taksimetreyi açmayıp sabit fahiş ücret istemek, yolu kasıtlı uzatmak veya 500 TL verdiğinizde hızla 50 TL ile değiştirip eksik para verdiğinizi iddia etmek.",
      risk: "Otoyol kenarında agresif şoförle tartışmak tehlikelidir. Bagajınız bagajdayken bilmediğiniz yerde mahsur kalabilirsiniz.",
      action: "Rotanızı telefonunuzun GPS'inden izleyin. Binmeden önce plakanın net fotoğrafını çekin. Taksimetre açılmazsa derhal inin. Parayı verirken banknotu açıkça sesli söyleyin.",
      law: "İBB TUDES mevzuatına göre taksimetre açmamak ve fazla ücret almak ağır para cezası ve ruhsat iptali gerektirir."
    },
    {
      id: 3,
      title: "Restoran & Gece Kulübü Şişirilmiş Hesaplar",
      problem: "Fiyatların yazmadığı menü verilmesi, söylenmeyen fahiş 'kuver' ve sipariş edilmeyen içecekler için binlerce lira istenmesi.",
      risk: "Ödeme yapılmazsa korumaların fiziksel tehdidi veya ATM'ye kadar zorla götürme riski (Gasp suçu).",
      action: "Fiyatların basılı olduğu menüyü görmeden sipariş vermeyin. Şişirilmiş hesap gelirse ayrıntılı adisyon isteyin. Tehdit edilirse 112 Polisi arayıp gasp edildiğinizi söyleyin.",
      law: "Tüketici Koruma Kanunu gereği tüm işletmeler girişlerinde ve masalarda net, onaylı fiyat listesi bulundurmak zorundadır."
    },
    {
      id: 4,
      title: "Sahte Polis / Sivil Denetim Tuzağı",
      problem: "Sokakta rozet gösterip 'sivil polis' olduğunu söyleyerek sahte uyuşturucu/para bahanesiyle cüzdan ve pasaportunuzu talep edenler.",
      risk: "Cüzdanınızı verirseniz el çabukluğuyla dövizleriniz ve kartlarınız çalınır veya pasaportunuz sahtesiyle değiştirilebilir.",
      action: "Asla cüzdanınızı sokakta vermeyin. 'Yalnızca en yakın resmi karakolda (Karakol) veya 112 çağırarak işlem yaparım' deyin. Dolandırıcılar hemen uzaklaşacaktır.",
      law: "Polis kimliği olmadan sivil şahısların arama yapması yasadışıdır."
    },
    {
      id: 5,
      title: "Kapalıçarşı Sahte Marka & Sahte Antika Satışları",
      problem: "Pazarlıkla 'gerçek tasarım çanta' veya 'el dokuma ipek halı' satılması; sonradan seri üretim sahte ürün olduğunun anlaşılması.",
      risk: "Maddi kaybın yanı sıra ülkeniz gümrüğünde sahte ürün cezası veya tarihi eser şüphesiyle havalimanında durdurulma riski.",
      action: "Daima ürün açıklamasını ('%100 İpek Halı') açıkça belirten resmi fiş/fatura talep edin. Şüphelenirseniz pazardaki Zabıta veya Turizm Polisine gidin.",
      law: "Fikri Mülkiyet Kanunu ihlalidir ve sözleşme hile nedeniyle yasal olarak geçersizdir."
    },
    {
      id: 6,
      title: "Türkiye'de Hastane Acil Durumları & Turist Sağlık Hakları",
      problem: "Aniden hastalanan turistin 'Özel sigortam yok, tedavi ederler mi veya peşinat ödeyemezsem kapıdan çevrilir miyim?' paniği.",
      risk: "Hayati tehlikesi olan gerçek acil durumlarda hastanelerin ücret talep edebileceği yanılgısıyla doktora gitmekten çekinmek.",
      action: "Gerçek acil durumda derhal 112'yi arayın veya en yakın Acil Servise gidin. Pasaportunuzu verin. Sigortayı tehlike geçtikten sonra halledin.",
      law: "T.C. Anayasası ve Sağlık Bakanlığı yönetmeliklerine göre tüm kamu ve özel hastaneler acil hastalara peşinat veya kredi kartı sormaksızın anında ücretsiz müdahale etmekle yükümlüdür."
    },
    {
      id: 7,
      title: "Turistler İçin 112 Acil Yardım Aramak",
      problem: "Türkçe bilmediği için 112 operatörüne derdini anlatamayacağı korkusuyla ambulans çağırmamak.",
      risk: "Yanlış veya geciken konum tarifi nedeniyle ambulansın gecikmesi.",
      action: "112'yi arayın. İngilizce, Almanca, Rusça veya Arapça konuşun. Önce sokak tabelası veya GPS koordinatıyla yerinizi söyleyin. Telefonu kapatmayın.",
      law: "112 merkezlerinde yabancı dillerde tercüman masaları bulunmaktadır ve yardım sağlamak yasal zorunluluktur."
    },
    {
      id: 8,
      title: "Turistler İçin Hukuki Riskler (Yapılmaması Gerekenler)",
      problem: "Turistlerin kendi ülkelerindeki kuralların aynen geçerli olduğunu veya dokunulmazlıkları olduğunu düşünmeleri.",
      risk: "Tarihi eser kaçakçılığı, devlete/Atatürk'e hakaret veya izinsiz drone uçurma nedeniyle tutuklanma ve sınır dışı edilme.",
      action: "Sokaktan taş, fosil, eski sikke almayın. Huzuru bozan sarhoşluktan kaçının. Askeri ve kamu binaları yakınında izinsiz drone uçurmayın.",
      law: "'Kanunu bilmemek mazeret sayılmaz' ilkesi geçerlidir. İhlaller TCK kapsamında kovuşturulur."
    },
    {
      id: 9,
      title: "İstanbul'da Turistlerin Dikkatli Olması Gereken Bölgeler",
      problem: "Gece yürüyüşlerinde tenha veya arka sokaklara girilmesi.",
      risk: "İstiklal Caddesi arkasındaki Tarlabaşı, gece geç saatte Aksaray otogar çevresi ve Fatih'in ışıksız ara sokakları.",
      action: "Gece ana aydınlatılmış caddeleri kullanın. Taksi yerine toplu taşıma veya güvenilir otel transferini tercih edin.",
      law: "İstanbul genelinde MOBESE kamera ağı ve Sultanahmet, Taksim, Kapalıçarşı Turizm Polisi Merkezleri 24 saat görev yapmaktadır."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Visual Header matching the uploaded banner */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-md space-y-5">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
            Haksız, şüpheli alışveriş & kötü deneyim
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900 mt-2">
            Xenios Misafir Kalkanı & Adil Alışveriş Politikası
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
            İstanbul'da her misafir adil, güvenilir ve şeffaf bir seyahat yaşamalıdır. Xenios haksız kazanç, fahiş fiyat ve kötü niyetli işletmelere karşı haklarınızı korur.
          </p>
        </div>

        {/* 2 Main Mode Badges (Shield vs Policy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveSection('shield')}
            className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 text-left cursor-pointer ${
              activeSection === 'shield'
                ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                : 'bg-[#fbf8f1] border-amber-200/70 hover:border-amber-300'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <strong className="text-sm font-bold text-zinc-900 block">Xenios Misafir Kalkanı</strong>
              <span className="text-[11px] text-zinc-500 block">9 Yaygın Tuzak & Hukuki Haklarınız Rehberi</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('policy')}
            className={`p-4 rounded-2xl border transition-all flex items-center gap-3.5 text-left cursor-pointer ${
              activeSection === 'policy'
                ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                : 'bg-[#fbf8f1] border-amber-200/70 hover:border-amber-300'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <strong className="text-sm font-bold text-zinc-900 block">Xenios Adil Alışveriş Politikası</strong>
              <span className="text-[11px] text-zinc-500 block">Şikayet, 7 Günlük İtiraz & İhbar Süreci</span>
            </div>
          </button>
        </div>

        {/* Empathy & Quick Complaint Submission Action Box */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 p-5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-700 text-2xl flex items-center justify-center shrink-0 shadow-inner">
              🙁
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900">Yaşadığınız kötü deneyim için üzgünüz</h4>
              <p className="text-xs text-zinc-600 mt-0.5 max-w-md">
                Lütfen deneyiminizi ve fatura, fiş, taksi plakası veya konum gibi kanıtları sisteme yükleyin.
              </p>
            </div>
          </div>

          <Link
            href="/complaints"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Hemen Şikayet Aç →</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: XENIOS ADİL ALIŞVERİŞ POLİTİKASI (Tam Politika Metni) */}
      {activeSection === 'policy' && (
        <div className="space-y-6">
          
          {/* Step 1 & 2: Kanıt Toplama & Şikayet Açma */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">1</span>
              <span>Şikayet Nasıl Yapabilirsin?</span>
            </h3>

            <div className="space-y-2">
              <strong className="text-xs font-bold text-zinc-800 block">Adım 1: Kanıt Topla</strong>
              <p className="text-xs text-zinc-600">Xenios'a bildirmeden önce, yaşadığınız kötü deneyimin kanıtlarını mutlaka hazırlayın:</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-zinc-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-amber-50 text-zinc-800 font-bold border-b border-zinc-200">
                      <th className="p-2.5">Kanıt Türü</th>
                      <th className="p-2.5">Nedir?</th>
                      <th className="p-2.5">Örnek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-600">
                    <tr>
                      <td className="p-2.5 font-bold text-zinc-900">Fatura / Fiş</td>
                      <td className="p-2.5">İşletmeden aldığın ödeme belgesi</td>
                      <td className="p-2.5">Restoran fişi, tur makbuzu, ürün faturası</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-zinc-900">Ekran Görüntüsü</td>
                      <td className="p-2.5">Telefon, app veya web ekran görüntüsü</td>
                      <td className="p-2.5">Yanlış fiyat, ödeme onayı, mesajlaşma</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-zinc-900">Konum Bilgisi</td>
                      <td className="p-2.5">İşletmenin harita konumu veya adresi</td>
                      <td className="p-2.5">Google Maps linki, sokak adı</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-zinc-900">Taksi Plakası</td>
                      <td className="p-2.5">Taksi dolandırıcılığı yaşandıysa</td>
                      <td className="p-2.5">Sarı plaka numarası (Örn: 34 TAA 01)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3.5 bg-[#fbf8f1] rounded-2xl border border-amber-200/70 space-y-1">
              <strong className="text-xs font-bold text-zinc-900 block">Adım 2: Xenios'ta Şikayet Aç</strong>
              <p className="text-xs text-zinc-600">
                1. "Şikayet Et" butonuna tıklayın ➔ 2. Sorunu detaylı anlatın ➔ 3. Kanıtlarınızı sisteme yükleyin ➔ 4. Takip kodunuzu alın.
              </p>
            </div>
          </div>

          {/* Step 3 to 6: Xenios Ne Yapacak? (7 Günlük Süreç & Kamuya Açıklanma) */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">2</span>
              <span>Xenios Ne Yapacak? (7 Günlük İnceleme ve Yaptırım Akışı)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                <strong className="text-zinc-900 font-bold block">Adım 3: Araştırma (1-2 Gün)</strong>
                <p className="text-zinc-600">Kanıtların doğruluğu, piyasa rayiçleri ve olayın ciddiyeti incelenir.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                <strong className="text-zinc-900 font-bold block">Adım 4: İşletmeye Bildirim (Gün 2-3)</strong>
                <p className="text-zinc-600">İşletmeye resmi e-posta gönderilir: 'Bir hata mı yapıldı? Turisti telafi etmeyi kabul ediyor musunuz?'</p>
              </div>
            </div>

            {/* 7 Days Response Table */}
            <div className="space-y-2">
              <strong className="text-xs font-bold text-zinc-800 block">Adım 5: İşletmenin Cevap Vermesi (7 Gün)</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                  <strong>✅ İşletme turisti telafi ederse:</strong> Fark iade edilir, durum başarıyla çözümlenir.
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900">
                  <strong>⚠️ İşletme reddeder veya susarsa:</strong> Uyarı sistemi başlar ve kamuya ifşa edilir.
                </div>
              </div>
            </div>

            {/* Public Advisory Sample */}
            <div className="p-4 rounded-2xl bg-zinc-900 text-white space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <BadgeAlert className="w-4 h-4" />
                <span>Adım 6: Kamuya Açıklanma (8. Gün Sonrası Örnek Kayıt)</span>
              </div>
              <div className="font-mono text-[11px] text-zinc-300 bg-black/50 p-3 rounded-xl border border-zinc-800 space-y-1">
                <p><span className="text-amber-400">⚠️ UYARI:</span> Turist Mağduriyeti Kaydı</p>
                <p><span className="text-zinc-400">İşletme:</span> Örnek Restoran, Fatih, İstanbul</p>
                <p><span className="text-zinc-400">Sorun:</span> Fatura 250 TL, müşteriden 450 TL tahsil etme</p>
                <p><span className="text-zinc-400">Xenios Kararı:</span> İşletme 7 gün içinde telafi etmedi ➔ Kamuya Uyarı Panosunda Yayınlandı</p>
              </div>
            </div>
          </div>

          {/* Repeat Complaints & External Institutional Reports */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">3</span>
              <span>Kurumsal Bildirimler (Resmi Devlet Kurumları)</span>
            </h3>

            <p className="text-xs text-zinc-600 leading-relaxed">
              Xenios yalnızca işletmeyi uyarmakla kalmaz. Tekrar eden veya ciddi kötü niyet taşıyan şikayetleri doğrudan yetkili kamu kurumlarına online ihbar kaydı olarak iletir:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                <strong className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-red-600" />
                  <span>CİMER (Cumhurbaşkanlığı İletişim)</span>
                </strong>
                <p className="text-zinc-500">Turist dolandırıcılığı, sahte acenteler ve esnaf usulsüzlükleri Kültür & Turizm ve Ticaret Bakanlığı'na sevk edilir.</p>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                <strong className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>İBB TUDES (Toplu Ulaşım Hizmetleri)</span>
                </strong>
                <p className="text-zinc-500">Taksi plakasıyla bildirilen fazla ücret, taksimetre açmama ve güzergah uzatma şikayetleri doğrudan cezai işleme alınır.</p>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                <strong className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-600" />
                  <span>Ticaret Bakanlığı (HFA Kurulu)</span>
                </strong>
                <p className="text-zinc-500">Fahiş fiyat uygulayan ve menü fiyatı basmayan restoran ve mağazalar Haksız Fiyat Değerlendirme Kurulu'na raporlanır.</p>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                <strong className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>TÜRSAB (Seyahat Acentaları Birliği)</span>
                </strong>
                <p className="text-zinc-500">Tur operatörleri ve rehberlik hizmetlerindeki ihlaller derhal birlik disiplin kuruluna bildirilir.</p>
              </div>
            </div>
          </div>

          {/* Sık Sorulan Sorular Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>Sık Sorulan Sorular (SSS)</span>
            </h3>

            <div className="space-y-2 text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-zinc-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3.5 text-left font-bold text-zinc-900 bg-zinc-50 hover:bg-amber-50/50 flex items-center justify-between transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 text-zinc-600 bg-white border-t border-zinc-200 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: XENIOS MİSAFİR KALKANI (9 Hayati Rehber - PDF'ten) */}
      {activeSection === 'shield' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-sm">
            <h3 className="text-base font-bold font-serif text-zinc-900">
              İstanbul'da Karşılaşılabilecek Yaygın Tuzaklar ve Yasal Haklarınız
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Aşağıdaki rehberleri inceleyerek seyahatinizi güvenle geçirebilir ve olası tuzaklara karşı bilinçli hareket edebilirsiniz.
            </p>
          </div>

          <div className="space-y-3">
            {shieldTopics.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenTrap(openTrap === item.id ? null : item.id)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-zinc-900 bg-zinc-50/80 hover:bg-amber-50/50 flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.id}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  {openTrap === item.id ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>

                {openTrap === item.id && (
                  <div className="p-5 space-y-3.5 text-xs text-zinc-700 bg-white border-t border-zinc-200 leading-relaxed">
                    <div className="space-y-1">
                      <strong className="text-red-700 block font-bold">⚠️ Karşılaşılan Sorun:</strong>
                      <p>{item.problem}</p>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-amber-700 block font-bold">🛑 Olası Riskler:</strong>
                      <p>{item.risk}</p>
                    </div>

                    <div className="space-y-1 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                      <strong className="text-emerald-800 block font-bold">✅ Misafirin Yapması Gerekenler:</strong>
                      <p className="text-emerald-950">{item.action}</p>
                    </div>

                    <div className="space-y-1 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                      <strong className="text-zinc-800 block font-bold">📜 Türkiye'de Hukuk Nasıl İşler?:</strong>
                      <p className="text-zinc-600">{item.law}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
