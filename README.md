 Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn-ui
- **Backend**: Express, Flask
- **AI Models**: Flask servers running AI models

## Project Structure

- **Frontend (React)**: Hosted on port `8080`
- **Backend (Express)**: Hosted on port `3000`
- **AI Models (Flask)**: Running on ports `5000`, `5001`, `5002`

## Prerequisites

Before you start, make sure you have the following installed on your system:

- **Node.js** (for React and Express)
- **Python 3.x** (for Flask servers)
- **pip** (Python package installer)
- **npm** (Node package manager)

### Installing Dependencies

1. **Frontend (React)**:
    ```bash
    cd frontend
    npm install
    ```

2. **Backend (Express)**:
    ```bash
    cd backend
    npm install
    ```

3. **Flask Servers** (for AI models):
    - Install Python dependencies for Flask and AI models:
    ```bash
    cd flask_server
    pip install -r requirements.txt
    ```

    - Ensure you have `Flask`, `requests`, and other necessary packages installed for the Flask app:
    ```bash
    pip install flask requests
    ```

## Running the Application

### 1. Start the Flask Servers

Make sure to run each of the Flask servers on their respective ports.

- Flask server on port `5000`:
    ```bash
    cd flask_server/5000
    flask run --port 5000
    ```

- Flask server on port `5001`:
    ```bash
    cd flask_server/5001
    flask run --port 5001
    ```

- Flask server on port `5002`:
    ```bash
    cd flask_server/5002
    flask run --port 5002
    ```

### 2. Start the Express Server

Now, start the Express backend server.

```bash
cd backend
node app.js

### 3. Start the React Frontend

Finally, start the React frontend development server:

```bash
cd frontend
npm run dev

