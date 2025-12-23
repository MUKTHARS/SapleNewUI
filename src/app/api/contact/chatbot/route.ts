// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Forward to your Python backend
    const backendResponse = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message, 
        session_id: request.cookies.get('session_id')?.value 
      }),
    });

    const data = await backendResponse.json();
    
    return NextResponse.json({
      reply: data.reply,
      type: data.type || 'text',
      data: data.data || null,
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}