import styles from './SummaryBlock.css?inline';
import { YearListEntry } from '../hooks/useAntolinStats';

interface SummaryBlockProps {
  activeUser: string;
  totalBooksRead: number;
  totalQuizzesCompleted: number;
  yearsList: YearListEntry[];
}

export function SummaryBlock({
  activeUser,
  totalBooksRead,
  totalQuizzesCompleted,
  yearsList,
}: SummaryBlockProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="summary-block antolin-summary-block-container">
        <ul className="antolin-summary-block-list">
          <li className="antolin-summary-block-item">
            User: <strong>{activeUser}</strong>
          </li>
          <li className="antolin-summary-block-item">
            Total number of book read: <strong>{totalBooksRead}</strong>
          </li>
          <li className="antolin-summary-block-item">
            Total number of quizzes completed: <strong>{totalQuizzesCompleted}</strong>
          </li>
          {yearsList.map(({ year, booksReadCount }) => (
            <li key={year} className="antolin-summary-block-item">
              Books read in year {year}: <strong>{booksReadCount}</strong>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
