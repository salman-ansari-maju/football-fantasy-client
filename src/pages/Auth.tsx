import AuthForm from "../components/Auth/Form";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚽</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Football Manager
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in or register to start managing your dream team
          </p>
        </div>

        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
