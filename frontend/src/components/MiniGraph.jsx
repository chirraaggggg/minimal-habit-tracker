import { useMemo, useRef, useState } from 'react';
import { get365DayCalendarGrid } from '../utils/dates';

const CELL_SIZE = 11;
const GAP_SIZE = 3.2;
const MONTH_HEIGHT = 20;
const DAY_LABEL_WIDTH = 26;

// Per-habit color palettes — 6 distinct scales cycling by habit index.
// Index 0 = empty cell, 1–4 = increasing intensity.
const PALETTE = [
  // 0 · Blue (default GitHub style)
  ['var(--cell-empty)', '#1D3557', '#1E40AF', '#2563EB', '#60A5FA'],
  // 1 · Emerald green
  ['var(--cell-empty)', '#14532D', '#166534', '#16A34A', '#4ADE80'],
  // 2 · Violet / purple
  ['var(--cell-empty)', '#3B0764', '#6D28D9', '#8B5CF6', '#C4B5FD'],
  // 3 · Amber / orange
  ['var(--cell-empty)', '#78350F', '#B45309', '#F59E0B', '#FCD34D'],
  // 4 · Rose / pink
  ['var(--cell-empty)', '#881337', '#BE185D', '#EC4899', '#F9A8D4'],
  // 5 · Cyan / teal
  ['var(--cell-empty)', '#164E63', '#0E7490', '#06B6D4', '#67E8F9'],
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MiniGraph({
  completions = [],
  habitId = null,
  onToggleCell = null,
  pendingDates = new Set(),
  isFullView = true,
  colorIndex = 0,
}) {
  const COLOR_SCALE = PALETTE[colorIndex % PALETTE.length];
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const completedSet = useMemo(() => new Set(completions), [completions]);
  const { weeks: allWeeks, monthLabels: allMonthLabels } = useMemo(() => get365DayCalendarGrid(), []);

  // Filter weeks for compact vs full 52-week view
  const displayWeeks = useMemo(() => {
    if (isFullView) return allWeeks;
    return allWeeks.slice(-18);
  }, [allWeeks, isFullView]);

  const displayMonthLabels = useMemo(() => {
    if (isFullView) return allMonthLabels;
    const startIndex = allWeeks.length - 18;
    return allMonthLabels
      .filter((m) => m.colIndex >= startIndex)
      .map((m) => ({ ...m, colIndex: m.colIndex - startIndex }));
  }, [allMonthLabels, allWeeks, isFullView]);

  const graphW = DAY_LABEL_WIDTH + displayWeeks.length * (CELL_SIZE + GAP_SIZE);
  const graphH = MONTH_HEIGHT + 7 * (CELL_SIZE + GAP_SIZE);

  const handleMouseEnter = (e, cell) => {
    if (!containerRef.current || !cell || cell.isBlank) return;
    const dateStr = cell.date;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellRect = e.target.getBoundingClientRect();

    const rawX = cellRect.left - containerRect.left + cellRect.width / 2;
    const rawY = cellRect.top - containerRect.top;

    const containerW = containerRect.width;
    // Clamp tooltip X inside 65px bounds from container edges
    const clampedX = Math.max(65, Math.min(rawX, containerW - 65));
    const flipBelow = rawY < 35;
    const clampedY = flipBelow ? rawY + cellRect.height + 8 : rawY - 8;

    const isDone = completedSet.has(dateStr);
    let statusText = isDone ? 'Completed ✓' : 'No activity';
    if (cell.isFuture) statusText = 'Future date';

    setTooltip({
      x: clampedX,
      y: clampedY,
      flipBelow,
      dateStr,
      statusText,
      done: isDone,
      isFuture: cell.isFuture,
    });
  };

  return (
    <div
      className="github-heatmap-container"
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="heatmap-scroll-area">
        <svg
          viewBox={`0 0 ${graphW} ${graphH}`}
          width="100%"
          height="auto"
          preserveAspectRatio="none"
          aria-label="GitHub-style contribution heatmap grid"
          role="img"
          className="heatmap-svg-edge-to-edge"
        >
          {/* Day of week labels on left (Mon, Wed, Fri) */}
          {DAY_LABELS.map((day, idx) => {
            if (idx % 2 === 0) return null;
            return (
              <text
                key={day}
                x={DAY_LABEL_WIDTH - 5}
                y={MONTH_HEIGHT + idx * (CELL_SIZE + GAP_SIZE) + 9}
                className="heatmap-day-label"
                textAnchor="end"
              >
                {day}
              </text>
            );
          })}

          {/* Month labels along top */}
          {displayMonthLabels.map(({ colIndex, label }) => (
            <text
              key={`m-${colIndex}-${label}`}
              x={DAY_LABEL_WIDTH + colIndex * (CELL_SIZE + GAP_SIZE)}
              y={13}
              className="heatmap-month-label"
            >
              {label}
            </text>
          ))}

          {/* Grid columns */}
          {displayWeeks.map((week, colIdx) => {
            const colX = DAY_LABEL_WIDTH + colIdx * (CELL_SIZE + GAP_SIZE);
            return (
              <g key={`col-${colIdx}`} transform={`translate(${colX}, 0)`}>
                {week.map((cell, rowIdx) => {
                  const cellY = MONTH_HEIGHT + rowIdx * (CELL_SIZE + GAP_SIZE);
                  if (cell.isBlank) {
                    return (
                      <rect
                        key={`b-${colIdx}-${rowIdx}`}
                        x={0} y={cellY}
                        width={CELL_SIZE} height={CELL_SIZE}
                        rx={2} ry={2}
                        fill="none"
                      />
                    );
                  }

                  const dateStr = cell.date;
                  const isFuture = cell.isFuture;
                  const isCompleted = !isFuture && completedSet.has(dateStr);
                  const isPending = pendingDates?.has(`${dateStr}-${habitId}`);

                  let fill = COLOR_SCALE[0];
                  let stroke = 'var(--cell-empty-border)';

                  if (isCompleted) {
                    fill = COLOR_SCALE[4];
                    stroke = COLOR_SCALE[4];
                  } else if (isFuture) {
                    fill = 'var(--bg-subtle)';
                    stroke = 'transparent';
                  }

                  return (
                    <rect
                      key={dateStr}
                      x={0} y={cellY}
                      width={CELL_SIZE} height={CELL_SIZE}
                      rx={2} ry={2}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="0.8"
                      onMouseEnter={(e) => handleMouseEnter(e, cell)}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isFuture) return;
                        if (!isPending && onToggleCell && habitId && dateStr) {
                          onToggleCell(habitId, dateStr, isCompleted);
                        }
                      }}
                      style={{
                        cursor: isFuture ? 'not-allowed' : isPending ? 'wait' : 'pointer',
                        opacity: isFuture ? 0.3 : isPending ? 0.5 : 1,
                        transition: 'fill 0.12s ease',
                      }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Legend */}
      <div className="heatmap-legend-row">
        <span className="legend-label">Less</span>
        <div className="legend-cells">
          {COLOR_SCALE.map((col, i) => (
            <span
              key={i}
              className="legend-cell-box"
              style={{ background: col }}
            />
          ))}
        </div>
        <span className="legend-label">More</span>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className={`heatmap-tooltip ${tooltip.flipBelow ? 'flip-below' : ''}`}
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: tooltip.flipBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 100,
          }}
          role="tooltip"
        >
          <span className="tooltip-date">{tooltip.dateStr}</span>
          <span className={`tooltip-status ${tooltip.done ? 'done' : ''}`}>
            {tooltip.statusText}
          </span>
        </div>
      )}
    </div>
  );
}
