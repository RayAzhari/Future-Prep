# Future Prep - MVP

A comprehensive platform for high school students to access free SAT/ACT/AP resources, scholarships, and research opportunities.

## Features

- **Study Resources**: Filterable database of SAT, ACT, and AP prep materials
- **Scholarships**: Search and filter scholarships by major and deadline
- **Research Opportunities**: Email templates and research program database
- **Modern UI**: Built with Next.js, TailwindCSS, and Framer Motion

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd future-prep
```

2. Install dependencies (choose one method):

**Option A: Use the installation script**
```bash
./install.sh
```

**Option B: Manual installation**
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Troubleshooting

If you see JSX syntax errors or module not found errors:

1. Make sure Node.js is installed: `node --version`
2. Run `npm install` to install all dependencies
3. Restart your IDE/editor
4. If using VS Code, install the recommended extensions from `.vscode/extensions.json`

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── ResourcesSection.tsx
│   ├── ScholarshipsSection.tsx
│   └── ResearchSection.tsx
└── data/              # Mock data files
    ├── resources.json
    ├── scholarships.json
    └── research.json
```

## Deployment

### 🚀 Deploy to Vercel (Recommended)

**Option 1: One-Click Deploy**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RayAzhari/future-prep)

**Option 2: Manual Deployment**

1. **Push to GitHub:**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/RayAzhari/future-prep.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js app
   - Click "Deploy" - your app will be live in minutes!

### 🌐 Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify**: Drag and drop the `out` folder after running `npm run build && npm run export`
- **Railway**: Connect GitHub repo for automatic deployments
- **AWS Amplify**: Connect GitHub repo for CI/CD pipeline

## Features Overview

### Homepage
- Vibrant hero section with gradient text
- Feature highlight cards
- Smooth scroll navigation

### Resources Section
- Filter by category (SAT, ACT, AP)
- Search functionality
- External links to resources

### Scholarships Section
- Search and filter by major
- Deadline countdown
- Amount display
- Urgency indicators

### Research Section
- Email templates with copy-to-clipboard
- Research opportunities database
- Application tips

## Data Structure

The app uses mock JSON files for data. In a production environment, this would be replaced with:
- Supabase
- Firebase
- PostgreSQL
- Any other database solution

## Future Enhancements

- User authentication
- Personalized dashboards
- Real-time deadline notifications
- User-generated content
- Social features
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
