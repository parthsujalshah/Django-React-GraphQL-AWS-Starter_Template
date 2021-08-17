import './App.css';
import SampleHome from "./pages/sample/Home";
import SampleCreateUpdateListItem from "./pages/sample/CreateUpdateListItem";
import SampleLogin from "./pages/sample/Login";
import SampleRegister from "./pages/sample/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/sample" exact component={SampleHome} />
          <Route path="/sample/create/new" exact component={SampleCreateUpdateListItem} />
          <Route path="/sample/update/:listItemId" exact component={SampleCreateUpdateListItem} />
          <Route path="/sample/register" exact component={SampleRegister} />
          <Route path="/sample/login" exact component={SampleLogin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
