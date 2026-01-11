# Shipping Tracker

[English](#english) | [Deutsch](#deutsch)

---

## Deutsch

Dies ist eine Fullstack Web-App zur Sendungsverfolgung und Visualisierung von Paketen. Die Idee entstand durch die MapCN Web Komponente für React, mit der Karten im Stil der React Komponenten Bibliothek ShadCN angezeigt werden können. Dieses Projekt dient als Lernplattform für Spring Boot Backend-Entwicklung und React Frontend-Entwicklung, mit geplanter Integration interaktiver Kartenvisualisierungen.

### 🎯 Projektziele

- Spring Boot REST API Entwicklung lernen
- React mit TypeScript lernen
- MapLibre GL JS für Routenvisualisierung integrieren
- Eine produktionsreife Full-Stack-Anwendung entwickeln
- Docker Containerisierung und Dev Container Workflows üben

### 🚀 Tech Stack

#### Backend

- **Java 21** mit Spring Boot 4.0.1
- **Gradle** für Build Management
- **Lombok** für reduzierten Boilerplate
- **Bucket4j** für Rate Limiting
- **Jakarta Validation** für Request-Validierung
- **Docker** für Containerisierung

#### Frontend

- **React 18** mit TypeScript
- **Vite** für Build-Tools
- **Tailwind CSS** für Styling
- **shadcn/ui** für Component Library
- **Docker** für Containerisierung

### ✨ Features

#### Aktuell implementiert

- ✅ RESTful API für Sendungsverfolgung
- ✅ Mock-Daten-Provider (TRACK001, TRACK002, TRACK003)
- ✅ Rate Limiting (100 Anfragen/Minute pro IP)
- ✅ CORS-Konfiguration
- ✅ Umfassendes Error Handling
- ✅ TypeScript Interfaces passend zu Backend-Modellen
- ✅ Responsive UI mit shadcn Komponenten
- ✅ Echtzeit-Sendungsverfolgung
- ✅ Event-Timeline-Visualisierung

#### Geplante Features

- 🔜 **MapLibre GL JS Integration** - Interaktive Karte mit Versandrouten
- 🔜 **DHL Unified Shipping API** - Echte Sendungsverfolgung
- 🔜 Weitere Versanddienstleister (FedEx, UPS, etc.)
- 🔜 Sendungssuchverlauf
- 🔜 Multi-Sendungsverfolgung

### 📋 Voraussetzungen

- **Docker Desktop** (für containerisiertes Setup)
- **Node.js 20+** (für lokale Entwicklung)
- **Java 21** (für lokale Entwicklung)
- **Git** mit SSH- oder HTTPS-Zugriff

### 🏃 Schnellstart

#### Mit Docker Compose (Empfohlen)

```bash
# Repository klonen
git clone https://github.com/tobias.hstbrg/shipping-tracker.git
cd shipping-tracker

# Backend und Frontend starten
docker-compose up

# Anwendung aufrufen
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

#### Lokale Entwicklung

##### Backend

```bash
cd backend
./gradlew bootRun

# Backend läuft auf http://localhost:8080
```

##### Frontend

```bash
cd frontend
npm install
npm run dev

# Frontend läuft auf http://localhost:5173
```

#### Mit Dev Containers (VSCode)

1. **Dev Containers** Extension installieren
2. Projekt in VSCode öffnen
3. `Cmd+Shift+P` → "Dev Containers: Reopen in Container"
4. VSCode baut und verbindet sich mit dem Frontend Dev Container
5. `npm run dev -- --host` im integrierten Terminal ausführen

### 🔌 API Endpunkte

#### Health Check

```
GET /health
```

Gibt eine einfache Nachricht zurück, um zu prüfen, ob das Backend läuft.

**Antwort:**

```json
{
  "message": "Shipping Tracker API is running"
}
```

#### Sendung verfolgen

```
GET /api/shipments/{trackingNumber}
```

Ruft Sendungsinformationen für die angegebene Trackingnummer ab.

**Parameter:**

- `trackingNumber` (path) - Die Sendungsverfolgungsnummer

**Beispiel-Anfrage:**

```bash
curl http://localhost:8080/api/shipments/TRACK001
```

**Beispiel-Antwort:**

```json
{
  "trackingNumber": "TRACK001",
  "status": "IN_TRANSIT",
  "carrier": "DHL",
  "origin": {
    "city": "Berlin",
    "countryCode": "DE",
    "postalCode": "10115",
    "coordinates": {
      "latitude": 52.52,
      "longitude": 13.405
    }
  },
  "destination": {
    "city": "New York",
    "countryCode": "US",
    "postalCode": "10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006
    }
  },
  "events": [
    {
      "timestamp": "2026-01-01T10:00:00Z",
      "status": "LABEL_CREATED",
      "location": {
        "city": "Berlin",
        "countryCode": "DE"
      },
      "description": "Sendungsinformationen empfangen"
    }
  ]
}
```

**Verfügbare Mock-Trackingnummern:**

- `TRACK001` - In Transit (Berlin → New York)
- `TRACK002` - Zugestellt (Paris → Berlin)
- `TRACK003` - Zur Zustellung (New York → London)

### 🗂️ Projektstruktur

```
shipping-tracker/
├── backend/                  # Spring Boot Anwendung
│   ├── src/
│   │   ├── main/java/.../
│   │   │   ├── controller/  # REST Controller
│   │   │   ├── service/     # Business-Logik
│   │   │   ├── models/      # Datenmodelle
│   │   │   └── config/      # Konfiguration
│   │   └── test/            # Unit- & Integrationstests
│   ├── build.gradle
│   └── Dockerfile
├── frontend/                 # React + Vite Anwendung
│   ├── src/
│   │   ├── components/      # React-Komponenten
│   │   ├── services/        # API Service Layer
│   │   ├── types/           # TypeScript Interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── .devcontainer/           # Dev Container Konfiguration
│   ├── devcontainer.json
│   └── docker-compose.yaml
├── docker-compose.yaml      # Produktions-Compose-Datei
└── README.md
```

### 🧪 Testing

#### Backend Tests

```bash
cd backend
./gradlew test
```

Das Backend beinhaltet:

- Unit-Tests für Mock-Daten-Provider
- Integrationstests für REST-Endpunkte
- Rate-Limiting-Tests

#### Frontend Tests

_(Demnächst)_

### 🚧 Entwicklungs-Roadmap

#### Phase 1: Kernfunktionalität ✅

- [x] Spring Boot REST API
- [x] Mock-Daten-Provider
- [x] React Frontend mit TypeScript
- [x] Basis Sendungsverfolgungs-UI
- [x] Docker Setup

#### Phase 2: Karten-Visualisierung 🔜

- [ ] MapLibre GL JS integrieren
- [ ] Sendungsroute auf Karte anzeigen
- [ ] Tracking-Events als Karten-Marker anzeigen
- [ ] Sendungsfortschritt animieren

#### Phase 3: Echte API-Integration 🔜

- [ ] DHL Unified Shipping API Integration
- [ ] API-Key-Management
- [ ] Umschalten zwischen Mock- und Echtdaten
- [ ] Verbessertes Error Handling für echte APIs

#### Phase 4: Zusätzliche Features 🔜

- [ ] Multi-Sendungsverfolgung
- [ ] Suchverlauf
- [ ] Weitere Versanddienstleister (FedEx, UPS)
- [ ] Sendungsbenachrichtigungen
- [ ] Export/Teilen von Tracking-Informationen

### 📝 Lizenz

Dieses Projekt ist Open Source und unter der [MIT-Lizenz](LICENSE) verfügbar.

### 🙏 Danksagungen

- Inspiriert durch die [MapLibre GL JS](https://maplibre.org/) MapCN-Komponente
- Entwickelt mit [Spring Boot](https://spring.io/projects/spring-boot)
- UI-Komponenten von [shadcn/ui](https://ui.shadcn.com/)

### 📧 Kontakt

**Tobias** - [GitHub](https://github.com/tobias.hstbrg)

---

_Dieses Projekt wird aktiv entwickelt. Schau regelmäßig für Updates vorbei!_

---

## English

This is a full-stack web app for tracking and visualizing packages. The idea originated from the MapCN web component for React, which can be used to display maps in the style of the React component library ShadCN. This project serves as a learning platform for Spring Boot backend development and React frontend development, with plans to integrate interactive map visualizations.

## 🎯 Project Goals

- Learn Spring Boot REST API development
- Learn React with TypeScript
- Integrate MapLibre GL JS for route visualization
- Build a production-ready full-stack application
- Practice Docker containerization and Dev Container workflows

## 🚀 Tech Stack

### Backend

- **Java 21** with Spring Boot 4.0.1
- **Gradle** for build management
- **Lombok** for reduced boilerplate
- **Bucket4j** for rate limiting
- **Jakarta Validation** for request validation
- **Docker** for containerization

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Docker** for containerization

## ✨ Features

### Currently Implemented

- ✅ RESTful API for shipment tracking
- ✅ Mock data provider (TRACK001, TRACK002, TRACK003)
- ✅ Rate limiting (100 requests/minute per IP)
- ✅ CORS configuration
- ✅ Comprehensive error handling
- ✅ TypeScript interfaces matching backend models
- ✅ Responsive UI with shadcn components
- ✅ Real-time shipment tracking display
- ✅ Event timeline visualization

### Planned Features

- 🔜 **MapLibre GL JS integration** - Interactive map showing shipment routes
- 🔜 **DHL Unified Shipping API** - Real shipment tracking
- 🔜 Additional shipping providers (FedEx, UPS, etc.)
- 🔜 Shipment search history
- 🔜 Multi-shipment tracking

## 📋 Prerequisites

- **Docker Desktop** (for containerized setup)
- **Node.js 20+** (for local development)
- **Java 21** (for local development)
- **Git** with SSH or HTTPS access

## 🏃 Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/tobias.hstbrg/shipping-tracker.git
cd shipping-tracker

# Start both backend and frontend
docker-compose up

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

### Local Development

#### Backend

```bash
cd backend
./gradlew bootRun

