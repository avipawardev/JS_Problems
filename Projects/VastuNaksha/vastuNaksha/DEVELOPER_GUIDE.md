# Component Architecture & Developer Guide

## Project Structure Overview

```
VastuNaksha/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx      # Navigation bar (sticky)
│   │   ├── HeroForm.jsx    # Enquiry form (hero section)
│   │   └── DesignCard.jsx  # Design card (reusable)
│   ├── pages/              # Full page components
│   │   ├── Home.jsx        # Landing page (hero + designs + about + contact)
│   │   └── DesignDetails.jsx # Single design view with carousel
│   ├── data/               # Static data
│   │   └── designsData.js  # 12 dummy designs
│   ├── App.jsx             # Main app with routing
│   ├── App.css             # Custom animations
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS config (auto)
├── package.json            # Dependencies
├── README.md               # Main documentation
├── CUSTOMIZATION_GUIDE.md  # How to customize
└── FORM_WHATSAPP_GUIDE.md  # Form & WhatsApp docs
```

---

## Component Deep Dives

### 1. **Navbar.jsx** (Navigation Bar)

**Props**: None (uses React Router)

**State**:

- `isOpen` - Mobile menu visibility

**Features**:

- Sticky header with glassmorphism
- Logo click navigates home
- Menu items scroll to sections
- Mobile hamburger menu

**Key Functions**:

```javascript
scrollToSection(sectionId);
// Smooth scroll to element by ID
// Example: scrollToSection('designs')
```

**Styling**:

- Glassmorphism: `bg-white/95 backdrop-blur-md`
- Responsive: `hidden md:flex` (hides on mobile)
- Sticky: `sticky top-0 z-50`

**Customization Points**:

1. Change logo (line 17-20)
2. Add menu items (line 26-40)
3. Update brand name (line 13)

---

### 2. **HeroForm.jsx** (Enquiry Form)

**Props**:

- `onSubmit` - Callback function when form submits

**State**:

```javascript
{
  name: '',
  email: '',
  phone: '',
  plotSize: ''
}
```

**Features**:

- Real-time input handling
- Success feedback animation
- Auto-clear after 2 seconds
- Glassmorphism design
- Form validation

**Key Functions**:

```javascript
handleChange(e);
// Updates form state on input change

handleSubmit(e);
// Validates and submits form
// Triggers onSubmit callback
```

**Styling**:

- Glassmorphism: `bg-white/85 backdrop-blur-xl`
- Success state shows checkmark
- Smooth animations on states

**Customization Points**:

1. Add/remove form fields (line 30-42)
2. Change validation rules (line 22-27)
3. Update success message (line 39-42)
4. Change styling (line 45)

---

### 3. **DesignCard.jsx** (Design Card Component)

**Props**:

- `design` - Design object with id, title, image, etc.

**State**:

- `isHovered` - Hover state for animations

**Features**:

- Image hover zoom effect
- Category badge
- Size badge
- Quick highlights preview
- Smooth transitions
- Click to detail page

**Key Functions**:

```javascript
handleClick();
// Navigates to design detail page
// Uses: navigate(`/design/${design.id}`)
```

**Design Object Structure**:

```javascript
{
  id: 1,
  category: "House Designs",
  title: "Modern Minimalist Home",
  image: "https://...",
  size: "30×60",
  description: "A stunning...",
  highlights: {
    bedrooms: 3,
    bathrooms: 2,
    // ... more properties
  }
}
```

**Styling**:

- Hover: `hover:shadow-2xl scale-110` on image
- Category badge: `bg-black/80 text-white`
- Responsive: Works on mobile and desktop

**Customization Points**:

1. Add more highlights (line 49-55)
2. Change card layout (line 40-70)
3. Modify hover effects (line 7-8)
4. Update badge styling (line 42)

---

### 4. **Home.jsx** (Landing Page)

**Props**: None

**State**:

```javascript
{
  userFormData: null,    // Stores submitted form data
  selectedCategory: 'All' // Current filter
}
```

