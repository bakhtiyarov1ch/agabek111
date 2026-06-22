import { useState, useEffect, useRef } from 'react';
import { solveNeedlemanWunsch, AlignmentStep } from './utils/alignment';
import { ControlPanel } from './components/ControlPanel';
import { DPMatrix } from './components/DPMatrix';
import { FormulaDisplay } from './components/FormulaDisplay';
import { AlignmentResult } from './components/AlignmentResult';
import { Dna } from 'lucide-react';

function App() {
  const [seq1, setSeq1] = useState('AGACTG');
  const [seq2, setSeq2] = useState('GTACDF');
  const [matchScore, setMatchScore] = useState(1);
  const [mismatchPenalty, setMismatchPenalty] = useState(-1);
  const [gapPenalty, setGapPenalty] = useState(-1);

  const [steps, setSteps] = useState<AlignmentStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  const timerRef = useRef<number | null>(null);

  const calculateAllSteps = () => {
    const s = solveNeedlemanWunsch(seq1, seq2, matchScore, mismatchPenalty, gapPenalty);
    setSteps(s);
    return s;
  };

  const handleSolve = () => {
    setIsPlaying(false);
    const s = calculateAllSteps();
    setCurrentStepIndex(s.length - 1);
  };

  const handlePlay = () => {
    if (steps.length === 0 || currentStepIndex === steps.length - 1) {
      calculateAllSteps();
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (steps.length === 0) {
      calculateAllSteps();
      setCurrentStepIndex(1);
    } else if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const currentStep = steps[currentStepIndex] || { matrix: [], isComplete: false };

  return (
    <div className="min-h-screen bg-background text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex items-center gap-4 border-b border-border pb-4">
          <div className="bg-accent/10 p-3 rounded-lg">
            <Dna className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">DNA Sequence Alignment</h1>
            <p className="text-slate-400">Needleman-Wunsch Dynamic Programming Algorithm</p>
          </div>
        </header>

        <ControlPanel 
          seq1={seq1} setSeq1={setSeq1}
          seq2={seq2} setSeq2={setSeq2}
          matchScore={matchScore} setMatchScore={setMatchScore}
          mismatchPenalty={mismatchPenalty} setMismatchPenalty={setMismatchPenalty}
          gapPenalty={gapPenalty} setGapPenalty={setGapPenalty}
          onSolve={handleSolve}
          onStepPlay={handlePlay}
          onStepPause={handlePause}
          onStepNext={handleNext}
          onStepPrev={handlePrev}
          isPlaying={isPlaying}
          canNext={steps.length === 0 || currentStepIndex < steps.length - 1}
          canPrev={currentStepIndex > 0}
          speed={speed}
          setSpeed={setSpeed}
        />

        {steps.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-panel p-6 rounded-xl border border-border shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-white">DP Scoring Matrix</h2>
              <DPMatrix seq1={seq1} seq2={seq2} matrix={currentStep.matrix} />
            </div>
            
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-white">Calculation Step</h2>
              <FormulaDisplay step={currentStep} />
              <AlignmentResult step={currentStep} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
