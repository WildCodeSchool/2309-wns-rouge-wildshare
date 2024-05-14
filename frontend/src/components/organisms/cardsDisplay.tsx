import React from "react";
import RessourceCard from "../molecules/ressourceCard";
import { RessourceType } from '@/types/ressources.types';
import { useQuery } from "@apollo/client";
import { GET_ALL_RESSOURCES } from "@/Request/ressource";

export type ResourceProps = {
  ressources: RessourceType;
};

export default function CardsDisplay(): React.ReactNode {
  const { data, error } = useQuery(GET_ALL_RESSOURCES);
console.log(data)
  return (
    <div>
      {data?.getAllRessources.map((ressource: RessourceType) => (
        <RessourceCard key={ressource.id} ressource={ressource} />
      ))}
    </div>
  );
}
