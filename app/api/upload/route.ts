import OpenAI from "openai";
import pdf from "pdf-parse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        {
          success: false,
          error: "لم يتم رفع ملف",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // استخراج النص من PDF
    const data = await pdf(buffer);

    const pdfText = data.text;

    // تحليل الذكاء الاصطناعي
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
أنت خبير تحليل مالي داخل منصة Baseerah AI.

قم بتحليل كشف الحساب البنكي وقدم:
- تحليل الإنفاق
- نقاط الخطر
- فرص التوفير
- السلوك المالي
- العمليات المشبوهة
- نصائح مالية احترافية

الرد باللغة العربية فقط.
          `,
        },

        {
          role: "user",
          content: pdfText,
        },
      ],

      temperature: 0.7,
      max_tokens: 1000,
    });

    return Response.json({
      success: true,
      extractedText: pdfText,
      analysis: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "حدث خطأ أثناء تحليل ملف PDF",
      },
      {
        status: 500,
      }
    );
  }
}