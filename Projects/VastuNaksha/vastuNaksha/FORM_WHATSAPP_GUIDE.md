# Form Data & WhatsApp Integration Guide

## How Form Data Works

### Current System (Client-Side Only)

The website uses **React state** to manage form data - no backend required:

1. **Hero Form** (`HeroForm.jsx`):

   - Stores user input in React state
   - Displays success message on submit
   - Data is passed to parent component via callback

2. **WhatsApp Integration** (`DesignDetails.jsx`):

   - Retrieves user data from localStorage
   - Pre-fills WhatsApp messages with user info
   - Uses WhatsApp Web API (wa.me)

3. **Contact Form** (`Home.jsx`):
   - Currently logs to browser console
   - Can be extended with email service

---

## WhatsApp Integration Details

### How It Works

When user clicks "Connect via WhatsApp":

1. **Checks for stored user data**

   ```javascript
   const userFormData = localStorage.getItem("userFormData");
   ```

2. **Constructs message**

   ```
   "Hi, I am interested in DESIGN_NAME. My details - Name: John, Phone: 9876543210, Plot Size: 30×60."
   ```

3. **Opens WhatsApp Web**
   ```
   https://wa.me/919876543210?text=ENCODED_MESSAGE
   ```

### WhatsApp Number Format

**Important**: Format matters!

✅ **Correct**:

```
919876543210  (country code + number, no +)
+919876543210 (with + prefix)
```

❌ **Wrong**:

```
09876543210   (don't include leading 0)
+1-987-654-3210 (special characters)
```

### Change WhatsApp Number

Edit `/src/pages/DesignDetails.jsx`, line ~46:

```javascript
const phoneNumber = "919876543210"; // Change this
```

For different countries:

- India: +91
- USA: +1
- UK: +44
- Canada: +1

---

## Saving Form Data (Optional)

Currently, form data is lost on page refresh. To persist it:

### Option 1: localStorage (Built-in Browser Storage)

Add this to `HeroForm.jsx` after successful submission:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // ... validation code ...

  // Save to localStorage
  localStorage.setItem("userFormData", JSON.stringify(formData));

  // Notify parent
  onSubmit(formData);
  setSubmitted(true);
};
```

**Pros**: Simple, no backend needed
**Cons**: Only works on that device, lost after clearing cache

### Option 2: Backend API (Recommended for Production)

Replace submission in `HeroForm.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://your-api.com/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      // Clear form and show success
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Integrating Email Service

### Option 1: Formspree (Free, No Code)

1. Visit https://formspree.io
2. Create new form
3. Get your form endpoint
4. Update contact form action in `Home.jsx`:

```javascript
<form method="POST" action="https://formspree.io/f/YOUR_ID">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  {/* ... other fields ... */}
  <button type="submit">Send Message</button>
</form>
```

### Option 2: EmailJS (Easy, Frontend)

```bash
npm install @emailjs/browser
```

In `Home.jsx`:

```javascript
import emailjs from "@emailjs/browser";

useEffect(() => {
  emailjs.init("YOUR_PUBLIC_KEY");
}, []);

const handleContactSubmit = (e) => {
  e.preventDefault();

  emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    to_email: "your@email.com",
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  });
};
```

### Option 3: Sendgrid (Reliable)

```bash
npm install @sendgrid/mail
```

Create backend endpoint to handle sending.

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│              User Visits Home Page              │
└─────────────────────────────────────────────────┘
                        │
                        ▼
        ┌─────────────────────────────┐
        │   Fills Enquiry Form        │
        │  (Name, Email, Phone, Size) │
        └─────────────────────────────┘
                        │
                        ▼
        ┌─────────────────────────────┐
        │ Form Data Stored in State   │
        │ (Optional: Save to Storage) │
        └─────────────────────────────┘
                        │
                        ▼
        ┌─────────────────────────────┐
        │ User Clicks Design Card     │
        └─────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │ DesignDetails Page Loads         │
        │ - Retrieves stored user data     │
        │ - Shows design with carousel     │
        └──────────────────────────────────┘
                        │
                        ▼
     ┌──────────────────────────────────────┐
     │ User Clicks WhatsApp Button          │
     └──────────────────────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         │                             │
    ▼(Has Data)                 ▼(No Data)
    │                           │
