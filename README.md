# 💈 PV Barbershop System Setup Guide

This guide provides step-by-step instructions on how to set up and run the PV Barbershop system on your local machine.

---

## **Step 1: Clone the Repository**

First, clone the project repository using `git clone`

```bash
git clone https://github.com/pv-barbershop/pv-barbershop
```

## **Step 2: Configure Environment Variables**

You need to create and populate an **`.env`** file corresponding to each service directory with the necessary configuration details.

### **Service Environment Variables**

- **`api-gateway-v2`** (.env)

  ```dotenv
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/pv_barbershop_api_gateway
  # Comma-separated origins or * for all
  CORS_ORIGINS=*
  # Enable simple request logging: tiny | dev | combined
  MORGAN_FORMAT=dev
  ```

- **`appointment-service`** (.env)

  ```dotenv
  CLOUDINARY_NAME="YOUR_CLOUDINARY_NAME"
  CLOUDINARY_KEY="YOUR_CLOUDINARY_KEY"
  CLOUDINARY_KEY_SECRET="YOUR_CLOUDINARY_KEY_SECRET"
  PORT=5002
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_appointment
  USER_SERVICE_BASE_URL=http://localhost:5001/api/v1
  APPOINTMENT_SERVICE_BASE_URL=http://localhost:5002/api/v1
  BILLING_SERVICE_BASE_URL=http://localhost:5003/api/v1
  NOTIFICATION_SERVICE_BASE_URL=http://localhost:5004/api/v1
  DEBUG_STAT=1
  ```

- **`billing-service`** (.env)

  ```dotenv
  CLOUDINARY_NAME="YOUR_CLOUDINARY_NAME"
  CLOUDINARY_KEY="YOUR_CLOUDINARY_KEY"
  CLOUDINARY_KEY_SECRET="YOUR_CLOUDINARY_KEY_SECRET"
  PORT=5003
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_billing
  MAIL_NAME=YOUR_MAIL_NAME
  MAIL_SECRET=YOUR_MAIL_SECRET
  APPOINTMENT_SERVICE_BASE_URL=http://localhost:5002/api/v1
  ```

- **`dashboard`** (.env)

  ```dotenv
  VITE_REACT_APP_BASE_URL=http://localhost:5000/api/v1/
  VITE_USER_BASE_URL=http://localhost:3000/
  VITE_REACT_APP_DASHBOARD_URL=http://localhost:3039/
  VITE_REACT_APP_SOCKET_URL=http://localhost:5004
  ```

- **`frontend`** (.env)

  ```dotenv
  REACT_APP_BASE_URL=http://localhost:5000/api/v1/
  REACT_APP_DASHBOARD_URL=http://localhost:3039/
  REACT_APP_SOCKET_URL=http://localhost:5004
  ```

- **`gift-service`** (.env)

  ```dotenv
  PORT=5007
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_gift
  MAIL_NAME=YOUR_MAIL_NAME
  MAIL_SECRET=YOUR_MAIL_SECRET
  USER_SERVICE_BASE_URL=http://localhost:5001/api/v1
  APPOINTMENT_SERVICE_BASE_URL=http://localhost:5002/api/v1
  BILLING_SERVICE_BASE_URL=http://localhost:5003/api/v1
  NOTIFICATION_SERVICE_BASE_URL=http://localhost:5004/api/v1
  ```

- **`notification-service`** (.env)
  ```dotenv
  CLOUDINARY_NAME="YOUR_CLOUDINARY_NAME"
  CLOUDINARY_KEY="YOUR_CLOUDINARY_KEY"
  CLOUDINARY_KEY_SECRET="YOUR_CLOUDINARY_KEY_SECRET"
  PORT=5004
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_notification
  MAIL_NAME=YOUR_MAIL_NAME
  MAIL_HOST=YOUR_MAIL_HOST
  MAIL_SECRET=YOUR_MAIL_SECRET
  ```
- **`site-service`** (.env)

  ```dotenv
  CLOUDINARY_NAME="YOUR_CLOUDINARY_NAME"
  CLOUDINARY_KEY="YOUR_CLOUDINARY_KEY"
  CLOUDINARY_KEY_SECRET="YOUR_CLOUDINARY_KEY_SECRET"
  PORT=5005
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_site
  MAIL_NAME=YOUR_MAIL_NAME
  MAIL_SECRET=YOUR_MAIL_SECRET
  APPOINTMENT_SERVICE_BASE_URL=http://localhost:5002/api/v1
  LIBREOFFICE_PATH="C:\Program Files\LibreOffice\program\soffice.exe"
  ```

  > **IMPORTANT:** For `LIBREOFFICE_PATH` to work, you must install [LibreOffice](https://vi.libreoffice.org/). Ensure the path points to `soffice.exe` on your system.

- **`user-and-auth-service`** (.env)
  ```dotenv
  CLOUDINARY_NAME="YOUR_CLOUDINARY_NAME"
  CLOUDINARY_KEY="YOUR_CLOUDINARY_KEY"
  CLOUDINARY_KEY_SECRET="YOUR_CLOUDINARY_KEY_SECRET"
  PORT=5001
  MONGODB_URL=mongodb://localhost:27017/pv_barbershop_user_and_auth
  MAIL_NAME=YOUR_MAIL_NAME
  MAIL_SECRET=YOUR_MAIL_SECRET
  USER_SERVICE_BASE_URL=http://localhost:5001/api/v1
  APPOINTMENT_SERVICE_BASE_URL=http://localhost:5002/api/v1
  BILLING_SERVICE_BASE_URL=http://localhost:5003/api/v1
  NOTIFICATION_SERVICE_BASE_URL=http://localhost:5004/api/v1
  ```

---

## **Step 3: Install Dependencies and Start Services**

After adding the `.env` file to each respective folder, navigate (`cd`) into each service directory, install the dependencies, and start the service.

For **EACH** folder listed in **Step 2**, execute the following commands in your terminal:

```bash
# Example:
cd api-gateway

# Install dependencies
npm install

# Start the service
npm run start

# Repeat for all other service folders (appointment-service, billing-service, etc.)
```

## **Step 4: Access the Applications**

Once all services and applications are running, you can access the frontend interfaces:

- **User-Facing Site:** Access the main customer-facing website at:

  - **`http://localhost:3000`**

- **Reception/Admin Dashboard:** Access the dashboard for receptionists and the owner at:
  - **`http://localhost:3039`**
