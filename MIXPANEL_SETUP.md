# Mixpanel Integration Setup

This project uses Mixpanel for tracking page views, form submissions, and user interactions.

## Setup Instructions

1. **Get your Mixpanel Token:**
   - Go to [Mixpanel](https://mixpanel.com) and create an account
   - Create a new project
   - Go to Project Settings → Project Info
   - Copy your **Project Token**

2. **Add Token to Environment Variables:**
   - Create a `.env.local` file in the root directory
   - Add your token:
   ```
   NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

## Tracked Events

The following events are automatically tracked:

### Page Views
- **Event:** `Page View`
- **Properties:** `page` (route path), `timestamp`
- **Triggered:** Automatically on route changes

### Form Submissions
- **Event:** `Form Submitted`
- **Properties:** `form_name`, form field data, `timestamp`
- **Triggered:** When user successfully submits the "Join The Party" form

### Button Clicks
- **Event:** `Button Clicked`
- **Properties:** `button_name`, `location`, `timestamp`
- **Triggered:** When user clicks:
  - "Start Collaboration" (Hero section)
  - "Visit Channel" (Hero section)
  - "JOIN THE PARTY" (Collab section)

### Form Submit Attempts
- **Event:** `Form Submit Attempted`
- **Properties:** `form_name`, `timestamp`
- **Triggered:** When user clicks submit button (before validation)

## Viewing Events in Mixpanel

1. Go to your Mixpanel dashboard
2. Navigate to **Events** or **Insights**
3. You'll see all tracked events with their properties
4. Create funnels, cohorts, and reports based on these events

## Custom Tracking

You can add custom tracking anywhere in your code:

```typescript
import { trackEvent } from '@/lib/mixpanel';

trackEvent('Custom Event Name', {
  property1: 'value1',
  property2: 'value2',
});
```

## Available Functions

- `trackPageView(pageName, properties?)` - Track page views
- `trackFormSubmission(formName, formData)` - Track form submissions
- `trackButtonClick(buttonName, properties?)` - Track button clicks
- `trackEvent(eventName, properties?)` - Track custom events
- `identifyUser(userId, userProperties?)` - Identify a user
- `setUserProperties(properties)` - Set user properties
