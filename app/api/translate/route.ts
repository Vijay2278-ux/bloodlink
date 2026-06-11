import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { q, source, target } = body

    if (!q || !target) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const inputText = String(q).trim()
    const sourceLang = source || "en"
    const targetLang = String(target).trim()

    if (!inputText) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (sourceLang === targetLang) {
      return NextResponse.json({ translatedText: inputText })
    }

    const providerUrl = new URL("https://api.mymemory.translated.net/get")
    providerUrl.searchParams.set("q", inputText)
    providerUrl.searchParams.set("langpair", `${sourceLang}|${targetLang}`)

    const resp = await fetch(providerUrl, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    })

    if (!resp.ok) {
      return NextResponse.json({ error: "Translation provider is unavailable" }, { status: 502 })
    }

    const data = await resp.json()
    const translatedText = data?.responseData?.translatedText?.trim()

    if (!translatedText) {
      return NextResponse.json({ error: "No translation returned" }, { status: 502 })
    }

    return NextResponse.json({ translatedText })
  } catch (err) {
    console.error("/api/translate error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
