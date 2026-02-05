# ValueOS – Personal & IT Operations Operating System

*A practical, ADHD-aware, AI-assisted management system for a growing microfinance institution*

## Overview

ValueOS is a personal and organizational operating system designed to help an IT-led team manage:
- Tasks & Projects
- IT Helpdesk Tickets  
- Automation Rules
- Integrations (Mifos / Helaplus)
- Team Management

Designed for a creative multipotentialite operating across IT, operations, strategy, and automation.

## Core Philosophy

1. **Single Source of Truth** - Centralized data management
2. **Automation over Willpower** - Reduce cognitive load
3. **Visual over Abstract** - Clear, intuitive interfaces
4. **Systems over Memory** - Reliable processes
5. **Human-first** - User-centered design
6. **IT as an Operations Enabler** - Technology serves business needs

## Architecture

- **Frontend**: React + TypeScript + TailwindCSS
- **Data Layer**: Local-first (IndexedDB) with optional sync
- **Design**: ADHD-friendly UI with minimal cognitive load
- **Routing**: React Router for navigation
- **State Management**: Custom hooks with local storage

## Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type safety and better DX
- **Vite** - Fast development and build tool
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **IndexedDB** - Local-first data persistence

## Features

### Phase 1 (Current)
- ✅ Project Management Dashboard
- ✅ Task Management System
- ✅ Local-first data storage
- ✅ ADHD-friendly UI components
- ✅ Responsive design

### Phase 2 (Planned)
- 🔲 Authentication & User Management
- 🔲 IT Helpdesk Ticketing System
- 🔲 Automation Engine
- 🔲 Team Collaboration Tools

### Phase 3 (Future)
- 🔲 Mifos Integration
- 🔲 Advanced Analytics
- 🔲 Mobile App
- 🔲 Multi-device Sync

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd windsurf-project

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── services/         # Data services
│   └── localDb/      # IndexedDB adapters
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## ADHD-Friendly Design Principles

- **Minimal Screens** - Reduce cognitive overload
- **Clear Next Actions** - Always show what to do next
- **Visual Prioritization** - Color-coded urgency and importance
- **Automation-First** - Reduce manual effort and forgetfulness
- **Consistent Patterns** - Predictable interactions

## Data Model

### Core Entities
- **Projects** - Organizational units with progress tracking
- **Tasks** - Actionable items with assignments and deadlines
- **Tickets** - IT support requests with status tracking
- **Users** - Team members with roles and permissions
- **Automation Rules** - Configurable workflows

## Local-First Architecture

ValueOS uses IndexedDB for local data storage, ensuring:
- **Offline Capability** - Works without internet connection
- **Fast Performance** - No network latency
- **Data Privacy** - Everything stays on your device
- **Optional Sync** - Multi-device sync when needed

## Contributing

1. Follow the existing code style and patterns
2. Test thoroughly before submitting changes
3. Keep the ADHD-friendly design principles in mind
4. Document new features and changes

## License

[Your License Here]

---

**ValueOS is a thinking system and an operations backbone.**
