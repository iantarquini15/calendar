
export const NavBar = () => {
  return (
      <div className="navbar navbar-dark bg-dark mb-4 px-4" style={{width:'100%'}}>
          <span className="navbar-brand">
              <i className="fa-sharp fa-solid fa-calendar-days"></i>
              &nbsp; Ian
          </span>

          <button className="btn btn-outline-danger">
              <span>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  &nbsp; Sign out
              </span>
          </button>
    </div>
  )
}
