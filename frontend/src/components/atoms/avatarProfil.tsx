import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_URL } from "@/config/config";

type avatarProfilType = {
  avatarSrc: string;
  firstname: string;
  lastname: string;
};

export default function avatarProfil(props: avatarProfilType) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  useEffect(() => {
    if (props.avatarSrc) {
      if (props.avatarSrc.includes("://")) {
        setAvatarSrc(props.avatarSrc);
      } else {
        setAvatarSrc(
          `${API_URL}/files${props.avatarSrc.replace("/app/upload", "")}`
        );
      }
    }
  }, []);
  return (
    <>
      {avatarSrc ? (
        <Image
          unoptimized
          className="rounded-circle mt-2"
          height={150}
          width={150}
          alt={`${props.lastname}${props.firstname}`}
          priority
          src={avatarSrc}
          onErrorCapture={() => {
            setAvatarSrc("/assets/avatars/no-image.png");
            setImageError(
              "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
            );
          }}
        />
      ) : (
        <>
          <div className="rounded-circle mt-5 avatar_default">
            <span className="avatar_profil_text_size">
              {props &&
                props.firstname.substring(0, 1).toUpperCase() +
                  props.lastname.substring(0, 1).toUpperCase()}
            </span>
            <span>{avatarSrc}</span>
          </div>
          {imageError && <span className="image_error">{imageError}</span>}
        </>
      )}
    </>
  );
}
