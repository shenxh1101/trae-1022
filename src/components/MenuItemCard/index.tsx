import { Plus, Check, Users } from 'lucide-react';
import { MenuItem } from '@/types';
import { getSpicinessIcons, getSpicinessText } from '@/utils/format';

interface MenuItemCardProps {
  item: MenuItem;
  selected?: boolean;
  onSelect?: (id: string) => void;
  showSelect?: boolean;
}

export default function MenuItemCard({
  item,
  selected = false,
  onSelect,
  showSelect = false
}: MenuItemCardProps) {
  const handleClick = () => {
    if (showSelect) {
      onSelect?.(item.id);
    }
  };

  return (
    <div
      className={`card group cursor-pointer animate-fade-in ${
        selected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative shrink-0 w-28 h-28 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Spiciness Badge */}
          {item.spiciness > 0 && (
            <div className="absolute top-2 right-2 glass px-2 py-0.5 rounded-lg">
              <span className="text-xs" title={getSpicinessText(item.spiciness)}>
                {getSpicinessIcons(item.spiciness)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Name & Select Button */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold text-brown-500 line-clamp-1 group-hover:text-primary-600 transition-colors">
                {item.name}
              </h4>
              {showSelect && (
                <button
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selected
                      ? 'bg-primary-500 text-white shadow-glow'
                      : 'bg-cream-100 text-brown-300 group-hover:bg-primary-100 group-hover:text-primary-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(item.id);
                  }}
                >
                  {selected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-brown-400 line-clamp-2 mb-2">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="tag text-xs py-0.5 px-2 bg-cream-100 text-brown-400">
                {item.taste}
              </span>
              <span className="tag text-xs py-0.5 px-2 bg-cream-100 text-brown-400 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {item.suitableFor}人份
              </span>
              {item.tags.slice(0, 1).map((tag) => (
                <span key={tag} className="tag text-xs py-0.5 px-2 bg-primary-50 text-primary-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary-600">
              ¥{item.price}
            </span>
            <span className="text-xs text-brown-300">/份</span>
          </div>
        </div>
      </div>
    </div>
  );
}
