import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const COUNTER_FILE = path.join(process.cwd(), 'data', 'visitor-counter.json')

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(COUNTER_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Initialize counter file if it doesn't exist
async function initializeCounterFile() {
  try {
    await fs.access(COUNTER_FILE)
  } catch {
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count: 0 }))
  }
}

export async function GET() {
  try {
    await ensureDataDirectory()
    await initializeCounterFile()
    
    const data = await fs.readFile(COUNTER_FILE, 'utf8')
    const { count } = JSON.parse(data)
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error reading visitor counter:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}

export async function POST() {
  try {
    await ensureDataDirectory()
    await initializeCounterFile()
    
    // Read current count
    const data = await fs.readFile(COUNTER_FILE, 'utf8')
    const { count: currentCount } = JSON.parse(data)
    
    // Increment count
    const newCount = currentCount + 1
    
    // Write back to file
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count: newCount }))
    
    return NextResponse.json({ count: newCount })
  } catch (error) {
    console.error('Error incrementing visitor counter:', error)
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 })
  }
}
