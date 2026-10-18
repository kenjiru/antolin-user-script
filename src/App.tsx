import styles from './App.css?inline';
import { useAntolinStats } from './hooks/useAntolinStats';
import { FloatingBadge } from './components/FloatingBadge';
import { DashboardHeader } from './components/DashboardHeader';
import { UserSelector } from './components/UserSelector';
import { SummaryBlock } from './components/SummaryBlock';
import { DetailedBookLog } from './components/DetailedBookLog';
import { DashboardControls } from './components/DashboardControls';

export function App() {
  const {
    visible,
    setVisible,
    minimized,
    setMinimized,
    activeUser,
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
  } = useAntolinStats();

  if (!visible) {
    return <FloatingBadge onShow={() => setVisible(true)} />;
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="antolin-app-container"
        style={{ width: minimized ? '250px' : '400px' }}
      >
        <article className="antolin-app-article">
          <DashboardHeader
            minimized={minimized}
            onToggleMinimize={() => setMinimized(!minimized)}
            onClose={() => setVisible(false)}
          />

          {minimized ? (
            <div className="antolin-minimized-text">
              {activeUser ? (
                <p>
                  👤 <strong>{activeUser}</strong>: <strong>{totalBooksRead}</strong> books read.
                </p>
              ) : (
                <p className="antolin-minimized-text-empty">No stats saved.</p>
              )}
            </div>
          ) : (
            <div>
              <UserSelector
                allUsers={allUsers}
                activeUser={activeUser}
                onChangeUser={changeActiveUser}
              />

              {activeUser ? (
                <div>
                  <SummaryBlock
                    activeUser={activeUser}
                    totalBooksRead={totalBooksRead}
                    totalQuizzesCompleted={totalQuizzesCompleted}
                    yearsList={yearsList}
                  />

                  <DetailedBookLog
                    yearsList={yearsList}
                    selectedYear={selectedYear}
                    onChangeYear={setSelectedYear}
                    userStats={userStats}
                  />

                  <DashboardControls
                    onExport={handleExport}
                    onReset={handleReset}
                  />
                </div>
              ) : (
                <div className="antolin-no-stats-container">
                  <p className="antolin-no-stats-msg">
                    No Antolin school-year stats saved yet. Visit your points page to automatically save your data!
                  </p>
                </div>
              )}
            </div>
          )}
        </article>
      </div>
    </>
  );
}
