export interface Book {
  date: string;
  title: string;
  author: string;
  klass: string;
  points: number;
  type: number;
}

export interface YearData {
  booksReadCount: number; // parsed from tab2 Gesamt
  quizzesCount: number; // parsed from tab1 rows count
  books: Book[]; // parsed from tab1 rows
}

export interface UserStats {
  name: string;
  years: Record<string, YearData>;
}

export type StorageData = Record<string, UserStats>;

/**
 * Checks if the current page is an Antolin year results page.
 */
export function isYearPage(): boolean {
  const h1 = document.querySelector('.container h1, .bg-row h1');
  if (!h1 || !h1.textContent) return false;
  return h1.textContent.includes('Schuljahr') || h1.textContent.includes('Punkte im');
}

/**
 * Parses user and book statistics from the current page.
 */
export function parsePageData(): { name: string; year: string; yearData: YearData } | null {
  if (!isYearPage()) {
    return null;
  }

  // 1. Parse user name
  const nameEl = document.querySelector('.meta-label');
  const name = nameEl?.textContent?.trim() || 'George Zarzavescu'; // Fallback to George if not found, but prioritize parsed name

  // 2. Parse school year
  const h1El = document.querySelector('.container h1, .bg-row h1');
  const h1Text = h1El?.textContent || '';
  const yearMatch = h1Text.match(/Schuljahr\s+(\d{4}\/\d{4})/);
  const year = yearMatch ? yearMatch[1] : 'Unknown Year';

  // 3. Parse total books read count from #tab2
  const tab2 = document.getElementById('tab2');
  let booksReadCount = 0;
  if (tab2) {
    const tfootCols = tab2.querySelectorAll('tfoot th');
    if (tfootCols.length >= 2) {
      booksReadCount = parseInt(tfootCols[1].textContent?.trim() || '0', 10);
    } else {
      // Fallback: search for Gesamt row in tables
      const rows = tab2.querySelectorAll('tr');
      for (const row of Array.from(rows)) {
        const cells = row.querySelectorAll('th, td');
        if (cells.length >= 2 && cells[0].textContent?.trim() === 'Gesamt') {
          booksReadCount = parseInt(cells[1].textContent?.trim() || '0', 10);
          break;
        }
      }
    }
  }

  // 4. Parse individual books from #tab1 table
  const tab1 = document.getElementById('tab1');
  const books: Book[] = [];
  if (tab1) {
    const rows = tab1.querySelectorAll('table.gerda.tablesort tbody tr');
    rows.forEach(row => {
      const cols = row.querySelectorAll('td');
      if (cols.length >= 6) {
        const date = cols[0].textContent?.trim() || '';
        const title = cols[1].textContent?.trim() || '';
        const author = cols[2].textContent?.trim() || '';
        const klass = cols[3].textContent?.trim() || '';
        const points = parseInt(cols[4].textContent?.trim() || '0', 10);
        
        // Get type from data-sort-value attribute of column 5 or check the span class inside
        const typeVal = cols[5].getAttribute('data-sort-value');
        let type = typeVal ? parseInt(typeVal, 10) : 1;
        if (!typeVal) {
          const span = cols[5].querySelector('span');
          if (span) {
            const cls = span.className || '';
            const match = cls.match(/kappe_(\d+)/);
            if (match) {
              type = parseInt(match[1], 10);
            }
          }
        }
        
        books.push({ date, title, author, klass, points, type });
      }
    });
  }

  // Calculate unique books read and total quizzes completed.
  // Multiple quizzes (entities with the same title and author but different type values)
  // count as 1 book read and multiple quizzes completed.
  let finalBooksReadCount = booksReadCount;
  const quizzesCount = books.length;

  if (books.length > 0) {
    const uniqueBooks = new Set<string>();
    books.forEach(b => {
      const key = `${b.title.trim().toLowerCase()}|${b.author.trim().toLowerCase()}`;
      uniqueBooks.add(key);
    });
    finalBooksReadCount = uniqueBooks.size;
  }

  return {
    name,
    year,
    yearData: {
      booksReadCount: finalBooksReadCount,
      quizzesCount,
      books,
    }
  };
}
