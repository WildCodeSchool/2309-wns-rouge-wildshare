import Layout from "@/components/organisms/layout";
import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { UserType, UserUpdateType } from "@/types/user.type";
import RessourceCard from "@/components/molecules/ressourceCard";

export default function GroupDashboard() {

  return (
<Layout title={"Dashboard Groupe"}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right">
          </div>
          <div className="col-md-8">
          <div className="row">
          <div className="col-md-6 mb-4">
                <RessourceCard/>
        </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
