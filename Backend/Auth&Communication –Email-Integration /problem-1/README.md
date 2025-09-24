# Email Sending with NodeMailer

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email credentials:**
   - Copy `.env.example` to `.env`
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with your Gmail App Password

3. **Gmail App Password Setup:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account → Security → App passwords
   - Use the generated 16-character password in `.env`

4. **Run the server:**
   ```bash
   node server.js
   ```

5. **Send email:**
   - Visit: `http://localhost:3000/sendemail`
   - Email will be sent to your email and venugopal.burli@masaischool.com

## Routes

- `GET /sendemail` - Sends test email to specified recipients