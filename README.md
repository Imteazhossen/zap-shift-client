# 📦 Parcel Delivery App

Welcome to the **Parcel Delivery Web App** — a modern, full-featured parcel booking, tracking, and delivery management platform built for seamless logistics operations. This project includes user, admin, and rider dashboards with payment processing, real-time tracking, and automated status updates.

🌐 **Live Demo:** [https://zap-shift-49139.web.app](https://zap-shift-49139.web.app)

---

## 🚀 Features

### 🔹 User Panel

* ✅ Register & login with Firebase authentication
* 📦 Create parcel deliveries with pickup & delivery details
* 💳 Pay via Stripe
* 🚚 Track your parcel with a unique tracking ID

### 🔹 Admin Panel

* 👥 Manage users & assign roles (user, admin, rider)
* 📤 View & assign paid parcels to active riders
* 📊 Monitor earnings, delivery status, and payment status
* 🧾 Role-based access control

### 🔹 Rider Panel

* 🧭 View assigned delivery tasks (Pending & Completed)
* 📲 Update parcel status: Picked up, Delivered
* 💸 Track earnings with filters: today, this week, this month
* 💰 Cash out completed deliveries

---

## 🛠️ Tech Stack

### Frontend

* **React** + **Vite**
* **Tailwind CSS** + **DaisyUI**
* **React Router** for navigation
* **Firebase Auth** for authentication
* **TanStack Query** for data fetching
* **SweetAlert2** for user-friendly prompts

### Backend

* **Express.js**
* **MongoDB** (with `parcels`, `users`, `payments`, `tracking`, `riders` collections)
* **Firebase Admin SDK** for token verification
* **Stripe** for secure payments

---

## 📦 Parcel Lifecycle

1. Parcel is created and paid by user
2. Admin assigns parcel to a rider
3. Rider picks it up → status becomes `in_transit`
4. Rider delivers it → status becomes `delivered`
5. Rider can cash out delivered parcels
6. Users can track all events in real-time

---

## 🧪 How to Use (Locally)

1. Clone the repo

   ```
   git clone https://github.com/your-username/parcel-delivery-app.git
   cd parcel-delivery-app
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Setup environment variables

   * Create `.env` file in `/server` and `/client` directories
   * Configure:

     ```
     DB_USER=yourMongoUser
     DB_PASS=yourMongoPass
     PAYMENT_GATEWAY_KEY=yourStripeKey
     ```

4. Run Backend

   ```
   cd server
   node index.js
   ```

5. Run Frontend

   ```
   cd client
   npm run dev
   ```

---

## 📸 Screenshots

| 📋 Dashboard                                                           | 🚚 Rider Task                                                       | 🔎 Tracking                                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![dashboard](https://via.placeholder.com/200x120?text=Admin+Dashboard) | ![rider](https://via.placeholder.com/200x120?text=Rider+Deliveries) | ![tracking](https://via.placeholder.com/200x120?text=Tracking+UI) |

---

## 🙌 Special Thanks

Big thanks to:

* [Firebase](https://firebase.google.com/)
* [Stripe](https://stripe.com/)
* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [React Ecosystem](https://react.dev/)
* [TanStack](https://tanstack.com/)

---

## 🧑‍💻 Author

**Imteaz Hossen**
📫 [Email](mailto:imteaz693@gmail.com) | 🌐 [Live Site](https://zap-shift-49139.web.app)

---

Let me know if you'd like a **GitHub badge**, a **dark mode** toggle preview, or to **deploy backend on Render/Glitch** and include that in the README too!
