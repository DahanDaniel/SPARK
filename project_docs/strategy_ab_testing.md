# Strategia A/B Testów: SPARK 2026

Dokument definiuje dwie główne ścieżki biznesowe oraz warianty ofert (Entry/Free) do przetestowania na bazie 80k kontaktów.

---

## 🏗️ Cel Kampanii
Wyłonienie **najbardziej konwertującej oferty** ("Killer Offer") poprzez testy na dużych próbach (5-10k rekordów). Sprawdzamy:
1.  Jaki **temat** grzeje bardziej: "Porządek w Procesach" (Mapping) czy "Wdrożenie AI" (AI Audit)?
2.  Jaki **model** sprzedaje lepiej: Niska bariera płatna (Entry) czy Darmowa Próbka (Lead Magnet)?

---

## 🛣️ Ścieżka 1: Process Mapping (Optymalizacja)
*Hasło:* "Przestań tracić pieniądze na chaosie. Zobacz swoje procesy czarno na białym."

### Opis Usługi (Value Prop)
Nie sprzedajemy "konsultingu". Sprzedajemy **jasność**. Właściciele firm czują, że "coś nie działa", ale nie wiedzą gdzie. My to wizualizujemy. Dostarczamy inżynierską mapę (BPMN) stanu obecnego (As-Is), która bezlitośnie obnaża wąskie gardła.

### Wariant A: Tani Entry Offer (Paid)
*   **Nazwa:** "Mapping Lite™ Session"
*   **Cena:** ~497 PLN (Psychologiczna bariera "sprawdzam").
*   **Obietnica:** 90-minutowa sesja warsztatowa + Profesjonalna Mapa Procesu (PDF) + 3 Quick Wins.
*   **Upsell:** "Process Fix" (Pełne wdrożenie/naprawa zidentyfikowanych błędów) -> 5k-15k PLN.

### Wariant B: Darmowa Próbka (Free)
*   **Nazwa:** "30-min Process Sketch"
*   **Cena:** 0 PLN.
*   **Obietnica:** Szybka rozmowa z ekspertem, który na żywo rozrysuje jeden kluczowy problem na wirtualnej tablicy. Klient dostaje "brudnopis" (szkic).
*   **Upsell:** "Professional Mapping Report" (czyli Wariant A za pełną cenę) lub "Process Fix".

---

## 🤖 Ścieżka 2: AI Audit (Nowość)
*Hasło:* "Nie wdrażaj AI na bałagan. Sprawdź, czy Twoja firma jest gotowa na automatyzację."

### Opis Usługi (Value Prop)
Wszyscy chcą AI, ale mało kto ma procesy, które AI zrozumie. Wdrażanie AI na chaotyczne procesy to tylko "szybsze robienie bałaganu". My sprawdzamy "AI Readiness" – czy masz dane, procedury i powtarzalność, by automat zadziałał.

### Wariant A: Tani Entry Offer (Paid)
*   **Nazwa:** "AI Readiness Check"
*   **Cena:** ~497 PLN.
*   **Obietnica:** Audyt 1 wybranego obszaru (np. Obsługa Klienta, Raportowanie). Wynik: Raport "Traffic Light" (Zielone: Wdrażać / Żółte: Poprawić / Czerwone: Nie dotykać).
*   **Upsell:** "AI Pilot Implementation" (Budowa pierwszego agenta/automatyzacji) -> 10k+ PLN.

### Wariant B: Darmowa Próbka (Free)
*   **Nazwa:** "AI Potential Call"
*   **Cena:** 0 PLN.
*   **Obietnica:** 20-minutowa konsultacja "Tak/Nie". Konsultant ocenia jeden pomysł klienta (np. "Chcę bota na stronie") i mówi szczerze czy to ma sens technologiczny.
*   **Upsell:** "AI Readiness Check" (Pogłębiony audyt) lub Wdrożenie.

---

## ⚙️ Mechanika Lejka (Funnel)

### Model Testingowy
Baza: ~80,000 kontaktów.
Testy na "wycinkach" (Cohorts) po 5,000 - 10,000 maili.
Wysyłka: Co 2-3 dni (żeby nie spalić domeny i zdążyć obsłużyć leady).

### Przepływ (Flow)
1.  **Cold Mail:**
    *   Wysoka personalizacja (Imię, Branża).
    *   Bardzo krótki, konkretny ("One-liner").
    *   Jeden Call to Action (CTA): Link do LP.
2.  **Landing Page (Dedykowany):**
    *   Osobny LP dla Mapping (Paid), Mapping (Free), AI (Paid), AI (Free).
    *   Totalne skupienie na jednej ofercie. Brak menu, brak rozpraszaczy.
3.  **Booking / Płatność:**
    *   **Paid:** Stripe Link / Koszyk -> Calendly po zakupie.
    *   **Free:** Calendly (z pytaniami kwalifikującymi, żeby odsiać "zbieraczy darmówek").
4.  **Meeting (Delivery):**
    *   Zoom/Google Meet. Nagrywany (za zgodą) dla celów szkoleniowych AI.

---

## 📝 Plan Działania (Next Steps)
1.  [ ] **Copywriting Ofert:** Rozpisanie dokładnych bullet-pointów "Co dostajesz" dla każdej z 4 ofert.
2.  [ ] **Cold Mail Scripts:** Przygotowanie sekwencji (Initial + Follow-up) dla każdego wariantu.
3.  [ ] **Landing Page Variations:** Zaplanowanie struktury LP (możemy klonować obecny, ale zmienić sekcję Hero i Offer).
4.  [ ] **Tech Setup:** Konfiguracja Stripe (dla Paid) i osobnych kalendarzy (dla Free/Paid).
