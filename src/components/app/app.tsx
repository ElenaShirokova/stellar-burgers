import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredientsSlice';
import { checkUserAuth } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const locationState = location.state as { background?: Location };
  const background = locationState && location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='orders'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':number'
                element={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title={'Детали заказа'} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={'Детали ингредиента'} onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={'Детали заказа пользователя'}
                    onClose={closeModal}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
