import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data } = await resend.emails.send({
            from: 'next@dovey.com',
            to: 'jfajardo7@my.bcit.ca',
            subject: 'Hello from Next.js',
            html: '<h1>Hello from Next.js</h1>'
        });
        return NextResponse.json({ 'hello': 'world' });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

