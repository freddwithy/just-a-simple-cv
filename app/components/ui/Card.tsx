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
    <div className={`${className} bg-gradient-to-tl from-mystic-700 to-mystic-500 border border-mystic-700 h-auto w-full rounded-lg p-4`}>
        <span className="text-white font-bold text-xl">{title}</span>
        <p className="text-white text-pretty">{content}</p>
    </div>
  );
};

export default Card;
