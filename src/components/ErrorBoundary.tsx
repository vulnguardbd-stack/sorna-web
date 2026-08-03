/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { getErrorMessage, reportError } from '../lib/errors';

interface Props {
  children: React.ReactNode;
  /** Label used in logs and in the fallback UI. */
  name?: string;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error: error instanceof Error ? error : new Error(getErrorMessage(error)) };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    reportError(this.props.name ?? 'ErrorBoundary', error);
    console.error(info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div
        role="alert"
        className="px-10 py-24 flex flex-col items-center text-center gap-6 bg-[#080808] text-[#f4f4f4]"
      >
        <h2 className="font-serif text-3xl italic">Something went wrong</h2>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 max-w-md leading-relaxed break-words">
          {error.message}
        </p>
        <button
          onClick={this.reset}
          className="px-10 py-3 border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-[#080808] transition-all"
        >
          Try again
        </button>
      </div>
    );
  }
}
