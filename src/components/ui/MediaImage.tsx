/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from '../../lib/styles';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Remote imagery rendered with the site's shared loading and hover treatment. */
export default function MediaImage({ src, alt, className }: MediaImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-full h-full object-cover', className)}
      referrerPolicy="no-referrer"
    />
  );
}
