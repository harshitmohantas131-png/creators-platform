# Postman Guide - Creator's Platform API

## Setup

1. Import the collection JSON file
2. Import the environment JSON file
3. Select "Local Development" environment

## Variables

- baseURL: http://localhost:5001
- authToken: Automatically set after login
- postId: Automatically set after creating a post

## Execution Order

1. Health Check
2. Register User
3. Login User (token saved)
4. Get Posts
5. Create Post (postId saved)
6. Update Post
7. Delete Post

## Authentication

All protected routes use:
Authorization: Bearer {{authToken}}

## Notes

- Token is saved automatically using Postman scripts
- postId is dynamically extracted for update/delete