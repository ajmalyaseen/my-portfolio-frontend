"use client";

import { v4 as uuidv4 } from 'uuid';

/**
 * Gets or creates a unique persistent ID for the visitor.
 * This ID stays in the browser even if the IP changes.
 */
export const getVisitorId = (): string => {
    if (typeof window === 'undefined') return '';

    let visitorId = localStorage.getItem('visitor_id');

    if (!visitorId) {
        // Create a new unique ID
        visitorId = uuidv4();
        localStorage.setItem('visitor_id', visitorId);
    }

    return visitorId;
};
