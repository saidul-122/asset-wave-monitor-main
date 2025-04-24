# 🪙 Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit web app that simulates real-time updates of cryptocurrency prices and renders them in a detailed table. Includes price changes, volume, market cap, and mini 7-day performance charts.

## 🚀 Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Language:** TypeScript
- **Styling:** CSS Modules / Custom CSS

## 🔧 Features

- Real-time simulated price updates every 2 seconds (WebSocket simulation)
- Redux-powered state management for scalability
- Displays key metrics: Price, 1h/24h/7d %, Volume, Market Cap
- Includes coin logo and 7-day performance mini-chart
- Color-coded percentage changes (green for gain, red for loss)
- Fully responsive table layout

## 📂 Folder Structure

```
crypto-tracker/
├── public/
│   └── assets/        # Logos, 7D chart images
├── src/
│   ├── app/
│   │   └── store.ts
│   ├── features/
│   │   └── crypto/
│   │       ├── cryptoSlice.ts
│   │       └── CryptoTable.tsx
│   ├── utils/
│   │   └── simulateUpdates.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## 🚧 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/saidul-122/asset-wave-monitor-main
cd crypto-tracker

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 📈 Demo Preview

https://resilient-bienenstitch-bbb023.netlify.app/

## 📖 Description of Main Files

- **`store.ts`** - Sets up the Redux store with the crypto slice
- **`cryptoSlice.ts`** - Handles state for crypto asset updates
- **`simulateUpdates.ts`** - Simulates WebSocket by dispatching periodic asset updates
- **`CryptoTable.tsx`** - React component that renders the asset table
- **`index.ts` (types)** - TypeScript interface for the asset schema

## ✨ Contributions

Feel free to fork and improve! PRs are welcome.