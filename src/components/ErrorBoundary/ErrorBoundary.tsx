import React from "react";

interface Props extends React.PropsWithChildren {
  fallback?: React.ReactNode;
}

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  // Equivalent to:
  // const [hasError, setHasError] = useState(false);
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: unknown) {
    console.error(error);
    console.info({ errorInfo });
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
