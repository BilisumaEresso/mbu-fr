function StatCard({ value, label }) {
  return (
    <div className="border border-outline-variant rounded-xl p-8 bg-surface text-center">
      <div className="font-headline-lg text-headline-lg text-primary mb-2">{value}</div>
      <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default StatCard
