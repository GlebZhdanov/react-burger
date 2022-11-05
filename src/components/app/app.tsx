import React, {FC, useEffect} from 'react';
import {Switch,Route,useLocation} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import {loadIngredients} from "../../redux/ingredients/actions";
import {useDispatch,useSelector} from "react-redux";
import {burger} from "../../redux/ingredients/selectors";
import PageNotFound from "../../pages/page-not-found/page-not-found";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ProtectedRoute from "../protected-route/protected-route";
import {getUser} from "../../redux/main/actions";
import IngredientsPage from "../../pages/ingridient/ingredients";
import IngredientDetailsPopup from "../ingredient-details-popup/ingredient-details-popup";
import { Location } from "history";

const App: FC = () => {

  const dispatch = useDispatch();
  let location = useLocation<{ background: Location }>();

  useEffect(() => {
    // @ts-ignore
    dispatch(loadIngredients());
    // @ts-ignore
    dispatch(getUser())
  },[])

  const {dataLoading} = useSelector(burger);

  let background = location.state && location.state.background;

  return (
      <div className={styles.app}>
        <DndProvider backend={HTML5Backend}>
        <ErrorMessage/>
        <AppHeader/>
          {dataLoading ?
            <>
              <Switch location={background || location}>
                <Route path='/' exact>
                  <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                  </main>
                </Route>
                <Route path='/ingredients/:id'>
                  <IngredientsPage/>
                </Route>
                <ProtectedRoute onlUnyAuth={true} path='/login'>
                  <Login/>
                </ProtectedRoute>
                <ProtectedRoute onlUnyAuth={true} path='/register'>
                  <Register/>
                </ProtectedRoute>
                <ProtectedRoute onlUnyAuth={true} path='/forgot-password'>
                  <ForgotPassword/>
                </ProtectedRoute>
                <ProtectedRoute onlUnyAuth={true} path='/reset-password'>
                  <ResetPassword/>
                </ProtectedRoute>
                <ProtectedRoute onlUnyAuth={false} path='/profile'>
                  <Profile/>
                </ProtectedRoute>
                <Route path='*'>
                  <PageNotFound/>
                </Route>
              </Switch>
              {background && <Route path="/ingredients/:id">
                <IngredientDetailsPopup/>
              </Route>}
            </>
            :
            <>
             <Preloader/>
            </>
          }
        </DndProvider>
      </div>
  );
}

export default App;
