# AI Bias Detection Framework (BiasLens)

An interactive framework to evaluate, quantify, and visualize stereotypical associations and cognitive biases in AI language models using the Word Embedding Association Test (WEAT).

---

## Features

- **WEAT Model Scanner**: Run custom bias assessments with customizable target word sets (e.g., Science vs. Arts) and attribute word sets (e.g., Male vs. Female).
- **Interactive Analytics Dashboard**: Real-time summary statistics, including assessment counts, average bias scores, score distribution charts via Chart.js, and recent scan logs.
- **Resilient Data Layer**: Backed by MongoDB with an automatic in-memory fallback for zero-configuration local runs.
- **Modern Angular Frontend**: Built using Angular 19 standalone components, reactive routing, and responsive glassmorphic dark-mode styling.

---

## Project Structure

```
bias-detection-framework/
├── backend/
│   ├── models/
│   │   └── BiasResult.js        # Mongoose schema for bias assessment results
│   ├── utils/
│   │   └── weat.js              # WEAT calculation and vector similarity logic
│   ├── server.js                # Express REST API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Dashboard, Model Scanner, Sidebar components
│   │   │   ├── services/        # BiasService HTTP client
│   │   │   ├── app.routes.ts    # Client-side routing
│   │   │   └── app.config.ts    # Application configuration
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (v9+)
- (Optional) [MongoDB](https://www.mongodb.com/) for persistent data storage

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ledgekb/AI-bias-Detection-framework.git
   cd AI-bias-Detection-framework
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

---

### Running the Application

1. **Start the Backend API:**
   ```bash
   cd backend
   node server.js
   ```
   *Runs by default on `http://localhost:5000`.*

2. **Start the Frontend Application:**
   ```bash
   cd frontend
   npm start
   ```
   *Navigate to `http://localhost:4200` in your browser.*

---

## API Endpoints

- `POST /api/bias/weat`: Compute WEAT bias score from target and attribute sets and save the result.
- `GET /api/bias/history`: Retrieve history of all previous bias scans.

---

## License

ISC
