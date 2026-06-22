import React from 'react';
import { Cell } from '../utils/alignment';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DPMatrixProps {
  seq1: string;
  seq2: string;
  matrix: Cell[][];
}

export const DPMatrix: React.FC<DPMatrixProps> = ({ seq1, seq2, matrix }) => {

  if (matrix.length === 0) return null;

  return (
    <div className="overflow-auto max-w-full pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      <table className="border-collapse mx-auto">
        <thead>
          <tr>
            <th className="p-2 min-w-[50px]"></th>
            <th className="p-2 min-w-[50px] font-mono text-slate-400">-</th>
            {seq1.split('').map((char, i) => (
              <th key={i} className="p-2 min-w-[50px] font-mono text-accent text-xl">{char}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix[0].map((_, j) => (
            <tr key={j}>
              <th className="p-2 font-mono text-left w-10">
                {j === 0 ? <span className="text-slate-400">-</span> : <span className="text-match text-xl">{seq2[j - 1]}</span>}
              </th>
              {matrix.map((col, i) => {
                const cell = col[j];
                const isCalculated = cell.pointers.length > 0 || (i === 0 && j === 0);
                
                return (
                  <td 
                    key={`${i}-${j}`}
                    className={twMerge(
                      clsx(
                        "border border-border p-3 text-center relative font-mono text-lg transition-all duration-300",
                        cell.isCalculating ? "bg-accent/20 border-accent scale-110 z-10 font-bold" : "bg-panel/50 hover:bg-slate-800",
                        cell.isPath ? "bg-match/20 border-match" : "",
                        !isCalculated ? "opacity-30" : "opacity-100"
                      )
                    )}
                  >
                    {isCalculated ? cell.score : ''}
                    {isCalculated && cell.pointers.includes('diag') && (
                      <span className="absolute top-0 left-1 text-[10px] text-slate-500">↖</span>
                    )}
                    {isCalculated && cell.pointers.includes('up') && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">↑</span>
                    )}
                    {isCalculated && cell.pointers.includes('left') && (
                      <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] text-slate-500">←</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
