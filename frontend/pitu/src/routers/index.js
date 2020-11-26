import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import RedirectPage from '../pages/RedirectPage';
import StatsPage from '../pages/StatsPage';

function Routes(){
    return (
        <BrowserRouter>
           <Switch>
               <Route exact path="/" component={HomePage} />
               <Route exact path="/:code" component={RedirectPage} />
               <Route exact path="/:code/stats" component={StatsPage} />
               <Route exact path="/*" component={NotFoundPage} />
           </Switch>
        </BrowserRouter>
    )
}
export default Routes;