import React from 'react';

interface ControlPanelProps {
  seq1: string;
  setSeq1: (val: string) => void;
  seq2: string;
  setSeq2: (val: string) => void;
  matchScore: number;
  setMatchScore: (val: number) => void;
  mismatchPenalty: number;
  setMismatchPenalty: (val: number) => void;
  gapPenalty: number;
  setGapPenalty: (val: number) => void;
  onSolve: () => void;
  onStepPlay: () => void;
  onStepPause: () => void;
  onStepNext: () => void;
  onStepPrev: () => void;
  isPlaying: boolean;
  canNext: boolean;
  canPrev: boolean;
  speed: number;
  setSpeed: (val: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  seq1, setSeq1, seq2, setSeq2,
  matchScore, setMatchScore, mismatchPenalty, setMismatchPenalty, gapPenalty, setGapPenalty,
  onSolve, onStepPlay, onStepPause, onStepNext, onStepPrev,
  isPlaying, canNext, canPrev, speed, setSpeed
}) => {
  return (
    <div className="bg-panel p-6 rounded-xl border border-border shadow-lg flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-400">Sequence 1 (Top)</label>
          <input 
            type="text" 
            value={seq1} 
            onChange={(e) => setSeq1(e.target.value.toUpperCase())}
            className="bg-background border border-border rounded p-2 text-white focus:outline-none focus:border-accent font-mono uppercase"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-400">Sequence 2 (Left)</label>
          <input 
            type="text" 
            value={seq2} 
            onChange={(e) => setSeq2(e.target.value.toUpperCase())}
            className="bg-background border border-border rounded p-2 text-white focus:outline-none focus:border-accent font-mono uppercase"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-400">Match Score</label>
          <input 
            type="number" 
            value={matchScore} 
            onChange={(e) => setMatchScore(Number(e.target.value))}
            className="bg-background border border-border rounded p-2 text-white focus:outline-none focus:border-accent font-mono"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-400">Mismatch Penalty</label>
          <input 
            type="number" 
            value={mismatchPenalty} 
            onChange={(e) => setMismatchPenalty(Number(e.target.value))}
            className="bg-background border border-border rounded p-2 text-white focus:outline-none focus:border-accent font-mono"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-400">Gap Penalty</label>
          <input 
            type="number" 
            value={gapPenalty} 
            onChange={(e) => setGapPenalty(Number(e.target.value))}
            className="bg-background border border-border rounded p-2 text-white focus:outline-none focus:border-accent font-mono"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border">
        <button 
          onClick={onSolve}
          className="bg-accent hover:bg-accent/80 text-background font-bold py-2 px-4 rounded transition-colors"
        >
          Solve Instantly
        </button>
        
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <button 
            onClick={onStepPrev} disabled={!canPrev}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            Prev
          </button>
          <button 
            onClick={isPlaying ? onStepPause : onStepPlay} disabled={!canNext && !isPlaying}
            className="p-2 bg-match/20 hover:bg-match/40 text-match disabled:opacity-50 disabled:cursor-not-allowed rounded font-semibold min-w-[80px]"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button 
            onClick={onStepNext} disabled={!canNext}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm font-semibold text-slate-400">Speed</label>
          <input 
            type="range" 
            min="100" 
            max="1000" 
            step="100" 
            value={1100 - speed} 
            onChange={(e) => setSpeed(1100 - Number(e.target.value))}
            className="accent-accent"
          />
        </div>
      </div>
    </div>
  );
};
