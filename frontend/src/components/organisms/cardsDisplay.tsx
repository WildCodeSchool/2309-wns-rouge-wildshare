import React from "react";
import RessourceCard from "../molecules/ressourceCard";

export default function cardsDisplay({ resourcesData }: { resourcesData: any[] }) {
  return (
    <div className="container">
      {resourcesData.map((item) => (
        <RessourceCard
          key={item.id}
          title={item.title}
          image={item.image}
          description={item.description}
          isFavorite={item.isFavorite}
          file={item.file}
          link={item.link}
          id={0}
          created_by_id={item.created_by_id}
          created_at={item.created_at}
          updated_at={item.created_at}
          update_by_id={item.update_by_id}
        />
      ))}
    </div>
  );
}
