# BlinkChat

A modern real-time community chat platform built with React, Spring Boot, WebSocket, and MySQL.

BlinkChat lets users sign in with Firebase email/password or Google authentication, create and join communities, exchange real-time group messages, and chat privately through direct messages. The backend uses WebSocket communication for instant delivery while keeping message history in a relational database.

## Core Features

- Firebase email/password and Google login
- Firebase ID token authentication
- Public group chat
- Private invite-only groups
- Direct messaging
- Online, offline, away, and busy presence
- Typing indicators
- Message reactions
- Message edit and delete
- Notifications
- Role-based group access
- Message search
- Pinned messages

## Advanced Feature Ideas

- Peer-to-peer video calling
- End-to-end encryption
- AI chat assistant
- Mobile application

## Tech Stack

### Frontend

- React
- Redux Toolkit
- React Router
- Material UI
- Axios
- Firebase Authentication
- SockJS
- STOMP Client

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring WebSocket
- Firebase token verification
- Lombok

### Database

- MySQL

### Storage

- AWS S3 or Cloudinary

## System Architecture

```text
React Client
     |
HTTP + Firebase ID Token
     |
Spring Boot API
     |
     +------------------+
     |                  |
MySQL Database     WebSocket Server
                        |
                 Connected Users
```

## Authentication Flow

```text
Click Login
     |
Choose Google or Enter Email and Password
     |
Firebase Auth Success
     |
React Receives Firebase Session
     |
Backend Verifies Firebase ID Token
     |
User Logged In
```

## Database Design

### users

```text
id
name
email
avatar
role
status
created_at
```

### groups

```text
id
name
description
owner_id
type
created_at
```

### group_members

```text
id
group_id
user_id
role
joined_at
```

### messages

```text
id
sender_id
group_id
receiver_id
content
message_type
created_at
```

### reactions

```text
id
message_id
user_id
emoji
```

## WebSocket Message Flow

```text
User A
  |
WebSocket
  |
Spring Boot
  |
Save Message
  |
Broadcast
  |
All Connected Users Receive
```

## Suggested Folder Structure

### Frontend

```text
src
├── components
├── pages
├── hooks
├── services
├── websocket
├── store
├── routes
├── layouts
└── utils
```

## Frontend Application

The frontend application is built with React, Vite, Redux Toolkit, React Router, Material UI, Axios, Firebase Authentication, SockJS, and STOMP. It starts with a Firebase login-only screen for Google or email/password, then reveals communities, direct messages, presence, reactions, pinned messages, members, and theme switching after sign-in.

The React source follows the suggested structure under `frontend/src`.

### Backend

```text
src/main/java
├── config
├── security
├── websocket
├── controller
├── service
├── repository
├── entity
├── dto
├── mapper
└── exception
```

## Installation

### Backend

```bash
git clone <repository>
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local` from `frontend/.env.example` and set the Firebase project values before running the app. In Firebase Console, enable both **Email/Password** and **Google** under Authentication > Sign-in method.
