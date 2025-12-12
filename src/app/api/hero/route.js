import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth0 } from '@/lib/auth0';
import { getHero, upsertHero } from '@/lib/db';
import image2uri from 'image2uri';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { randomUUID } from 'crypto';

// Zod schema for hero data validation
const heroSchema = z.object({
  avatar: z.string().trim().min(1).startsWith('data:'),
  fullName: z.string().trim().min(2).max(200),
  shortDescription: z.string().trim().min(2).max(120),
  longDescription: z.string().trim().min(10).max(5000),
});

// Helper function to process file uploads to Data URL
async function toDataUrl(file, fallbackString) {
  if (!file || typeof file === 'string' || file.size === 0) {
    return fallbackString;
  }

  // Determine file extension
  let ext = path.extname(file.name);
  if (!ext && file.type) {
    // Basic mapping if extension is missing but type is present
    const typeMap = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg'
    };
    ext = typeMap[file.type] || '';
  }

  // Create a temporary file path
  const tempFilePath = path.join(os.tmpdir(), `${randomUUID()}${ext}`);

  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write to temp file
    fs.writeFileSync(tempFilePath, buffer);

    // Convert to Data URL using image2uri
    const dataUrl = image2uri(tempFilePath);
    return dataUrl;
  } catch (error) {
    console.error('Error processing image:', error);
    // In case of error, you might want to return the fallback or throw
    // For now, let's throw to ensure validation fails if image is bad
    throw new Error('Failed to process image file');
  } finally {
    // Clean up temp file
    if (fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.error('Failed to cleanup temp file:', cleanupError);
      }
    }
  }
}

// GET Handler (Public)
export async function GET() {
  try {
    const hero = await getHero();
    return NextResponse.json({ data: hero });
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT Handler (Protected)
export const PUT = auth0.withApiAuthRequired(async (req) => {
  try {
    // Verify session
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse FormData
    const formData = await req.formData();
    
    // Get existing hero data for fallback
    const currentHero = await getHero();

    // Process Avatar
    const avatarFile = formData.get('avatar');
    // Note: formData.get('avatar') returns 'undefined' string or null if empty in some cases, 
    // or the File object. Logic in toDataUrl handles File object checks.
    // If client sends existing avatar as string in a hidden field or similar, handle that logic:
    // But usually file input is empty if not changed. 
    // We assume if no new file, we keep the old one. 
    // However, if the client sends the *string* data url in the formData (e.g. from a text input?), 
    // we should handle that. But the prompt says "Check for a valid session... Parse FormData... Image Processing... If no file: Use the fallback string".
    // "Fallback string" implies the *current* avatar from DB.
    
    let avatarDataUrl;
    if (avatarFile && typeof avatarFile === 'object' && avatarFile.size > 0) {
        avatarDataUrl = await toDataUrl(avatarFile, currentHero.avatar);
    } else {
        // If it's not a file (e.g. null, or maybe a string passed explicitly), check if it's a valid data string
        const avatarEntry = formData.get('avatar');
        if (typeof avatarEntry === 'string' && avatarEntry.startsWith('data:')) {
            avatarDataUrl = avatarEntry;
        } else {
            avatarDataUrl = currentHero.avatar;
        }
    }

    // Construct Payload
    const payload = {
      fullName: formData.get('fullName'),
      shortDescription: formData.get('shortDescription'),
      longDescription: formData.get('longDescription'),
      avatar: avatarDataUrl,
    };

    // Validate Payload
    const parsedData = heroSchema.parse(payload);

    // Update Database
    const updatedHero = await upsertHero(parsedData);

    return NextResponse.json({
      message: 'Hero updated',
      data: updatedHero,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating hero:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});