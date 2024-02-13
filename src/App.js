
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {routes} from "./routing";
import './App.css';
import CountriesProvider from "./providers/countriesProvider";

function App() {
  return (
      <CountriesProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route) =>
                <Route key={route.name} path={route.path} element={route.component}/>
            )}
            <Route
                path="/"
                element={<Navigate to="/" replace={true} />}
            />
          </Routes>
        </BrowserRouter>
      </CountriesProvider>
  );
}

export default App;
