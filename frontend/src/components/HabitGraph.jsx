import { useMemo, useRef, useState } from 'react';
import { getCalendarYearGrid, formatDisplayDate } from '../utils/dates';

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CELL = 13;
const GAP = 3.5;
const LABEL_W = 36;
const MONTH_H = 22;

// Per-habit color scales matching habit categories
const COLOR_SCALES = [
  { mid: '#F48FB1', strong: '#EC4899' }, // Pink
  { mid: '#90CAF9', strong: '#3B82F6' }, // Blue
  { mid: '#80CBC4', strong: '#14B8A6' }, // Teal
  { mid: '#FFE082', strong: '#F59E0B' }, // Yellow
  { mid: '#CE93D8', strong: '#8B5CF6' }, // Purple
  { mid: '#FFAB91', strong: '#F97316' }, // Peach
];

export default function HabitGraph({
  habitName = '',
  completions = [],
  onToggleDay,
  loading = false,
  pendingDates = new Set(),
  colorIndex = 0,
}) {
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  const completedSet = useMemo(() => new Set(completions), [completions]);
  const { weeks, monthLabels, year: calYear } = useMemo(() => getCalendarYearGrid(), []);
  const scale = COLOR_SCALES[colorIndex % COLOR_SCALES.length];

  const totalCols = weeks.length;
  const graphWidth = LABEL_W + totalCols * (CELL + GAP);
  const graphHeight = MONTH_H + 7 * (CELL + GAP);

  const handleMouseEnter = (cellX, cellY, cell) => {
    if (!svgRef.current || !cell || cell.isBlank) return;
    const dateStr = cell.date;
    const svgRect = svgRef.current.getBoundingClientRect();
    const isCompleted = !cell.isFuture && completedSet.has(dateStr);
    const displayDate = formatDisplayDate(dateStr);
    const cellCenterX = svgRect.left + cellX + CELL / 2;
    const leftPos = Math.max(90, Math.min(cellCenterX, window.innerWidth - 90));
    const flipBelow = cellY < 35;
    const topPos = flipBelow ? svgRect.top + cellY + CELL + 8 : svgRect.top + cellY - 8;
    setHover({
      x: leftPos,
      y: topPos,
      flipBelow,
      dateStr,
      displayDate,
      isCompleted,
      isFuture: cell.isFuture,
    });
  };

  if (loading) {
    return (
      <div className="graph-card-container">
        <div className="graph-loading-text">Loading daily progress...</div>
      </div>
    );
  }

  return (
    <div className="graph-card-container" role="region" aria-label="Full year contribution graph">
      <div className="graph-card-header">
        <div>
          <h3 className="graph-card-title">{habitName ? `${habitName} — Full Year View` : 'Daily Progress'}</h3>
          <p className="graph-card-subtitle">Jan 1 – Dec 31, {calYear} — click a cell to toggle</p>
        </div>
      </div>

      <div className="graph-scroll-area">
        <div className="graph-svg-wrapper" style={{ width: graphWidth, height: graphHeight }}>
          <svg
            ref={svgRef}
            width={graphWidth}
            height={graphHeight}
            className="cute-graph-svg"
            aria-label="Year-long habit completion graph"
            role="img"
          >
            {/* All 12 Month labels */}
            {monthLabels.map(({ colIndex, label }) => (
              <text
                key={`month-${colIndex}-${label}`}
                x={LABEL_W + colIndex * (CELL + GAP)}
                y={15}
                className="graph-month-label"
              >
                {label}
              </text>
            ))}

            {/* Weekday row labels (Mon, Wed, Fri) */}
            {[0, 2, 4].map((dayIndex) => (
              <text
                key={`weekday-${dayIndex}`}
                x={0}
                y={MONTH_H + dayIndex * (CELL + GAP) + CELL - 2}
                className="graph-weekday-label"
              >
                {WEEKDAY_LABELS[dayIndex]}
              </text>
            ))}

            {/* Calendar cells */}
            {weeks.map((week, colIndex) => {
              const colX = LABEL_W + colIndex * (CELL + GAP);
              return (
                <g key={`col-${colIndex}`} transform={`translate(${colX}, 0)`}>
                  {week.map((cell, rowIndex) => {
                    const cellY = MONTH_H + rowIndex * (CELL + GAP);
                    if (cell.isBlank) {
                      return (
                        <rect
                          key={`blank-${colIndex}-${rowIndex}`}
                          x={0} y={cellY}
                          width={CELL} height={CELL}
                          rx={2.5} ry={2.5}
                          className="graph-cell blank"
                        />
                      );
                    }
                    const dateStr = cell.date;
                    const isFuture = cell.isFuture;
                    const isCompleted = !isFuture && completedSet.has(dateStr);
                    const isPending = pendingDates.has(dateStr);

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
                        strokeWidth="0.8"
                        className={`graph-cell ${isCompleted ? 'completed' : isFuture ? 'future' : 'empty'} ${isPending ? 'pending' : ''}`}
                        onClick={() => {
                          if (isFuture || isPending) return;
                          onToggleDay(dateStr, isCompleted);
                        }}
                        onMouseEnter={() => handleMouseEnter(colX, cellY, cell)}
                        onMouseLeave={() => setHover(null)}
                        style={{
                          cursor: isFuture ? 'not-allowed' : isPending ? 'wait' : 'pointer',
                          opacity: isFuture ? 0.45 : isPending ? 0.5 : 1,
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hover && (
            <div
              className={`soft-tooltip ${hover.flipBelow ? 'flip' : ''}`}
              style={{
                position: 'fixed',
                left: hover.x,
                top: hover.y,
                transform: hover.flipBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
                pointerEvents: 'none',
                zIndex: 1000,
              }}
              role="tooltip"
            >
              <div className="tooltip-date">{hover.displayDate}</div>
              <div className={`tooltip-status ${hover.isCompleted ? 'completed' : hover.isFuture ? 'future' : 'incomplete'}`}>
                {hover.isCompleted ? 'Completed ✓' : hover.isFuture ? 'Future date' : 'Not completed'}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="graph-footer-legend">
        <div className="legend-group">
          <span className="legend-swatch empty" />
          <span>Not completed</span>
        </div>
        <div className="legend-group">
          <span className="legend-swatch completed" style={{ background: scale.strong }} />
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}