

# Blog Post API

## Overview
The Blog Post API is a RESTful API designed to manage blog posts. It allows users to create, read, update, and delete blog posts. This API supports user authentication and includes validation to ensure data integrity.

## Features
- **Create Blog Post**: Allows users to create a new blog post with a title, slug, and content.
- **Fetch All Blog Posts**: Retrieves a list of all blog posts.
- **Fetch Single Blog Post**: Fetches details of a specific blog post by its slug.
- **Update Blog Post**: Enables users to update existing blog posts.
- **Delete Blog Post**: Allows users to delete a blog post by its slug.
- **Error Handling**: Provides meaningful error messages for validation failures and other issues.

## Technologies Used
- **Node.js**: Server-side JavaScript environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing blog posts.
- **Mongoose**: ODM for MongoDB, providing a schema-based solution.
- **Jest**: Testing framework for unit and integration testing (not included in this README).

## API Endpoints

### Authentication Middleware
- **`POST /api/auth/login`**: Authenticates a user and returns a token.

### Blog Post Endpoints

- **Create Blog Post**
  - **Endpoint**: `POST /api/blog`
  - **Request Body**:
    ```json
    {
      "title": "String",
      "slug": "String",
      "content": "String"
    }
    ```
  - **Response**: 
    - Status: `201 Created`
    - Body:
    ```json
    {
      "title": "String",
      "slug": "String",
      "content": "String",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
    ```

- **Fetch All Blog Posts**
  - **Endpoint**: `GET /api/blog`
  - **Response**: 
    - Status: `200 OK`
    - Body:
    ```json
    [
      {
        "title": "String",
        "slug": "String",
        "content": "String",
        "createdAt": "Date",
        "updatedAt": "Date"
      }
    ]
    ```

- **Fetch Single Blog Post**
  - **Endpoint**: `GET /api/blog/:slug`
  - **Response**: 
    - Status: `200 OK`
    - Body:
    ```json
    {
      "title": "String",
      "slug": "String",
      "content": "String",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
    ```

- **Update Blog Post**
  - **Endpoint**: `PUT /api/blog/:slug`
  - **Request Body**:
    ```json
    {
      "title": "String",
      "content": "String"
    }
    ```
  - **Response**: 
    - Status: `200 OK`
    - Body:
    ```json
    {
      "title": "String",
      "slug": "String",
      "content": "String",
      "updatedAt": "Date"
    }
    ```

- **Delete Blog Post**
  - **Endpoint**: `DELETE /api/blog/:slug`
  - **Response**: 
    - Status: `200 OK`
    - Body:
    ```json
    {
      "message": "Post deleted successfully"
    }
    ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-post-api.git
   cd blog-post-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/yourdbname
     JWT_SECRET=your_jwt_secret
     ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage
After starting the server, you can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API. 

## Future Enhancements
- Implement pagination for fetching blog posts.
- Add user role-based access control (admin vs regular users).
- Enhance error handling with more specific error messages.
