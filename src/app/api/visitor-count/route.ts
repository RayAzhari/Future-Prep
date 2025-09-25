import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const COUNTER_FILE = path.join(process.cwd(), 'data', 'visitor-counter.json')

// CORS headers for production
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function readCounter() {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf8')
    return JSON.parse(data).count || 0
  } catch {
    return 0
  }
}

async function writeCounter(count: number) {
  try {
    await fs.mkdir(path.dirname(COUNTER_FILE), { recursive: true })
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count }))
  } catch (error) {
    console.error('Error writing counter:', error)
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  const count = await readCounter()
  return NextResponse.json({ count }, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  const currentCount = await readCounter()
  const newCount = currentCount + 1
  await writeCounter(newCount)
  return NextResponse.json({ count: newCount }, { headers: corsHeaders })
}
