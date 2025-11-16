# VastuNaksha - Modern House Design Website

A premium, minimalist React website for a house-design company. Built with React 19, Vite, TailwindCSS, and React Router. No backend required.

## 🎨 Features

### Pages

- **Home Page** - Hero section with enquiry form, design categories, and responsive grid
- **Design Details Page** - Detailed view with image carousel and WhatsApp integration
- **Fully Responsive** - Mobile-first design with smooth animations

### Key Features

✨ **Modern UI**

- Clean, minimalist design with white, black, and gray color scheme
- Glassmorphism effects on forms
- Smooth fade and scale animations
- Premium card layouts with hover effects

🔄 **Smart Form Handling**

- No backend required - form data stored in React state
- Auto-fill WhatsApp messages with user data
- Form validation and success feedback

💬 **WhatsApp Integration**

- Direct WhatsApp integration using wa.me API
- Auto-include design details and user information
- Pre-formatted enquiry messages

📱 **Design Management**

- 12+ dummy designs across 5 categories:
  - House Designs
  - Commercial Designs
  - 3D Front Designs
  - Interior Designs
  - Floor Plans
- Category filtering
- Image carousel on detail pages
- Related designs suggestions

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── HeroForm.jsx        # Enquiry form on hero section
│   └── DesignCard.jsx      # Reusable design card component
├── pages/
│   ├── Home.jsx            # Main landing page
│   └── DesignDetails.jsx   # Design detail view with carousel
├── data/
│   └── designsData.js      # Dummy designs dataset
├── App.jsx                 # Main app with routing
├── App.css                 # Custom animations
├── index.css               # Global styles
└── main.jsx                # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🎯 Usage

### Home Page

- **Navigation** - Click menu items to scroll to sections
- **Hero Section** - Features background image with enquiry form
- **Form** - Fill name, email, phone, and plot size
- **Design Grid** - Browse designs, filter by category
- **About Section** - Company highlights
- **Contact Section** - Contact form and information

### Design Details Page

- **Navigation** - Click any design card to view details
- **Image Carousel** - Navigate between design images
- **Key Features** - View design specifications and highlights
- **WhatsApp Button** - Send enquiry directly to WhatsApp
  - If form was filled: pre-fills user details
  - Otherwise: generic enquiry message

### Categories

Filter designs by:

- All
- House Designs
- Commercial Designs
- 3D Front Designs
- Interior Designs
- Floor Plans

## 🎨 Customization

### Change WhatsApp Number

Edit `src/pages/DesignDetails.jsx`:

```javascript
const phoneNumber = "919876543210"; // Replace with your number
```

### Modify Designs Data

Edit `src/data/designsData.js` - each design has:

- id, category, title, image
- size, description
- highlights (object with features)

### Update Colors

The app uses a white/black/gray theme. To customize:

1. Modify TailwindCSS classes in components
2. Update color values in App.css and index.css

### Change Company Info

Update in `src/pages/Home.jsx`:

- Company name and logo
- Contact email/phone
- Social media links
- Footer information

## 🛠️ Technologies Used

- **React 19** - UI Framework
- **Vite** - Build tool & dev server
- **TailwindCSS 4** - Utility-first CSS
- **React Router v6** - Client-side routing
- **WhatsApp Web API** - Direct messaging integration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and navigation
- Optimized images with proper sizing

## ✨ Key Components

### Navbar

- Sticky header with glassmorphism
- Responsive menu (hamburger on mobile)
- Logo click returns to home
- Smooth scroll navigation

### HeroForm

- Glassmorphism design with backdrop blur
- Real-time validation
- Success feedback on submission
- Auto-clear after 2 seconds

### DesignCard

- Hover effects with image zoom
- Category badge
- Quick highlights preview
- Smooth transitions

### Home Page

- Hero section with overlay
- Category filtering
- Dynamic design grid
- Multiple sections (about, contact)
- Footer with social links

### DesignDetails Page

- Full-width image carousel
- Design specifications
- Related designs sidebar
- WhatsApp integration button
- Breadcrumb navigation

## 🎬 Animations

Smooth transitions on:

- Page load (fade-in)
- Card hover (scale + shadow)
- Image carousel (smooth swipe)
- Form submission (success animation)
- Category filter (smooth transition)

## 📊 Design Highlights

Each design includes:

- Professional images
- Multiple specifications
- Size details (plot dimensions)
- Detailed descriptions
- Key features/highlights
- Related design suggestions

## 🔐 No Backend Features

✓ Client-side form handling
✓ Local state management
✓ No database required
✓ No authentication needed
✓ No API calls (except WhatsApp)
✓ Easy to deploy (static files)

## 📈 Performance

- Optimized images with proper sizing
- Code splitting via React Router
- Vite's fast HMR during development
- Efficient CSS with TailwindCSS
- Minimal bundle size

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

Update `vite.config.js`:

```javascript
export default {
  base: "/repository-name/",
  // ... rest of config
};
```

Then push to GitHub and enable GitHub Pages in settings.

## 📝 Customization Guide

### Add New Design

1. Add object to `designsData.js`:

```javascript
{
  id: 13,
  category: "House Designs",
  title: "Your Design",
  image: "image-url",
  size: "30×60",
  description: "Description",
  highlights: {
    bedrooms: 3,
    bathrooms: 2,
  }
}
```

### Add New Category

1. Add to categories array in `Home.jsx`
2. Add designs with matching category in `designsData.js`

### Update Contact Info

Edit these sections in `Home.jsx`:

- Contact form in "contact" section
- Footer contact details
- WhatsApp number in `DesignDetails.jsx`

## 🐛 Troubleshooting

**Images not loading?**

- Ensure image URLs are valid and accessible
- Use HTTPS URLs for better compatibility

**Form not submitting?**

- Check all required fields are filled
- Check browser console for errors

**WhatsApp not opening?**

- Verify phone number format (country code required)
- Check device has WhatsApp installed

**Styles not applying?**

- Clear browser cache
- Rebuild with `npm run build`

## 📄 License

Open source - feel free to use for your projects!

## 🙋 Support

For issues or questions:

1. Check the code comments
2. Review TailwindCSS documentation
3. Check React Router documentation
4. Review component implementations

## 🎉 Ready to Launch!

Your premium architectural design website is ready to go live. Customize it with your actual designs, contact information, and brand colors, then deploy!

---

Built with ❤️ for modern house design business.
