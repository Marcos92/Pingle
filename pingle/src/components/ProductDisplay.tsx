export interface ProductDisplayProps {
  name: string;
  image: string;
}

export default function ProductDisplay({ name, image }: ProductDisplayProps) {
  return (
    <div className="product-display">
      <div className="product-image">
        {image && <img src={image} alt={name} />}
      </div>
      <div className="product-name">
        <h1>{name}</h1>
      </div>
    </div>
  );
}
