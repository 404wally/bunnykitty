'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import { Marquee } from '@/components/sections/Marquee';

// Press mentions (mock data)
const pressMentions = [
  { name: 'Hypebeast', quote: 'Fresh character art meets streetwear culture' },
  { name: 'Complex', quote: 'The next wave of collectible art' },
  { name: 'High Snobiety', quote: 'Pop art with serious personality' },
];

// Values
const values = [
  {
    title: 'Original Always',
    description: 'Every design is hand-crafted with love. No shortcuts, no copycats.',
    icon: '✨',
    color: 'bg-pop-pink',
  },
  {
    title: 'Community First',
    description: "You're not just buying art — you're joining a family.",
    icon: '🤝',
    color: 'bg-pop-blue',
  },
  {
    title: 'Quality Matters',
    description: 'Premium materials, careful production, lasting pieces.',
    icon: '💎',
    color: 'bg-pop-green',
  },
  {
    title: 'Joy & Play',
    description: "Art should make you smile. That's the whole point.",
    icon: '🎉',
    color: 'bg-pop-yellow',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-pop-yellow pt-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #1A1A1A 2px, transparent 2px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SpeechBubble variant="pink" className="inline-block mb-6">
                  <span className="text-lg">Hey, nice to meet you!</span>
                </SpeechBubble>
              </motion.div>

              <motion.h1
                className="font-display text-5xl sm:text-7xl text-black mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                ABOUT THE
                <br />
                <span className="text-pop-red">ARTIST</span>
              </motion.h1>

              <motion.p
                className="text-xl text-black/80 font-semibold max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Creating characters that bring joy, one design at a time.
              </motion.p>
            </div>

            {/* Artist Portrait - Dave Persue */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto">
                {/* Neon glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-pop-blue via-pop-purple to-pop-pink rounded-2xl blur-xl opacity-60 animate-pulse" />

                <motion.div
                  className="
                    relative w-full h-full
                    border-6 sm:border-8 border-black
                    rounded-2xl
                    shadow-[8px_8px_0px_#1A1A1A] sm:shadow-[12px_12px_0px_#1A1A1A]
                    overflow-hidden
                  "
                  whileHover={{ y: -5, boxShadow: '16px 16px 0px #1A1A1A' }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/dave-persue-artist.jpg"
                    alt="Dave Persue - BunnyKitty Creator - surrounded by neon art at Wet Paint Shanghai"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 320px, 384px"
                    priority
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-pop-pink border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#1A1A1A] rotate-3"
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="font-bold text-black text-sm">PERSUE</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2">
              <h2 className="font-display text-4xl text-black mb-6">
                MEET DAVE PERSUE
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Emerging from San Diego's underground graffiti scene, <strong>Dave Persue</strong> (pronounced "per-SWAY")
                  has had a journey filled with twists and turns throughout his creative career. What started
                  on city walls evolved into a universe of characters that have captured hearts worldwide.
                </p>
                <p>
                  BunnyKitty was born from a simple idea: create a world that feels like <em>"Sesame Street
                  with a more genuine street aesthetic."</em> Inspired by Jim Henson's world-building and
                  female graffiti artists, Persue crafted a magical feline hero in search of her family
                  across a mystical, surreal cityscape.
                </p>
                <p>
                  Knowing the key to a successful character is the lore, he worked with his mother to write
                  the first BunnyKitty book. Today, the universe spans <strong>28 unique characters</strong> —
                  "someone for everyone to relate to" — each personally inspired by friends, family, and
                  even adversaries from his own life.
                </p>
                <p>
                  From limited-edition vinyl collectibles with Superplastic and 3DRetro, to neon installations
                  in Shanghai, to children's books that parents and kids love equally — BunnyKitty has become
                  a symbol of hope, persistence, and pure creative joy.
                </p>
              </div>
            </div>

            <div>
              <Card variant="colored" color="yellow" className="p-6 sticky top-24">
                <h3 className="font-display text-xl text-black mb-4">QUICK FACTS</h3>
                <ul className="space-y-3 text-black">
                  <li className="flex items-start gap-2">
                    <span>📍</span>
                    <span>San Diego origins, California</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🎨</span>
                    <span>Graffiti artist turned character creator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📚</span>
                    <span>Author: BunnyKitty book series</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🎭</span>
                    <span>28 characters in the universe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🌏</span>
                    <span>Exhibited worldwide: Shanghai, Amsterdam & more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🤝</span>
                    <span>Collabs: Superplastic, 3DRetro, Museum of Graffiti</span>
                  </li>
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee
        items={['CREATE', '★', 'INSPIRE', '★', 'SPREAD JOY', '★', 'REPEAT', '★']}
        variant="default"
      />

      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-5xl text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            WHAT WE <span className="text-pop-pink">BELIEVE</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${value.color} h-full p-6`}>
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="font-display text-xl text-black mb-2">
                    {value.title}
                  </h3>
                  <p className="text-black/80">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="py-24 bg-pop-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-5xl text-black text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE PROCESS
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sketch', desc: 'Ideas flow onto paper first', icon: '✏️' },
              { step: '02', title: 'Refine', desc: 'Digital magic brings it to life', icon: '💻' },
              { step: '03', title: 'Color', desc: 'Bold palettes that pop', icon: '🎨' },
              { step: '04', title: 'Launch', desc: 'Share with the world', icon: '🚀' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="
                  w-20 h-20 mx-auto mb-4
                  bg-white border-4 border-black
                  rounded-full
                  flex items-center justify-center
                  text-4xl
                  shadow-[4px_4px_0px_#1A1A1A]
                ">
                  {item.icon}
                </div>
                <span className="font-display text-pop-red text-lg">{item.step}</span>
                <h3 className="font-display text-2xl text-black mb-2">{item.title}</h3>
                <p className="text-black/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-4xl text-black text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            AS SEEN IN
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {pressMentions.map((mention, index) => (
              <motion.div
                key={mention.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full">
                  <h3 className="font-display text-2xl text-black mb-4">{mention.name}</h3>
                  <p className="text-gray-600 italic">"{mention.quote}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-pop-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl text-black mb-6">
              LET'S CONNECT
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Got a question, collab idea, or just want to say hi?
              I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:hello@bunnykitty.com"
                className="
                  inline-block
                  px-8 py-4
                  bg-black text-white
                  font-bold text-lg uppercase
                  border-4 border-black
                  shadow-[6px_6px_0px_#FFE135]
                "
                whileHover={{ y: -3, boxShadow: '8px 8px 0px #FFE135' }}
                whileTap={{ y: 1 }}
              >
                Email Me
              </motion.a>
              <motion.a
                href="https://instagram.com/bunnykittyofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block
                  px-8 py-4
                  bg-white text-black
                  font-bold text-lg uppercase
                  border-4 border-black
                  shadow-[6px_6px_0px_#1A1A1A]
                "
                whileHover={{ y: -3, boxShadow: '8px 8px 0px #1A1A1A' }}
                whileTap={{ y: 1 }}
              >
                Follow on IG
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
