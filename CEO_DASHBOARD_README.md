# 🚀 SPARK: Instrukcja Wdrożenia Kokpitu CEO na serwerze Seohost

Ten plik opisuje jak krok po kroku uruchomić nowo zbudowany kokpit operacyjny dla CEO na istniejącym serwerze \`srv86774.seohost.com.pl\`. Moduł zapewnia odizolowanie kluczy API od publicznego Landing Page.

## Struktura Katalogów
Utworzyłem dla Ciebie dwa główne foldery:
1. \`dashboard-api\` - Bezpieczny backend (Node.js/Express). Trzyma hasła i gada z zewnętrznymi serwisami.
2. \`dashboard-app\` - Przepiękny frontend w React + Tailwind V4.

---

## Krok 1: Wdrożenie Backend'u (API)
Serwer Seohost (o ile ma zainstalowane Node.js, np. przez panel cPanel/DirectAdmin - Node.js App) wymaga wrzucenia plików z \`dashboard-api\`.

1. Prześlij zawartość folderu \`dashboard-api\` do np. \`~/domains/api.ceo.twojadomena.pl/public_html/\`.
2. Otwórz plik \`.env.example\`, uzupełnij prawdziwe dane Listmonka, wymyśl silne hasło dla CEO i zapisz plik jako **\`.env\`**.
3. Upewnij się, że w panelu Seohost aplikacja Node.js jest skonfigurowana do uruchamiania \`server.js\`.
4. Wykonaj \`npm install\` w tym folderze na serwerze.

> **Ważne:** Sprawdź czy domena \`api.ceo.twojadomena.pl\` ma bezpieczny certyfikat (SSL/LetsEncrypt).

---

## Krok 2: Wdrożenie Frontend'u (Aplikacja React)
Aplikacja frontendowa to statyczne pliki, co sprawia że wdrożenie jest banalnie proste.

1. Najpierw otwórz u siebie na komputerze terminal i wejdź do głównego foldera frontendu:
   \`cd /Users/danieldahan/Programming/SPARK/dashboard-app\`
2. Wygeneruj ostateczny kod aplikacji:
   \`npm run build\`
3. (Opcjonalnie) Jeśli Twoje API ma już docelową subdomenę, musisz wejść do \`src/api.js\` i zmienić baseURL na Twojądomenę API zanim zrobisz build, lub stworzyć plik \`.env.production\` z flagą \`VITE_API_URL=https://api.ceo.twojadomena.pl\`.
4. Po zbudowaniu, w folderze \`/dashboard-app/\` pojawi się folder \`dist\`.
5. Prześlij CAŁĄ zawartość folderu \`dist/\` na serwer Seohost do folderu udostępniającego kokpit: 
   \`~/domains/ceo.twojadomena.pl/public_html/\`.

---

## Lokalny Development
Aby rozwijać kokpit i podpiąć pod to docelowe API:

**Terminal 1 (Backend):**
\`\`\`bash
cd dashboard-api
npm start
\`\`\`

**Terminal 2 (Frontend React):**
\`\`\`bash
cd dashboard-app
npm run dev
\`\`\`
I otwórz \`http://localhost:5173\`. Wpisz hasło zaprogramowane w swoim lokalnym \`.env\`, by zobaczyć podgląd na żywo!
