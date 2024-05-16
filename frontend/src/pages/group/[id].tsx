import Layout from "@/components/organisms/layout";
import React from "react";
import { useRouter } from "next/router";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { GET_RESSOURCES_BY_GROUP_ID } from "@/requests/ressource";
import { useQuery } from "@apollo/client";
import { GroupType } from "@/types/group.types";
import { GET_ONE_GROUP } from "@/requests/group";

export type GroupProps = {
  group: GroupType;
};

export default function GroupDashboard(): React.ReactNode {
  const router = useRouter();
  const groupId = Number(router.query.id);

  const { data, error, loading } = useQuery<{ item: GroupType }>( GET_ONE_GROUP, {
    variables: {
      id: groupId,
    },
  });
console.log(data, error)


 //intégrer la requete GET_RESSOURCES_BY_GROUP_ID : 
 //export default function CardsDisplay(props: RessourceProps): React.ReactNode {
  //const { data } = useQuery(GET_RESSOURCES_BY_GROUP_ID, {
   // variables: { groupId }
  
if (data?.item) {
  return (
    <Layout title={"Dashboard Groupe"}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row"></div>
        <div className="col-md-12">
          <div className="row">
            <div>
            <p>Groupe ID: {groupId}</p>
                <h2>{data.item.name}</h2>
              {/*<CardsDisplay />*/}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
else {
  return;
}
}
