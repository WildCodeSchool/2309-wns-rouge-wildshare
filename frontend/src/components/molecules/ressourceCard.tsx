import React, { useEffect, useState } from "react";
import CardTag from "../atoms/cardTag";
import Image from "next/image";
import LikeBtn from "../atoms/likeBtn";
import FavoriteBtn from "../atoms/favoriteBtn";
import Avatar from "../atoms/avatar";
import { RessourceType } from "@/types/ressources.types";
import { UserType } from "@/types/user.types";
import { useMutation, useQuery } from "@apollo/client";
import { MY_PROFILE } from "@/requests/user";
import { DELETE_RESSOURCE } from "@/requests/ressources";

export type RessourceCardProps = {
  ressource: RessourceType;
};

export type UserProps = {
  user: UserType;
};

export default function RessourceCard(
  props: RessourceCardProps
): React.ReactNode {
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const { ressource } = props;
  const [doDeleteRessource] = useMutation(DELETE_RESSOURCE, {variables : {id: ressource.id}})
  const [ressourceImageSrc, setRessourceImageSrc] = useState<string>(
    "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
  );
  useEffect(() => {
    if (ressource.image_id && ressource.image_id.path.includes("://")) {
      setRessourceImageSrc(ressource.image_id.path);
    } else if (ressource.image_id) {
      setRessourceImageSrc(
        `http://localhost:4000/files/${ressource.image_id.path.replace(
          "/app/upload/",
          ""
        )}`
      );
    }
  }, [props]);

  const handleDelete = async () => {
    try {
      await doDeleteRessource();
    } catch (error) {
      console.error("Erreur durant la supression de la ressource")
    }
  };

  return (
    <>
      <div className="card card-custom mb-3" style={{ borderRadius: 30 }}>
        <div className="d-flex flex-row justify-content-between align-items-center px-4">
          <Avatar
            user={ressource.created_by_user}
            date={ressource.created_at}
          />
         <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">modifier</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
        </div>
        <div>
          <Image
            unoptimized
            className="img-fluid shadow-sm"
            width={450}
            height={450}
            alt="jaky nackos"
            priority
            src={ressourceImageSrc}
            onErrorCapture={() => {
              setRessourceImageSrc("/assets/avatars/no-image.png");
              setImageError(
                "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
              );
            }}
          />
        </div>
        <div className="card-body pb-5">
          <div className="d-flex gap-1">
            <CardTag name={"randonée"} />
            <CardTag name={"montagne"} />
            <CardTag name={"paysage"} />
          </div>
          <h5 className="card-title pt-2 title">{ressource.title}</h5>
          <p className="card-text description">{ressource.description}</p>
        </div>
        <div className="d-flex gap-2 card_bottom_buttons_container">
          <LikeBtn className={"bi bi-hand-thumbs-up-fill"} />
          <FavoriteBtn className={"bi bi-star-fill"} />
        </div>
      </div>
    </>
  );
}
