import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ListCard from "./components/ListCard";
import { VoteRecord } from "../../declarations/dvote_backend/dvote_backend.did";
import Tips, { TipsProps } from "./components/Tips";
import { getErrorMessage } from "./utils";
import { AuthContext } from "./components/AuthProvider";
import { Principal } from '@dfinity/principal';

const hardcodedEvents: VoteRecord[] = [
  {
    created_by: Principal.fromText("ynn2q-dpwtw-l7ukw-nrjed-3rq6x-ttww2-jctue-b23be-thcax-hr5wa-xae"), // Use a valid principal string
    created_at: BigInt(202310180245), // Example timestamp
    expired_at: BigInt(202310310245), // Example timestamp
    title: "Testing Vote 1",
    max_selection: 1,
    hash: "5692f90733cb11d56649c25fe06125e3",
    public: true,
    items: [
      { index: BigInt(0), name: "Item 1", count: BigInt(0) },
      { index: BigInt(1), name: "Item 2", count: BigInt(0) },
    ],
  },
  {
    created_by: Principal.fromText("ynn2q-dpwtw-l7ukw-nrjed-3rq6x-ttww2-jctue-b23be-thcax-hr5wa-xae"), // Use a valid principal string
    created_at: BigInt(202310180245), // Example timestamp
    expired_at: BigInt(202310200245), // Example timestamp
    title: "Testing Vote 2",
    max_selection: 1,
    hash: "l7ukw-nrjed-3rq6x-ttww2",
    public: true,
    items: [
      { index: BigInt(0), name: "Item 1", count: BigInt(0) },
      { index: BigInt(1), name: "Item 2", count: BigInt(0) },
    ],
  },
  // ... add more events if needed
];


const Explore = () => {
  const [votes, setVotes] = useState<VoteRecord[]>();
  const [tips, setTips] = useState<TipsProps>();
  const { backendActor } = useContext(AuthContext);
  useEffect(() => {
    
    if(!backendActor) return;
    (async () => {
      const votes = await backendActor.getPublicVote();
      if ("Err" in votes) {
        setTips({ message: getErrorMessage(votes.Err) });
        return;
      }
      setVotes(votes.Ok);
      console.log(votes.Ok, "getPublicVote");
    })();
    setVotes(hardcodedEvents);
  }, [backendActor]);
  return (
    <Box>
      {votes && <ListCard items={votes}></ListCard>}
      {tips && (
        <Tips
          message={tips.message}
          severity={tips.severity}
          onClose={() => setTips(undefined)}
        />
      )}
    </Box>
  );
};
export default Explore;
