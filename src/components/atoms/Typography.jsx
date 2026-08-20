export function Title({ children, className = '' }) {
  return (
    <h1 className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ${className}`}>
      {children}
    </h1>
  );
}

export function Text({ children, className = '' }) {
  return <p className={`text-gray-400 ${className}`}>{children}</p>;
}
