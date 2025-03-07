
# Yapily Frontend

## Installation and Setup Instructions

1. **Clone the repository**  
   Clone the Yapily Frontend repository to your local machine:
   ```bash
   git clone https://github.com/cdeveloper123/yapily-frontend.git
   ```

2. **Install Dependencies**  
   Navigate to the project directory and install the necessary dependencies:
   ```bash
   cd yapily-frontend
   npm i
   ```

3. **Build the Project**  
   Once the dependencies are installed, build the project:
   ```bash
   npm run build
   ```

4. **Start the Server**  
   Run the server:
   ```bash
   npm run start
   ```

---

## Usage

1. **Login to Yapify**  
   When you click on **Login to Yapify**, it triggers the endpoint `POST /accounts/initiate-auth`. This will redirect you to the authorization URL, where you will receive your **content token**.

2. **Dashboard Page Options**  
   After logging in, you will be taken to the **Dashboard** page. On the dashboard, you can choose from the following four options:

   - **Show Accounts**  
     This option runs the `GET /accounts` API. It returns the accounts stored in the MongoDB database.

   - **Show Transactions**  
     This option runs the `GET /transactions/:id` API. It shows the transactions of a particular user by using the user’s ID.

   - **Update Account**  
     This option runs the `POST /accounts/fetch` API. It fetches account data from Yapily and updates the local database with the fetched account information.

   - **Update Transaction**  
     This option runs the `POST /transactions/fetch` API. It fetches transactions of the user from Yapily and updates the local database with the fetched transaction information.

---

## Notes

- Ensure that your server is running before interacting with the dashboard.
- The API endpoints interact with Yapily’s backend and will require the content token obtained through the login process.
