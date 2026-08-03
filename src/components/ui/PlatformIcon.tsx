/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Send } from 'lucide-react';
import { type Post } from '../../types';

interface PlatformIconProps {
  platform: Post['platform'];
  size?: number;
}

export default function PlatformIcon({ platform, size = 10 }: PlatformIconProps) {
  switch (platform) {
    case 'instagram':
      return <Instagram size={size} />;
    case 'facebook':
      return <Facebook size={size} />;
    case 'tiktok':
      return <Send size={size} className="rotate-[-45deg]" />;
  }
}
