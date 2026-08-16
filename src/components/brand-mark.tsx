import Image from 'next/image';
import Link from 'next/link';

interface BrandMarkProps {
  size?: number;
  showText?: boolean;
  theme?: 'sand' | 'dark';
}

export function BrandMark({ size = 44, showText = true, theme = 'sand' }: BrandMarkProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      <div 
        className={`relative overflow-hidden rounded-xl p-1 shadow-sm transition-transform group-hover:scale-105 ${
          theme === 'dark' ? 'bg-zinc-800/80 ring-1 ring-amber-500/30' : 'bg-white ring-1 ring-amber-200/70'
        }`}
        style={{ width: size, height: size }}
      >
        <Image 
          src="/logo.png" 
          alt="Xenios Istanbul" 
          width={size} 
          height={size}
          className="object-contain w-full h-full rounded-lg"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif tracking-[0.2em] font-bold text-lg leading-tight ${
            theme === 'dark' ? 'text-amber-400' : 'text-zinc-900'
          }`}>
            XENIOS
          </span>
          <span className={`text-[10px] tracking-wider uppercase ${
            theme === 'dark' ? 'text-zinc-400' : 'text-amber-800/70'
          }`}>
            İstanbul Concierge
          </span>
        </div>
      )}
    </Link>
  );
}
