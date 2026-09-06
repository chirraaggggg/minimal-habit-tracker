import { BunnySleeping } from './Illustrations';

export default function ProgressCard() {
  return (
    <div className="progress-card" aria-label="Motivational card">
      <div className="progress-card-content">
        <p className="progress-card-text">
          A more<br />
          consistent you<br />
          is a happier you.
        </p>
        <div className="progress-card-heart" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 13.5L2.8 8.6C1.4 7.2 1.4 4.8 2.8 3.4C4.2 2 6.5 2 7.9 3.4L8 3.5L8.1 3.4C9.5 2 11.8 2 13.2 3.4C14.6 4.8 14.6 7.2 13.2 8.6L8 13.5Z"
              fill="#F472B6"
              stroke="#F472B6"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="progress-card-art" aria-hidden="true">
        <BunnySleeping />
      </div>
    </div>
  );
}

