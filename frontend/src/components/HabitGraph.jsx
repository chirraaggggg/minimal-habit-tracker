import { useMemo, useRef, useState } from 'react';
import { get365DayCalendarGrid, formatDisplayDate } from '../utils/dates';

// Monday-first weekday labels (Row 0 = MON, Row 6 = SUN)
const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CELL = 12;
const GAP = 3.5;
const LABEL_W = 38;
const MONTH_H = 22;

export default function HabitGraph({
  completions = [],
  onToggleDay,
  loading = false,
  pendingDates = new Set(),
}) {
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  // Set of completed date strings (YYYY-MM-DD)
  const completedSet = useMemo(() => new Set(completions), [completions]);

  // Generate 365-day Monday-first grid model
  const { weeks, monthLabels } = useMemo(() => get365DayCalendarGrid(), []);

  const totalCols = weeks.length;
  const graphWidth = LABEL_W + totalCols * (CELL + GAP);
  const graphHeight = MONTH_H + 7 * (CELL + GAP);

  const handleMouseEnter = (cellX, cellY, dateStr) => {
    if (!svgRef.current || !dateStr) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const isCompleted = completedSet.has(dateStr);
    const displayDate = formatDisplayDate(dateStr);

    const leftPos = Math.max(90, Math.min(svgRect.left + cellX + CELL / 2, window.innerWidth - 110));
    const topPos = svgRect.top + cellY;

    setHover({
      x: leftPos,
      y: topPos,
      flip: cellY < 35,
      dateStr,
      displayDate,
      isCompleted,
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
    <div className="graph-card-container">
      <div className="graph-card-header">
        <div>
          <h3 className="graph-card-title">Daily Progress</h3>
          <p className="graph-card-subtitle">Consistency over the last 365 days</p>
        </div>
      </div>

      <div className="graph-scroll-area">
        <div className="graph-svg-wrapper" style={{ width: graphWidth, height: graphHeight }}>
          <svg
            ref={svgRef}
            width={graphWidth}
            height={graphHeight}
            className="cute-graph-svg"
          >
            {/* Month Header Labels Aligned to Week Columns */}
            {monthLabels.map(({ colIndex, label }) => (
              <text
                key={`month-${colIndex}-${label}`}
                x={LABEL_W + colIndex * (CELL + GAP)}
                y={14}
                className="graph-month-label"
              >
                {label}
              </text>
            ))}

            {/* Weekday Row Labels (MON, WED, FRI) */}
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

            {/* Calendar Week Columns & Date Cells */}
            {weeks.map((week, colIndex) => {
              const colX = LABEL_W + colIndex * (CELL + GAP);

              return (
                <g key={`col-${colIndex}`} transform={`translate(${colX}, 0)`}>
                  {week.map((cell, rowIndex) => {
                    const cellY = MONTH_H + rowIndex * (CELL + GAP);

                    // Blank alignment padding cell (leading/trailing days)
                    if (cell.isBlank) {
                      return (
                        <rect
                          key={`blank-${colIndex}-${rowIndex}`}
                          x={0}
                          y={cellY}
                          width={CELL}
                          height={CELL}
                          rx={2.5}
                          ry={2.5}
                          className="graph-cell blank"
                        />
                      );
                    }

                    // Real calendar date cell
                    const dateStr = cell.date;
                    const isCompleted = completedSet.has(dateStr);
                    const isPending = pendingDates.has(dateStr);

                    return (
                      <rect
                        key={dateStr}
                        x={0}
                        y={cellY}
                        width={CELL}
                        height={CELL}
                        rx={2.5}
                        ry={2.5}
                        className={`graph-cell ${isCompleted ? 'completed' : 'empty'} ${
                          isPending ? 'pending' : ''
                        }`}
                        onClick={() => {
                          if (!isPending) onToggleDay(dateStr, isCompleted);
                        }}
                        onMouseEnter={() => handleMouseEnter(colX, cellY, dateStr)}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* Minimal Tooltip */}
          {hover && (
            <div
              className={`soft-tooltip ${hover.flip ? 'flip' : ''}`}
              style={{ left: hover.x, top: hover.y }}
            >
              <div className="tooltip-date">{hover.displayDate}</div>
              <div className={`tooltip-status ${hover.isCompleted ? 'completed' : 'incomplete'}`}>
                {hover.isCompleted ? 'Completed' : 'Not completed'}
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
          <span className="legend-swatch completed" />
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}