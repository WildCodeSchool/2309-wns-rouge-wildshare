import React, { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { MY_PROFILE, SIGN_IN } from "@/requests/user";
import { useRouter } from "next/router";
import Logo from "@/components/atoms/logo";
import { Alert } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types/user.types";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const [signIn, { loading }] = useMutation(SIGN_IN, {
    variables: { data: { email, password, isTest: false } },
    refetchQueries: [MY_PROFILE],
    onError: (error) => {
      if (error.message.includes("user not found")) {
        setErrorMessage("Utilisateur introuvable.");
      } else if (error.message.includes("user and password dont match")) {
        setErrorMessage("Utilisateur et mot de passe ne correspondent pas.");
      } else if (error.message.includes("account not validated")) {
        setErrorMessage("Le compte n'a pas encore été validé.");
      } else {
        setErrorMessage("Erreur lors de la connexion.");
      }
    },
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur
    signIn();
  };
  useEffect(() => {
    if (dataUser) {
      router.replace("/dashboard");
    }
  }, [dataUser]);

  return (
    <div className="container_signin">
      <Logo className={"menu_white_logo"} link="/sign-in" />
      <div className="signin_wrapper">
        <span>Connexion</span>
        <p className="title">Content de vous revoir !</p>
        <Image
          src="/assets/sharing.svg"
          alt="sharing"
          width={130}
          height={130}
        ></Image>
        <form className="form" onSubmit={submitForm}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <Alert id="alert" className="full_width" variant={"danger"}>
              {errorMessage}
            </Alert>
          )}
          <button className="btn_primary" type="submit" disabled={loading}>
            Se connecter
          </button>
          <Link href="/request-reset-password" className="forgot_Password">
            Mot de passe oublié
          </Link>
          <p className="signup_link">
            Vous n'avez pas encore de compte ?{" "}
            <Link href="/sign-up" className="forgot_Password">
              Créez en un dès maintenant !
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
