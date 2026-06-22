import React from 'react';
import { AlignmentStep } from '../utils/alignment';

interface AlignmentResultProps {
  step: AlignmentStep;
}

export const AlignmentResult: React.FC<AlignmentResultProps> = ({ step }) => {
  if (!step.isComplete || !step.alignedSeq1 || !step.alignedSeq2) {
    return null;
  }

  const s1 = step.alignedSeq1;
  const s2 = step.alignedSeq2;

  const matches = s1.split('').map((char, idx) => {
    if (char === s2[idx]) return '|';
    if (char === '-' || s2[idx] === '-') return ' ';
    return ' ';
  });

  return (
    <div className="bg-panel p-6 rounded-xl border border-match/50 shadow-lg shadow-match/10 mt-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-match">Optimal Alignment</h3>
      <div className="font-mono text-2xl tracking-[0.5em] text-accent flex flex-col whitespace-nowrap">
        <div>{s1}</div>
        <div className="text-slate-500 text-lg">{matches.join('')}</div>
        <div className="text-match">{s2}</div>
      </div>
    </div>
  );
};
