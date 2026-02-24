#!/bin/bash
# SPARK Dashboard Deploy Script

echo "🚀 Rozpoczynam budowanie statycznej wersji Frontendu..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Błąd podczas kompresji Vite. Przerwanie skryptu."
  exit 1
fi

echo "📦 Pakowanie plików (wraz z .htaccess)..."
cd dist
zip -r ../app_build.zip * .htaccess
cd ..

echo "☁️ Wysyłanie paczki przez FTP na serwer Seohost..."
curl -T app_build.zip -u "srv86774:tFk41KHRfDUT" ftp://h59.seohost.pl/domains/goldenleadgeneration.com.pl/public_html/cxo/app_build.zip

if [ $? -ne 0 ]; then
  echo "❌ Błąd transferu FTP paczki."
  exit 1
fi

echo "⚙️ Wrzucanie skryptu unzip.php..."
curl -T ../unzip.php -u "srv86774:tFk41KHRfDUT" ftp://h59.seohost.pl/domains/goldenleadgeneration.com.pl/public_html/cxo/unzip.php

if [ $? -ne 0 ]; then
  echo "❌ Błąd transferu skryptu unzip.php."
  exit 1
fi

echo "🔄 Uruchamianie rozpakowywania na serwerze (unzip.php)..."
curl -s https://cxo.goldenleadgeneration.com.pl/unzip.php

echo "🧹 Sprzątanie plików tymczasowych..."
rm app_build.zip

echo "✅ Deploy zakończony z sukcesem! Wejdź na https://cxo.goldenleadgeneration.com.pl i odśwież pamięć cache (Cmd+Shift+R)."
echo ""
