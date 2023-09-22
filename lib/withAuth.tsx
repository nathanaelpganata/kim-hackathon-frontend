import { useRouter } from 'next/navigation';
import React from 'react';

export default function withAuth(WrappedComponent: React.ComponentType) {
  const AuthenticatedComponent = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
      const checkAuth = async () => {
        try {
          const accessToken = await localStorage.getItem('accessToken');
          if (!accessToken) {
            router.replace(
              '/login?message=You are not authenticated to view this page'
            );
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          router.replace(
            '/login?message=You are not authenticated to view this page'
          );
        }
      };

      checkAuth();
    }, [router]);

    return isLoading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}
