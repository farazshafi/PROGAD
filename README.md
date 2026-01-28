# PROGAD - Premium MERN E-Commerce Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Production Ready](https://img.shields.io/badge/Status-Production--Ready-orange?style=for-the-badge)

**PROGAD** is a high-performance, enterprise-grade E-commerce solution built on the MERN stack. It features a modern design, complex state management, and unique biometric authentication capabilities, providing a seamless shopping experience for users and a robust management suite for administrators.

---

## 🚀 Key Features

### 👤 User Experience
- **Biometric Authentication**: cutting-edge face-recognition login and registration using `face-api.js`.
- **Advanced Product Discovery**: dynamic filtering, categories, and brands with an animated search interface.
- **Secure Payments**: fully integrated with Razorpay for a smooth checkout process.
- **Wallet & Coupons**: built-in wallet system and discount coupon management to drive user retention.
- **Real-time Order Tracking**: comprehensive order history and status tracking.
- **Wishlist & Cart**: persistent shopping cart and wishlist functionality.

### 🛠 Administrative Control (CRM)
- **Comprehensive Dashboard**: real-time sales analytics and business insights.
- **Product Management**: full CRUD operations for products, categories, and inventory.
- **Sales Reporting**: detailed exportable sales reports in PDF and Excel formats.
- **User Management**: control over user accounts and blocking/unblocking capabilities.
- **Coupon & Offer Management**: creation and management of site-wide or product-specific promotions.

### 🔒 Security & Performance
- **JWT & Bcrypt**: industry-standard authentication and password encryption.
- **AWS S3 Integration**: scalable and secure cloud storage for product images and assets.
- **Responsive Design**: fully optimized for mobile, tablet, and desktop using Tailwind CSS and Chakra UI.
- **Smooth Animations**: premium look and feel powered by GSAP and Framer Motion.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React.js 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Chakra UI, Material UI
- **Animations**: GSAP, Framer Motion, Lottie
- **Utilities**: Axios, Chart.js, Recharts, face-api.js

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Storage**: AWS S3
- **Payment Gateway**: Razorpay
- **Auth**: JWT, Bcrypt.js, Firebase Auth
- **Utilities**: Multer, Nodemailer, PDFKit, ExcelJS

---

## 📁 System Architecture

The project follows a modular and scalable architecture:
- **Frontend**: Component-based architecture with Redux slices for global state management.
- **Backend**: MVC (Model-View-Controller) pattern with dedicated routers and controllers.
- **Security**: Middleware-based authorization and input validation.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local instance
- AWS S3 Bucket
- Razorpay Account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/PROGAD.git
cd PROGAD
```

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=2000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
Start the server:
```bash
npm start
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```
Start the application:
```bash
npm start
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Faraz Shafi** - [GitHub](https://github.com/farazshafi)
Project Link: [https://github.com/farazshafi/PROGAD](https://github.com/farazshafi/PROGAD)

*Automated with precision by Antigravity.*
