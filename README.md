## Getting Started


First, install the dependencies: 

```bash
npm install
```

add .env file in the root directory and add the following variables:


```bash
NEXTAUTH_SECRET
NEXTAUTH_URL
```

nextauth secret can be generated using the following command:    
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

nextauth url is the url of the website

api urls at this time not connected to env file, so you have to change the urls in the code at /src/api folder
replace laravel.grutto.test with your api url in all of the files in /src/api folder

Then, run the development server:

```bash
npm run dev
```

after install backend, migrate, seed and run it, you can run the frontend and login with the following credentials:

```bash
email: ifarazir@gmail.com
password: 123456789
```
