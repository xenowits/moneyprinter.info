import React from "react";
import { NextPage, GetStaticProps } from "next";
import List from "components/List";
import CHAIN_DATA from "../components/constants";
import axios from "axios";

interface HomeProps {
  data: any[];
}

export const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <main>
      {/* <SocialTags /> */}

      <h1 className="title">Nakamoto Coefficients</h1>

      <p className="description">A measure of decentralization</p>

      <List data={data} />

      <style jsx>{`
        main {
          padding: 2rem 0 3rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0 0 16px;
          line-height: 1.15;
          font-size: 4rem;
          font-weight: 700;
        }

        .title,
        .description {
          text-align: center;
          max-width: 800px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 4px 0 20px;
        }
      `}</style>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let resp = await axios.get(
    "http://168.119.165.122:8080/nakamoto-coefficients"
  );
  let data = resp.data.coefficients.map((chain: any, indx: number) => {
    return {
      id: indx + 1,
      results: {
        metadata: CHAIN_DATA.get(chain.chain_token).metadata,
        name: CHAIN_DATA.get(chain.chain_token).name,
        icon: CHAIN_DATA.get(chain.chain_token).icon,
        currVal: chain.naka_co_curr_val,
        prevVal: chain.naka_co_prev_val,
      },
    };
  });
  return { props: { data }, revalidate: 60 };
};

export default Home;
