import { Component, ReactNode } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { VoidProvider } from "./store/VoidStore";
import { PreferencesProvider } from "./store/PreferencesStore";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // DOM reconciliation errors (removeChild) are usually caused by browser extensions
    // modifying text nodes that React then tries to reconcile. Safe to recover.
    console.warn("[VoidMind] Recovered from render error:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Link Neural Interrompido</h1>
            <p className="text-gray-400 text-sm mb-6">
              Um conflito no sistema foi detectado. Seus dados estão seguros.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Reconectar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <PreferencesProvider>
      <VoidProvider>
        <div className="dark" translate="no">
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1a0a2e",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                color: "#fff",
              },
            }}
          />
        </div>
      </VoidProvider>
      </PreferencesProvider>
    </ErrorBoundary>
  );
}
