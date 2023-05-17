import react, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    const errorMessage = {
      marginLeft: "30%",
    };
    if (this.state.hasError) {
      return <h1 style={errorMessage}>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
