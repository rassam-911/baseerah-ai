"use client";

import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);

  const [expenses, setExpenses] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfAnalysis, setPdfAnalysis] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const [history, setHistory] = useState<any[]>([]);

  const chartData = [
    { month: "يناير", value: 3200 },
    { month: "فبراير", value: 2800 },
    { month: "مارس", value: 4100 },
    { month: "أبريل", value: 3700 },
    { month: "مايو", value: 5200 },
    { month: "يونيو", value: 4300 },
  ];

  useEffect(() => {

    const loadUserData = async () => {

      const unsubscribe = onAuthStateChanged(
        auth,
        async (currentUser) => {

          if (!currentUser) {

            window.location.href = "/";

          } else {

            setUser(currentUser);

            const q = query(
              collection(db, "analyses"),
              where("user", "==", currentUser.email)
            );

            const querySnapshot = await getDocs(q);

            const items: any[] = [];

            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });

            setHistory(items.reverse());

          }

        }
      );

      return () => unsubscribe();

    };

    loadUserData();

  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#071739] via-[#0a1f4d] to-[#071739] text-white overflow-hidden p-10">

      {/* Glow Effects */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#D97745]/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>

      {/* Header */}

      <div className="flex items-center justify-between mb-12 relative z-10">

        <div>

          <h1 className="text-5xl font-black text-[#D97745]">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            لوحة التحكم الذكية لتحليل السلوك المالي
          </p>

        </div>

        <div className="flex items-center gap-5">

          {user && (

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl">

              <img
                src={user.photoURL}
                alt="User"
                className="w-14 h-14 rounded-full border border-white/10"
              />

              <div>

                <h3 className="font-bold">
                  {user.displayName}
                </h3>

                <p className="text-sm text-gray-400">
                  {user.email}
                </p>

              </div>

            </div>

          )}

          <button
            onClick={async () => {

              await signOut(auth);

              window.location.href = "/";

            }}
            className="bg-red-500/20 border border-red-500/20 px-6 py-4 rounded-2xl hover:bg-red-500/30 transition"
          >
            تسجيل الخروج
          </button>

        </div>

      </div>

      {/* Stats */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative z-10">

        <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(217,119,69,0.15)]">

          <h3 className="text-gray-400 mb-3">
            مؤشر الطمأنينة
          </h3>

          <h1 className="text-6xl font-black text-[#D97745]">
            91
          </h1>

          <p className="text-green-400 mt-4">
            ممتاز
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.15)]">

          <h3 className="text-gray-400 mb-3">
            العمليات المشبوهة
          </h3>

          <h1 className="text-6xl font-black text-red-400">
            3
          </h1>

          <p className="text-gray-400 mt-4">
            تم اكتشافها هذا الأسبوع
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.15)]">

          <h3 className="text-gray-400 mb-3">
            التوفير المتوقع
          </h3>

          <h1 className="text-5xl font-black text-green-400">
            2400
          </h1>

          <p className="text-gray-400 mt-4">
            ريال خلال 3 أشهر
          </p>

        </div>

      </section>

      {/* Analytics */}

      <section className="mb-14 relative z-10">

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-[0_0_50px_rgba(217,119,69,0.12)]">

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-black text-[#D97745] mb-3">
                التحليلات الذكية
              </h2>

              <p className="text-gray-400">
                تحليل مباشر للإنفاق المالي
              </p>

            </div>

            <div className="text-green-400 text-3xl font-black">
              +12%
            </div>

          </div>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e3a5f"
                />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#D97745"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>

      {/* AI Financial Analysis */}

      <section className="mb-14 relative z-10">

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-[0_0_50px_rgba(217,119,69,0.12)]">

          <h2 className="text-4xl font-black mb-4 text-[#D97745]">
            التحليل المالي الذكي
          </h2>

          <p className="text-gray-400 mb-8">
            أدخل بيانات الإنفاق وسيقوم الذكاء الاصطناعي بتحليلها
          </p>

          <textarea
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder={`مثال:
إيجار: 2500
مطاعم: 1800
اشتراكات: 400
قهوة: 900`}
            className="w-full h-52 bg-white/5 border border-white/10 rounded-2xl p-6 outline-none resize-none text-lg mb-6"
          />

          <button
            onClick={async () => {

              if (!expenses) return;

              setLoading(true);

              try {

                const res = await fetch("/api/chat", {
                  method: "POST",

                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    messages: [
                      {
                        role: "user",
                        content: `
حلل هذا الإنفاق المالي بشكل احترافي:

${expenses}

واعطني:
- نقاط الخطر
- طرق التوفير
- تحليل السلوك المالي
- نصائح ذكية
                        `,
                      },
                    ],
                  }),
                });

                const data = await res.json();

                setAnalysis(data.reply);

                await addDoc(
                  collection(db, "analyses"),
                  {

                    user: user?.email,

                    expenses,

                    analysis: data.reply,

                    createdAt: serverTimestamp(),

                  }
                );

                setHistory((prev) => [
                  {
                    expenses,
                    analysis: data.reply,
                  },
                  ...prev,
                ]);

              } catch (error) {

                console.log(error);

              }

              setLoading(false);

            }}
            className="bg-[#D97745] px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            {loading
              ? "جاري التحليل..."
              : "تحليل بالذكاء الاصطناعي"}
          </button>

          {analysis && (

            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 leading-9 text-gray-300 whitespace-pre-line">
              {analysis}
            </div>

          )}

        </div>

      </section>

      {/* PDF Analysis */}

      <section className="mb-14 relative z-10">

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-[0_0_50px_rgba(217,119,69,0.12)]">

          <h2 className="text-4xl font-black text-[#D97745] mb-4">
            تحليل كشف الحساب البنكي
          </h2>

          <p className="text-gray-400 mb-8">
            ارفع ملف PDF وسيقوم الذكاء الاصطناعي بتحليله
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {

              if (e.target.files?.[0]) {
                setPdfFile(e.target.files[0]);
              }

            }}
            className="mb-6 block w-full text-gray-300"
          />

          <button
            onClick={async () => {

              if (!pdfFile) return;

              setPdfLoading(true);

              const formData = new FormData();

              formData.append("file", pdfFile);

              try {

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();

                setPdfAnalysis(data.analysis);

              } catch (error) {

                console.log(error);

              }

              setPdfLoading(false);

            }}
            className="bg-[#D97745] px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            {pdfLoading
              ? "جاري تحليل الملف..."
              : "تحليل الملف"}
          </button>

          {pdfAnalysis && (

            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 leading-9 text-gray-300 whitespace-pre-line">
              {pdfAnalysis}
            </div>

          )}

        </div>

      </section>

      {/* History */}

      <section className="mt-14 relative z-10">

        <h2 className="text-4xl font-black mb-8">
          سجل التحليلات السابقة
        </h2>

        <div className="grid gap-6">

          {history.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-xl"
            >

              <h3 className="text-[#D97745] font-bold text-2xl mb-4">
                البيانات المدخلة
              </h3>

              <p className="text-gray-300 whitespace-pre-line leading-8 mb-6">
                {item.expenses}
              </p>

              <h3 className="text-green-400 font-bold text-2xl mb-4">
                تحليل الذكاء الاصطناعي
              </h3>

              <p className="text-gray-300 whitespace-pre-line leading-8">
                {item.analysis}
              </p>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}