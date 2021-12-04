import { AuthenticationStateProvider } from 'src/modules/auth/providers';

export const CustomProviders: React.FC = ({ children }) => {
  return (
    <>
      <AuthenticationStateProvider>{children}</AuthenticationStateProvider>
    </>
  );
};
