# Projekt systemu monitorowania i mobilizowania studentów WSB Merito

## Create .env file

⚠️ Create file `.env` in your root directory with following fields.

| General info    | Field                | Description                                                                        |
| --------------- | -------------------- | ---------------------------------------------------------------------------------- |
| API settings    | API_URL              | URL for the API endpoint                                                           |
|                 | API_WSTOKEN          | Token for authenticating API access                                                |
| SMTP settings   | GMAIL_SMTP_USERNAME  | Username for Gmail SMTP authentication                                             |
|                 | GMAIL_SMTP_PASSWORD  | Password for Gmail SMTP authentication                                             |
| Email addresses | STUDENT_TEST_EMAIL   | If this field is NOT empty, all students emails will be sent to this email address |
|                 | TEACHER_TEST_EMAIL   | If this field is NOT empty, all teachers emails will be sent to this email address |
|                 | SUMMARY_REPORT_EMAIL | This is a summary report mailing list (separate new adresses with comma <,> )      |
| Course settings | COURSE_ID            | Input analyzed courde id (can be found in courde settings)                         |

## Run with Docker

⚠️ After every change in `.env` you need to run `docker-compose build` to include new changes

### Requirements

- docker
- docker-compose

### Run

```
docker-compose build
docker-compose up
```

---

OR

---

## Run directly on your machine

### Install

- node
- npm

### Requirements

```
npm i
node src/index.js
```
