# Restaurant Order API

This is a complete Node.js API project using TypeScript, Express, Sequelize, PostgreSQL and Swagger, structured with **DDD** and **Clean Architecture** principles. It supports basic restaurant order operations such as managing customers, menu items, and orders.

---

## 📦 Technologies

- Node.js
- TypeScript
- Express.js
- Sequelize (PostgreSQL)
- Swagger (OpenAPI)
- Docker & Docker Compose
- Jest (for unit testing)
- Pino (for logging)
- Clean Architecture (Domain, Application, Infrastructure, Presentation)

---

## 📁 Project Structure

```
src/
├── domain/            # Entities and repositories interfaces
├── application/       # Use cases and DTOs
├── infrastructure/    # Sequelize models, database config, and repository implementations
├── presentation/      # Routes and controllers
├── main/              # Server startup
tests/                 # Unit tests for use cases
```

---

## ⚙️ Installation

### 1. Clone the project

```bash
git clone https://github.com/Cosmess/RestaurantOrderManager.git
cd RestaurantOrderManager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Rename `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/
PORT=3000
```

---

## 🚀 Running the App Locally

```bash
npm run dev
```

App will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Run Unit Tests

```bash
npm run test  
```

All tests are located inside the `/tests` folder and use `jest`.

---

## 📘 API Documentation

Swagger is available at:

```
http://localhost:3000/api-docs
```

---

## 🐳 Running with Docker

### 1. Build and start the containers

```bash
docker-compose up --build
```

This will start:
- `restaurant-api` at `http://localhost:3000`
- `postgres-db` on port `5432`

### 2. Verify

- API Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧱 Sequelize Sync (Auto Migration)

On server startup, Sequelize will auto-create or alter tables based on models using:

```ts
sequelize.sync({ alter: true });
```

You can modify to `{ force: true }` if you want to drop and recreate the schema each time.

---

## ✅ Features Implemented

1. Create and manage customers
2. Create and manage menu items
3. Place orders with multiple menu items
4. Modify order items and status
5. List all orders from a specific customer
6. API Documentation via Swagger
7. Unit tests for all use cases (Jest)
8. Dockerized setup with PostgreSQL

---