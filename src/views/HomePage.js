import React from "react";
import { NavLink } from "react-router-dom";
import LargeLogo from "../components/LargeLogo";
import SmallLogo from "../components/SmallLogo";
import {
  get_all_teams_names,
  get_team_data,
  get_team_data_from_any_name,
} from "../utils/utils";

const [category, subcategory] = ["basketball", "nba"];

export const TeamLink = ({ team, category = "basketball", subcategory = "nba", size="small", align='left' }) => {
  const { teamName, teamImg, color1, color2 } = get_team_data_from_any_name({
    category,
    subcategory,
    team,
  });
  return (
    <NavLink to={`/team/${teamName.replace(" ", "_")}`}>
      <div className={`
        row-flex
        black-text
        ${align=='left' && 'justify-flex-start'}
        ${align=='center' && ''}
      `}>
        {size == 'small' && <>
          <SmallLogo image={teamImg} />
          <span className="bold center">{teamName}</span>
        </> }
        {size == 'large' && <>
          <LargeLogo image={teamImg} />
          <h5 className="bold center">{teamName}</h5>
        </> }
      </div>
    </NavLink>
  );
};

function HomePage() {
  const all_teams_data = get_all_teams_names({
    category,
    subcategory,
  }).map((team) => get_team_data({ team, category, subcategory }));
  console.log(all_teams_data);
  return (
    <div>
      <h1 className="center">NBA Teams</h1>
      <div className="">
        <div className="row-flex wrap jusitfy-content-space-between">
          {all_teams_data.map((team) => (
            <>
              <NavLink to={`/team/${team.teamName.replace(" ", "_")}`}>
                <div
                  className="card round-card m5 cursor-pointer"
                  style={{ background: team.color1 }}
                >
                  <div className="card-content">
                    <div className="col-flex">
                      <div
                        className="large-logo-container"
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          height: "100px",
                          width: "100px",
                          overflow: "hidden",
                          borderRadius: "25px",
                        }}
                      >
                        <img src={team.teamImg} />
                      </div>
                      <h6 className="head white-text">{team.teamName}</h6>
                    </div>
                  </div>
                </div>
              </NavLink>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