**Features**:

- Hero section with overlay
- Dynamic form submission
- Design category filtering
- Responsive grid layout
- About section
- Contact form
- Footer with links

**Sections**:

1. **Navbar** - Navigation
2. **Hero** - Background image + CTA buttons + form
3. **Designs** - Category filter + grid
4. **About** - Company info + features
5. **Contact** - Contact form + info
6. **Footer** - Links + copyright

**Key Functions**:

```javascript
handleFormSubmit(data)
// Stores user form data in state
// Available to pass to other components

// Category filtering
const filteredDesigns = selectedCategory === 'All'
  ? designsData
  : designsData.filter(...)
```

**Data Flow**:

1. User fills HeroForm
2. Data passed to parent via onSubmit
3. Data stored in userFormData state
4. Data passed to other components as needed

**Customization Points**:

1. Change hero image (line 62)
2. Update hero text (line 81-89)
3. Modify categories (line 42)
4. Add/remove sections
5. Update footer info (line 330+)

---

### 5. **DesignDetails.jsx** (Detail Page)

**Props**: None (uses URL params)

**State**:

```javascript
{
  design: null,           // Current design object
  currentImageIndex: 0,   // Carousel image index
  userFormData: null      // Retrieved user data
}
```

**URL Parameter**:

- `:id` - Design ID from URL

**Features**:

- Image carousel with arrows
- Design specifications
- Related designs (3)
- WhatsApp integration
- Breadcrumb navigation
- Back button

**Key Functions**:

```javascript
sendWhatsAppMessage()
// Creates WhatsApp link with:
// - Design name
// - User data (if available)
// - Encoded message text
// Opens wa.me URL

// Carousel navigation
setCurrentImageIndex(...)
// Cycles through images
```

**Data Sources**:

1. URL params: Design ID
2. designsData: Look up full design
3. localStorage: User form data
4. Related designs: Filter same category

**Styling**:

- Image container: `relative h-96 md:h-[500px]`
- Carousel arrows: Centered overlay buttons
- Image indicators: Smooth dot animation
- Specifications grid: 2-column layout

**Customization Points**:

1. Change WhatsApp number (line 46)
2. Customize message template (line 49-57)
3. Modify image carousel (line 38-40)
4. Update related designs count (line 162)
5. Change specifications display (line 114-130)

---

## Data Flow & State Management

### Form Data Journey

```
HeroForm (Component)
  ↓ onSubmit callback
Home (Parent State)
  ↓ userFormData
DesignDetails (via localStorage)
  ↓ WhatsApp Message
WhatsApp Web
```

### Design Selection Journey

```
Home Page
  ↓ Click DesignCard
React Router
  ↓ Navigate to /design/1
DesignDetails Page
  ↓ Read URL param :id
designsData.js
  ↓ Find design by id
Display Design
```

---

## Styling System

### Colors Used

```javascript
Primary: Black (#000000)
Secondary: White (#FFFFFF)
Neutral: Gray (gray-50 to gray-900)
Accent: Green (WhatsApp only)
```

### Tailwind Classes

**Most Used**:

- `bg-black` / `bg-white` - Background
- `text-black` / `text-white` - Text
- `border-gray-200` - Subtle borders
- `rounded-lg` / `rounded-xl` - Border radius
- `shadow-md` / `shadow-lg` - Shadows
- `hover:shadow-2xl` - Hover effects
- `transition-all` - Smooth transitions
- `gap-4` / `gap-8` - Spacing

**Responsive Prefixes**:

- `md:` - Tablets (768px+)
- `lg:` - Desktops (1024px+)
- `hidden md:flex` - Hide on mobile, show on desktop

### Custom Animations

