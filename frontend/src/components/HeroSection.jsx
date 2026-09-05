import { StageSeed, StageSprout, StagePlant, StageFlower } from './Illustrations';

export default function HeroSection({ totalCompletions = 0 }) {
  // Determine current active growth stage
  let activeStage = 0;
  if (totalCompletions >= 30) activeStage = 3;
  else if (totalCompletions >= 10) activeStage = 2;
  else if (totalCompletions >= 1) activeStage = 1;

  const stages = [
    { name: 'Seed', icon: <StageSeed />, min: 0 },
    { name: 'Sprout', icon: <StageSprout />, min: 1 },
    { name: 'Growing', icon: <StagePlant />, min: 10 },
    { name: 'Bloom', icon: <StageFlower />, min: 30 },
  ];

  return (
    <section className="hero-card-container">
      <div className="hero-text-group">
        <span className="hero-tag">DAILY PROGRESSION</span>
        <h1 className="hero-title">Build better habits, one day at a time.</h1>
        <p className="hero-subtitle">
          Stay consistent and watch your little garden grow with every completed day.
        </p>
      </div>

      <div className="hero-progression-card">
        <div className="progression-stages-row">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStage;
            const isUnlocked = idx <= activeStage;

            return (
              <div
                key={stage.name}
                className={`progression-stage-item ${isActive ? 'active' : ''} ${
                  isUnlocked ? 'unlocked' : 'locked'
                }`}
              >
                <div className="stage-icon-frame">
                  {stage.icon}
                  {isActive && <span className="stage-active-dot" />}
                </div>
                <span className="stage-label">{stage.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