# Backend runs on http://localhost:8080
```

#### Frontend

```bash
cd frontend
npm install
npm run dev

# Frontend runs on http://localhost:5173
```

### Using Dev Containers (VSCode)

1. Install the **Dev Containers** extension
2. Open the project in VSCode
3. Press `Cmd+Shift+P` → "Dev Containers: Reopen in Container"
4. VSCode will build and attach to the frontend dev container
5. Run `npm run dev -- --host` in the integrated terminal

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Returns a simple message to verify the backend is running.

**Response:**

```json
{
  "message": "Shipping Tracker API is running"
}
```

### Track Shipment

```
GET /api/shipments/{trackingNumber}
```

Retrieves shipment information for the given tracking number.

**Parameters:**

- `trackingNumber` (path) - The shipment tracking number

**Example Request:**

```bash
curl http://localhost:8080/api/shipments/TRACK001
```

**Example Response:**

```json
{
  "trackingNumber": "TRACK001",
  "status": "IN_TRANSIT",
  "carrier": "DHL",
  "origin": {
    "city": "Berlin",
    "countryCode": "DE",
    "postalCode": "10115",
    "coordinates": {
      "latitude": 52.52,
      "longitude": 13.405
    }
  },
  "destination": {
    "city": "New York",
    "countryCode": "US",
    "postalCode": "10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006
    }
  },
  "events": [
    {
      "timestamp": "2026-01-01T10:00:00Z",
      "status": "LABEL_CREATED",
      "location": {
        "city": "Berlin",
        "countryCode": "DE"
      },
      "description": "Shipment information received"
    }
  ]
}
```

**Available Mock Tracking Numbers:**

- `TRACK001` - In Transit (Berlin → New York)
- `TRACK002` - Delivered (Paris → Berlin)
- `TRACK003` - Out for Delivery (New York → London)

## 🗂️ Project Structure

```
shipping-tracker/
├── backend/                  # Spring Boot application
│   ├── src/
│   │   ├── main/java/.../
│   │   │   ├── controller/  # REST controllers
│   │   │   ├── service/     # Business logic
│   │   │   ├── models/      # Data models
│   │   │   └── config/      # Configuration
│   │   └── test/            # Unit & integration tests
│   ├── build.gradle
│   └── Dockerfile
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── .devcontainer/           # Dev Container configuration
│   ├── devcontainer.json
│   └── docker-compose.yaml
├── docker-compose.yaml      # Production compose file
└── README.md
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
./gradlew test
```

The backend includes:

- Unit tests for mock data provider
- Integration tests for REST endpoints
- Rate limiting tests

### Frontend Tests

_(Coming soon)_

## 🚧 Development Roadmap

### Phase 1: Core Functionality ✅

- [x] Spring Boot REST API
- [x] Mock data provider
- [x] React frontend with TypeScript
- [x] Basic shipment tracking UI
- [x] Docker setup

### Phase 2: Map Visualization 🔜

- [ ] Integrate MapLibre GL JS
- [ ] Display shipment route on map
- [ ] Show tracking events as map markers
- [ ] Animate shipment progress

### Phase 3: Real API Integration 🔜

- [ ] DHL Unified Shipping API integration
- [ ] API key management
- [ ] Toggle between mock and real data
- [ ] Enhanced error handling for real APIs

### Phase 4: Additional Features 🔜

- [ ] Multiple shipment tracking
- [ ] Search history
- [ ] Additional carriers (FedEx, UPS)
- [ ] Shipment notifications
- [ ] Export/share tracking information

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the [MapLibre GL JS](https://maplibre.org/) MapCN component
- Built with [Spring Boot](https://spring.io/projects/spring-boot)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📧 Contact

**Tobias** - [GitHub](https://github.com/tobias.hstbrg)

---

_This project is under active development. Check back for updates!_
