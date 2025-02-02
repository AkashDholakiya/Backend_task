# Assignment BharatFD

### installation steps

1. Clone the repository
```bash
git clone https://github.com/AkashDholakiya/Backend_task.git
```

2. Install the requirements
```bash
npm install
```

3. setup the environment variables
- Make sure to create a .env file in the root directory of the project.
- Overhere NODE_ENV will be used to determine the environment of the project. It can be either DEV or TEST.
- ADMIN_EMAIL and ADMIN_PASSWORD will contains the email and password of the admin user.
```bash
MONGODB_URI_DEV=
MONGODB_URI_TEST=
ADMIN_EMAIL=
ADMIN_PASSWORD=
COOKIE_SECRET=
NODE_ENV="TEST" # Keep it Either TEST or DEV
```

4. Creating and startig redis server
- Install redis server on your local machine using docker
```bash
docker run --name redis -p 6379:6379 -d redis
```

5. Run the project
```bash
npm start
or
nodemon app.js
```

## Features

- Created a REST API for adding and getting FAQs using interactive WYSIWYG editor (Quill.js).
- Implemented the translation of FAQs in any language based on language code.
- Utilized MongoDB as a database to store the FAQs.
- Redis is used to cache the recently tranlated FAQs.
- tests has been implemented using Mocha and Chai.
- Added interactive Admin panel provided by AdminJS for maintaining FAQs from Admin side.

## API Endpoints

```bash
GET /api/v1/faqs/get-faqs
GET /api/v1/faqs/get-faqs/?lang=hi
GET /api/v1/faqs/get-faqs/?lang=bn
GET /api/v1/faqs/get-faqs/?lang=[lang code]
POST /api/v1/faqs/add-faq
```


