# Meme Wiki

A React application for browsing, viewing, and managing popular internet memes. This application provides a user interface for exploring memes with both table and grid views, and allows users to edit meme details.

## Features

- **Multiple View Options**: Switch between table and list views for memes
- **Edit Functionality**: Modify meme details through a modal interface
- **Responsive Design**: Works on both desktop and mobile devices
- **API Integration**: Backend REST API for meme data management
- **Data Persistence**: Changes to memes are saved and persisted
- **Reset Capability**: Option to reset meme data to its original state

## Tech Stack

- **Frontend**:
  - React 18
  - React Router DOM for navigation
  - Tailwind CSS for styling
  - Axios for API requests

- **Backend**:
  - Express.js server
  - File-based JSON storage

## Installation

1. Clone the repository:
``` bash
git clone https://github.com/nezeracuk/meme-wiki.git 
cd meme-wiki
```
2. Install dependencies:
```bash
yarn install
```
3. Create a `.env` file in the root directory and add:
```bash
VITE_API_URL=http://localhost:3001/api
```
## Running the Application

### Development Mode

Run the frontend and backend in development mode:
```bash
yarn run dev
```
In a separate terminal, start the API server:
```bash
yarn run server
```


## API Endpoints

- `GET /api/memes` - Get all memes
- `GET /api/memes/:id` - Get a specific meme by ID
- `PUT /api/memes/:id` - Update a specific meme

## Project Structure

- `/public` - Static assets
- `/src` - Source code
  - `/assets` - Images and media files
  - `/components` - React components
  - `/data` - JSON data files
  - `/services` - API service functions

This project is now available on production: https://meme-wiki-production.up.railway.app/
