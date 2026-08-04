/**
 * ErrorBoundary.tsx — React class component that catches unhandled render errors.
 *
 * Logs the error to console in structured JSON format (visible in browser devtools
 * and any forwarded console capture). Shows a minimal fallback UI instead of a
 * blank/white screen.
 */

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback — defaults to the built-in recovery screen. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError(): State {
    const errorId = `eb-${Date.now().toString(36)}`;
    return { hasError: true, errorId };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Structured log — consistent shape so log scanners can query by type.
    console.error(
      JSON.stringify({
        level: "error",
        type: "react_error_boundary",
        errorId: this.state.errorId,
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: info.componentStack,
        time: new Date().toISOString(),
      }),
    );
  }

  handleReset = () => {
    this.setState({ hasError: false, errorId: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-destructive font-medium">Something went wrong.</p>
          <p className="text-sm text-muted-foreground">
            Error ID: <code className="font-mono">{this.state.errorId}</code>
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
