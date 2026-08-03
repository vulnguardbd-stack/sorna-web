/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from '../../lib/styles';

interface WordmarkProps {
  className?: string;
  surnameClassName?: string;
}

export default function Wordmark({ className, surnameClassName }: WordmarkProps) {
  return (
    <div className={cn('font-light tracking-tighter leading-none', className)}>
      SARNA <span className={cn('font-serif italic text-white/90', surnameClassName)}>Chowdhury</span>
    </div>
  );
}
