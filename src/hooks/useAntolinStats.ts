import { useState, useEffect } from 'preact/hooks';
import { getStorageData, updateStorageWithPageData, resetUserStats } from '../storage';
import { StorageData, YearData } from '../parser';

export interface YearListEntry extends YearData {
  year: string;
}

export function useAntolinStats() {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [storageData, setStorageData] = useState<StorageData>({});
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Load and update statistics on mount
  useEffect(() => {
    const name = updateStorageWithPageData();
    const data = getStorageData();
    setStorageData(data);
    
    if (name) {
      setActiveUser(name);
      const userYears = Object.keys(data[name]?.years || {});
      if (userYears.length > 0) {
        userYears.sort((a, b) => b.localeCompare(a));
        setSelectedYear(userYears[0]);
      }
    } else {
      const users = Object.keys(data);
      if (users.length > 0) {
        setActiveUser(users[0]);
        const userYears = Object.keys(data[users[0]]?.years || {});
        if (userYears.length > 0) {
          userYears.sort((a, b) => b.localeCompare(a));
          setSelectedYear(userYears[0]);
        }
      }
    }
  }, []);

  const userStats = activeUser ? storageData[activeUser] : null;

  // Calculate totals across all school years
  let totalBooksRead = 0;
  let totalQuizzesCompleted = 0;
  const yearsList: YearListEntry[] = [];

  if (userStats) {
    Object.entries(userStats.years)
      .sort((a, b) => b[0].localeCompare(a[0])) // Sort years descending
      .forEach(([year, data]) => {
        let yearBooksReadCount = data.booksReadCount;
        let yearQuizzesCount = data.quizzesCount;

        if (data.books && data.books.length > 0) {
          const uniqueBooks = new Set<string>();
          data.books.forEach(b => {
            const key = `${b.title.trim().toLowerCase()}|${b.author.trim().toLowerCase()}`;
            uniqueBooks.add(key);
          });
          yearBooksReadCount = uniqueBooks.size;
          yearQuizzesCount = data.books.length;
        }

        totalBooksRead += yearBooksReadCount;
        totalQuizzesCompleted += yearQuizzesCount;
        
        yearsList.push({
          ...data,
          year,
          booksReadCount: yearBooksReadCount,
          quizzesCount: yearQuizzesCount,
        });
      });
  }

  // Handle exporting user stats to a JSON file
  const handleExport = () => {
    if (!activeUser || !userStats) return;
    const blob = new Blob([JSON.stringify(userStats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antolin-stats-${activeUser.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle resetting stats for current user
  const handleReset = () => {
    if (!activeUser) return;
    if (confirm(`Are you sure you want to delete all saved statistics for ${activeUser}?`)) {
      resetUserStats(activeUser);
      const data = getStorageData();
      setStorageData(data);
      const remainingUsers = Object.keys(data);
      if (remainingUsers.length > 0) {
        changeActiveUser(remainingUsers[0]);
      } else {
        setActiveUser(null);
        setSelectedYear(null);
      }
    }
  };

  const changeActiveUser = (user: string) => {
    setActiveUser(user);
    const years = Object.keys(storageData[user]?.years || {});
    if (years.length > 0) {
      years.sort((a, b) => b.localeCompare(a));
      setSelectedYear(years[0]);
    } else {
      setSelectedYear(null);
    }
  };

  const allUsers = Object.keys(storageData);

  return {
    visible,
    setVisible,
    minimized,
    setMinimized,
    activeUser,
    storageData,
    selectedYear,
    setSelectedYear,
    userStats,
    totalBooksRead,
    totalQuizzesCompleted,
    yearsList,
    allUsers,
    handleExport,
    handleReset,
    changeActiveUser,
  };
}
