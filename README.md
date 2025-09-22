# TodoList - Next.js Project

**Version:** 0.1.0
**Tech Stack:** Next.js, React, Redux Toolkit, TailwindCSS, SWR, Axios, JWT, React-Toastify
**Architecture:** Atomic Design, Service Layer, Protected Routes

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Technical Details](#technical-details)
5. [Sample UI Flow](#sample-ui-flow)
6. [Backend Integration](#backend-integration)
7. [FAQ / Technical Questions](#faq--technical-questions)

---

## Project Overview

This is a **Todo List application** built with **Next.js** following atomic design principles. Features include:

* User authentication with JWT
* Todo CRUD operations
* Form validation on both frontend and backend
* Redux for state management
* API calls using Axios and SWR
* Responsive UI with TailwindCSS
* Toast notifications for actions

Backend API is hosted separately using **Spring Boot**. All backend-related questions should be directed to the backend GitHub repository.

---

## Getting Started

### Prerequisites

* Node.js >= 18
* npm or yarn
* Access to the backend API

### Installation

```bash
git clone https://github.com/yourusername/todolist.git
cd todolist
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app running.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
todolist/
├─ public/
├─ src/
│  ├─ components/       # Atomic components (atoms, molecules, organisms)
│  ├─ pages/            # Next.js pages
│  ├─ redux/            # Redux slices and store
│  ├─ services/         # API service layer
│  ├─ utils/            # Helper functions and validation
│  ├─ styles/           # TailwindCSS configurations
└─ package.json
```

**Key Decisions:**

* **Atomic Design:** For reusable, composable UI components.
* **Redux Toolkit:** Centralized state management for authentication, todos, and UI state.
* **Service Layer:** All API calls are encapsulated to make switching backends easier.
* **Protected Routes:** Higher-order component (HOC) to protect pages for authenticated users.

---

## Technical Details

### Responsive Design

* TailwindCSS breakpoints:

  * `sm`: 640px
  * `md`: 768px
  * `lg`: 1024px
  * `xl`: 1280px
  * `2xl`: 1536px

* UI adapts by stacking cards in smaller screens and using a table layout on desktop.

* Ant Design components like `Table`, `Card`, and `Drawer` were used to maintain responsiveness.

### Component Structure

* **Atoms:** Buttons, Inputs, Labels, etc.
* **Molecules:** Form Groups, Todo Cards, Search Input.
* **Organisms:** Todo List, Modal Form.
* **Pages:** `index.js`, `login.js`, `signup.js`.

**State Management:**

* Redux for global state (auth, todos).
* Local component state for UI toggles.
* Filtering and pagination state stored in Redux for persistence across pages.

### Data Validation

* **Frontend:** Formik/Yup validation for input fields.
* **Backend:** Spring Boot validates all requests via DTOs and annotations.
* Approach ensures early user feedback and backend security.

### Testing & Quality

* Unit tests focus on Redux slices and utility functions.
* Edge cases include empty todos, invalid inputs, and API errors.
* If more time: improve integration tests, add E2E tests, and optimize performance.

---

## Sample UI Flow

1. **Main Page:**

   * Desktop: Todo list table + pagination
   * Tablet/Mobile: Card layout stacked vertically

2. **Todo List:**

   * Displays todos with title, description, status
   * Pagination at the bottom

3. **Todo Form:**

   * Modal or drawer for creating/editing todos

4. **Search:**

   * Input field filters todos by title or description

---

## Backend Integration

The backend is hosted separately using **Spring Boot**.

* API Base URL: `https://github.com/alwi-abdullah-royyan/spring-todolist`
* All database design, filtering, pagination, and server-side validation questions should be directed there.

---

## FAQ / Technical Questions

### Database Design Questions

* For backend details like tables, relationships, indexes, and queries:
  Please check the [backend repository](https://github.com/alwi-abdullah-royyan/spring-todolist).

### Technical Decision Questions

* **Backend architecture, API routes, controllers, services, and error handling** are handled in the backend repo.

### Testing & Quality

* Unit tests implemented for Redux slices and helper functions in this repo.

### Future Improvements

* Add notifications for overdue todos
* Implement drag-and-drop sorting
* Add full E2E testing

---

## License

MIT License
