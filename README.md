# 🛒 W-Setu — Voice-First Supply Chain Platform for Kiranas  

**W-Setu (Web-Setu)** is a voice-first, AI-enabled inventory and supply chain management platform built specifically for **India’s kiranas and micro-vendors**. Designed to extend supply chain intelligence to Tier 2/3 cities and rural regions, W-Setu empowers vendors with low-tech tools, and gives admins real-time visibility, AI-driven insights, and last-mile delivery optimization.  

---

## 📌 Problem We Solved  

While enterprises leverage AI, IoT, and automation for large-scale supply chains, **India’s kiranas remain underserved**, relying on manual stockkeeping and disconnected delivery systems. W-Setu bridges this gap with a **hyperlocal, low-tech, voice-driven solution** tailored for Bharat.  

---

## 🧑‍💼 Admin Dashboard – Control Center  

- 🔐 **JWT-secured login** for admin access  
- 📦 View **real-time inventory** from all registered vendors  
  - Filter by item name, category, quantity, price per unit, vendor name, and business email  
- 📈 **AI-powered demand forecasting** based on:  
  - Total stock, average discount, store traffic  
  - Previous week/year sales  
  - Temperature (class encoded)  
- 👥 View **detailed vendor profiles** including name, email, and market region  
- 🛣️ **AI-enabled intelligent last-mile routing**  
  - Optimized for carts, rickshaws, and two-wheelers using Google Maps API  
  - Adapts to traffic, rural roads, and monsoon closures  

---

## 👤 Vendor Dashboard – Built for Bharat  

- 🔐 JWT-authenticated login for vendors  
- 🗣️ **Voice-based inventory entry** (Hindi + English) using Google Translate API  
  _e.g., “Aloo 20 kilo at 30, expiry 5 din”_  
- 📊 Simple dashboard to manage current stock and track expiries  
- 📱 Mobile-friendly, **offline-first** experience  
- 📩 **Twilio SMS alerts** sent to vendors for:  
  - Successful registration  
  - Inventory updates  
  - Cooperative pool creation and participation  

---

## 🧠 AI/ML Capabilities  

- 🔍 **Demand Forecasting Model** (Python + Flask)  
  - Predicts spikes in item demand using multivariate data  
- 🗺️ **AI-optimized delivery routing**  
  - Designed for last-mile conditions in rural/semi-urban India  

---

## 🔧 Tech Stack  

| Layer         | Tools & Frameworks                                                |
|---------------|--------------------------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                                            |
| Backend       | Node.js, Express.js                                               |
| ML Services   | Python, Flask                                                     |
| Database      | MongoDB Atlas                                                     |
| APIs          | Google Translate API, Google Maps API, Twilio SMS API             |
| Auth          | JSON Web Tokens (JWT)                                             |  

---

## 💡 Why W-Setu is Unique  

- 🔊 **Voice-first design** — accessible to non-tech-savvy kirana owners  
- 🌐 **Built for Bharat** — works in low-internet and multilingual conditions  
- 📈 **Admin-only forecasting** — gives predictive visibility into grassroots demand  
- 🛒 **Vendor transparency** — view detailed profiles and inventory from a single pane  
- 🛣️ **Last-mile delivery intelligence** — optimized for India’s local mobility  

---

## 🖥️ Frontend Setup (React)  

```bash
cd frontend
npm install
npm start
```

---

> Made with ❤️ by the VendoSync Team
