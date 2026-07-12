import Image from "next/image";

const values = [
  { title: "Transparency", desc: "We show accurate, verified information for every listing so buyers can decide with confidence." },
  { title: "Trust", desc: "Every seller and listing goes through a review process to keep the marketplace safe for everyone." },
  { title: "Accessibility", desc: "Buying and selling a car should be simple, whether you're in Dhaka or a smaller district." },
];

const team = [
  { name: "Imran Kabir", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300" },
  { name: "Sadia Islam", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" },
  { name: "Tanvir Rahman", role: "Lead Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary-700 py-16 text-white">
        <div className="container-x">
          <h1 className="text-3xl font-extrabold sm:text-4xl">About AutoBazaar BD</h1>
          <p className="mt-3 max-w-2xl text-neutral-200">
            We are on a mission to make buying and selling cars in Bangladesh simple, transparent, and
            trustworthy for everyone involved.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Our Story</h2>
            <p className="mt-4 text-neutral-600">
              AutoBazaar BD started in 2022 with a simple observation: buying and selling used cars in
              Bangladesh often meant navigating unreliable listings and uncertain sellers. We built a
              platform that verifies every listing and gives buyers the information they need to make
              confident decisions.
            </p>
            <p className="mt-4 text-neutral-600">
              Today, thousands of buyers and sellers across the country trust AutoBazaar BD to connect them
              with the right car and the right deal, backed by a support team that genuinely cares about
              getting it right.
            </p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-card sm:h-96">
            <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900" alt="Our team at work" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="section-title text-center">What We Stand For</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <h3 className="font-bold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="section-title text-center">Meet the Team</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {team.map((t) => (
            <div key={t.name} className="card p-6 text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
                <Image src={t.img} alt={t.name} fill className="object-cover" />
              </div>
              <h3 className="mt-4 font-bold text-neutral-900">{t.name}</h3>
              <p className="text-sm text-neutral-500">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}