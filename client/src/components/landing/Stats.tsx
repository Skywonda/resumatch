export default function Stats() {
  const stats = [
    { number: "95%", label: "Success Rate" },
    { number: "50K+", label: "Resumes Created" },
    { number: "85%", label: "Interview Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
