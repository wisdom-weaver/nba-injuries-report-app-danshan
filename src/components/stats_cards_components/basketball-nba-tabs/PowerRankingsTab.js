import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  get_team_data_from_any_name,
  get_team_key,
} from "../../../utils/utils";
import { TeamLink } from "../../../views/HomePage";
import LargeLogo from "../../LargeLogo";
import SmallLogo from "../../SmallLogo";
import { structure_raw_row_from_key_mapping } from "../stats_cards_components";

const key_mapping_powerrankings = [
  {
    key_head: "Team",
    key_init: "gsx$team",
    key_final: "team",
  },
  {
    key_head: "Power Ranking",
    key_init: "gsx$ranking",
    key_final: "ranking",
  },
];

const category = "basketball";
const subcategory = "nba";

export const structure_powerrankings_data = (data_ar) => {
  var raw_powerrankings = data_ar[0].feed.entry;
  raw_powerrankings = structure_raw_row_from_key_mapping({
    raw: raw_powerrankings,
    key_mapping: key_mapping_powerrankings,
  });
  raw_powerrankings = raw_powerrankings.map((ea) => ({
    ...ea,
    team: get_team_key({ team: ea.team, category, subcategory }),
  }));
  var str_powerrankings = _.keyBy(raw_powerrankings, "team");
  // console.log("raw_powerrankings", raw_powerrankings);
  delete str_powerrankings[""];
  // console.log("str_powerrankings", str_powerrankings);
  return { stat_structure: str_powerrankings, stat_key: "powerrankings" };
};

export const TeamPowerRankings = ({ team, category, subcategory }) => {
  const { teamName, teamImg } = get_team_data_from_any_name({
    team,
    category,
    subcategory,
  });
  // const injuries = []
  const {ranking} = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats['powerrankings'][team];
    } catch (err) {
      return [];
    }
  });
  // console.log(team, injuries);
  return (
    <>
      <div className="card round-card">
        <div className="card-content">
          <div className="card-content">
            <div className="row-flex justify-space-around">
              <div className="row-flex">
                <SmallLogo image={teamImg} />
                <h5 className="head">{teamName}</h5>
              </div>
              <div className="row-flex">
                <h5 className="head">PowerRanking: </h5>
                <h5 className="head">{ranking}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};