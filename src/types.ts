/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Post {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok';
  type: 'photo' | 'video' | 'text';
  thumbnailUrl: string;
  url: string;
  caption: string;
  date: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  platform: 'youtube' | 'vimeo' | 'tiktok' | 'manual';
}
