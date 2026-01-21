import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
export const initMixpanel = (token: string) => {
    if (typeof window !== 'undefined' && token) {
        mixpanel.init(token, {
            debug: process.env.NODE_ENV === 'development',
            track_pageview: false, // We'll track pageviews manually
            persistence: 'localStorage',
        });
    }
};

// Track page view
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.track('Page View', {
                page: pageName,
                ...properties,
            });
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};

// Track form submission
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.track('Form Submitted', {
                form_name: formName,
                ...formData,
            });
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};

// Track button click
export const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.track('Button Clicked', {
                button_name: buttonName,
                ...properties,
            });
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};

// Track custom event
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.track(eventName, properties || {});
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};

// Identify user (optional - for when you have user data)
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.identify(userId);
            if (userProperties) {
                mixpanel.people.set(userProperties);
            }
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
        try {
            mixpanel.people.set(properties);
        } catch (error) {
            console.warn('Mixpanel tracking error:', error);
        }
    }
};
