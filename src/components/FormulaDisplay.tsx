import React from 'react';
import { AlignmentStep } from '../utils/alignment';

interface FormulaDisplayProps {
  step: AlignmentStep;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ step }) => {
  if (!step.formula || !step.currentCell) {
    return (
      <div className="bg-panel p-6 rounded-xl border border-border flex items-center justify-center min-h-[120px] text-slate-400">
        {step.isComplete ? "Alignment Complete" : "Matrix Initialized. Ready to calculate."}
      </div>
    );
  }

  const { i, j } = step.currentCell;
  const { match, diag, up, left, max, chosen } = step.formula;

  return (
    <div className="bg-panel p-6 rounded-xl border border-border shadow-lg font-mono flex flex-col justify-center min-h-[120px]">
      <div className="text-sm text-slate-400 mb-2">Calculating Cell ({i}, {j})</div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg">
        <div className="flex flex-col gap-1">
          <div className={`px-2 py-1 rounded ${chosen.includes('diag') ? 'bg-accent/20 text-accent border border-accent' : 'text-slate-300'}`}>
            Diag + Match: {diag - match} + ({match}) = <span className="font-bold">{diag}</span>
          </div>
          <div className={`px-2 py-1 rounded ${chosen.includes('left') ? 'bg-accent/20 text-accent border border-accent' : 'text-slate-300'}`}>
            Left + Gap: {left - (left - step.matrix[i-1][j].score)} + Gap = <span className="font-bold">{left}</span>
          </div>
          <div className={`px-2 py-1 rounded ${chosen.includes('up') ? 'bg-accent/20 text-accent border border-accent' : 'text-slate-300'}`}>
            Up + Gap: {up - (up - step.matrix[i][j-1].score)} + Gap = <span className="font-bold">{up}</span>
          </div>
        </div>
        <div className="hidden md:block text-3xl text-slate-600">→</div>
        <div className="text-2xl font-bold bg-background p-4 rounded-lg border border-border flex flex-col items-center">
          <span className="text-sm font-normal text-slate-400">Max Score</span>
          <span className="text-accent">{max}</span>
        </div>
      </div>
    </div>
  );
};