Pre-fills Message           Generic Message
+ User Details              (No auto-fill)
         │                           │
         └──────────────┬────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Opens WhatsApp Web           │
        │ https://wa.me/PHONE?text=MSG │
        └──────────────────────────────┘
```

---

## Form Validation Rules

Currently implemented:

```javascript
✓ Name: Required, text
✓ Email: Required, email format
✓ Phone: Required, text (numbers)
✓ Plot Size: Required, text (e.g., "30×60")
```

To add more validation:

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;

  // Email validation example
  if (name === "email") {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    }
  }

  setFormData((prev) => ({ ...prev, [name]: value }));
};
```

---

## Auto-Fill WhatsApp Messages

### Default Behavior

If user filled the form on home page, WhatsApp message auto-fills:

```
Hi, I am interested in "Modern Minimalist Home".
My details - Name: John Doe, Phone: 9876543210, Plot Size: 30×60.
```

### Customize Message

Edit `/src/pages/DesignDetails.jsx`, line ~49-57:

```javascript
const sendWhatsAppMessage = () => {
  const phoneNumber = "919876543210";

  // Customize this message
  let message = `Hi, I am interested in "${design.title}". `;

  if (userFormData) {
    message += `My details - Name: ${userFormData.name}, Phone: ${userFormData.phone}, Plot Size: ${userFormData.plotSize}.`;
  } else {
    message += `Please provide me more details about this design and the pricing.`;
  }

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};
```

---

## Testing Form Data

### In Browser Console

Test if data is being stored:

```javascript
// Check localStorage
localStorage.getItem("userFormData");

// Should return:
// {"name":"John","email":"john@email.com","phone":"9876543210","plotSize":"30×60"}

// Clear if needed
localStorage.clear();
```

### Test WhatsApp Link

Manually test WhatsApp link:

```
https://wa.me/919876543210?text=Hi%20there%20test%20message
```

Replace:

- `919876543210` - Your phone number
- `Hi%20there%20test%20message` - URL-encoded message

---

## Production Checklist

Before deploying:

- [ ] Update WhatsApp phone number
- [ ] Test form submission
- [ ] Test WhatsApp links work
- [ ] Set up email service (optional)
- [ ] Update contact email in footer
- [ ] Test on mobile device
- [ ] Clear browser cache and reload

---

## Common Issues

**Q: WhatsApp doesn't open**

- A: Check phone number format (must include country code)
- A: Verify WhatsApp is installed/accessible
- A: Test on WhatsApp Web first

**Q: Form data not saving**

- A: Check browser console for errors
- A: Verify localStorage is enabled
- A: Check form validation passes

**Q: Message has garbled text**

- A: Special characters need URL encoding
- A: The code already handles this with `encodeURIComponent()`
- A: Check console for the generated URL

**Q: Form submitting but data lost on page refresh**

- A: localStorage only persists data on that device
- A: To persist across devices, implement backend API
- A: Or use Option 2 approach with API

---

## Next Steps

1. **Test Everything**:

   - Fill form on home page
   - Click a design
   - Click WhatsApp button
   - Verify message pre-fills

2. **Customize Messages**:

   - Update phone number
   - Edit message template
   - Add more fields if needed

3. **Optional: Add Backend**:

   - Store data in database
   - Send confirmation emails
   - Track leads
   - Analytics

4. **Deploy**:
   - Forms work client-side
   - No backend needed for MVP
   - Deploy to Vercel/Netlify

---

Need help? Check the source files - they have detailed comments!
