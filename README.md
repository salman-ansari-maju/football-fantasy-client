# Football Team Management Application

Welcome to the Football Team Management Application! This is a comprehensive web application where users can manage their own football teams, buy and sell players through a transfer market, and build their dream squad. The application features user authentication, team creation with a starting budget of $5,000,000, and a fully functional transfer market system.

## Key Features

• **User Authentication**: Secure login/registration system with JWT token-based authentication
• **Team Creation**: Automatic team generation with 20 players (3 Goalkeepers, 6 Defenders, 6 Midfielders, 5 Attackers)
• **Transfer Market**: Buy and sell players with real-time budget management
• **Player Management**: List your players for sale, remove from market
• **Real-time Updates**: Seamless integration with backend APIs for live data synchronization

## Tech Stack

• **React**: Modern JavaScript library for building user interfaces
• **TypeScript**: Type-safe development with enhanced code quality
• **Tailwind CSS**: Utility-first CSS framework for rapid UI development
• **React Router**: Client-side routing for single-page application navigation
• **Axios**: HTTP client for API communication with the backend
• **Lucide React**: Beautiful and consistent icon library
• **Vite**: Fast build tool and development server

## Folder Structure

The project is organized as follows:

```
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Auth/
│   │   │   ├── Form.tsx                // Login/Registration form component
│   │   │   └── InputField.tsx          // Input field for forms
│   │   ├── Team/
│   │   │   ├── Header.tsx
│   │   │   ├── MyTeam.tsx              // User's team display and management
│   │   │   ├── NoTeam.tsx              // Display when no team exists
│   │   │   ├── PlayerCard.tsx          // Individual player card component
│   │   │   ├── Players.tsx
│   │   │   ├── SellPlayerModel.tsx     // Modal for listing players for sale
│   │   │   ├── Stats.tsx
│   │   │   └── TeamCreation.tsx        // Team creation interface
│   │   ├── Transfer/
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── NoPlayers.tsx
│   │   │   ├── PlayersListing.tsx
│   │   │   ├── Stats.tsx
│   │   │   └── TransferMarket.tsx      // Transfer market with buy/sell functionality
│   ├── constant/
│   │   └── index.ts                    // Application constants and configuration
│   ├── context/
│   │   └── AuthContext.tsx             // Authentication context and state management
│   ├── navigation/
│   │   └── index.tsx                   // Navigation logic and routes
│   ├── pages/
│   │   ├── Auth.tsx                    // Authentication page
│   │   └── Dashboard.tsx               // Main dashboard page
│   ├── services/
│   │   ├── auth.ts                     // Authentication-specific API calls
│   │   ├── axiosInstance.ts            // Axios instance with interceptors
│   │   ├── team.ts                     // API calls related to team operations
│   │   └── transfer.ts                 // API calls related to player transfers
│   ├── types/
│   │   └── index.ts                    // TypeScript type definitions
├── index.html                          // HTML template file for Vite
├── package.json                        // Project dependencies and scripts
├── tailwind.config.js                  // Tailwind CSS configuration
├── tsconfig.json                       // Base TypeScript configuration
├── postcss.config.js                   // PostCSS configuration
├── vite.config.ts                      // Vite build configuration
├── eslint.config.js                    // ESLint configuration
```

## Description of Key Folders:

• **components**: Houses all reusable React components organized by feature (Auth, Team, Transfer)
• **context**: Contains React context providers for global state management (authentication)
• **services**: API integration layer handling all HTTP requests to the backend
• **types**: TypeScript interfaces and type definitions for type safety
• **constant**: Application-wide constants including API base URLs
• **pages**: Main page components that represent different routes in the application

## Prerequisites

Before running the project, ensure that you have the following installed:

• **Node.js** (v20 or higher)
• **npm** or **yarn** for package management
• **Backend API** running on `http://localhost:5000`

## Installation

Follow the steps below to get the project up and running:

1. Clone the repository:

```bash
git clone https://github.com/salman-ansari-maju/football-fantasy-client.git
cd football-fantasy-client
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open the app in the browser:

```
http://localhost:3000
```

## Usage

1. **User Registration/Login**: Create a new account or login with existing credentials using the authentication form
2. **Team Creation**: New users can automatically create a team with in the $5,000,000 budget and 20 players
3. **Team Management**: View your squad, check player statistics, and manage your team composition
4. **Transfer Market**: Browse available players, buy new talent, and sell your existing players
5. **Player Trading**: List players for sale with custom asking prices and remove them from the market

## API Integration

The frontend interacts with the backend through a comprehensive set of API endpoints:

### Authentication APIs

• **POST** `/api/auth/login` - User login/registration with email and password
• **POST** `/api/auth/logout` - User logout and token invalidation

### Team Management APIs

• **GET** `/api/team` - Fetch user's team data including players and budget
• **POST** `/api/team/create` - Create a new team with initial squad and budget

### Transfer Market APIs

• **GET** `/api/transfer` - Get all players available in the transfer market
• **POST** `/api/transfer/player/:playerId` - List a player for sale with asking price
• **POST** `/api/transfer/buy/:playerId` - Purchase a player from the transfer market
• **DELETE** `/api/player/:playerId/remove-transfer` - Remove player from transfer market

All API interactions are managed in the `/src/services` folder using Axios with automatic token management and error handling.

## Environment & Configuration

The application uses environment-based configuration:

• **Base URL**: Set in `/src/constant/index.ts` as:

```typescript
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

You can override the API URL by creating a `.env` file in the project root and adding:

```env
VITE_API_URL=http://your-backend-url/api
```

• **Token Management**: JWT tokens are handled automatically and stored in localStorage for session persistence.

• **Error Handling**: All API errors are caught and displayed in the UI. Axios interceptors manage global error handling and authentication.

• **Other Configs**: ESLint, Tailwind, and PostCSS are configured for code quality and styling.

## Development Features

• **Hot Reload**: Instant updates during development with Vite
• **Type Safety**: Full TypeScript support with strict type checking
• **Code Splitting**: Optimized bundle splitting for better performance
• **ESLint**: Code quality and consistency enforcement
• **Responsive Design**: Mobile-first approach with Tailwind CSS utilities

## Build and Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist/` directory, ready for deployment to any static hosting service.
