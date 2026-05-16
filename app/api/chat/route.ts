import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
أنت مساعد مالي ذكي داخل منصة Baseerah AI.

مهامك:
- تحليل السلوك المالي
- كشف الاحتيال
- التوصيات المالية
- تحليل الإنفاق
- تقديم نصائح ذكية
- الرد باللغة العربية فقط
- الرد يكون احترافي وواضح
          `,
        },

        ...body.messages,
      ],

      temperature: 0.7,
      max_tokens: 500,
    });

    return Response.json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "حدث خطأ في الذكاء الاصطناعي",
      },
      {
        status: 500,
      }
    );
  }
}