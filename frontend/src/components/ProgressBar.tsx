export default function ProgressBar({ progress } : {progress : number}) {
  const getStatusText = () => {
    if (progress === 0) return 'Not Started';
    if (progress < 30) return 'Starting';
    if (progress < 60) return 'In Progress';
    if (progress < 100) return 'Almost Done';
    return 'Completed';
  };

  const getStatusColor = () => {
    if (progress === 0) return '#999';
    if (progress < 30) return '#F59E0B';
    if (progress < 60) return '#3B82F6';
    if (progress < 100) return '#10B981';
    return '#10B981';
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-md">
      {/* Progress Bar Container */}
      <div className="flex-1">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm">
          {/* Animated Progress Fill */}
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: '#B6349A',
              boxShadow: '0 0 8px rgba(182, 52, 154, 0.4)'
            }}
          />
        </div>
      </div>

      {/* Status Section */}
      <div className="flex flex-col items-end gap-1 min-w-fit">
        <span className="text-lg font-bold text-gray-900">{progress}%</span>
        <span
          className="text-xs font-semibold"
          style={{ color: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}