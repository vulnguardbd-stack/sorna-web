/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn, EYEBROW } from '../../lib/styles';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent: string;
  className?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
}

/** Eyebrow label above a two-line display heading with a serif accent word. */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  className,
  titleClassName,
  eyebrowClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className={cn(EYEBROW, 'mb-4', eyebrowClassName)}>{eyebrow}</span>
      <h2 className={cn('font-light tracking-tighter', titleClassName)}>
        {title} <br />
        <span className="font-serif italic text-white/90">{accent}</span>
      </h2>
    </div>
  );
}
