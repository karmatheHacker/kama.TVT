import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const usersFilePath = path.join(process.cwd(), "data", "users.json")

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"))
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to read users" }, { status: 500 })
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json()

    if (!name || !password) {
      return NextResponse.json({ error: "Name and password required" }, { status: 400 })
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"))
    const date = new Date()

    users[name] = {
      name,
      password,
      Created_on: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    }

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))

    return NextResponse.json({ status: "success" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
