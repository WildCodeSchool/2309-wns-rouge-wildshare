import Layout from "@/components/organisms/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { GET_RESSOURCES_BY_GROUP_ID } from "@/requests/ressources";
import { useQuery } from "@apollo/client";
import { GroupType } from "@/types/group.types";
import { GET_ONE_GROUP } from "@/requests/group";
import { RessourceType } from "@/types/ressources.types";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import SharingGroupForm from "@/components/organisms/sharingGroupForm";
import ModalComponent from "@/components/organisms//modal";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";
import { GET_ALL_TAGS_FROM_ONE_USER } from "@/requests/tags";
import TagsDisplay from "@/components/organisms/tagsDisplay";
import { TagType } from "@/types/extra.types";

export type GroupProps = {
  group: GroupType;
};

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function GroupDashboard(): React.ReactNode {
  const router = useRouter();
  const groupId = Number(router.query.id);
  const [modalInviteMemberVisible, setModalInviteMemberVisible] =
    useState<boolean>(false);
  const [modalRessourceVisible, setmodalRessourceVisible] =
    useState<boolean>(false);

  function handleInviteMemberModal(value: boolean) {
    setModalInviteMemberVisible(value);
  }

  function handleResourceModal(value: boolean) {
    setmodalRessourceVisible(value);
  }
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);
  const [titleSort, setTitleSort] = useState<string>("ASC");
  const [dateSort, setDateSort] = useState<string>("ASC");
  const [searchTitle, setSearchTitle] = useState<string>("");

  const { data: dataGroup } = useQuery<{ item: GroupType }>(GET_ONE_GROUP, {
    variables: {
      id: groupId,
    },
  });
  const { data: dataTags } = useQuery<{ items: TagType[] }>(
    GET_ALL_TAGS_FROM_ONE_USER
  );
  const {
    data: dataRessources,
    error: errorRessources,
    loading: loadingRessources,
    fetchMore,
  } = useQuery(GET_RESSOURCES_BY_GROUP_ID, {
    variables: {
      groupId,
      skip: 0,
      take: take,
      whereGroup: { group_id: groupId, title: searchTitle },
      orderBy: {
        created_at: dateSort,
        title: titleSort,
      },
    },
  });

  const handleFetchMore = async (inView: boolean) => {
    if (inView && dataRessources?.items.length) {
      try {
        await fetchMore({
          variables: {
            skip: dataRessources.items.length,
            take: take,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return {
              items: [...previousResult.items, ...fetchMoreResult.items],
            };
          },
        });

        setSkip((prevSkip) => prevSkip + take);
      } catch (error) {
        console.error("Error fetching more data:", error);
      }
    }
  };

  function handleSelectTag(tag: TagType) {
    if (selectedTags.find((item) => item === tag)) {
      const newTagArray = selectedTags.filter((item) => item !== tag);
      setSelectedTags(newTagArray);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }
  return (
    <Layout title={"Dashboard Groupe"}>
      <div className="ressources_main_container">
        {dataGroup ? (
          <div className="d-flex justify-content-between align-items-center">
            <h1>{dataGroup.item.name}</h1>
            <button
              className="btn_primary menu_button_add_group mx-4"
              onClick={() => handleInviteMemberModal(true)}
            >
              <i className="bi bi-plus-circle" />
              <span>Partager</span>
            </button>
          </div>
        ) : (
          <>
            <h2>Group Not Found</h2>
          </>
        )}
        
          <div className="d-flex justify-content-start align-items-center search_input_container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Rechercher par titre"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          
        </div>
        <div className="add_ressources_button">
          <h2>Ressources</h2>
          <button
            className="btn_rounded btn_add_ressources"
            onClick={() => handleResourceModal(true)}
          >
            <i className="bi bi-plus-circle" />
          </button>
        </div>
        <div
          className={`d-flex flex-row align-items-center mt-2 w-100 ${
            dataTags?.items ? "justify-content-between" : "justify-content-end"
          }`}
        >
          {dataTags?.items && (
            <TagsDisplay
              tags={dataTags?.items}
              selectedTags={selectedTags}
              onSelectTag={(tag: TagType) => handleSelectTag(tag)}
            />
          )}
          <div className="d-flex flex-row align-items-center justify-content-center gap-2 sort_buttons_container ">
            <span>Trier par:</span>
            <button
              className="btn_sort"
              onClick={() =>
                titleSort === "ASC" ? setTitleSort("DESC") : setTitleSort("ASC")
              }
            >
              {titleSort === "ASC" ? (
                <i className="bi bi-sort-alpha-down"></i>
              ) : (
                <i className="bi bi-sort-alpha-up"></i>
              )}
            </button>
            <button
              className="btn_sort"
              onClick={() =>
                dateSort === "ASC" ? setDateSort("DESC") : setDateSort("ASC")
              }
            >
              {dateSort === "ASC" ? (
                <i className="bi bi-arrow-down"></i>
              ) : (
                <i className="bi bi-arrow-up"></i>
              )}
              Date
            </button>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div>
              {loadingRessources && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              {errorRessources && <p>{errorRessources.message}</p>}
              {dataRessources && (
                <CardsDisplay ressources={dataRessources?.items} />
              )}
              <InView onChange={handleFetchMore} threshold={0.5}>
                <div className="spinner"></div>
              </InView>
            </div>
          </div>
        </div>
        <ModalComponent
          opened={modalRessourceVisible}
          openModal={handleResourceModal}
        >
          <CreateRessourcesForm onClose={handleResourceModal} />
        </ModalComponent>
        <ModalComponent
          opened={modalInviteMemberVisible}
          openModal={handleInviteMemberModal}
        >
          <SharingGroupForm
            groupId={groupId}
            onClose={handleInviteMemberModal}
          />
        </ModalComponent>
      </div>
    </Layout>
  );
}
