import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../Request/user';
import SignStyles from "@/styles/Sign.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout d'un état pour stocker le message d'erreur
  const [successMessage, setSuccessMessage] = useState('');

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    variables: { token, newPassword },
    onCompleted: () => {
      setSuccessMessage("Votre mot de passe a été réinitialisé avec succès! Vous allez être redirigé sur la page de connexion.");
      setTimeout(() => router.push('/sign-in'), 6000); 
    },
    onError: (error) => {
      // Personnalisation du message d'erreur en fonction de son contenu
      if (error.message.includes("Token expired")) {
        setErrorMessage("Votre lien de réinitialisation a expiré. Veuillez demander un nouveau lien.");
      } else if (error.message.includes("User not found")) {
        setErrorMessage("L'utilisateur ne correspond pas.");
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Veuillez réessayer.");
      }
      console.error("An unexpected error occurred:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); 
    resetPassword();
  };

  return (
    <div className={SignStyles.container}>
      <span className={SignStyles.logo}>RESSOURCES</span>
      <p className={SignStyles.paragraphe}>Réinitialisez votre mot de passe</p>
      <form onSubmit={handleSubmit}>
        <input
          className={SignStyles.input}
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className={SignStyles.button} type="submit" disabled={loading}>Réinitialiser le mot de passe</button>
      </form>
      {loading && <p>Réinitialisation en cours...</p>}
      {successMessage && <p className={SignStyles.success}>{successMessage}</p>}
      {errorMessage && <p className={SignStyles.error}>{errorMessage}</p>}
    </div>
  );
}
