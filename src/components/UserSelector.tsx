import styles from './UserSelector.css?inline';

interface UserSelectorProps {
  allUsers: string[];
  activeUser: string | null;
  onChangeUser: (user: string) => void;
}

export function UserSelector({ allUsers, activeUser, onChangeUser }: UserSelectorProps) {
  if (allUsers.length <= 1) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="antolin-user-selector-container">
        <label htmlFor="user-select" className="antolin-user-selector-label">
          Select Student profile:
        </label>
        <select
          id="user-select"
          value={activeUser || ''}
          onChange={(e) => onChangeUser(e.currentTarget.value)}
          className="antolin-user-selector-select"
        >
          {allUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
    </>
  );
}
