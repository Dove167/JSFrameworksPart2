export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const link = formData.get("link");
    const rawKeywords = formData.get("keywords");

    let keywords = [];
    if (typeof rawKeywords === "string" && rawKeywords.length > 0) {
      try {
        keywords = JSON.parse(rawKeywords);
      } catch {
        // fallback: comma-separated
        keywords = rawKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean);
      }
    }

    const project = { title, description, img, link, keywords };

    // FUTURE:
    // - validate with Zod on server
    // - write to DB
    // - revalidatePath("/projects")

    console.log({ project });

    return Response.json(
      { ok: true, project },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}