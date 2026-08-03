/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Staggered fade-and-rise used by the card grids as they scroll into view. */
export function revealOnScroll(index: number, distance = 40) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: index * 0.1 },
  } as const;
}
