# Oodo---Synergy-Sphere

SynergySphere – Advanced Team Collaboration Platform
🚀 Overview

SynergySphere is an intelligent collaboration platform designed to help teams stay organized, communicate effectively, and manage projects seamlessly.

This MVP provides a clean, responsive experience on desktop and mobile, focusing on task management and team communication.

✨ Features

Landing Page (Home)

Introduction to SynergySphere with navigation options.

Login and Signup buttons at the top for quick access.

Authentication

Secure Login/Signup forms with validation.

User details stored in localStorage for session persistence.

Auto-login if details already exist.

Dashboard

Displays all projects for the logged-in user.

Option to create new projects.

Navigation bar with profile and logout.

Project View

View project details and team members.

Task board with statuses: To-Do, In Progress, Done.

Threaded discussions per project.

Task Management

Create, assign, and update tasks with due dates.

Task detail view with editing options.

Status tracking for clear progress visualization.

🛠️ Tech Stack

Frontend: React + Vite

Styling: TailwindCSS

Routing: React Router

State Management: React hooks (local state + localStorage for MVP)

Responsive Design: Mobile-first UI with adaptive layout

🔄 User Flow

User lands on Home Page.

Clicks Login or Sign Up.

On successful authentication → redirected to Dashboard.

In Dashboard, user can:

View list of projects.

Open a project to see tasks and discussions.

Add tasks, assign members, update statuses.

User can view profile or logout anytime.

📌 Setup Instructions

Clone the repository:

git clone https://github.com/your-repo/SynergySphere.git
cd SynergySphere


Install dependencies:

npm install


Run the development server:

npm run dev


Open in browser: http://localhost:5173/

✅ Future Enhancements

Real backend integration (Node.js/Express + MongoDB).

Role-based access control.

File sharing & advanced notifications.

Analytics dashboard for managers.

AI-powered task prioritization.
