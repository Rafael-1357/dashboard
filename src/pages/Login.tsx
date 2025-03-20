import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import loginSchema from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LoaderCircle, CircleCheck } from "lucide-react";
import localforage from "localforage";
import { toast } from "sonner"
import { logon } from "@/services/Auth";


function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await localforage.getItem('access_token');
      if (token) {
        navigate('/home');
      }
    };

    checkToken();
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await logon(data)

      if (response.ok) {
        const result = await response.json();
        localforage.setItem('access_token', result.access_token)
          .then(() => {
            console.log('Token salvo com sucesso');
            navigate('/home');
            toast("Login efetuado com sucesso!", { icon: <CircleCheck /> });
          })
          .catch((error) => {
            console.error('Erro ao salvar token:', error);
          });
      } else {
        const result = await response.json();
        if (result.error) {
          setApiError(result.error);
        } else {
          setApiError("Usuário ou senha inválidos");
        }
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setApiError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <Card className="flex flex-col gap-6 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Insira seu usuário para realizar acesso a conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {apiError && (
                  <div className="text-red-500 text-sm text-center">
                    {apiError}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="login">Usuário</Label>
                  <Input
                    id="login"
                    type="text"
                    placeholder="GabrielSilva"
                    {...register("login")}
                  />
                  {errors.login && (<span>{errors.login.message}</span>)}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password")}
                  />
                  {errors.password && (<span>{errors.password.message}</span>)}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default Login;
