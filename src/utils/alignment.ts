export type Direction = 'up' | 'left' | 'diag' | 'none';

export interface Cell {
  score: number;
  pointers: Direction[];
  value: number; // For visualization during animation
  isCalculating?: boolean; // True if this cell is currently being calculated
  isPath?: boolean; // True if this cell is part of the final optimal path
}

export interface AlignmentStep {
  matrix: Cell[][];
  currentCell?: { i: number; j: number };
  formula?: {
    match: number;
    up: number;
    left: number;
    diag: number;
    max: number;
    chosen: Direction[];
  };
  isComplete: boolean;
  alignedSeq1?: string;
  alignedSeq2?: string;
  optimalPath?: { i: number; j: number }[];
}

export const solveNeedlemanWunsch = (
  seq1: string,
  seq2: string,
  matchScore: number,
  mismatchPenalty: number,
  gapPenalty: number
): AlignmentStep[] => {
  const m = seq1.length;
  const n = seq2.length;
  const steps: AlignmentStep[] = [];

  // Initialize Matrix
  const matrix: Cell[][] = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => ({
      score: 0,
      pointers: [],
      value: 0,
    }))
  );

  // Initialize first row and column
  for (let i = 0; i <= m; i++) {
    matrix[i][0].score = i * gapPenalty;
    if (i > 0) matrix[i][0].pointers = ['up'];
    else matrix[i][0].pointers = ['none'];
    matrix[i][0].value = matrix[i][0].score;
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j].score = j * gapPenalty;
    if (j > 0) matrix[0][j].pointers = ['left'];
    else matrix[0][j].pointers = ['none'];
    matrix[0][j].value = matrix[0][j].score;
  }

  // Push initial state
  steps.push({
    matrix: JSON.parse(JSON.stringify(matrix)),
    isComplete: false,
  });

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const isMatch = seq1[i - 1] === seq2[j - 1];
      const matchVal = isMatch ? matchScore : mismatchPenalty;

      const diag = matrix[i - 1][j - 1].score + matchVal;
      const up = matrix[i - 1][j].score + gapPenalty;
      const left = matrix[i][j - 1].score + gapPenalty;

      const maxScore = Math.max(diag, up, left);
      const pointers: Direction[] = [];

      if (maxScore === diag) pointers.push('diag');
      if (maxScore === up) pointers.push('up');
      if (maxScore === left) pointers.push('left');

      matrix[i][j] = {
        score: maxScore,
        pointers,
        value: maxScore,
        isCalculating: true,
      };

      steps.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        currentCell: { i, j },
        formula: {
          match: matchVal,
          diag,
          up,
          left,
          max: maxScore,
          chosen: pointers,
        },
        isComplete: false,
      });

      matrix[i][j].isCalculating = false;
    }
  }

  // Traceback
  let i = m;
  let j = n;
  let aligned1 = '';
  let aligned2 = '';
  const optimalPath: { i: number; j: number }[] = [];

  while (i > 0 || j > 0) {
    optimalPath.push({ i, j });
    matrix[i][j].isPath = true;

    const pointers = matrix[i][j].pointers;
    // For simplicity, take the first optimal pointer
    const dir = pointers[0];

    if (dir === 'diag') {
      aligned1 = seq1[i - 1] + aligned1;
      aligned2 = seq2[j - 1] + aligned2;
      i--;
      j--;
    } else if (dir === 'up') {
      aligned1 = seq1[i - 1] + aligned1;
      aligned2 = '-' + aligned2;
      i--;
    } else if (dir === 'left') {
      aligned1 = '-' + aligned1;
      aligned2 = seq2[j - 1] + aligned2;
      j--;
    } else {
      break;
    }
  }
  
  if(i===0 && j===0) {
     optimalPath.push({i: 0, j: 0});
     matrix[0][0].isPath = true;
  }

  // Final step
  steps.push({
    matrix: JSON.parse(JSON.stringify(matrix)),
    isComplete: true,
    alignedSeq1: aligned1,
    alignedSeq2: aligned2,
    optimalPath,
  });

  return steps;
};
