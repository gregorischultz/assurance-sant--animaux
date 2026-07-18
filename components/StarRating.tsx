// Nota em estrelas (visual + acessível).
export default function StarRating({
  rating,
  showValue = true,
  className = '',
}: {
  rating: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`Note ${rating} sur 5`}>
      {showValue && <span className="font-display font-semibold text-ink text-small">{rating.toFixed(1)}</span>}
      <span className="text-star" aria-hidden="true">
        ★
      </span>
    </span>
  );
}
