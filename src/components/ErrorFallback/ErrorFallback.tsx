import { FallbackProps } from "react-error-boundary"
export function FullPageErrorFallback() {
  return (
    <div
      role="alert"
      className="h-screen text-red-600 bg-red-200 flex justify-center m-12"
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
    </div>
  );
}

export function ErrorMessage({error}: FallbackProps) {
  return (
    <div
      role="alert"
      className="h-screen text-red-600 bg-red-200 flex justify-center m-12"
    >
      <span>There was an error: </span>
      <pre>{error.name}: {error.message}</pre>
    </div>
  );
}
