"use client";

import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "@/lib/firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {

  const loginWithGoogle = async () => {
    try {

      await signInWithPopup(auth, provider);

      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#071739] via-[#0a1f4d] to-[#071739] text-white overflow-hidden">

      {/* Glow Effects */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#D97745]/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>

      {/* Navbar */}

      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 relative z-10">

        <div>

          <h1 className="text-3xl font-black text-[#D97745]">
            Baseerah AI
          </h1>

          <p className="text-sm text-gray-300">
            بصيرة
          </p>

        </div>

        <div className="hidden md:flex items-center gap-10 text-lg text-gray-200">

          <a href="#" className="hover:text-[#D97745] transition">
            الرئيسية
          </a>

          <a href="#" className="hover:text-[#D97745] transition">
            التحليلات
          </a>

          <a href="#" className="hover:text-[#D97745] transition">
            المميزات
          </a>

          <a href="#" className="hover:text-[#D97745] transition">
            الحماية
          </a>

        </div>

        <button
          onClick={loginWithGoogle}
          className="bg-[#D97745] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(217,119,69,0.35)]"
        >
          تسجيل الدخول عبر Google
        </button>

      </nav>

      {/* Hero Section */}

      <section className="grid lg:grid-cols-2 gap-20 items-center px-8 lg:px-24 py-24 relative z-10">

        <div>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full mb-8 backdrop-blur-xl">

            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

            <span className="text-sm text-gray-300">
              منصة ذكاء اصطناعي للتقنية المالية
            </span>

          </div>

          <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8">

            نفهم

            <span className="text-[#D97745]">
              {" "}سلوكك المالي{" "}
            </span>

            قبل أن تقع المشكلة

          </h1>

          <p className="text-gray-300 text-2xl leading-[55px] mb-10 max-w-3xl">

            منصة وقائية ذكية تحلل السلوك المالي وتكشف الاحتيال والاستنزاف المالي
            قبل حدوثه باستخدام الذكاء الاصطناعي.

          </p>

          <div className="flex items-center gap-6">

            <button
              onClick={loginWithGoogle}
              className="bg-[#D97745] px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(217,119,69,0.35)]"
            >
              تجربة النظام
            </button>

            <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition">
              شاهد العرض
            </button>

          </div>

        </div>

        {/* Smart Card */}

        <div className="relative">

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(217,119,69,0.12)]">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="text-gray-400 mb-2">
                  مؤشر الطمأنينة المالية
                </p>

                <h1 className="text-8xl font-black text-[#D97745]">
                  91
                </h1>

              </div>

              <div className="w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-black text-2xl">
                ممتاز
              </div>

            </div>

            <div className="space-y-6">

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-[28px] p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="font-bold text-2xl">
                    تحليل الإنفاق
                  </h3>

                  <span className="text-green-400 font-bold">
                    مستقر
                  </span>

                </div>

                <p className="text-gray-300 leading-8">
                  الإنفاق الشهري ضمن الحدود الطبيعية.
                </p>

              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-[28px] p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="font-bold text-2xl text-red-300">
                    تحذير ذكي
                  </h3>

                  <span className="text-red-400 font-bold text-3xl">
                    91%
                  </span>

                </div>

                <p className="text-gray-300 leading-8">
                  تم اكتشاف عملية مالية غير معتادة من جهاز جديد.
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 shadow-[0_0_30px_rgba(217,119,69,0.12)]">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="font-bold text-2xl">
                    AI توصية
                  </h3>

                  <span className="text-[#D97745] font-bold text-3xl">
                    وفر 18%
                  </span>

                </div>

                <p className="text-gray-300 leading-8">
                  إلغاء الاشتراكات غير المستخدمة قد يوفر لك 850 ريال شهريًا.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Analytics */}

      <section className="px-8 lg:px-24 py-24 relative z-10">

        <div className="mb-16">

          <h2 className="text-6xl font-black mb-6">

            <span className="text-[#D97745]">
              التحليلات
            </span>

            {" "}الذكية

          </h2>

          <p className="text-gray-400 text-2xl">
            تحليل مباشر للسلوك المالي باستخدام الذكاء الاصطناعي
          </p>

        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* Chart */}

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(217,119,69,0.12)]">

            <div className="flex items-center justify-between mb-10">

              <h3 className="text-4xl font-black">
                تحليل الإنفاق الشهري
              </h3>

              <span className="text-green-400 text-4xl font-black">
                +12%
              </span>

            </div>

            <div className="h-[420px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart
                  data={[
                    { month: "يناير", value: 4000 },
                    { month: "فبراير", value: 3200 },
                    { month: "مارس", value: 5400 },
                    { month: "أبريل", value: 4300 },
                    { month: "مايو", value: 6100 },
                    { month: "يونيو", value: 5200 },
                  ]}
                >

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
                    strokeWidth={5}
                    dot={{ r: 6 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Insights */}

          <div className="space-y-8">

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(139,92,246,0.12)]">

              <h3 className="text-5xl font-black mb-6">
                AI Insight
              </h3>

              <p className="text-gray-300 leading-[55px] text-2xl">
                الذكاء الاصطناعي اكتشف ارتفاعًا تدريجيًا في الإنفاق الترفيهي بنسبة 18٪.
              </p>

            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-[35px] p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,197,94,0.15)]">

              <h3 className="text-5xl font-black text-green-400 mb-6">
                توفير متوقع
              </h3>

              <p className="text-gray-300 leading-[55px] text-2xl">
                يمكنك توفير 2400 ريال خلال 3 أشهر إذا استمريت بالخطة الحالية.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}