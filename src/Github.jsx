import React, { useState, useEffect } from "react";
import conf from '../conf/conf'
const GithubUserSearch = () => {
  const [username, setUsername] = useState("mrtayyabriaz");
  const [userData, setUserData] = useState(null);
  const [followers, setfollowers] = useState(null);
  const [followings, setfollowings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    //--------- set url and accesstoken ----------
    const url = `https://api.github.com/users/${username}`;
    const accessToken = conf.github_token;
    //--------- set url and accesstoken ----------

    //------------ create headers & options -----------
    const headers = new Headers();
    headers.append("Authorization", `Bearer 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`);
    headers.append("X-GitHub-Api-Version", "2022-11-28");

    const options = {
      method: "GET",
      headers: headers,
    };
    //------------ create headers & options -----------

    //---------- fatch data ----------
    await fetch(url, options)
      .then((res) => {
        res.json().then((result) => {
          setUserData(result);
          // console.log(result);

          //----------if user not found-----------
          if (result.message == "Not Found") {
            setError("User not found");
            setUserData(null);
          }
          //----------if user not found-----------
        });
      })
      .catch((err) => {
        console.error("ERROR:" + err);
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      });
    //---------- fatch data ----------
  };

  const fetchFollowers = async () => {

    //--------- set url and accesstoken ----------
    const url = `https://api.github.com/users/${username}/followers`;
    const accessToken = conf.github_token;
    //--------- set url and accesstoken ----------

    //------------ create headers & options -----------
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    headers.append("X-GitHub-Api-Version", "2022-11-28");

    const options = {
      method: "GET",
      headers: headers,
    };
    //------------ create headers & options -----------

    //---------- fatch data ----------
    await fetch(url, options)
      .then((res) => {
        res.json().then((result) => {
          setfollowers(result);
          // console.log(result);
        });
      })
      .catch((err) => {
        console.error("ERROR:" + err);
      })
      .finally(() => {
      });
    //---------- fatch data ----------
  };

  const fetchFollowings = async () => {

    //--------- set url and accesstoken ----------
    const url = `https://api.github.com/users/${username}/following`;
    const accessToken = conf.github_token;
    //--------- set url and accesstoken ----------

    //------------ create headers & options -----------
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    headers.append("X-GitHub-Api-Version", "2022-11-28");

    const options = {
      method: "GET",
      headers: headers,
    };
    //------------ create headers & options -----------

    //---------- fatch data ----------
    await fetch(url, options)
      .then((res) => {
        res.json().then((result) => {
          setfollowings(result);
          // console.log(result);
        });
      })
      .catch((err) => {
        console.error("ERROR:" + err);
      })
      .finally(() => {
      });
    //---------- fatch data ----------
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <div>
      <h1>Search Git Hub Users</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchUserData();
          fetchFollowers();
          fetchFollowings();
        }}
        className="dflex">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="searchbtn">
          Search
        </button>
      </form>

      {/*----------loading error-------*/}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/*----------loading error-------*/}

      {userData && (
        <div>
          <br />
          <div className="dflex_start">
            <img
              className="git_avatar"
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
            />
            <div className="dflex_start dflex_col ms-3">
              <h3 className="m-0">{userData.name}</h3>
              <div className="text-lite">@{userData.login}</div>
            </div>
          </div>
          <br />
          <p className="user_bio">{userData.bio}</p>
          <div className="dflex_col_start">
            <div className="pe-3">

              <details>
                <summary>
                  Followers: <span className="text-info">{userData.followers}</span>
                </summary>
                {followers.map((follower) => (
                  <li key={follower.id}>{follower.login}</li>
                ))}

              </details>

            </div>
            <div>
              <details>
                <summary>
                  Following: <span className="text-info">{userData.following}</span>
                </summary>
                {followings.map((follow) => (
                  <li key={follow.id}>{follow.login}</li>
                ))}
              </details>
            </div>
          </div>
          <p>Public Repositories: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
};

export default GithubUserSearch;
