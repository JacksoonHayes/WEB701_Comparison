# WEB701_Comparison
Repo for WEB701 A2 and comparing MEAN stack

## Running the App
1. Install dependenciess
```bash
npm install
```

2. Create a .env file in the root directory and add the following:
```bash
PORT=3001
MONGODB_URI=mongodb+srv://dbAdmin:admin@growandgive.x8icc.mongodb.net/?retryWrites=true&w=majority&appName=growandgive
JWT_SECRET="secret"
```

3. To run the backend server, run the following:
```bash
nodemon
```

## Either run the Angular or React application

4. To run the Angular application, navigation to the /angular-src directory and run the following:
```bash
ng serve
```

5. To run the React application, navigation to the /react-src directory and run the following:
```bash
npm start
```
