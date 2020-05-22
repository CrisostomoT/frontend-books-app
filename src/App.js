import React from 'react';

//components
import Authors from './pages/booksApp/index.jsx';
import Books from './pages/booksApp/books.jsx';

//bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//styles
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function App() {

  const classes = useStyles();

  return (
    <Router>
      <Typography className={classes.root}>
        <Link className="navAppItem" to="/book">
          Books
        </Link>
        <Link className="navAppItem" to="/">
          Authors
        </Link>
      </Typography>

      <Switch>
        <Route path='/book'>
          <Books />
        </Route>
        <Route exact path='/'>
          <Authors />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
