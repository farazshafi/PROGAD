# PROGAD Frontend

The PROGAD frontend is a React 18 JavaScript application powered by Vite.

## Requirements

- Node.js 18 or later
- The PROGAD backend running with its configured API URL

## Setup

```bash
npm install
```

Copy the required Vite environment variables into `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Scripts

```bash
# Start the Vite development server
npm run dev

# Create an optimized production build in dist/
npm run build

# Serve the production build locally
npm run preview
```
