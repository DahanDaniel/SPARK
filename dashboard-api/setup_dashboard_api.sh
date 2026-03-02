#!/bin/bash
# Zmiana portu dla procesu produkcyjnego
sed -i 's/const PORT = process.env.PORT || 3000;/const PORT = process.env.PORT || 80;/g' server.js
