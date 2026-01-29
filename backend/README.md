# Map-Told – Backend

Das Map-Told - Backend ist verantwortlich für die geospatiale Analyse einer vom Benutzer ausgewählten Zone, die Integration von GIS- und Klimadaten aus öffentlichen APIs sowie die Generierung verständlicher Erklärungen mithilfe von KI.

## Hauptfunktionen

- Analyse eines geografischen Gebiets anhand einer Bounding Box oder von Koordinaten
- Abruf von GIS-Layern (Gebäude, Grünflächen, Straßen)
- Integration externer APIs:
  - OpenStreetMap (Overpass API)
  - Open-Meteo API
  - OpenTopoData
- Berechnung räumlicher und klimatischer Kennzahlen
- Generierung erklärender Texte mit KI
- Unterstützung für Folgefragen zu bestehenden Analysen

## Gesamtarchitektur

- **REST API** Node.js und Express.js
- **Datenbank** MongoDB
- **Externe APIs** für GIS- und Wetterdaten
- **AI-Service** zur Textgenerierung

## Data Flow

1. Der Benutzer wählt ein Gebiet auf der Karte aus
2. Das Frontend sendet die Koordinaten an das Backend
3. Das Backend:
   - ruft GIS-Daten über die Overpass API ab
   - ruft Wetterdaten über Open-Meteo ab
   - ruft Höheninformationen über OpenTopoData ab
4. Die Daten werden verarbeitet und in GeoJSON konvertiert
5. Räumliche und klimatische Kennzahlen werden berechnet
6. Eine erklärende Zusammenfassung wird mithilfe von KI generiert
7. Die Analyse wird in der Datenbank gespeichert
8. Die Ergebnisse werden an das Frontend zurückgegeben
9. Der Benutzer kann Folgefragen zur Analyse stellen
