import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import LargeLogo from "../components/LargeLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { get_team_data_from_any_name } from "../utils/utils";
import StatsTabsCard, { statsPostFetchFn } from "./StatsTabsCard";
import {
  updateGameStreaksAction,
  updateTeamStatsAction,
} from "../store/actions/teamStatsActions";
import { post_fetch_api_at_stat_key } from "./StatsTabsCard";
import InjuriesPage from "./InjuriesPage";
import { TeamInjuries } from "../components/stats_cards_components/basketball-nba-tabs/InjuriesTab";
import SmallLogo from "../components/SmallLogo";
import { TeamOdds } from "../components/stats_cards_components/basketball-nba-tabs/OddsTab";
import { TeamTrends } from "../components/stats_cards_components/basketball-nba-tabs/TrendsTab";

const category = "basketball";
const subcategory = "nba";

function TeamPage(props) {
  const match = useRouteMatch();
  var { teamid } = match.params;
  teamid = teamid?.replace('_', ' ');
  const teamData = get_team_data_from_any_name({
    team: teamid,
    category,
    subcategory,
  });
  const { teamImg, teamName, color1, color2 } = teamData;
  const { configs } = useSelector(
    ({ teamStats }) => teamStats[category][subcategory]
  );
  const status = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].status;
    } catch (err) {
      return false;
    }
  });

  const team_matchup = useSelector((state) => {
    try {
      return state.teamStats[category][subcategory].stats.matchup[teamName];
    } catch (err) {
      return {};
    }
  });

  return (
    <div className="">
      <div className="team-top-section">
        <StatsCardWrapper
          {...{ category, subcategory, post_fetch_api_at_stat_key, configs }}
        >
          <div className="spacing-30px"></div>
          <div className="row">
            <div className="col s12 m10 offset-m1 l8 offset-l2">
              <div className="card round-card" style={{ background: color1 }}>
                <div className="card-content">
                  <div className="col-flex">
                    <div
                      className="large-logo-container"
                      style={{
                        backgroundColor: "white",
                        padding: "5px",
                        height: "100px",
                        width: "100px",
                        overflow: "hidden",
                        borderRadius: "25px",
                      }}
                    >
                      <img src={teamImg} />
                    </div>
                    <h4 className="head white-text">{teamName}</h4>
                  </div>
                </div>
              </div>
            </div>
            {status?.matchup == "loaded" && (
              <div className="col s12">
                <div className="card round-card">
                  <div className="card-content">
                    <div className="row-flex justify-space-around">
                      <div className="row-flex">
                        <SmallLogo image={teamImg} />
                        <h5 className="head">{teamName}</h5>
                      </div>
                      <div className="row-flex">
                        <h5 className="head">PowerRanking: </h5>
                        <h5 className="head">{team_matchup.points}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {status?.injuries == "loaded" && (
              <div className="col s12">
                <TeamInjuries {...{ team: teamName, category, subcategory }} />
              </div>
            )}
            {status?.odds == "loaded" && (
              <div className="col s12">
                <TeamOdds {...{ team: teamName, category, subcategory }} />
              </div>
            )}
            {status?.trends == "loaded" && (
              <div className="col s12">
                <TeamTrends {...{ team: teamName, category, subcategory }} />
              </div>
            )}
          </div>
        </StatsCardWrapper>
      </div>
    </div>
  );
}

export default TeamPage;
