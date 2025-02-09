## Demo Links

Here are the live demo links for different parts of the project:

- [User Frontend](https://shopplusplus.tech)
- [Admin Dashboard](https://admin.shopplusplus.tech)
- [Seller Dashboard](https://seller.shopplusplus.tech)
- [Ticket Master Dashboard](https://ticketmaster.shopplusplus.tech)

## Login Credentials

You can use the following credentials to log in to the demo applications:

### Admin User
- **Email**: admin@gmail.com
- **Password**: admin1234

### Superadmin User
- **Email**: superadmin@gmail.com
- **Password**: superadmin1234

### Root User
- **Email**: root@gmail.com
- **Password**: root1234

### Ticket Master User
- **Email**: ticketmaster@gmail.com
- **Password**: ticketmaster1234

# Node.js Application Setup Guide

This guide will help you set up and run your Node.js application locally. Follow the instructions below to configure your environment variables and connect your services.

## Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account (for cloud database)
- Google Cloud account (for Google OAuth credentials)
- Stripe account (for payments integration)

## 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

## 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
npm install -g nodemon
```

## 3. Create `.env` File

Create a `.env` file at the root of your project and add the following variables:

```env
USING_DOCKER=false
PORT=5500
NODE_ENV=development

JWT_SECRET=
JWT_EXPIRY=5h

USING_ONLINE_DB=true
MONGODB_URI=

EMAIL_ADDRESS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

STRIPE_KEY=
```

Make sure to replace the `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, and `STRIPE_KEY` with your actual credentials.

## 4. Set Up MongoDB URI

### MongoDB URI:

If you're using MongoDB Atlas (recommended for production), you can get the connection string by following these steps:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Sign in or create an account.
3. Create a new project and cluster.
4. In your cluster's dashboard, click on "Connect" and select "Connect your application."
5. Copy the connection string and paste it in the `MONGODB_URI` field of your `.env` file, replacing the default credentials (if necessary).

Your URI will look something like:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Using Local MongoDB (Optional):

If you're using a local MongoDB instance instead of Atlas, change the `MONGODB_URI` to:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

## 5. Set Up Google OAuth Credentials

Follow these steps to obtain Google OAuth credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to "APIs & Services" > "Credentials."
4. Click "Create Credentials" and choose "OAuth 2.0 Client IDs."
5. Select the application type and provide the necessary details (e.g., Authorized redirect URIs).
6. Copy the `Client ID`, `Client Secret`, and `Refresh Token` and paste them in the `.env` file under `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN`.

## 6. Set Up Stripe API Key

To integrate Stripe payments, you'll need to obtain a Stripe API key:

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Under the "Developers" section, find your API keys.
3. Copy the `Secret Key` and paste it in the `.env` file under `STRIPE_KEY`.

## 7. Run the Application

Once your `.env` file is set up with the proper credentials, you can start the application by running:

```bash
npm start
```

The application will be available at `http://localhost:5500`.

## 8. Testing and Development

- The application will run in `development` mode by default, as specified in the `.env` file (`NODE_ENV=development`).
- You can adjust the `PORT` if needed.

---

## Additional Notes

- Be sure to never expose your `.env` file in public repositories. Use `.gitignore` to prevent it from being committed.
- You can change the JWT expiration time by adjusting the `JWT_EXPIRY` variable.

If you face any issues during setup or have further questions, feel free to open an issue in the GitHub repository.

```
