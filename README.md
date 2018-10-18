# React-Redux + Express Shopping List

Full Stack application using React, Redux and Express

## Development Environment Configuration
To get the project ready, follow these steps:

- Clone the repo
- Run this command in both client/ and root folder
```
npm install
``` 
- Once the dependencies are installed in both folders, run:
```
npm run dev
``` 

## Configuration

### Change React Port
#### Windows
````
"scripts": { "start": "set PORT=5000 && react-scripts start",`
````
#### Mac & Linux
````
"scripts": { "start": "PORT=5000 react-scripts start",
````

### Run Frontend and Backend Concurrently

In order to execute more than one commands, we will use [**concurrently**](https://www.npmjs.com/package/concurrently). To install it, run:

```
npm install concurrently
```

- Modify the package.json file in the server folder and add this commands
```
{
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```
