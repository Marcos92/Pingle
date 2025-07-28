export interface ProductDisplayProps {
  name: string;
  quantity: string;
  image: string;
  className?: string;
}

export default function ProductDisplay({
  name,
  quantity,
  image,
  className,
}: ProductDisplayProps) {
  return (
    <div className={`product-display ${className ?? ""}`}>
      <div className="product-image">
        {image && <img src={image} alt={name} />}
      </div>
      <div className="product-name">
        <h1>
          {name}
          {quantity && quantity.trim() !== "" && (
            <span style={{ whiteSpace: "nowrap" }}>{` (${quantity})`}</span>
          )}
        </h1>
      </div>
    </div>
  );
}
