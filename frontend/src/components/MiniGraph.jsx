import { useMemo, useRef, useState } from 'react';
import { get365DayCalendarGrid } from '../utils/dates';

const CELL = 11.5;
const GAP = 3.5;
const MONTH_H = 18;

// 6 Habit-specific color palettes matching reference image 1-to-1
const COLOR_SCALES = [
  // 0: Gym (Pink / Rose)
  { mid: '#FB7185', strong: '#EC4899' },
  // 1: Reading (Blue)
  { mid: '#60A5FA', strong: '#3B82F6' },
  // 2: Coding (Green)
  { mid: '#4ADE80', strong: '#22C55E' },
  // 3: Meditate (Purple)
  { mid: '#C084FC', strong: '#A855F7' },
  // 4: Drink Water (Teal / Cyan)
  { mid: '#22D3EE', strong: '#06B6D4' },
  // 5: No Social Media (Orange / Coral)
  { mid: '#FB923C', strong: '#EA580C' },
];

export default function MiniGraph({
  completions = [],
  colorIndex = 0,
  habitId = null,
  onToggleCell = null,
  pendingDates = new Set(),
}) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const scale = COLOR_SCALES[colorIndex % COLOR_SCALES.length];

  const completedSet = useMemo(() => new Set(completions), [completions]);

  const { weeks, monthLabels } = useMemo(() => get365DayCalendarGrid(), []);

  const graphW = weeks.length * (CELL + GAP);
  const graphH = MONTH_H + 7 * (CELL + GAP);

  const handleMouseEnter = (e, cell) => {
    if (!containerRef.current || !cell || cell.isBlank) return;
    const dateStr = cell.date;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellRect = e.target.getBoundingClientRect();

    const cellCenterX = cellRect.left - containerRect.left + cellRect.width / 2;
    const cellTopY = cellRect.top - containerRect.top;
    const cellBottomY = cellRect.bottom - containerRect.top;

    const containerW = containerRect.width;
    const minX = 65;
    const maxX = Math.max(minX, containerW - 65);
    const clampedX = Math.max(minX, Math.min(cellCenterX, maxX));

    const flipBelow = cellTopY < 38;
    const tooltipY = flipBelow ? cellBottomY + 8 : cellTopY - 8;

    const isDone = completedSet.has(dateStr);
    let statusText = isDone ? 'Completed ✓' : 'Not completed';
    if (cell.isFuture) {
      statusText = 'Future date';
    }

    setTooltip({
      x: clampedX,
      y: tooltipY,
      flipBelow,
      dateStr,
      statusText,
      done: isDone,
      isFuture: cell.isFuture,
    });
  };

  return (
    <div
      className="mini-graph-card-container"
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
    >
      <svg
        width={graphW}
        height={graphH}
        aria-label="Habit contribution graph"
        role="img"
      >
        {/* All 12 Month labels */}
        {monthLabels.map(({ colIndex, label }) => (
          <text
            key={`m-${colIndex}-${label}`}
            x={colIndex * (CELL + GAP)}
            y={13}
            className="mini-graph-month"
          >
            {label}
          </text>
        ))}

        {/* Grid columns (all weeks, 7 rows per week) */}
        {weeks.map((week, colIdx) => {
          const colX = colIdx * (CELL + GAP);
          return (
            <g key={`col-${colIdx}`} transform={`translate(${colX}, 0)`}>
              {week.map((cell, rowIdx) => {
                const cellY = MONTH_H + rowIdx * (CELL + GAP);
                if (cell.isBlank) {
                  return (
                    <rect
                      key={`b-${colIdx}-${rowIdx}`}
                      x={0} y={cellY}
                      width={CELL} height={CELL}
                      rx={2.5} ry={2.5}
                      fill="none"
                    />
                  );
                }
                const dateStr = cell.date;
                const isFuture = cell.isFuture;
                const isCompleted = !isFuture && completedSet.has(dateStr);
                const pendingKey = `${dateStr}-${habitId}`;
                const isPending = pendingDates?.has(pendingKey) || pendingDates?.has(dateStr);

                let fill = 'var(--cell-empty)';
                let stroke = 'var(--cell-empty-border)';

                if (isCompleted) {
                  fill = scale.strong;
                  stroke = scale.strong;
                } else if (isFuture) {
                  fill = 'var(--cell-future)';
                  stroke = 'var(--cell-future-border)';
                }

                return (
                  <rect
                    key={dateStr}
                    x={0} y={cellY}
                    width={CELL} height={CELL}
                    rx={2.5} ry={2.5}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1"
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
                      opacity: isFuture ? 0.45 : isPending ? 0.5 : 1,
                      transition: 'fill 0.15s ease, opacity 0.15s ease',
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Floating non-blocking tooltip */}
      {tooltip && (
        <div
          className={`mini-graph-tooltip ${tooltip.flipBelow ? 'flip-below' : ''}`}
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: tooltip.flipBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
          role="tooltip"
        >
          <span className="mini-graph-tooltip-date">{tooltip.dateStr}</span>
          <span className={`mini-graph-tooltip-status ${tooltip.done ? 'done' : tooltip.isFuture ? 'future' : ''}`}>
            {tooltip.statusText}
          </span>
        </div>
      )}
    </div>
  );
}


