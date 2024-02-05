import { NavLink } from "react-router-dom";

export function Main() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/path/to/your/logo.png" alt="Logo" className="mr-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white p-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <button className="text-white mr-4">Login</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-800 text-white p-4">
          <nav>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="/"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-home mr-2"></i> Home
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/liked"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-thumbs-up mr-2"></i> Liked Videos
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/history"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-history mr-2"></i> History
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/mycontent"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-file-alt mr-2"></i> My Content
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/collection"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-folder mr-2"></i> Collection
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/subscribers"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-users mr-2"></i> Subscribers
                </NavLink>
              </li>
              <li className="mt-auto">
                <NavLink
                  to="/settings"
                  activeClassName="text-blue-500"
                  exact
                  className="flex items-center"
                >
                  <i className="fas fa-cog mr-2"></i> Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 bg-white p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl mb-4">No Video To show</h2>
            <p className="text-gray-600">
              Explore and enjoy your content here!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
