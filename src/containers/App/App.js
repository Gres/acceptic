import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../../components/Home/Home'
import Chart from '../../components/Chart/Chart'
import Table from '../../components/Table/Table'

export const App = () => (
  <div>
    <header>
      <Link to="/Home">Home</Link>
      <Link to="/Chart">Chart</Link>
      <Link to="/Table">Table</Link>
    </header>

    <main>
      <Switch>
        <Route exact path="/Chart" component={Chart} />
        <Route exact path="/Table" component={Table} />
        <Route component={Home} />
      </Switch>
    </main>
  </div>
)
