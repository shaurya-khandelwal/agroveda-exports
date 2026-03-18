interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div className={`${isCenter ? 'text-center' : 'text-left'} mb-14`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
          <span className="inline-block h-px w-8 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
          <p className={`text-gold-600 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-semibold ${light ? 'text-gold-300' : 'text-gold-600'}`}>
            {eyebrow}
          </p>
          <span className="inline-block h-px w-8 bg-gradient-to-l from-gold-500 to-gold-300 rounded-full" />
        </div>
      )}

      <h2 className={`font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight ${light ? 'text-white' : 'text-forest-900'}`}>
        {title}
      </h2>

      {/* Animated underline accent */}
      <div className={`mt-5 flex ${isCenter ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-2">
          <span className="animate-draw-line inline-block h-[3px] w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-300" />
          <span className="animate-draw-line inline-block h-[3px] w-4 rounded-full bg-gold-400/50" style={{ animationDelay: '0.1s' }} />
          <span className="animate-draw-line inline-block h-[3px] w-2 rounded-full bg-gold-400/25" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-forest-900/65'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
