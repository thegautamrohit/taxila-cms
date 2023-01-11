import React from "react";
import { wrapper } from "../store/store";
import store from "../store/store";
function index() {
  return <div>index</div>;
}

export default index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // await store.dispatch(setAuthState(false));
      console.log("State on server", store.getState());
      return {
        props: {
          authState: false,
        },
      };
    }
);
