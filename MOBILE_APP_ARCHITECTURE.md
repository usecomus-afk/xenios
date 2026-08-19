# 📱 Xenios iOS & Android Native Mobil Uygulama Mimarisi ve Yayınlama Kılavuzu

Xenios, hem **Progressive Web App (PWA)** olarak web üzerinden saniyeler içinde kurulabilir hem de **Capacitor Hibrit Köprüsü** sayesinde **Google Play Store** ve **Apple App Store** mağazalarında gerçek native uygulama olarak yayınlanabilir bir mimariye sahiptir.

---

## 🏗️ 1. Mimari Genel Bakış (Architecture Overview)

```
                                  ┌─────────────────────────────────────┐
                                  │      Xenios Next.js 16 + React 19   │
                                  │   (Tailwind, Firestore, Gemini AI)  │
                                  └──────────────────┬──────────────────┘
                                                     │
                         ┌───────────────────────────┴───────────────────────────┐
                         ▼                                                       ▼
        ┌──────────────────────────────────┐                    ┌──────────────────────────────────┐
        │   Web / PWA Doğrudan Kurulum     │                    │    Capacitor Native Köprüsü      │
        │   (Web App Manifest + SW)        │                    │    (iOS & Android Wrapper)       │
        └────────────────┬─────────────────┘                    └────────────────┬─────────────────┘
                         │                                                       │
             ┌───────────┴───────────┐                               ┌───────────┴───────────┐
             ▼                       ▼                               ▼                       ▼
      [ Android PWA ]          [ iOS Safari ]                [ Android .AAB ]         [ iOS .IPA ]
     (1-Tıkla Yükleme)       (Ana Ekrana Ekle)               (Google Play)            (App Store)
```

---

## 🚀 2. Geliştirici Komutları (NPM Scripts)

| Komut | Açıklama |
| :--- | :--- |
| `npm run cap:add:android` | Native Android Studio projesini (`android/`) ilk kez oluşturur. |
| `npm run cap:add:ios` | Native Apple Xcode projesini (`ios/`) ilk kez oluşturur. |
| `npm run cap:sync` | Web varlıklarını ve eklentileri Android ve iOS projelerine eşitler. |
| `npm run cap:android` | Android projesini doğrudan **Android Studio**'da açar. |
| `npm run cap:ios` | iOS projesini doğrudan **Apple Xcode**'da açar. |
| `npm run cap:build` | Next.js derlemesini yapar ve native klasörleri günceller. |

---

## 🤖 3. Google Play Store İçin Android Paketi (.AAB) Üretimi

1. **Android Projesini Başlatın:**
   ```bash
   npx cap add android
   npx cap sync
   ```
2. **Android Studio'da Açın:**
   ```bash
   npx cap open android
   ```
3. **Google Play İçin İmzalı Paket Derleyin:**
   - Android Studio menüsünden **Build ➔ Generate Signed Bundle / APK** seçeneğini seçin.
   - **Android App Bundle (.aab)** seçeneğini işaretleyin.
   - Keystore anahtarınızı oluşturun / seçin ve **Release** modunda derleyin.
   - Oluşan `.aab` dosyasını [Google Play Console](https://play.google.com/console) paneline yükleyin.

---

## 🍏 4. Apple App Store İçin iOS Paketi (.IPA) Üretimi

1. **iOS Projesini Başlatın:**
   ```bash
   npx cap add ios
   npx cap sync
   ```
2. **Xcode'da Açın (macOS üzerinde):**
   ```bash
   npx cap open ios
   ```
3. **App Store & TestFlight Gönderimi:**
   - Xcode'da **Signing & Capabilities** sekmesinden Apple Developer Hesabınızı seçin.
   - Menüden **Product ➔ Archive** yapın.
   - **Distribute App ➔ App Store Connect** seçeneğini kullanarak TestFlight ve App Store'a yükleyin.

---

## ⚡ 5. Canlı Güncelleme (Over-The-Air OTA Updates)

Xenios'un Capacitor mimarisi sayesinde, `capacitor.config.ts` içerisindeki `server.url` canlı domain adresinize yönlendirildiğinde:
- Otel menülerinde, deneyim kataloglarında veya arayüzde yaptığınız değişiklikler **anında** misafirlerin telefonlarında güncellenir.
- Her küçük değişiklik için Google Play veya App Store'dan yeni güncelleme onayı beklemenize gerek kalmaz!
