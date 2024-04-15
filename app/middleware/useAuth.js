import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // localStorage'dan token'ı al
    // const token = localStorage.getItem('tokenKey');
    const token = Cookies.get("tokenKey")

    // Eğer token yoksa ana sayfaya yönlendir
    if (!token) {
      router.push('/');
    }
  }, []);
};