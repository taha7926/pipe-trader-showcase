import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Phone, MapPin, Mail, CheckCircle, ArrowRight, Droplets, Tractor, CircleDot, Cable, Gauge, PipetteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SEO Landing Page
 * URL: /pipes-fittings-supplier-karachi
 * Not linked in main navigation — discovered via search engines.
 * Targets buyers searching for water pipes, agriculture pipes, boring pipes,
 * cable pipes, irrigation pipes, pressure pipes, drainage pipes in Karachi/Pakistan.
 */
const SeoLanding: React.FC = () => {
  return (
    <>
      <title>Water Pipes, Agriculture Pipes, Boring Pipes, Cable Pipes Supplier Karachi | Mufaddal Traders</title>

      <div className="min-h-screen bg-white text-gray-800">
        <Header />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Karachi's #1 Supplier of Water Pipes, Agriculture Pipes, Boring Pipes &amp; Fittings
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-4 max-w-2xl mx-auto">
              Mufaddal Traders supplies <strong>water pipes, irrigation pipes, agriculture pipes,
              boring pipes, cable pipes, pressure pipes, drainage pipes</strong> and plumbing fittings
              from Pakistan's top manufacturers — at wholesale prices with same-day dispatch.
            </p>
            <p className="text-sm text-white/70 mb-8">
              uPVC · CPVC · HDPE · PPRC · G.I · Bore Casing — All sizes, all pressure classes
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

        {/* ─── Pipes by Application (Primary SEO section) ──────── */}
        <section className="py-14 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              Buy Pipes by Application — What Do You Need?
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
              Whether you need pipes for water supply, farming, boring, cable ducting, or construction — Mufaddal Traders has the right pipe at the right price.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: '💧',
                  title: 'Water Pipes',
                  subtitle: 'Drinking Water & Supply Lines',
                  desc: 'uPVC, CPVC, and PPRC pipes for potable water supply in homes, apartments, hospitals, schools, and commercial buildings. Safe, durable, and leak-proof.',
                  keywords: 'Water supply pipes, drinking water pipes, plumbing pipes, pani ki pipes',
                  brands: 'Pak Arab · Steelex · Speed · Minhas · IIL',
                },
                {
                  icon: '🌾',
                  title: 'Agriculture Pipes',
                  subtitle: 'Farm & Crop Irrigation',
                  desc: 'HDPE pipes for drip irrigation, sprinkler systems, water conveyance, and farm water supply. Flexible, UV-resistant, and built for outdoor use across Pakistan.',
                  keywords: 'Agriculture pipes, farming pipes, crop irrigation, khet ki pipes',
                  brands: 'Pak Arab · National Pipe · Local Pipe',
                },
                {
                  icon: '🔄',
                  title: 'Irrigation Pipes',
                  subtitle: 'Drip, Sprinkler & Canal Systems',
                  desc: 'HDPE coil pipes and pressure pipes for drip irrigation, sprinkler installations, and canal lining projects. Available in PE-80 and PE-100 grades from 16mm to 630mm.',
                  keywords: 'Irrigation pipes, drip pipes, sprinkler pipes, canal pipes, sinchai pipes',
                  brands: 'Pak Arab · National Pipe · Speed',
                },
                {
                  icon: '⛏️',
                  title: 'Boring Pipes',
                  subtitle: 'Borehole & Well Casing',
                  desc: 'Heavy-duty PVC and HDPE boring pipes (bore casing) for water wells, boreholes, and submersible pump installations. Available in 4" to 16" diameter, slotted and plain.',
                  keywords: 'Boring pipes, bore casing, well casing, borehole pipes, tube well pipes',
                  brands: 'Pak Arab · Prime · Local Pipe',
                },
                {
                  icon: '🔌',
                  title: 'Cable Pipes',
                  subtitle: 'Telecom & Electrical Conduit',
                  desc: 'uPVC conduit pipes for underground cable protection — telecom fiber optic ducts, electrical cable routing, and power distribution networks. Impact-resistant and moisture-proof.',
                  keywords: 'Cable pipes, conduit pipes, telecom duct, electrical pipes, cable duct',
                  brands: 'Pak Arab · Steelex · Jeddah Polymer',
                },
                {
                  icon: '⚡',
                  title: 'Pressure Pipes',
                  subtitle: 'High-Pressure Water & Gas Lines',
                  desc: 'uPVC Class C/D, HDPE PE-100, and G.I pipes rated for high-pressure water mains, gas distribution, fire hydrant lines, and industrial fluid transfer.',
                  keywords: 'Pressure pipes, high pressure, water main, gas pipes, fire line pipes',
                  brands: 'Steelex · IIL · Pak Arab · National Pipe',
                },
                {
                  icon: '🚿',
                  title: 'Hot & Cold Water Pipes',
                  subtitle: 'Plumbing & Heating Systems',
                  desc: 'CPVC pipes for hot water up to 93°C and PPRC pipes with heat-fused leak-proof joints. Perfect for concealed plumbing, geyser connections, and underfloor heating.',
                  keywords: 'Hot water pipes, garam pani pipes, plumbing, geyser pipes, heating pipes',
                  brands: 'Pak Arab · Steelex · Mark · Minhas · IIL',
                },
                {
                  icon: '🏗️',
                  title: 'Drainage & Sewerage Pipes',
                  subtitle: 'SWR, Waste & Rainwater',
                  desc: 'uPVC SWR (Soil, Waste, Rainwater) pipes and HDPE drainage pipes for residential, commercial, and municipal sewerage systems. Chemical-resistant and long-lasting.',
                  keywords: 'Drainage pipes, sewerage pipes, SWR pipes, nali pipes, waste pipes',
                  brands: 'Pak Arab · Steelex · Speed · Jeddah Polymer',
                },
                {
                  icon: '🔧',
                  title: 'G.I (Galvanized Iron) Pipes',
                  subtitle: 'Steel Pipes for Gas & Water',
                  desc: 'Zinc-coated galvanized iron pipes for water supply, gas distribution, structural support, and scaffolding. Available in light, medium, and heavy gauge.',
                  keywords: 'G.I pipes, galvanized pipes, steel pipes, lohe ki pipes, gas pipes',
                  brands: 'Steelex · International Industries Ltd (IIL)',
                },
              ].map(item => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{item.subtitle}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                  <p className="text-xs text-gray-400 italic mb-2">Searches: {item.keywords}</p>
                  <p className="text-xs text-gray-500 font-medium">Brands: {item.brands}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why Choose Us ────────────────────────────────────── */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Contractors &amp; Builders Choose Mufaddal Traders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: 'All Pipe Types in One Shop', desc: 'Water pipes, agriculture pipes, boring pipes, cable pipes, pressure pipes, G.I pipes — everything under one roof. No need to visit multiple dealers.' },
                { title: 'Wholesale Rates Guaranteed', desc: 'Best wholesale prices in Karachi for contractors, builders, plumbers, farmers and resellers. Bulk discounts on all orders.' },
                { title: '10+ Top Brands Stocked', desc: 'Pak Arab, Steelex, National Pipe, IIL, Speed, Minhas, Jeddah Polymer, Mark, Prime, Local Pipe — all available.' },
                { title: 'Same-Day Dispatch', desc: 'Order today, get it today. Quick dispatch from our Gulbahar No. 2, Karachi warehouse to your project site anywhere in Pakistan.' },
                { title: 'All Sizes & Pressure Classes', desc: 'From ½ inch to 16 inches. Class B, C, D. PE-80, PE-100. PN10, PN16, PN20. SDR 11 to SDR 21. Every size you need.' },
                { title: 'Expert Pipe Selection Help', desc: 'Not sure which pipe to use? Our team helps you pick the right material, size, and pressure class for your specific project needs.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
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

        {/* ─── Pipe Types (Technical Detail) ────────────────────── */}
        <section className="py-14 px-4 bg-white" id="products">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">Pipe Types We Supply — Technical Details</h2>
            <div className="space-y-14">

            {/* uPVC */}
            <div id="upvc" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">uPVC Pipes — Water Supply, Drainage &amp; Cable Conduit Pipes</h3>
              <p className="text-gray-600 mb-4">
                Unplasticised Polyvinyl Chloride (uPVC) pipes are the backbone of Pakistan's plumbing
                infrastructure. Used for <strong>water supply pipes, drainage pipes, sewerage pipes,
                column pipes for submersible pumps, and cable conduit pipes</strong> for telecom and
                electrical installations. Mufaddal Traders stocks uPVC from <strong>Pak Arab, Steelex,
                Speed, and Jeddah Polymer</strong> in sizes ½" to 12" in Class B, C, and D pressure ratings.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>uPVC water supply pipes — potable drinking water lines</li>
                <li>uPVC drainage &amp; sewerage pipes (SWR) — waste water and rainwater</li>
                <li>uPVC cable conduit pipes — telecom ducts and electrical cable protection</li>
                <li>uPVC column pipes — submersible pump and borehole installations</li>
                <li>uPVC pressure pipes — Class B, C, D for water mains</li>
                <li>Full range of fittings: elbows, tees, reducers, unions, couplings, valves</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Speed · Jeddah Polymer</div>
            </div>

            <hr className="border-gray-100" />

            {/* CPVC */}
            <div id="cpvc" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">CPVC Pipes — Hot &amp; Cold Water Plumbing Pipes</h3>
              <p className="text-gray-600 mb-4">
                Chlorinated PVC (CPVC) pipes handle <strong>hot water up to 93°C</strong> — the go-to
                choice for <strong>geyser connections, hot water supply, concealed plumbing</strong> in
                homes, hospitals, hotels, and commercial buildings. Also used as
                <strong> cold water pressure pipes</strong> where higher temperature resistance is needed.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>CPVC hot water pipes — geyser, boiler, and solar heater connections</li>
                <li>CPVC cold water pressure pipes (½" to 2")</li>
                <li>CPVC concealed plumbing — overhead and underground installations</li>
                <li>CPVC fittings: elbows, tees, valves, reducers, adapters, tank connectors</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Mark</div>
            </div>

            <hr className="border-gray-100" />

            {/* HDPE */}
            <div id="hdpe" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">HDPE Pipes — Agriculture, Irrigation &amp; Underground Water Pipes</h3>
              <p className="text-gray-600 mb-4">
                High-Density Polyethylene (HDPE) pipes are Pakistan's first choice for
                <strong> agriculture pipes, irrigation pipes, farm water supply, underground water lines,
                sewerage mains, and gas distribution</strong>. Flexible, UV-resistant, and with a 50+ year
                lifespan, HDPE pipes are perfect for farms, housing societies, and infrastructure projects.
                Available in PE-80 and PE-100 grades, SDR 11 to SDR 21.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>HDPE agriculture pipes — farm water conveyance and distribution</li>
                <li>HDPE irrigation pipes — drip irrigation and sprinkler systems</li>
                <li>HDPE coil pipes — flexible rolls for easy farm installation</li>
                <li>HDPE underground water pipes — water mains for housing schemes</li>
                <li>HDPE sewerage &amp; drainage pipes — municipal and industrial</li>
                <li>HDPE gas distribution pipes (yellow stripe marking)</li>
                <li>HDPE butt-weld and electrofusion fittings</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · National Pipe · Local Pipe · Speed</div>
            </div>

            <hr className="border-gray-100" />

            {/* PPRC */}
            <div id="pprc" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">PPRC Pipes — Safe Drinking Water &amp; Plumbing Pipes</h3>
              <p className="text-gray-600 mb-4">
                PPRC (Polypropylene Random Copolymer) pipes are the safest choice for
                <strong> drinking water, hot water plumbing, and food-grade applications</strong>.
                Heat-fused joints make them 100% leak-proof — no glue, no chemicals.
                Ideal for homes, hospitals, food factories, and hotels. Available in PN10, PN16, PN20
                pressure classes.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>PPRC drinking water pipes — food-grade, no chemical leaching</li>
                <li>PPRC hot water pipes — withstands up to 95°C</li>
                <li>PPRC underfloor heating pipes — radiant heating systems</li>
                <li>PPRC pressure pipes — PN10, PN16, PN20 classes</li>
                <li>PPRC fittings: elbows, tees, valves, ball valves, reducers, couplings</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Minhas · IIL · Steelex · Speed · Jeddah Polymer · Pak Arab</div>
            </div>

            <hr className="border-gray-100" />

            {/* Bore Casing */}
            <div id="bore-casing" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">Boring Pipes &amp; Bore Casing — Borehole &amp; Tube Well Pipes</h3>
              <p className="text-gray-600 mb-4">
                Looking for <strong>boring pipes in Karachi</strong>? Mufaddal Traders supplies
                heavy-duty PVC and HDPE <strong>bore casing pipes, tube well pipes, and borehole
                lining pipes</strong> from 4" to 16" diameter. Used for residential water wells,
                agricultural tube wells, and industrial borehole projects across Sindh, Punjab, and Balochistan.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>PVC boring pipes / bore casing pipes (4" to 16")</li>
                <li>HDPE bore casing pipes — heavy-duty for deep wells</li>
                <li>Slotted boring pipes — for water well filtration</li>
                <li>Plain casing pipes — for well lining and protection</li>
                <li>Submersible pump column pipes</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Prime · Local Pipe</div>
            </div>

            <hr className="border-gray-100" />

            {/* G.I */}
            <div id="gi" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">G.I Pipes — Galvanized Iron Steel Pipes for Gas &amp; Water</h3>
              <p className="text-gray-600 mb-4">
                Galvanized Iron (G.I) pipes are zinc-coated <strong>steel pipes used for water supply,
                gas distribution, structural support, scaffolding, and fire hydrant lines</strong>.
                The zinc coating provides corrosion resistance for outdoor and underground installations.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>G.I water supply pipes (½" to 6")</li>
                <li>G.I gas distribution pipes — natural gas and LPG</li>
                <li>G.I structural pipes — construction and scaffolding</li>
                <li>G.I fire hydrant and sprinkler system pipes</li>
                <li>Available in light, medium, and heavy gauge</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Steelex · International Industries Ltd (IIL)</div>
            </div>

            <hr className="border-gray-100" />

            {/* Cable Pipes */}
            <div id="cable-pipes" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">Cable Pipes &amp; Conduit Pipes — Telecom &amp; Electrical Duct</h3>
              <p className="text-gray-600 mb-4">
                uPVC <strong>cable conduit pipes</strong> protect underground electrical cables,
                fiber optic lines, and telecom ducts from moisture, soil pressure, and mechanical
                damage. Used by PTCL, internet service providers, power distribution companies,
                and housing scheme developers across Pakistan.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>uPVC telecom duct pipes — fiber optic and copper cable protection</li>
                <li>uPVC electrical conduit pipes — power cable routing</li>
                <li>Orange/grey cable duct pipes for easy identification</li>
                <li>Impact-resistant and moisture-proof</li>
                <li>Available in 1" to 6" diameter</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Jeddah Polymer</div>
            </div>

            <hr className="border-gray-100" />

            {/* Drainage */}
            <div id="drainage" className="scroll-mt-20">
              <h3 className="text-2xl font-bold text-primary mb-2">Drainage &amp; Sewerage Pipes — SWR &amp; Waste Water Pipes</h3>
              <p className="text-gray-600 mb-4">
                <strong>Drainage pipes and sewerage pipes</strong> for residential, commercial, and municipal
                waste water management. uPVC SWR (Soil, Waste, Rainwater) pipes and HDPE drainage pipes
                are chemical-resistant, non-corrosive, and built to last 50+ years underground.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                <li>uPVC SWR drainage pipes — soil, waste, and rainwater</li>
                <li>HDPE sewerage pipes — large diameter municipal mains</li>
                <li>Underground drainage pipes for housing societies</li>
                <li>Chemical-resistant pipes for industrial waste</li>
                <li>Available in 2" to 12" diameter</li>
              </ul>
              <div className="text-sm text-gray-500 italic">Brands: Pak Arab · Steelex · Speed</div>
            </div>

            </div>
          </div>
        </section>

        {/* ─── Brands We Stock ─────────────────────────────────── */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Top Pipe Brands Available at Mufaddal Traders Karachi</h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              Authorised stockist of Pakistan's leading pipe manufacturers — all brands, all sizes, wholesale rates:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center text-sm font-semibold text-gray-700">
              {[
                { brand: 'Pak Arab', cats: 'Water · Agriculture · Boring · Cable · Drainage' },
                { brand: 'Steelex', cats: 'Water · Hot Water · G.I · Cable · Pressure' },
                { brand: 'National Pipe', cats: 'Agriculture · Irrigation · Water Mains' },
                { brand: 'Jeddah Polymer', cats: 'Water · Plumbing · Cable Conduit' },
                { brand: 'Speed', cats: 'Water · Irrigation · Plumbing' },
                { brand: 'Mark', cats: 'Hot Water · Plumbing (CPVC)' },
                { brand: 'Minhas', cats: 'Drinking Water · Plumbing (PPRC)' },
                { brand: 'IIL', cats: 'Plumbing · G.I · Gas Pipes' },
                { brand: 'Prime', cats: 'Boring · Bore Casing' },
                { brand: 'Local Pipe', cats: 'Agriculture · Boring' },
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
            <h2 className="text-2xl font-bold text-center mb-8">Who Buys Pipes from Mufaddal Traders?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Contractors & Builders', desc: 'Water pipes, drainage pipes, and plumbing fittings for residential and commercial construction projects. DHA, Bahria Town, and private society developers.' },
                { title: 'Farmers & Agriculturists', desc: 'Agriculture pipes and irrigation pipes — HDPE coil pipes for drip irrigation, sprinkler systems, and farm water supply across Sindh, Punjab, and Balochistan.' },
                { title: 'Plumbers & Installers', desc: 'Complete range of water pipes, hot water pipes (CPVC/PPRC), fittings, valves, and tools for residential and commercial plumbing jobs.' },
                { title: 'Boring & Well Drillers', desc: 'Boring pipes and bore casing pipes for tube wells, boreholes, and submersible pump installations. 4" to 16" diameter available.' },
                { title: 'Telecom & Electrical Companies', desc: 'Cable conduit pipes and telecom duct pipes for underground fiber optic, electrical, and data cable protection installations.' },
                { title: 'Government & Municipal Bodies', desc: 'Large diameter sewerage pipes, water main pipes, and pressure pipes for municipal infrastructure, water supply schemes, and drainage projects.' },
                { title: 'Real Estate Developers', desc: 'Complete pipe supply for housing societies — water supply, drainage, gas, boring, and cable duct pipes for DHA, Bahria, and private developments.' },
                { title: 'Industrial Factories', desc: 'Pressure pipes, chemical-resistant pipes, G.I pipes, and industrial fittings for factories, warehouses, and manufacturing plants.' },
              ].map(a => (
                <div key={a.title} className="flex gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50">
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
              Frequently Asked Questions — Pipes in Karachi &amp; Pakistan
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Which pipe is best for agriculture and irrigation in Pakistan?',
                  a: 'HDPE pipes are the best agriculture and irrigation pipes in Pakistan. They are flexible, UV-resistant, and withstand high pressure — perfect for drip irrigation, sprinkler systems, and water conveyance on farms. Pak Arab and National Pipe HDPE pipes are available at Mufaddal Traders.',
                },
                {
                  q: 'Where can I buy boring pipes in Karachi?',
                  a: 'Mufaddal Traders at Gulbahar No. 2, Karachi supplies boring pipes (bore casing) from 4 to 16 inches in PVC and HDPE from Pak Arab, Prime, and Local Pipe. Call 0335-2906212 for rates and availability.',
                },
                {
                  q: 'What is the best pipe for water supply in Pakistani homes?',
                  a: 'For cold water supply, uPVC pipes are most popular. For hot and cold water both, CPVC or PPRC pipes are recommended. PPRC is food-grade and considered the safest for drinking water. All available at Mufaddal Traders at wholesale prices.',
                },
                {
                  q: 'Which pipes are used for cable and telecom conduit?',
                  a: 'uPVC conduit pipes are standard for underground cable and telecom duct installations. They protect electrical, fiber optic, and data cables from moisture and soil damage. Available at Mufaddal Traders in 1" to 6" sizes.',
                },
                {
                  q: 'What is the difference between uPVC and CPVC pipes?',
                  a: 'uPVC pipes handle cold water supply and drainage. CPVC pipes are chlorinated and handle hot water up to 93°C — used for geyser connections and indoor plumbing. Both available at Mufaddal Traders Karachi.',
                },
                {
                  q: 'Can I get pipes at wholesale price in Karachi?',
                  a: 'Yes! Mufaddal Traders offers the best wholesale rates on water pipes, agriculture pipes, boring pipes, cable pipes, and all fittings. Bulk discounts for contractors and builders. Call 0335-2906212 or WhatsApp for instant pricing.',
                },
                {
                  q: 'What is the price of water pipes in Karachi?',
                  a: 'Water pipe prices vary by type (uPVC, CPVC, PPRC, HDPE, G.I), size, and brand. Mufaddal Traders offers the most competitive wholesale rates in Karachi — call 0335-2906212 or WhatsApp for a free custom quote.',
                },
                {
                  q: 'Do you deliver pipes outside Karachi?',
                  a: 'Yes, Mufaddal Traders delivers to Hyderabad, Sukkur, Lahore, Rawalpindi, Islamabad, Faisalabad, Multan, Peshawar, Quetta and across Pakistan. Transport can be arranged for bulk orders.',
                },
                {
                  q: 'Where is Mufaddal Traders located?',
                  a: 'Our office and warehouse is at Gulbahar No. 2, Karachi, Pakistan. Easy access from SITE Area, Nazimabad, North Karachi, and all major Karachi zones. Open Monday to Saturday, 9 AM to 6 PM.',
                },
                {
                  q: 'Which HDPE pipe grades do you stock?',
                  a: 'We stock PE-80 and PE-100 grade HDPE pipes in SDR 11, SDR 13.6, SDR 17, and SDR 21 series from Pak Arab, National Pipe, and Local Pipe. Suitable for water supply, irrigation, gas, and sewerage applications.',
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
              Delivering Water Pipes, Agriculture Pipes &amp; Fittings Across Pakistan
            </h2>
            <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto mb-4">
              Mufaddal Traders is your one-stop shop for <strong>water pipes, agriculture pipes, irrigation pipes,
              boring pipes, cable pipes, pressure pipes, drainage pipes, hot water pipes, sewerage pipes,
              G.I pipes</strong> and all types of pipe fittings in Pakistan.
            </p>
            <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto mb-4">
              We deliver to <strong>Karachi</strong> (Gulbahar, SITE Area, Korangi, Landhi, North Karachi,
              Nazimabad, Orangi Town, Clifton, DHA, Bahria Town), <strong>Hyderabad</strong>, Sukkur,
              <strong> Lahore</strong>, Rawalpindi, <strong>Islamabad</strong>, Faisalabad, Multan,
              <strong> Peshawar</strong>, Quetta, Gwadar, and all cities across Sindh, Punjab, KPK, and Balochistan.
            </p>
            <p className="text-center text-xs text-gray-400 max-w-3xl mx-auto">
              Popular searches: pipes supplier Karachi, water pipe dealer Karachi, agriculture pipe shop,
              boring pipe supplier near me, cable pipe Karachi, irrigation pipe wholesale Pakistan,
              pressure pipe rates, HDPE pipe price list, uPVC pipe dealer Gulbahar, plumbing pipe wholesale,
              best pipe brands Pakistan, cheap pipes Karachi, pipe fitting supplier Sindh
            </p>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="bg-primary text-white py-14 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need Water Pipes, Agriculture Pipes or Boring Pipes? Get a Quote Now!</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Call or WhatsApp Mufaddal Traders for instant wholesale pricing on all pipe types.
            Fast dispatch from Karachi to anywhere in Pakistan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:03352906212" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition">
              <Phone className="h-5 w-5" /> 0335-2906212
            </a>
            <button
              onClick={() => window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank')}
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              WhatsApp Us Now
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
            ← View All Pipe Brands &amp; Product Catalogs
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SeoLanding;
