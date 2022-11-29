import "../styles/styles.css";
function Dashboard(props) {
  return (
    <div>
      <text>dashboard</text>
      <button
        className="button"
        onClick={() => {
          props.setLoggedIn(false);
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
