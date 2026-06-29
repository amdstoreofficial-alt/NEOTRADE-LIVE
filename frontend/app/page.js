'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, BarChart3, Zap, Shield, Headphones, Award,
  TrendingUp, CheckCircle2, Star, Globe, Wallet, Cpu, Target,
  Trophy, Users, Clock, Lock, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import QuotexLogo from '@/components/QuotexLogo';

// Animated counter (NeoTrade style)
const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Feature = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
    viewport={{ once: true }}
    className="bg-[#11161e] border border-white/5 rounded-2xl p-6 hover:border-[#00b97a]/40 transition-all hover:-translate-y-1"
  >
    <div className="w-12 h-12 rounded-xl bg-[#00b97a]/10 border border-[#00b97a]/20 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#00b97a]" />
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Testimonial = ({ name, role, content, rating, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-[#11161e] border border-white/5 rounded-2xl p-6 hover:border-[#00b97a]/30 transition-all"
  >
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-white/80 text-sm leading-relaxed mb-4">"{content}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#00b97a]/20 text-[#00b97a] font-bold flex items-center justify-center">
        {name[0]}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-xs text-white/40">{role}</div>
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const features = [
    { icon: BarChart3, title: 'Binary Options Trading', desc: 'Trade forex, crypto, and metals with up to 95% returns. Simple Buy/Sell predictions with 5-60 second expiry times.' },
    { icon: Cpu, title: 'AI-Powered Predictions', desc: 'Advanced market intelligence analyses live order flow and gives high-confidence trading signals in real time.' },
    { icon: Target, title: 'OTC + Live Candles', desc: 'Genuine OTC engine plus exchange-grade live feed. Authentic 1s, 5s, 15s candles for surgical entries.' },
    { icon: Shield, title: 'Secure & Encrypted', desc: 'Bank-grade encryption, KYC checks, and instant crypto withdrawals. Your funds and identity are always safe.' },
    { icon: Trophy, title: 'Trader Rewards', desc: 'Climb the leaderboard, earn payout boosts on streaks, and unlock account tiers with exclusive perks.' },
    { icon: Users, title: 'Affiliate Program', desc: 'Refer traders and earn lifetime revenue share. Multi-tier commissions that scale with your network.' },
  ];

  const stats = [
    { value: 50000, suffix: '+', label: 'Active Traders' },
    { value: 95, suffix: '%', label: 'Max Payout' },
    { value: 24, suffix: '/7', label: 'Support' },
    { value: 400, suffix: '+', label: 'Assets' },
  ];

  const testimonials = [
    { name: 'Michael Chen', role: 'Professional Trader', content: 'The signals on NEOTRADE are incredibly tight. I\'ve increased my win rate by 40% since switching over.', rating: 5 },
    { name: 'Sarah Johnson', role: 'Crypto Enthusiast', content: 'Finally a platform that combines simplicity with professional tools. Mobile experience is flawless.', rating: 5 },
    { name: 'David Williams', role: 'Day Trader', content: 'Fast execution, great payouts, and the OTC candles feel surgical. Highly recommended.', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#0c1015] text-white">
      {/* Navbar */}
      <header className="border-b border-white/5 bg-[#0c1015]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" data-testid="nav-home"><QuotexLogo /></Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white" data-testid="nav-features">Features</a>
            <a href="#how" className="hover:text-white" data-testid="nav-how">How it works</a>
            <a href="#faq" className="hover:text-white" data-testid="nav-faq">FAQ</a>
            <a href="#about" className="hover:text-white" data-testid="nav-about">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => router.push('/login')} data-testid="nav-login">Log in</Button>
            <Button className="bg-[#00b97a] hover:bg-[#00a86d] text-white font-semibold" onClick={() => router.push('/signup')} data-testid="nav-signup">Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 qx-bg-grid opacity-30" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#00b97a]/10 rounded-full blur-3xl" />
        <div className="absolute top-32 -right-32 w-[500px] h-[500px] bg-[#1a8eff]/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-[#00b97a]/10 border border-[#00b97a]/30 text-[#00b97a] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              AI-POWERED TRADING PLATFORM
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
              Trade Smarter with{' '}
              <span className="bg-gradient-to-r from-[#22d3ee] via-[#00e692] to-[#00b97a] bg-clip-text text-transparent">
                NEOTRADE
              </span>
            </h1>
            <p className="text-white/60 text-lg mb-8 max-w-xl">
              Binary options trading with AI predictions, real-time market data, and up to 95% returns. Join 50,000+ traders worldwide on NEOTRADE.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-[#00b97a] hover:bg-[#00a86d] text-white font-bold text-base px-8 h-14" onClick={() => router.push('/signup')} data-testid="cta-start-trading">
                Start Trading Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-[#0c1015] hover:bg-white/90 border-0 font-bold text-base px-8 h-14" onClick={() => router.push('/signup')} data-testid="cta-demo">
                <DollarSign className="w-4 h-4 mr-1.5" /> $10,000 Demo Account
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/50">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#00b97a]"/> SSL Encrypted</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00b97a]"/> Instant Withdrawals</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-400"/> KYC Verified</div>
            </div>
          </motion.div>

          {/* Hero illustration: live mini chart */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#11161e] to-[#0a0d12] border border-white/10 p-4 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 qx-bg-grid opacity-20" />
              <div className="flex items-center justify-between mb-3 relative">
                <div>
                  <div className="text-xs text-white/50">XAU/USD (OTC)</div>
                  <div className="text-2xl font-bold text-white">2,350.<span className="text-[#00b97a]">128</span></div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-[#00b97a]/15 text-[#00b97a] text-xs font-bold">+0.42%</div>
              </div>
              <svg viewBox="0 0 400 220" className="w-full h-full relative">
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00b97a" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#00b97a" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 160 L40 140 L80 150 L120 110 L160 130 L200 90 L240 100 L280 70 L320 85 L360 50 L400 65 L400 220 L0 220 Z" fill="url(#g1)"/>
                <path d="M0 160 L40 140 L80 150 L120 110 L160 130 L200 90 L240 100 L280 70 L320 85 L360 50 L400 65" fill="none" stroke="#00b97a" strokeWidth="2.5"/>
                {[40,80,120,160,200,240,280,320,360].map((x,i) => (
                  <circle key={i} cx={x} cy={[140,150,110,130,90,100,70,85,50][i]} r="3" fill="#00b97a" />
                ))}
              </svg>
              <div className="absolute right-6 bottom-6 flex flex-col gap-2 w-40">
                <div className="bg-[#00b97a] text-white text-sm font-bold py-3 rounded-lg text-center">UP ↑</div>
                <div className="bg-[#ff5555] text-white text-sm font-bold py-3 rounded-lg text-center">DOWN ↓</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-[#11161e]/70 border border-white/5"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#00b97a] mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00b97a] mb-3 block">Platform Features</span>
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#22d3ee] via-[#00e692] to-[#00b97a] bg-clip-text text-transparent">Trade Profitably</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mt-4">
            Professional-grade tools, AI insights, and a seamless trading experience designed for both beginners and experts.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => <Feature key={f.title} {...f} delay={i * 0.08} />)}
        </div>
      </section>

      {/* Why NEOTRADE strip */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Wallet, t: '$1 minimum trade amount', d: 'Start trading with as little as $1 — risk-managed sizing all the way up to $1,000 per ticket.' },
            { icon: Award, t: '50% Bonus on first deposit', d: 'Get a 50% bonus on your first deposit of $50 or more — boost your balance instantly.' },
            { icon: Shield, t: 'Risk-free demo trading', d: 'Unlimited practice on a demo account loaded with $10,000 — exactly the same engine as live.' },
            { icon: CheckCircle2, t: '0% deposit/withdrawal fees', d: 'No hidden fees on any deposits or withdrawals — what you see is what you get.' },
            { icon: Headphones, t: '24/7 Online Support', d: 'Real humans, real time. Our trading specialists are available around the clock.' },
            { icon: TrendingUp, t: 'Account Tier Boost', d: 'Climb VIP tiers for higher payouts, exclusive promos, and dedicated account managers.' },
          ].map((it, i) => (
            <Feature key={it.t} icon={it.icon} title={it.t} desc={it.d} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Start trading with NEOTRADE</h2>
        <p className="text-white/50 text-center mb-12">in 3 simple steps</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '01', t: 'Sign up', d: 'Open an account for free. Just takes a minute — no lengthy verification for demo.' },
            { n: '02', t: 'Practice', d: 'Sharpen your skills with a $10,000 demo account on the same engine as live markets.' },
            { n: '03', t: 'Deposit and trade', d: 'Crypto, card, or bank deposits — minimum $10. Trade in seconds with 95% payouts.' },
          ].map(s => (
            <div key={s.n} className="bg-[#11161e] border border-white/5 rounded-2xl p-8">
              <div className="text-5xl font-extrabold text-[#00b97a]/30 mb-2">{s.n}</div>
              <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
              <p className="text-white/60 text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trader opinions */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00b97a] mb-3 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Traders Worldwide</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => <Testimonial key={t.name} {...t} delay={i * 0.08} />)}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl bg-[#11161e] border border-white/5 rounded-2xl px-6">
          {[
            { q: 'How do I get started on NEOTRADE?', a: 'Open a free demo account with $10,000 virtual funds and practice with the same engine that powers live markets — no risk, no time limit.' },
            { q: 'How long do withdrawals take?', a: 'Crypto withdrawals are typically processed within minutes. Card and bank withdrawals settle within 1–3 business days.' },
            { q: 'What is a binary options trading platform?', a: 'A binary options platform lets you predict whether an asset price will go UP or DOWN within a fixed expiry. If you are right at expiry, you receive a fixed payout.' },
            { q: 'Can I trade on my phone?', a: 'Yes — NEOTRADE is fully responsive and works perfectly on mobile browsers without any install.' },
            { q: 'What is the minimum deposit?', a: 'The minimum deposit is $10 and the minimum trade size is $1 — start small and scale as you build confidence.' },
            { q: 'Are there any deposit or withdrawal fees?', a: 'No. NEOTRADE charges 0% fees on deposits and withdrawals — what you fund is what you trade.' },
          ].map((it, i) => (
            <AccordionItem key={i} value={`f${i}`} className="border-white/5">
              <AccordionTrigger className="text-left text-white hover:text-[#00b97a]" data-testid={`faq-trigger-${i}`}>{it.q}</AccordionTrigger>
              <AccordionContent className="text-white/60">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#11161e] to-[#0a0d12] border border-white/5 p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 qx-bg-grid opacity-20" />
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 relative">
            Ready to Trade with{' '}
            <span className="bg-gradient-to-r from-[#22d3ee] via-[#00e692] to-[#00b97a] bg-clip-text text-transparent">NEOTRADE</span>?
          </h2>
          <p className="text-white/60 mb-8 relative max-w-2xl mx-auto">
            Join thousands of traders already profiting on NEOTRADE. Start with a free demo account today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <Button size="lg" className="bg-[#00b97a] hover:bg-[#00a86d] text-white font-bold text-base px-8 h-14" onClick={() => router.push('/signup')} data-testid="cta-final-signup">
              Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-[#0c1015] hover:bg-white/90 border-0 font-bold text-base px-8 h-14" onClick={() => router.push('/login')} data-testid="cta-final-login">
              I already have an account
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 mt-6" id="about">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <QuotexLogo />
            <p className="text-white/40 mt-4 text-xs leading-relaxed">
              NEOTRADE — AI-powered binary options platform with real-time market data and professional tools.
            </p>
            <p className="text-white/30 mt-4 text-[11px] leading-relaxed">
              <span className="text-[#ff5e5e]">Risk Warning:</span> Trading carries a high level of risk and may not be suitable for all investors. Only trade with funds you can afford to lose.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3 text-white">Trading</div>
            <ul className="space-y-2 text-white/50">
              <li><Link href="/login" className="hover:text-white">Binary Options</Link></li>
              <li><Link href="/login" className="hover:text-white">OTC Markets</Link></li>
              <li><Link href="/login" className="hover:text-white">Live Candles</Link></li>
              <li><Link href="/signup" className="hover:text-white">Affiliate Program</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-white">Support</div>
            <ul className="space-y-2 text-white/50">
              <li><Link href="/support" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/support" className="hover:text-white">Contact Us</Link></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3 text-white">Legal</div>
            <ul className="space-y-2 text-white/50">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© 2026 NEOTRADE. All rights reserved.</p>
          <p>Powered by next-generation trading infrastructure.</p>
        </div>
      </footer>
    </div>
  );
}
