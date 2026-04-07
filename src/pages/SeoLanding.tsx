import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Phone, MapPin, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SEO Landing Page
 * URL: /pipes-fittings-supplier-karachi
 * Not linked in main navigation — discovered via search engines.
 * Targets buyers searching for uPVC, CPVC, HDPE, PPRC, Bore Casing pipes in Karachi/Pakistan.
 */
const SeoLanding: React.FC = () => {
  return (
    <>
      {/* Inline meta override via Helmet-equivalent — injected at runtime for SPA */}
      <title>Best Pipes & Fittings Supplier in Karachi | uPVC CPVC HDPE PPRC | Mufaddal Traders</title>

      <div className="min-h-screen bg-white text-gray-800">
        <Header />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              #1 Pipes &amp; Fittings Supplier in Karachi, Pakistan
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Mufaddal Traders supplies uPVC, CPVC, HDPE, PPRC and Bore Casing pipes from
              Pakistan's top manufacturers — at wholesale prices with same-day availability.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="bg-white text-primary font-bold hover:bg-white/90"
                onClick={() => window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank')}
              >
                Get a Free Quote on WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="tel:03352906212">Call 0335-2906212</a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Why Choose Us ────────────────────────────────────── */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Buy Pipes &amp; Fittings from Mufaddal Traders?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: 'All Top Brands', desc: 'Pak Arab, Steelex, National Pipe, IIL, Speed, Minhas, Prime and more — all under one roof.' },
                { title: 'Wholesale Prices', desc: 'Competitive bulk pricing for contractors, builders and resellers across Karachi and Pakistan.' },
                { title: 'Wide Product Range', desc: 'uPVC, CPVC, HDPE, PPRC and bore casing pipes in all sizes and pressure ratings.' },
                { title: 'Fast Delivery', desc: 'Quick dispatch from our Gulbahar No. 2, Karachi warehouse to your project site.' },
                { title: 'Expert Guidance', desc: 'Our team helps you select the right pipe type and pressure class for every application.' },
                { title: 'Trusted Since Years', desc: 'Hundreds of contractors, developers and builders rely on us for consistent quality.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Product Categories ───────────────────────────────── */}
        <section className="py-14 px-4" id="products">
          <div className="max-w-4xl mx-auto space-y-14">

            {/* uPVC */}
            <div id="upvc" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-primary mb-2">uPVC Pipes &amp; Fittings in Karachi</h2>
              <p className="text-gray-600 mb-4">
                Unplasticised Polyvinyl Chloride (uPVC) pipes are the most widely used pipes for water
                supply, drainage, and sewerage systems in Pakistan. Mufaddal Traders stocks uPVC pipes
                from <strong>Pak Arab, Steelex, Speed, and Jeddah Polymer</strong> in sizes ranging from
                ½ inch to 12 inches and pressure ratings of Class B, Class C, and Class D.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>uPVC pressure pipes for potable water supply</li>
                <li>uPVC drainage &amp; sewerage pipes (SWR)</li>
                <li>uPVC column pipes for submersible pumps</li>
                <li>Full range of uPVC fittings: elbows, tees, reducers, unions, couplings</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Speed · Jeddah Polymer</div>
            </div>

            <hr className="border-gray-100" />

            {/* CPVC */}
            <div id="cpvc" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-primary mb-2">CPVC Pipes &amp; Fittings — Hot &amp; Cold Water</h2>
              <p className="text-gray-600 mb-4">
                Chlorinated Polyvinyl Chloride (CPVC) pipes are designed for both hot and cold water
                plumbing systems. Unlike standard uPVC, CPVC can withstand temperatures up to 93°C,
                making it ideal for overhead and concealed plumbing in homes, apartments, and
                commercial buildings across Karachi. We supply <strong>Pak Arab, Steelex, and Mark</strong> CPVC
                pipes and fittings.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>CPVC hot &amp; cold water supply pipes (½" to 2")</li>
                <li>CPVC FlowGuard Gold pipes and fittings</li>
                <li>CPVC elbows, tees, valves, reducers, adapters</li>
                <li>Suitable for concealed and exposed plumbing</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Mark</div>
            </div>

            <hr className="border-gray-100" />

            {/* HDPE */}
            <div id="hdpe" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-primary mb-2">HDPE Pipes Supplier in Karachi &amp; Pakistan</h2>
              <p className="text-gray-600 mb-4">
                High-Density Polyethylene (HDPE) pipes are the preferred choice for irrigation,
                sewerage, gas distribution, and industrial fluid transfer. They offer superior
                flexibility, pressure resistance, and a lifespan of 50+ years. Mufaddal Traders
                supplies <strong>Pak Arab, Local Pipe, and National Pipe</strong> HDPE pipes
                with PE-80 and PE-100 grades in SDR 11, SDR 13.6, SDR 17, and SDR 21 series.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>HDPE irrigation pipes (16mm to 630mm)</li>
                <li>HDPE sewerage &amp; drainage pipes</li>
                <li>HDPE gas distribution pipes (yellow stripe)</li>
                <li>HDPE butt-weld and electrofusion fittings</li>
                <li>HDPE coil pipes for drip irrigation systems</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Local Pipe · National Pipe</div>
            </div>

            <hr className="border-gray-100" />

            {/* PPRC */}
            <div id="pprc" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-primary mb-2">PPRC Pipes &amp; Fittings — Polypropylene Random Copolymer</h2>
              <p className="text-gray-600 mb-4">
                PPRC (Polypropylene Random Copolymer) pipes are used for hot and cold drinking water
                systems, heating systems, and industrial piping. Mufaddal Traders stocks
                <strong> Minhas and International Industries Ltd (IIL)</strong> PPRC pipes which are
                heat-fused for leak-proof joints — no glue required. Available in PN10, PN16, and
                PN20 pressure classes.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>PPRC pipes for potable drinking water</li>
                <li>PPRC pipes for underfloor heating systems</li>
                <li>PPRC fittings: elbows, tees, valves, ball valves, reducers</li>
                <li>Safe, food-grade, no chemical leaching</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Minhas · International Industries Ltd (IIL)</div>
            </div>

            <hr className="border-gray-100" />

            {/* Bore Casing */}
            <div id="bore-casing" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-primary mb-2">Bore Casing Pipes Supplier in Karachi</h2>
              <p className="text-gray-600 mb-4">
                Bore casing pipes are used to line water wells and boreholes to prevent collapse and
                contamination. Mufaddal Traders supplies heavy-duty PVC and HDPE bore casing pipes
                from <strong>Pak Arab, Local Pipe, and Prime</strong> in diameters from 4 inches to
                16 inches, suitable for residential, agricultural, and industrial borehole projects
                across Sindh and Punjab.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>PVC bore casing pipes (4" to 16")</li>
                <li>HDPE bore casing pipes</li>
                <li>Slotted / plain bore casing available</li>
                <li>Suitable for deep and shallow boreholes</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Local Pipe · Prime</div>
            </div>
          </div>
        </section>

        {/* ─── Brands We Stock ─────────────────────────────────── */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Top Pipe Brands Available in Karachi</h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              We are an authorised stockist and reseller for Pakistan's leading pipe manufacturers:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center text-sm font-semibold text-gray-700">
              {[
                { brand: 'Pak Arab', cats: 'uPVC · CPVC · HDPE · Bore Casing' },
                { brand: 'Steelex', cats: 'uPVC · CPVC' },
                { brand: 'National Pipe', cats: 'HDPE' },
                { brand: 'Jeddah Polymer', cats: 'uPVC' },
                { brand: 'Speed', cats: 'uPVC' },
                { brand: 'Mark', cats: 'CPVC' },
                { brand: 'Minhas', cats: 'PPRC' },
                { brand: 'IIL (Int\'l Industries)', cats: 'PPRC' },
                { brand: 'Prime', cats: 'Bore Casing' },
                { brand: 'Local Pipe', cats: 'HDPE · Bore Casing' },
              ].map(b => (
                <div key={b.brand} className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <p className="font-bold text-gray-900">{b.brand}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{b.cats}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Applications ─────────────────────────────────────── */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Where Are These Pipes Used?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Residential Buildings', desc: 'uPVC and CPVC pipes for water supply; PPRC for hot water; uPVC for drainage in houses, apartments and housing societies.' },
                { title: 'Agricultural Irrigation', desc: 'HDPE coil and column pipes for drip irrigation, sprinkler systems and water conveyance on farms across Pakistan.' },
                { title: 'Commercial & Industrial', desc: 'CPVC for chemical handling; HDPE for industrial fluid transfer; PPRC for process piping in factories and warehouses.' },
                { title: 'Borehole & Water Wells', desc: 'Heavy duty bore casing pipes to line wells in Karachi, interior Sindh, Punjab and Balochistan.' },
                { title: 'Infrastructure Projects', desc: 'HDPE for large diameter sewerage and water mains; uPVC for telecom conduit ducts.' },
                { title: 'Real Estate Development', desc: 'Complete pipe supply for DHA, Bahria Town, and private housing scheme developers.' },
              ].map(a => (
                <div key={a.title} className="flex gap-3 p-4 border border-gray-100 rounded-xl">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ (Targets featured snippets) ─────────────────── */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions — Pipes &amp; Fittings in Pakistan
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'What is the difference between uPVC and CPVC pipes?',
                  a: 'uPVC pipes are suitable for cold water supply and drainage at normal temperatures. CPVC pipes are chlorinated and can handle both hot (up to 93°C) and cold water, making them ideal for indoor plumbing in Pakistani homes where hot water systems are used.',
                },
                {
                  q: 'Which pipe is best for drinking water in Pakistan?',
                  a: 'PPRC (Polypropylene Random Copolymer) and CPVC pipes are considered the safest for drinking water supply as they are food-grade, non-toxic, and do not leach chemicals. HDPE PE-100 pipes are also safe for potable water mains.',
                },
                {
                  q: 'What sizes of uPVC pipes are available in Karachi?',
                  a: 'At Mufaddal Traders we stock uPVC pipes from ½ inch (15mm) to 12 inches (300mm) in Classes B, C, and D. Custom sizes and lengths can be arranged through our suppliers.',
                },
                {
                  q: 'Do you supply pipes for bore wells in Karachi?',
                  a: 'Yes. We supply PVC and HDPE bore casing pipes from 4 inches to 16 inches diameter from brands including Pak Arab, Prime, and Local Pipe — suitable for residential and agricultural borehole projects.',
                },
                {
                  q: 'Can I get pipes at wholesale price in Karachi?',
                  a: 'Mufaddal Traders offers wholesale and bulk pricing for contractors, builders, plumbers, and resellers. Contact us on 0335-2906212 or WhatsApp for a custom quote.',
                },
                {
                  q: 'Where is Mufaddal Traders located?',
                  a: 'Our office and warehouse is located at Gulbahar No. 2, Karachi, Pakistan. We serve customers across Karachi, Hyderabad, Sukkur, Lahore, and other cities.',
                },
                {
                  q: 'Which HDPE pipe brands are available in Pakistan?',
                  a: 'Mufaddal Traders stocks HDPE pipes from Pak Arab, National Pipe, and Local Pipe — available in PE-80 and PE-100 grades with SDR ratings of 11, 13.6, 17, and 21.',
                },
                {
                  q: 'What is the price of PPRC pipes in Karachi?',
                  a: 'PPRC pipe prices vary by brand, size, and pressure class. Minhas and IIL PPRC pipes are available at Mufaddal Traders — call 0335-2906212 or WhatsApp for the latest price list.',
                },
              ].map(faq => (
                <details key={faq.q} className="bg-white border border-gray-100 rounded-xl p-4 group open:shadow-sm">
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-2 text-gray-900">
                    {faq.q}
                    <span className="text-primary text-lg leading-none group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Local Keywords Block (for search coverage) ──────── */}
        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
              Serving Contractors &amp; Builders Across Pakistan
            </h2>
            <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
              Mufaddal Traders supplies quality pipes and fittings to customers in
              <strong> Karachi</strong>, Gulbahar, SITE Area, Korangi, Landhi, North Karachi,
              Orangi Town, Hyderabad, Sukkur, <strong>Lahore</strong>, Rawalpindi, Islamabad,
              Faisalabad, Multan, Peshawar, Quetta and across Pakistan.
              We supply uPVC pipes, CPVC pipes, HDPE pipes, PPRC pipes and bore casing pipes
              at the most competitive rates available in the market.
            </p>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="bg-primary text-white py-14 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Order? Get a Quote Today</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Call or WhatsApp Mufaddal Traders for instant pricing on uPVC, CPVC, HDPE, PPRC
            and bore casing pipes. Fast dispatch from Karachi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:03352906212" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition">
              <Phone className="h-5 w-5" /> 0335-2906212
            </a>
            <button
              onClick={() => window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank')}
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              WhatsApp Us
            </button>
            <a href="mailto:mufaddaltraders553@gmail.com" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition">
              <Mail className="h-5 w-5" /> Email Us
            </a>
          </div>
          <p className="text-white/60 mt-6 text-sm flex items-center justify-center gap-1.5">
            <MapPin className="h-4 w-4" /> Gulbahar No. 2, Karachi, Pakistan
          </p>
        </section>

        {/* Back to main site */}
        <div className="text-center py-6 bg-gray-50">
          <Link to="/" className="text-primary text-sm hover:underline font-medium">
            ← View All Pipe Brands &amp; Catalogs
          </Link>
        </div>
      </div>
    </>
  );
};

export default SeoLanding;
