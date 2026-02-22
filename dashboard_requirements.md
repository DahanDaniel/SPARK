# 📊 Kokpit Operacyjny CEO - Architektura i Moduły

Ten dokument zawiera gotową koncepcję układu i modułów operacyjnych dla nowego kokpitu dla CEO. Uwzględnia najistotniejsze metryki z naszych kampanii (SPARK, GLG, DNA Architekci itp.), łącząc dane wysyłkowe z realnymi efektami biznesowymi.

---

## 🎛️ 1. Globalne Filtrowanie (Global Controls)
**Funkcja:** Pozwala na natychmiastowe zawężenie wszystkich danych na kokpicie do interesującego wycinka bez konieczności przechodzenia na inne podstrony.
*   **Filtry:**
    *   **Projekt / Klient:** np. *SPARK, GLG, DNA Architekci, Uporządkuj Firmę* (dropdown lub zakładki).
    *   **Zakres Dat:** np. *Ostatnie 7 dni, W tym miesiącu, Q1, YTD*.
    *   **Opiekun/Ekspert:** Jeśli projekty są przypisane do konkretnych wspólników lub handlowców.

---

## 📈 2. Executive Summary (Główne KPI)
**Funkcja:** Sekcja najwyższego poziomu. Estetyczne, duże "kafelki" (scorecards) z najważniejszymi liczbami i wskaźnikiem trendu (rosnący/malejący vs poprzedni okres).
*   **Moduły:**
    *   **Zrealizowane Wysyłki (Total Sent):** Zasięg naszych działań.
    *   **Średni Open Rate (OR) / Click Rate (CTR):** Skuteczność naszych copy i jakość bazy.
    *   **Łączna liczba Leadów:** Wszelkie pozytywne i neutralne odpowiedzi.
    *   **Liczba Golden Leadów:** Kwalifikowane leady o najwyższym priorytecie biznesowym.
*   **Źródło danych:**
    *   Wysyłki & OR/CTR $\rightarrow$ **Listmonk** (agregacja tabel `campaigns`, `campaign_views`, `link_clicks`).
    *   Leady & Golden Leady $\rightarrow$ **Google Sheets** (zliczenie rekordów ze statusami leadów w głównych arkuszach śledzących).

---

## 🌪️ 3. Lejek Konwersji (Campaign Funnel)
**Funkcja:** Kaskadowy wykres ilustrujący jak zasięg z cold mailingu topnieje do poziomu realnego biznesu. Pozwala CEO szybko diagnozować "wąskie gardła".
*   **Etapy lejka:**
    1.  **Wysłane (Sent)** $\rightarrow$ [Dane z Listmonk]
    2.  **Otwarte (Opened)** $\rightarrow$ [Dane z Listmonk]
    3.  **Kliknięte (Clicked) / Odpisali** $\rightarrow$ [Dane z Listmonk / Skrzynki]
    4.  **Zainteresowani (Leads)** $\rightarrow$ [Dane z Google Sheets]
    5.  **Kwalifikowani (Golden Leads)** $\rightarrow$ [Dane z Google Sheets]
    6.  **Sukces (Deal Won / Umowa)** $\rightarrow$ [Dane z Google Sheets/CRM]

---

## ✉️ 4. Monitorowanie Kampanii (Listmonk Insights)
**Funkcja:** Pigułka informacyjna o tym, co dokładnie "dzieje się" na serwerze i w procesie wysyłkowym.
*   **Moduły:**
    *   **Live Tracker (Ostatnie Kampanie):** Tabela z ostatnimi 5-10 kampaniami (Nazwa, Tagi projektu, Odbiorcy, Wykonanie %, OR, CTR).
    *   **Wykres Trendów Zaangażowania:** Wykres liniowy pokazujący jak zachowuje się OR i CTR w czasie, by wychwycić "zmęczenie" bazy lub potencjalne kłopoty z dostarczalnością (wpadanie do spamu).
    *   **Alert Dostarczalności (Bounces):** Mały widget pokazujący wskaźnik bounce rate, jako krytyczny czynnik dla zdrowia infrastruktury mailingowej.
*   **Źródło danych:** **Listmonk**.

---

## 🏆 5. Jakość i Status Leadów (Google Sheets Hub)
**Funkcja:** Przejrzysty widok na bezpośrednie rezultaty biznesowe kampanii (to co CEO zazwyczaj interesuje najbardziej).
*   **Moduły:**
    *   **Feed Najnowszych Golden Leadów:** Estetyczna, przewijana lista z najświeższymi sukcesami. Kafelki zawierające: *Firma, Decydent, Klient(Projekt), Data, Krótki wstęp z arkusza*.
    *   **Rozkład Statusów (Status Breakdown):** Wykres kołowy (Donut chart) dla wybranego projektu pokazujący, w jakiej fazie są leady (np. *Follow-up, Wycena wysłana, Umowa w negocjacji, Odrzucone*).
    *   **Konwersja Źródeł Czas/Baza (A/B Testy):** Jeśli mamy testy A/B copy, pokazanie który szablon/tytuł z Listmonka dostarcza leady, a który jest "pusty".
*   **Źródło danych:** **Google Sheets** (Poszczególne zakładki kampanii). Wymaga ustandaryzowania statusów i nazewnictwa we wszystkich arkuszach, z których czerpane są dane.

---

## 🏗 Wytyczne do Technicznej Integracji (Dla wdrożenia w nowym workspace)

Aby zebrać to wszystko w jednym, spójnym narzędziu:

1. **Ujednolicenie Danych w Google Sheets (Fundament):**
   * Utworzenie "Master Sheet" agregującego pozycje ze wszystkich projektowych arkuszy (SPARK, GLG etc.) za pomocą funkcji `IMPORTRANGE` + `QUERY` lub Google Apps Script. Da to pojedyncze źródło prawdy dla narzędzia BI nt. Leadów.
   
2. **Podpięcie Bazy Listmonk:**
   * **Sposób A (Automatyzacje m.in n8n/Make):** Codzienny/cogodzinny export zagregowanych statystyk z API/Bazy Listmonk prosto do dedykowanej tabeli w "Master Sheet". 
   * **Sposób B (Bezpośrednie połączanie SQL):** Narzędzia typu Looker Studio, Metabase, Retool mogą bezpośrednio czytać bazę Listmonk via połączenie (Read-Only) PostgreSQL, aby generować widoki wysyłek i łączyć je z Sheetsem (Blend Data).

3. **Rekomendowane narzędzia pod Workspace CEO:**
   * **Looker Studio:** Ulubione darmowe narzędzie jeśli większość i tak agregujemy w Google Sheets. Bardzo łatwo zrobisz filtry "Projekt", zrobisz estetyczne wykresy i połączysz dane. Może być osadzone (iframe) w Notion / Life OS.
   * **Retool / Glide:** Jeśli CEO oprócz "podglądania" potrzebuje móc np. kliknąć i zmienić status lead'a, zostawić komentarz bez wchodzenia do surowego arkusza kalkulacyjnego.
   * **Metabase:** Najlepsze do pięknej wizualizacji z bezpośrednim dostępem do baz SQL.
