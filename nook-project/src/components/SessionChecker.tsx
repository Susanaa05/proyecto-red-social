// src/components/SessionChecker.tsx
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAppDispatch } from '../store/hooks';
import { setUserFromSession, clearSession } from '../store/authSlice';

export const SessionChecker = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verificar sesión al cargar la app
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(' Sesión al cargar:', session ? 'ACTIVA' : 'INACTIVA');
      
      if (session && session.user) {
        console.log(' Usuario de sesión:', session.user.email);
        
        // Usar la nueva acción
        dispatch(setUserFromSession({
          id: session.user.id,
          email: session.user.email || ''
        }));
      } else {
        console.log(' No hay sesión activa');
        dispatch(clearSession());
      }
    };

    checkSession();

    //listenr to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(' Evento auth:', event, session ? 'Sesión activa' : 'Sesión inactiva');
        
        // updates redux depending on the event
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          dispatch(setUserFromSession({
            id: session.user.id,
            email: session.user.email || ''
          }));
        } else if (event === 'SIGNED_OUT') {
          dispatch(clearSession());
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
};