# Next-Auth Project

This project serves as a starting template for implementing authentication in a Next.js application using Next-Auth.js.

## Getting Started

To get started with this project, follow the steps below:

### Clone the Repository

1) First, clone the repository to your local machine:
   
```bash
git clone https://github.com/mehul1409
```

2) Go to Next-Auth directory and install all dependencies there.
   
```bash
cd Next-Auth
npm install
```

3) Make `.env.local` file in main directory(Next-Auth)
   
```bash
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
MONGO_URL =
AUTH_GITHUB_ID =
AUTH_GITHUB_SECRET =
```

4) You can get **AUTH_SECRET** by this
   
```bash
npx auth secret
```

5) Now you are ready to go
   
```bash
npm run dev
```

