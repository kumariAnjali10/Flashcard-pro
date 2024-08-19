import { NextResponse } from 'next/server';

// Cloudflare API endpoint for verifying tokens
const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4/user/tokens/verify';

export async function POST(req) {
    try {
        const text = await req.text();

        // Fetch Cloudflare API key from environment variable
        const cloudflareApiKey = process.env.CLOUDFLARE_API_KEY;

        // Make a request to the Cloudflare API
        const response = await fetch(CLOUDFLARE_API_URL, {
            method: 'GET', // Use GET method for verifying tokens
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cloudflareApiKey}`, // Use the API key
            },
        });

        if (!response.ok) {
            throw new Error('Error with Cloudflare API');
        }

        const data = await response.json();

        // Check if the token is valid and active
        if (data.success && data.result && data.result.status === 'active') {
            // Process the valid token
            return NextResponse.json({ message: 'Token is valid and active' });
        } else {
            throw new Error('Invalid or inactive token');
        }

    } catch (error) {
        console.error('Cloudflare API error:', error);
        return NextResponse.json({ error: error.message || 'Failed to verify token' }, { status: 500 });
    }
}
