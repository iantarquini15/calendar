import { useAuthStore } from "../../hooks"

export const NavBar = () => {

    const { user, StartLogout} = useAuthStore();
  return (
      <div className="navbar navbar-dark bg-dark mb-4 px-4" style={{width:'100%'}}>
          <span className="navbar-brand">
              <i className="fa-sharp fa-solid fa-calendar-days"></i>
              &nbsp; {user.name}
          </span>

          <button className="btn btn-outline-danger"
                  onClick={StartLogout}>
              <span>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  &nbsp; Sign out
              </span>
          </button>
    </div>
  )
}
