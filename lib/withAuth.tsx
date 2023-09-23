import { useRouter } from 'next/navigation';
import React from 'react';

import axios from '@/lib/axios';
import Loading from '@/components/Loading';

export default function withAuth(WrappedComponent: React.ComponentType) {
  const AuthenticatedComponent = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
      const checkAuth = async () => {
        try {
          const accessToken = await localStorage.getItem('accessToken');
          const res = await axios.post(
            '/auth/verify-access',
            {},
            {
              headers: {
                token: `Bearer ${accessToken}`,
              },
            }
          );
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          router.replace(
            '/login?message=You are not authenticated to view this page'
          );
        }
      };

      checkAuth();
    }, [router]);

    return isLoading ? <Loading /> : <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}
