export interface ProductDisplayProps {
  name: string;
  image: string;
  className?: string;
}

export default function ProductDisplay({ name, image, className }: ProductDisplayProps) {
  return (
    <div className={`product-display ${className ?? ""}`}>
      <div className="product-image">
        {image && <img src={image} alt={name} />}
      </div>
      <div className="product-name">
        <h1>{name}</h1>
      </div>
    </div>
  );
}
