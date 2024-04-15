import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // localStorage'dan token'ı al
    const token = localStorage.getItem('tokenKey');

    // Eğer token yoksa ana sayfaya yönlendir
    if (!token) {
      router.push('/');
    }
  }, []);
};