Defined in `/src/App.css`:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
.animate-fade-in-delay {
  animation: fadeIn 0.6s ease-out 0.2s forwards;
  opacity: 0;
}
.animate-fade-in-delay-2 {
  animation: fadeIn 0.6s ease-out 0.4s forwards;
  opacity: 0;
}
```

---

## React Router Setup

### Routes Defined

```javascript
// In App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/design/:id" element={<DesignDetails />} />
</Routes>
```

### Navigation Methods

```javascript
// Method 1: useNavigate hook
const navigate = useNavigate();
navigate("/design/1");
navigate("/");

// Method 2: Hash scrolling
scrollToSection("designs"); // Smooth scroll to #designs

// Method 3: Link component
import { Link } from "react-router-dom";
<Link to="/design/1">View Design</Link>;
```

---

## Best Practices Used

✅ **Component Organization**

- Small, focused components
- Clear prop interfaces
- Reusable component structure

✅ **State Management**

- Minimal state (only what's needed)
- Local state for UI (hover, form)
- Passed down via props

✅ **Performance**

- No unnecessary re-renders
- Lazy images via srcset
- Efficient filtering

✅ **Accessibility**

- Semantic HTML
- Button proper hover states
- Mobile-friendly touch targets

✅ **Code Style**

- Consistent naming conventions
- Clear comments
- Proper indentation

---

## Adding New Features

### Add New Design

1. Edit `/src/data/designsData.js`:

```javascript
{
  id: 13,
  category: "House Designs",
  title: "Your Design",
  image: "url",
  size: "30×60",
  description: "desc",
  highlights: { /* ... */ }
}
```

2. It automatically appears in grid and search!

### Add New Page

1. Create `/src/pages/YourPage.jsx`
2. Add route in `App.jsx`:

```javascript
<Route path="/your-page" element={<YourPage />} />
```

3. Add navigation in `Navbar.jsx`

### Add New Component

1. Create `/src/components/YourComponent.jsx`
2. Import in parent page
3. Use: `<YourComponent prop={value} />`

### Add New Filter

1. Modify categories array in `Home.jsx`
2. Add designs with matching category in `designsData.js`
3. Filter logic auto-updates!

---

## Testing Components

### Manual Testing

```javascript
// In browser console, test form data:
localStorage.getItem("userFormData");

// Test navigation:
navigate("/design/1");

// Test state:
console.log(userFormData);
```

### Component Testing

```bash
# To add automated tests:
npm install --save-dev vitest @testing-library/react

# Create test file:
# src/components/Navbar.test.jsx

# Run tests:
npm run test
```

---

## Performance Optimization Tips

1. **Image Optimization**

   - Use WebP format when possible
   - Compress before uploading
   - Lazy load images below fold

2. **Code Splitting**

   - React Router auto-splits pages
   - Consider splitting large components

3. **Bundle Size**

   - `npm run build` shows size
   - Already optimized with Vite

4. **Rendering**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for function props

---

## Debugging Tips

### Common Issues

**Images not showing?**

```javascript
// Check console (F12)
// Verify URL is HTTPS
// Check cors if cross-domain
```

**State not updating?**

```javascript
// Check setState is being called
// Verify no typos in state name
// Check dependency array in useEffect
```

**Routes not working?**

```javascript
// Check Router wraps Routes
// Verify path syntax
// Check useNavigate is imported
```

### Helpful Console Logs

```javascript
console.log("State:", { userFormData, selectedCategory });
console.log("Design:", design);
console.log("URL Params:", { id });
console.log("Form Data:", formData);
```

---

## Next Steps for Development

1. **Immediate**:

   - [ ] Customize company info
   - [ ] Add real design images
   - [ ] Update WhatsApp number
   - [ ] Test all interactions

2. **Short-term**:

   - [ ] Add more designs (expand designsData)
   - [ ] Add testimonials section
   - [ ] Add blog/news section
   - [ ] Setup email notifications

3. **Long-term**:
   - [ ] Add backend API
   - [ ] Add admin panel
   - [ ] Add user accounts
   - [ ] Add payment integration

---

## Resources

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **TailwindCSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev
- **WhatsApp API**: https://developers.facebook.com/docs/whatsapp

---

Happy coding! 🚀
