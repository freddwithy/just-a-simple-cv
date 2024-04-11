interface CardSpotlightProps {
    title: string
    content: string
    className?: string
}

const Card: React.FC<CardSpotlightProps> = ({
    title,
    content,
    className
}) => {
  return (
    <div className={`${className} bg-mystic-300 border-mystic-700 border h-auto w-full rounded-lg p-4`}>
        <span className="text-mystic-950 font-bold text-xl">{title}</span>
        <p className="text-mystic-950 text-pretty">{content}</p>
    </div>
  );
};

export default Card;
