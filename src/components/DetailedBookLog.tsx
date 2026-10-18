import styles from './DetailedBookLog.css?inline';
import { UserStats } from '../parser';
import { YearListEntry } from '../hooks/useAntolinStats';

interface DetailedBookLogProps {
  yearsList: YearListEntry[];
  selectedYear: string | null;
  onChangeYear: (year: string) => void;
  userStats: UserStats | null;
}

export function DetailedBookLog({
  yearsList,
  selectedYear,
  onChangeYear,
  userStats,
}: DetailedBookLogProps) {
  if (yearsList.length === 0) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="antolin-book-log-container">
        <details className="antolin-book-log-details">
          <summary className="antolin-book-log-summary">
            📖 Detailed Book Log
          </summary>
          
          <div className="antolin-book-log-content">
            <div className="antolin-book-log-selector-wrapper">
              <select
                value={selectedYear || ''}
                onChange={(e) => onChangeYear(e.currentTarget.value)}
                className="antolin-book-log-select"
              >
                {yearsList.map(({ year }) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {selectedYear && userStats?.years[selectedYear] ? (
              <div className="antolin-book-log-table-wrapper">
                {userStats.years[selectedYear].books.length === 0 ? (
                  <p className="antolin-book-log-empty-msg">
                    No book details parsed for this year.
                  </p>
                ) : (
                  <table className="antolin-book-log-table">
                    <thead className="antolin-book-log-thead">
                      <tr>
                        <th className="antolin-book-log-th">Date</th>
                        <th className="antolin-book-log-th">Title</th>
                        <th className="antolin-book-log-th-pts">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.years[selectedYear].books.map((book, idx) => (
                        <tr key={idx}>
                          <td className="antolin-book-log-td-date">{book.date}</td>
                          <td className="antolin-book-log-td-title" title={`${book.title} by ${book.author}`}>
                            <strong>{book.title}</strong>
                            <div className="antolin-book-log-author">{book.author}</div>
                          </td>
                          <td className="antolin-book-log-td-points">+{book.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}
          </div>
        </details>
      </div>
    </>
  );
}
