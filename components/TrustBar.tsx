// Barra de prova social / E-E-A-T sob o hero (fundo verde escuro na maquete).
const stats = [
  { value: '+50 000', label: 'familles accompagnées' },
  { value: '8', label: 'assureurs comparés' },
  { value: '2 min', label: 'pour obtenir un devis' },
  { value: '4,8/5', label: 'satisfaction moyenne' },
];

export default function TrustBar() {
  return (
    <section className="bg-primary-dark text-white">
      <div className="container-content flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-2">
            <span className="font-display text-title font-bold">{s.value}</span>
            <span className="text-small text-primary-tint">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
