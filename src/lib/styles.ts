/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const EYEBROW = 'block text-[10px] uppercase tracking-[0.5em] text-white/30 font-semibold';

export const LABEL = 'text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold';

export const OUTLINE_BUTTON =
  'border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-[#080808] transition-all';

export const UNDERLINE_BUTTON =
  'text-[11px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 hover:border-white transition-all';

export const FIELD_WRAPPER =
  'border-b border-white/10 pb-4 group focus-within:border-white transition-colors';

export const FIELD_INPUT =
  'bg-transparent w-full outline-none text-sm font-light placeholder:text-white/10 uppercase tracking-widest';

export const HAIRLINE = 'h-px bg-white/5';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
