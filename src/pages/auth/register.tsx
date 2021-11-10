import { NextPage } from "next";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import AuthFormContainer from "src/modules/auth/components/AuthFormContainer";
import AuthLayout from "src/modules/auth/components/AuthLayout";
import RegisterForm from "src/modules/auth/components/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout>
      <AuthFormContainer>
        <RegisterForm />

        <Divider />

        <Button variant="outline" colorScheme="cyan">
          Iniciar sesion
        </Button>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default RegisterPage;
