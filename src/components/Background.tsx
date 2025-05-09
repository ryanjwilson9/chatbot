export default function Background() {
  return (
    <>
      <div 
        aria-hidden="true"
        className="fixed inset-0 transition-opacity"
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 to-blue-900/30 z-[-2]" />
      </div>
      <div 
        aria-hidden="true"
        className="fixed inset-0 bg-gradient animate-gradient"
      />
      <div 
        aria-hidden="true"
        className="fixed inset-0 bg-noise opacity-20"
      />
    </>
  );
} 